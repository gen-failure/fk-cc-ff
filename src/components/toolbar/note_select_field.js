import React from 'react';
import {FormGroup, Label, Input} from 'reactstrap';

import getMidiLabel from '../../helpers/get_midi_label';

export default function({label, options, value, onChange}) {
  return(
    <FormGroup className="note-select-field">
      <Label>First note</Label>
      <Input
        type="select"
        value={value}
        onChange={onChange}
        className="bg-dark text-light"
      >
        {
          options.map((option) => {
            return <option value={option} key={option}>{getMidiLabel(option)}</option>
          })
        }
      </Input>
    </FormGroup>
  );
}
