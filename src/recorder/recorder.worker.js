import events from './events';

let eventsBuffer = [];
let isRecording = false;
let recordingStartTime;

const start = () => {
  eventsBuffer = [];
  isRecording = true;
  recordingStartTime = performance.now();
  self.postMessage([events.RECORDING_STARTED])
}

const stop = () => {
  isRecording = false;
  self.postMessage([events.RECORDING_STOPPED, eventsBuffer])
}

const noteOn = (noteNumber) => {
  eventsBuffer.push([
    performance.now()-recordingStartTime,
    events.NOTE_ON,
    noteNumber
  ]);
}

const noteOff = (noteNumber) => {
  eventsBuffer.push([
    performance.now()-recordingStartTime,
    events.NOTE_OFF,
    noteNumber
  ]);
}

self.addEventListener('message', (message) => {
  const eventType = message.data.shift();
  const eventData = message.data;

  switch(eventType) {
    case events.START_RECORDING:
      start();
      break;
    case events.STOP_RECORDING:
      stop();
      break;
    case events.NOTE_ON:
      noteOn(eventData[0])
      break;
    case events.NOTE_OFF:
      noteOff(eventData[0])
      break;
    default:
      break;
  }
});
