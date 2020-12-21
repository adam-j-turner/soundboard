import React from 'react'
import BaseButton from './BaseButton.js'
import Util from '../Util.js';

import instance from '../SoundProvider.js'
import meta from '../MetaProvider.js'

// TODO: support list of lists

class SoundButtonRandom extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      previousQueue: null
    }

    this.audioPaths = this.props.fromList ? meta.getList(this.props.fromList) : this.props.audioPaths

    this.handleClick = this.handleClick.bind(this)
    this.playRandom = this.playRandom.bind(this)
  }

  handleClick(e) {
    if (e.ctrlKey && this.state.previousQueue.length > 0) {
      instance.playAudio(this.state.previousQueue, e.altKey)
    } else {
      this.playRandom(e)
    }
  }

  playRandom(e) {
    var queue = []

    for (var i = 0; i < this.props.queueLength; i++) {
      queue.push(
        this.audioPaths[Util.randomNumber(0, this.audioPaths.length)]
      )
    }

    if (this.props.delimiterIndices) {
      var added = 0
      for (i in this.props.delimiterIndices) {
        queue.splice(this.props.delimiterIndices[i] + added, 0, this.props.delimiterAudioPath)
        added++
      }
    }

    this.setState({previousQueue: Array.from(queue)})
    instance.playAudio(queue, e.altKey)
  }

  render = () => {
    return (
      <BaseButton
        {...this.props}
        className='SoundButton-random'
        onClick={this.handleClick}
        onMouseUp={(e) => {
          if (this.props.mouseUpExtra) {
            this.handleClick(e)
            this.props.mouseUpExtra()
          }
        }}
      />
    )
  }
}

export default SoundButtonRandom
