import React from 'react';

class SoundButton extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  render() {
    return (
      <button
        {...this.props}
        className='button'
        key={this.props.key}
        onClick={this.props.onClick}
      >
        {this.props.text}
      </button>
    )
  }
}

export default SoundButton
