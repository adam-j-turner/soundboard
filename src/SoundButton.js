import React from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
// TODO: Have Tooltip show sound description on hover.
// import Tooltip from '@material-ui/core/Tooltip';

class SoundButton extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  mainButton = () => {
    return (
      <Button
        {...this.props}
        className='Button-base SoundButton'
        classes={{
          sizeSmall: 'Button-base-small',
          sizeLarge: 'Button-base-large'  
        }}
        variant={this.props.variant}
        color='primary'
        key={this.props.key}
        onClick={() => {this.props.onClick(this.props.audioPath)}}
      >
        {this.props.children}
        {this.props.text}
      </Button>
    )
  }

  render() {
    if (this.props.gridItem) {
      return (
        <Grid item key={this.props.key}>
          {this.mainButton()}
        </Grid>
      )
    }
    else {
      return this.mainButton()
    }
  }
}

SoundButton.defaultProps = {
  variant: 'contained',
  gridItem: true
}

export default SoundButton
