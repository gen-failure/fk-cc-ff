import React from 'react';
import {inject,observer} from 'mobx-react';
import {Form, ButtonGroup} from 'reactstrap';

import ToolbarButton from './toolbar/toolbar-button';
import NoteSelectField from './toolbar/note_select_field';

import './toolbar/toolbar.scss';

@inject('playback')
@inject('storage')
@inject('ui')
@observer
class Toolbar extends React.Component {
  render() {
    return(
      <div className="toolbar-wrapper container-fluid bg-dark text-light">

        <Form inline>
            <NoteSelectField 
              value={this.props.ui.firstNote}
              onChange={(e) => {this.props.ui.setFirstNote(Number(e.target.value))}}
              options={this.props.ui.availableFirstNotes}
              label="First note"
            />

            <NoteSelectField
              value={this.props.ui.lastNote}
              onChange={(e) => {this.props.ui.setLastNote(Number(e.target.value))}}
              options={this.props.ui.availableLastNotes}
              label="Last note"
            />
          <ButtonGroup>
            {
              this.props.ui.toolbarButtons.startRecording.visible && 
                <ToolbarButton
                  onClick={() => {this.props.playback.startRecording()}}
                  disabled={this.props.ui.toolbarButtons.startRecording.disabled}
                  icon="circle"
                  color="success"
                />
            }
            {
              this.props.ui.toolbarButtons.stopRecording.visible && 
                <ToolbarButton
                  onClick={() => {this.props.playback.stopRecording()}}
                  disabled={this.props.ui.toolbarButtons.stopRecording.disabled}
                  icon="circle"
                  color="danger"
                  flashing
                />
            }
            {
              this.props.ui.toolbarButtons.startPlaying.visible &&
                <ToolbarButton
                  onClick={() => {this.props.playback.startPlaying()}}
                  disabled={this.props.ui.toolbarButtons.startPlaying.disabled}
                  icon="play"
                  color="success"
                />
            }
            {
              this.props.ui.toolbarButtons.stopPlaying.visible &&
                <ToolbarButton
                  onClick={() => {this.props.playback.stopPlaying()}}
                  disabled={this.props.ui.toolbarButtons.stopPlaying.disabled}
                  icon="stop"
                  color="danger"
                />
            }
            {
              this.props.ui.toolbarButtons.save.visible &&
                <ToolbarButton
                  onClick={() => {this.props.ui.toggleSaveDialog()}}
                  disabled={this.props.ui.toolbarButtons.save.disabled}
                  icon="save"
                  color="primary"
                />
            }
          </ButtonGroup>
          {
            this.props.ui.toolbarButtons.library.visible && 
              <ToolbarButton
                className="ml-auto"
                onClick={() => {this.props.ui.toggleLibrary()}}
                icon="book"
                color="light"
                text="Library"
                disabled={this.props.ui.toolbarButtons.library.disabled}
              />
          }
        </Form>
      </div>
    );
  }
}

export default Toolbar;
