import React from 'react';
import Grid from '@material-ui/core/Grid'
import Button from "@material-ui/core/Button";
// TODO: Have Tooltip show sound description on hover.
// import Tooltip from '@material-ui/core/Tooltip';

class SoundButton extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  render() {
    return (
      <Grid item key={this.props.key}>
        <Button
          {...this.props}
          className='Button-base SoundButton'
          aria-controls="customized-menu"
          aria-haspopup="true"
          variant="contained"
          color="primary"
          key={this.props.key}
          onClick={() => {this.props.onClick(this.props.audioPath)}}
        >
          {this.props.text}
        </Button>
      </Grid>
    )
  }
}

export default SoundButton
