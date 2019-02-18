import React from 'react'
import {Button} from 'reactstrap';

export default function({disabled, onClick, color, icon, flashing=false, text="", className=""}) {
  let iconClassName = ['fa', `fa-${icon}`, 'pr-1'];
  if (flashing) iconClassName.push('flash')
  return(
    <Button color={color} disabled={disabled} onClick={onClick} className={`toolbar-button ${className}`}>
      <span className={iconClassName.join(' ')} />
      {text && <span>{text}</span>}
    </Button>
  )
}
