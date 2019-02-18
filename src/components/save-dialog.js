import React from 'react';
import {inject,observer} from 'mobx-react';
import {Modal, ModalHeader, ModalBody, ModalFooter, Input, Button} from 'reactstrap'

@inject('ui')
@inject('storage')
@observer
class SaveDialog extends React.Component {
  render() {
    return(
      <Modal isOpen={this.props.ui.showSaveDialog}>
        <ModalHeader>Save</ModalHeader>
        <ModalBody>
          <Input 
            type="text"
            placeholder="Name of a new track"
            value={this.props.storage.newRecordName}
            onChange={(e) => {this.props.storage.setNewRecordTitle(e.target.value)}}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => {this.props.storage.saveRecord()}}
            disabled={!this.props.storage.newRecordTitle}
          >Save</Button>{' '}
          <Button color="danger" onClick={() => {this.props.ui.toggleSaveDialog(false)}}>Cancel</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

export default SaveDialog;
