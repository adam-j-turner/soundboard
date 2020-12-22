import React from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
import ListItemText from '@material-ui/core/ListItemText';

import instance from '../SoundProvider.js'
import meta from '../MetaProvider.js'

class MultiButton extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      anchorEl: null,
      audioPath: ''
    }

    this.options = this.props.fromList ? meta.getList(this.props.fromList, true) : this.props.options

    if (this.props.precursorAudioPath) {
      this.type = 'concatenator'
    } else {
      this.type = 'regular'
    }
  }
  
  handleClose = () => {
    this.setState({ anchorEl: null });
  }

  handleOpen = (e) => {
    this.setState({ anchorEl: e.currentTarget });
  }

  handleMouseUp = (e) => {
    if (this.props.precursorAudioPath) {
      if (!this.state.audioPath) {
        instance.playAudio(this.props.precursorAudioPath, e.altKey)
      } else {
        instance.playAudio([this.props.precursorAudioPath, this.state.audioPath], e.altKey)
      }
    } else {
      instance.playAudio(this.state.audioPath, e.altKey);
    }
    this.handleClose()
  }

  render() {
    return (
      <Grid item key={this.props.key} className="MultiButton-gridItem">
        <Button
          {...this.props}
          className={"Button-base MultiButton-base MultiButton-" + this.type}
          classes={{
            sizeSmall: 'Button-base-small',
            sizeLarge: 'Button-base-large'  
          }}
          aria-controls="customized-menu"
          aria-haspopup="true"
          variant="contained"
          color="primary"
          onMouseDown={this.handleOpen}
          onMouseUp={this.handleMouseUp}
          onMouseEnter={() => {
            var audio = this.options.find((o) => o.default)

            this.setState({
              audioPath: audio === undefined ? '' : audio.audioPath
            })
          }}
        >
          {this.props.text}
        </Button>
        <Menu
          className="MultiButton-menu"
          anchorEl={this.state.anchorEl}
          keepMounted={false}
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}
          elevation={4}
          getContentAnchorEl={null}
          autoFocus={false}
          transitionDuration={0}
          variant="menu"
          hideBackdrop={true}
          disablePortal
          // TODO: Support multiple origins/transforms
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left"
          }}
        >
          {this.options.map(option => (
            <Tooltip key={option.text} title={option.description} placement='bottom'>
              <MenuItem
                onMouseEnter={() => {
                  this.setState({ audioPath: option.audioPath });
                }}
                onMouseUp={this.handleMouseUp}
              >
                <ListItemText primary={option.text} />
              </MenuItem>
            </Tooltip>
          ))}
        </Menu>
      </Grid>
    )
  }
}

export default MultiButton
