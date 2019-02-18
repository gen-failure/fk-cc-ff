import React from 'react';
import {inject, observer} from 'mobx-react';
import {Alert, Modal, ModalHeader, ModalBody, ModalFooter, Button, Spinner, ListGroup, ListGroupItem } from 'reactstrap'

@inject('ui')
@inject('storage')
@observer
class Library extends React.Component {
  render() {
    return (
      <Modal isOpen={this.props.ui.showLibrary}>
        <ModalHeader>Library</ModalHeader>
        <ModalBody>
          {this.props.storage.updatingRecords && <div style={{textAlign:'center'}}><Spinner style={{ width: '3rem', height: '3rem' }} /></div>} 
          {!this.props.storage.updatingRecords && this.props.storage.updatingRecordsFailed && <Alert color="danger">Connection to library failed</Alert>}
          {
            !this.props.storage.updatingRecords && this.props.storage.records.length === 0 && <Alert color="warning">Your library is empty</Alert>}
          {!this.props.storage.updatingRecords && this.props.storage.records.length > 0 && !this.props.storage.updatingRecordsFailed &&
              <ListGroup>
                {this.props.storage.records.map((record) => {
                  return (
                    <ListGroupItem
                      tag="button"
                      action
                      key={record.id}
                      onClick={
                        () => { 
                          this.props.storage.loadRecord(record.id)
                          this.props.ui.toggleLibrary(false);
                        }
                      }
                    ><span className="fa fa-music pr-1"/>{record.title}</ListGroupItem>
                  )
                })}
              </ListGroup>
          }
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={() => {this.props.ui.toggleLibrary(false)}}>Cancel</Button>
        </ModalFooter>
      </Modal>      
    );
  }
}

export default Library
