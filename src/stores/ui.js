import {action, computed, observable} from 'mobx'
import {MidiNumbers} from 'react-piano'; 

class UIStore {
  @observable firstNote = MidiNumbers.fromNote('c3');
  @observable lastNote = MidiNumbers.fromNote('f6');

  @observable showSaveDialog=false;
  @observable showLibrary=false
  @observable windowWidth;

  constructor() {
    this.updateWindowWidth()
    window.addEventListener('resize', () => {
      this.updateWindowWidth();
    })
  }

  @action updateWindowWidth() {
    this.windowWidth = window.innerWidth
  }

  @action toggleSaveDialog(value=true) {
    this.showSaveDialog=value;
  }

  @action toggleLibrary(value=true) {
    this.showLibrary=value;
    if (value) this.stores.storage.updateRecords();
  }

  @action setFirstNote(noteNumber) {
    this.firstNote = noteNumber
  }

  @action setLastNote(noteNumber) {
    this.lastNote = noteNumber;
  }

  @computed get toolbarButtons() {
    return {
      startRecording: {
        disabled: this.stores.playback.isPlaying || this.stores.playback.isRecording || !this.stores.playback.synthReady,
        visible: !this.stores.playback.isRecording
      },
      stopRecording: {
        disabled: false,
        visible: this.stores.playback.isRecording
      },
      startPlaying: {
        disabled: this.stores.playback.isPlaying || this.stores.playback.isRecording,
        visible: this.stores.playback.recordLength > 0 && !this.stores.playback.isRecording
      },
      stopPlaying: {
        disabled: !this.stores.playback.isPlaying,
        visible: this.stores.playback.recordLength > 0 && !this.stores.playback.isRecording
      },
      save: {
        disabled: this.stores.playback.isPlaying && !this.stores.storage.currentTrackId,
        visible: (!this.stores.storage.currentTrackId && this.stores.playback.recordLength > 0) && !this.stores.playback.isRecording
      },
      library: {
        disabled: this.stores.playback.isPlaying && this.stores.playback.isRecording,
        visible: true
      }
    }
  }

  get availableFirstNotes() {
    return MidiNumbers.NATURAL_MIDI_NUMBERS  
  }

  
  @computed get availableLastNotes() {
    return MidiNumbers.NATURAL_MIDI_NUMBERS.filter((number) => {
      return (number > this.firstNote)
    })
  }



}

export default UIStore;
