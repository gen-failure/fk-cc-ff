import {action, observable, runInAction} from 'mobx';
import axios from 'axios'

class StorageStore {
  @observable storageUri = "http://localhost:4000"
  @observable updatingRecords = false;
  @observable updatingRecordsFailed = false;
  @observable records = [];
  @observable newRecordTitle="";
  @observable currentRecordTitle;
  @observable currentRecordId;

  @action async updateRecords() {
    try {
      this.updatingRecords = true;
      this.updatingRecordsFailed = false;
      let res = await axios.post(this.storageUri, {
        query: "{ songs { id,title } }"
      });

      runInAction(() => {
        this.records = res.data.data.songs;
        this.updatingRecords = false;
      })
    } catch(e) {
      this.updatingRecords = false;
      this.updatingRecordsFailed = true;
    }
  }

  @action async saveRecord() {
    let res = await axios.post(this.storageUri, {
      query: `
        mutation addSong($title:String!,$noteEvents:[NoteEventInput]!) {
          addSong(title: $title, noteEvents: $noteEvents) {
            id
          }
        }
      `,
      variables: {
        title: this.newRecordTitle,
        noteEvents: this.stores.playback.record.map((eventArray) => {
          return {
            time: eventArray[0],
            type: eventArray[1],
            value: eventArray[2]
          }
        })
      }
    });
    this.setCurrentRecord(res.data.data.addSong.id, this.newRecordTitle, this.stores.playback.record);
    this.newRecordTitle="";
    this.stores.ui.toggleSaveDialog(false);
  }

  @action async loadRecord(id) {
    let res = await axios.post(this.storageUri, {
      query: `
          query song($id:ID!) {
            song(id: $id) {
              id,
              title,
              noteEvents {
                time, type, value
              }
            }
          }`,
      variables: {
        id
      }
    });

    this.setCurrentRecord(id, res.data.data.song.title, res.data.data.song.noteEvents.map((event) => {
      return [event.time, event.type, event.value];
    }));
  }

  @action setCurrentRecord(id,title, record) {
    this.currentRecordId=id;
    this.currentRecordTitle=title;
    this.stores.playback.loadRecord(record);
  }

  @action clearCurrentRecord() {
    this.currentRecordId=null;
    this.currentRecordTitle=null
    this.stores.playback.loadRecord([])
  }

  @action setNewRecordTitle(title) {
    this.newRecordTitle=title
  }
}

export default StorageStore;
