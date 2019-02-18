import RecorderWorker from "./recorder.worker"
import events from "./events"

export default class {
  constructor() {
    this.worker = new RecorderWorker()
  }

  async start() {

    return new Promise((resolve, reject) => {
      const eventHandler = (message) => {
        if (message.data[0] === events.RECORDING_STARTED) {
          this.worker.removeEventListener("message", eventHandler)
          resolve()
        }
      }
      this.worker.addEventListener("message", eventHandler)
      this.worker.postMessage([events.START_RECORDING])
      window.setTimeout(() => {
        this.worker.removeEventListener("message", eventHandler)
        reject()
      }, 1000)
    });
  }

  async stop() {
    let timeout;
    return new Promise((resolve, reject) => {
      const eventHandler = (message) => {
        if (message.data[0] === events.RECORDING_STOPPED) {
          this.worker.removeEventListener("message", eventHandler)
          window.clearInterval(timeout);
          resolve(message.data[1])
        }
      }
      this.worker.addEventListener("message", eventHandler)
      this.worker.postMessage([events.STOP_RECORDING])
      timeout = window.setTimeout(() => {
        this.worker.removeEventListener("message", eventHandler)
        reject()
      }, 1000)
    });
  }

  noteOn(noteNumber) {
    this.worker.postMessage([events.NOTE_ON, noteNumber])
  }

  noteOff(noteNumber) {
    this.worker.postMessage([events.NOTE_OFF, noteNumber])
  }
  
  quit() {
    this.worker.terminate();
    delete this.worker;
  }
}
