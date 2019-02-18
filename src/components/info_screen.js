import React from 'react';
import {inject,observer} from 'mobx-react';
import formatRecordDuration from '../helpers/format_record_duration';

@inject('playback')
@inject('storage')
@observer
class InfoScreen extends React.Component {
  render() {
    return(
      <div className="info-screen-wrapper container">
        {this.props.storage.currentRecordId &&
            <div className="track-info pt-2">
              <h2>{this.props.storage.currentRecordTitle} ({formatRecordDuration(this.props.playback.recordDuration)})</h2>
            </div>
        }
      </div>
    )
  }
 }

export default InfoScreen;
