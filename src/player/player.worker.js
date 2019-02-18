import {cloneDeep} from 'lodash';
import events from './events';

let recordBuffer = [];
let isPlaying = false
let playbackPosition = 0;
let playbackInterval = null;

const start = () => {
  isPlaying = true;
  playbackPosition = 0;

  const buffer = cloneDeep(recordBuffer);
  let lastExecutionFinished = performance.now();
  self.postMessage([events.PLAYING_STARTED]);
  playbackInterval = self.setInterval(() => {
    playbackPosition += performance.now()-lastExecutionFinished;
    for (let i in buffer) {
      let event = buffer[i];
      if (event[0] >= playbackPosition) {
        break;
      }
      switch(event[1]) {
        case events.NOTE_ON:
        case events.NOTE_OFF:
          self.postMessage([event[1], event[2]]);
          break;
      }
      buffer.splice(i,1);
    }
    if (buffer.length === 0 || isPlaying === false) {
      self.postMessage([events.PLAYING_STOPPED]);
      self.clearInterval(playbackInterval);
        isPlaying = false;
    }
    lastExecutionFinished = performance.now();
  },15);
}

const stop = () => {
  isPlaying = false;
}

const load = (buffer) => {
  recordBuffer = buffer;
  self.postMessage([events.RECORD_LOADED]);
}


self.addEventListener('message', (message) => {
  const eventType = message.data.shift();
  const eventData = message.data;

  switch(eventType) {
    case events.START_PLAYING:
      start();
      break;
    case events.STOP_PLAYING:
      stop();
      break;
    case events.LOAD_RECORD:
      load(eventData[0]);
      break;
    default:
      break;
  }
});
