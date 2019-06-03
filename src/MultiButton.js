import React from 'react'
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';

class MultiButton extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      direction: 'right',
      open: false,
      audioPath: ''
    }

    this.text = 'MultiButton'
  }
  
  handleClose = () => {
    this.setState({ open: false });
  }

  handleOpen = () => {
    this.setState({ open: true });
  }

  handleSelect = (name) => {
    alert(name)
  }

  render() {
    return (
      <SpeedDial
        ariaLabel=""
        hidden={false}
        open={this.state.open}
        direction={this.state.direction}
        transitionDuration={0}
        icon={<p>{this.props.text}</p>}

        onMouseDown={this.handleOpen}
        onMouseUp={() => {
          this.props.onMouseUp(this.state.audioPath);
          this.handleClose()
        }}

        // Play the default audio when clicking the main button.
        onMouseEnter={
          () => {this.setState(
            {audioPath: (this.props.options.find((o) => o.default)).audioPath})
          }
        }
      >
        {this.props.options.map(option => (
          <SpeedDialAction
            icon={<p>{option.text}</p>}
            classes={{button: 'multiButtonOption'}}
            tooltipTitle={option.description}
            delay={0}

            onMouseEnter={() => {this.setState({audioPath: option.audioPath})}}
          />
        ))}
      </SpeedDial>
    )
  }
}

export default MultiButton
