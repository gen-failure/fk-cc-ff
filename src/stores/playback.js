import {action, observable, runInAction} from 'mobx';
import Soundfont from 'soundfont-player';

import Recorder from '../recorder/recorder';
import Player from '../player/player';

class PlaybackStore {
  @observable synthReady = false;
  @observable isRecording = false;
  @observable isPlaying = false;
  @observable recordLength = 0;
  @observable recordDuration = 0;
  constructor() {
    this.playedNotes = {}
    this.record = [];
    this.synth = null;
    this.initSynth();
  }

  @action async initSynth() {
    this.synthReady = false;
    this.synth = await Soundfont.instrument(new AudioContext(), '/soundfonts/acoustic_grand_piano-mp3.js');
    runInAction(() => {
      this.synthReady = true;
    })
  }

  noteOn(number) {
    if (this.isRecording) this.recorder.noteOn(number);
    this.playedNotes[number] = this.synth.play(number);
  }

  noteOff(number) {
    if (this.isRecording) this.recorder.noteOff(number);
    this.playedNotes[number].stop();
  }

  @action async startRecording() {
    this.stores.storage.clearCurrentRecord();
    this.recorder = new Recorder();
    await this.recorder.start();
    runInAction(() => {
      this.isRecording = true;
    })
  }

  @action async stopRecording() {
    let record = await this.recorder.stop();
    this.recorder.quit();
    this.recorder = null;
    runInAction(() => {
      this.isRecording = false;
    });
    this.loadRecord(record);
  }

  @action async startPlaying() {
    this.synth.stop();
    this.playedNotes = [];
    this.player = new Player({
      noteOn: (number) => { this.noteOn(number)},
      noteOff: (number) => { this.noteOff(number)},
      onFinish: () => {
        this.player.quit();
        this.synth.stop();
        this.player = null;
        runInAction(() => {
          this.isPlaying = false;
        });
      }
    });
    await this.player.load(this.record);
    await this.player.start();
    runInAction(() => {
      this.isPlaying = true;
    })
  }

  @action stopPlaying() {
    this.player.stop()
  }

  @action loadRecord(record) {
    this.record = record;
    this.recordLength = this.record.length;
    this.recordDuration = (this.recordLength) ? this.record[this.recordLength-1][0] : 0;
  }
}

export default PlaybackStore;
