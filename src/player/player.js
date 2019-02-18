import PlayerWorker from './player.worker';
import events from './events';

export default class {
  constructor({noteOn, noteOff, onFinish}) {
    this.worker = new PlayerWorker();
    this.worker.addEventListener('message', (message) => {
      if ([events.NOTE_ON, events.NOTE_OFF, events.PLAYING_STOPPED].indexOf(message.data[0]) === -1) return false;
      switch(message.data[0]) {
        case events.NOTE_ON:
          noteOn(message.data[1]);
          break;
        case events.NOTE_OFF:
          noteOff(message.data[1]);
          break;
        case events.PLAYING_STOPPED:
          onFinish();
          break;
        default:
          break;
      };
    });
  }

  async load(record) {

    let timeout;

    return new Promise((resolve, reject) => {
      const eventHandler = (message) => {
        if (message.data[0] === events.RECORD_LOADED) {
          this.worker.removeEventListener('message', eventHandler);
          window.clearTimeout(timeout);
          resolve();
        }
      }
    
      this.worker.addEventListener('message', eventHandler);
      this.worker.postMessage([events.LOAD_RECORD, record]);
      timeout = window.setTimeout(() => {
        this.worker.removeEventListener('message', eventHandler);
        reject()
      },3000);
    });
  }

  async start() {
    return new Promise((resolve, reject) => {
      
      const eventHandler = (message) => {
        if (message.data[0] === events.PLAYING_STARTED) {
          this.worker.removeEventListener('message', eventHandler);
          resolve()
        }
      }

      this.worker.addEventListener('message', eventHandler );
      this.worker.postMessage([events.START_PLAYING]);
      window.setTimeout(() => {
        this.worker.removeEventListener('message', eventHandler);
        reject()
      },1000);
    });
  }

  //Unlike start function, the event output is catpured by global event handler
  stop() {
    this.worker.postMessage([events.STOP_PLAYING]);
  }

  quit() {
    this.worker.terminate();
    delete this.worker;
  }
}
