import React from 'react';
import {inject, observer} from 'mobx-react';
import {Piano} from 'react-piano';

import 'react-piano/dist/styles.css';


@inject('playback')
@inject('ui')
@observer
class Keyboard extends React.Component {
  render() {
    return(
      <div className="keyboard-wrapper">
        { !this.props.playback.synthReady && <div className="loading-overlay">Initializing synthetizer</div> }
        <Piano
          noteRange={
            { 
              first: this.props.ui.firstNote,
              last: this.props.ui.lastNote
            }
          }
          playNote={
            (number) => {
              this.props.playback.noteOn(number)
            }
          }
          stopNote={
            (number) => {
              this.props.playback.noteOff(number)
            }
          }
          width={this.props.ui.windowWidth}
          activeNotes={this.props.playback.activeNotes}
        />
      </div>
    );
  }
}

export default Keyboard;
