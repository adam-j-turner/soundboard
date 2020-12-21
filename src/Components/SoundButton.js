import React from 'react'
import BaseButton from './BaseButton.js'
//import Button from '@material-ui/core/Button'
// TODO: Have Tooltip show sound description on hover.
// import Tooltip from '@material-ui/core/Tooltip';

import instance from '../SoundProvider.js'

class SoundButton extends React.Component {
  constructor(props){
    super(props)
  }

  render = () => {
    return (
      <BaseButton
        {...this.props}
        className='SoundButton'
        onClick={(e) => {
          instance.playAudio(this.props.audioPath, e.altKey)
        }}
        onMouseUp={(e) => {
          if (this.props.mouseUpExtra) {
            instance.playAudio(this.props.audioPath, e.altKey)
            this.props.mouseUpExtra()
          }
        }}
      />
    )
  }
}

export default SoundButton
