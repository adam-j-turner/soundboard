import React from 'react';
import Grid from '@material-ui/core/Grid'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import SoundButton from './SoundButton.js'

class SoundButtonGroup extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <Grid item key={this.props.key}>
        <ButtonGroup 
          {...this.props}
          className='SoundButtonGroup'
        >
          {this.props.options.map(option => (
            <SoundButton
              gridItem={false}
              text={option.text}
              description={option.description}
              audioPath={option.audioPath}
              variant=''
              onClick={this.props.onButtonClick}
            >
              {option.display}
            </SoundButton>
          ))}
        </ButtonGroup>
      </Grid>
    )
  }
}

export default SoundButtonGroup
