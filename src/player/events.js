import noteEvents from '../note_events';

export default {
  ...noteEvents,
  LOAD_RECORD: 2,
  RECORD_LOADED: 3,
  START_PLAYING: 4,
  STOP_PLAYING: 5,
  PLAYING_STARTED: 6,
  PLAYING_STOPPED: 7,
  PAUSE_PLAYING: 8,
  RESUME_PLAYING: 9,
}
