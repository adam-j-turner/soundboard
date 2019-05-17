import React from 'react';
import call_1 from './sounds/call_1.wav';
import { Line } from 'rc-progress';
import './App.css';

class Container extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      progress: 0
    }

    this.interval = null;
    this.playSound = this.playSound.bind(this)
  }

  updateProgress() {
    if (this.state.progress <= 100) {
      var current = this.state.progress
      this.setState({progress: current + 1})
    }
    else {
      clearInterval(this.interval)
      this.setState({progress: 0})
    }
  }

  playSound() {
    console.log('play a sound');
    var audio = new Audio(call_1);

    audio.addEventListener('loadedmetadata', () => {
      var _this = this;
      this.interval = setInterval(
        function() {_this.updateProgress()}, audio.duration * 1000 / 100
      )
  
      audio.play();
    })
  }

  render() {
    return (
      <div>
        <Line percent={this.state.progress} />
        <button onClick={this.playSound}>
          Sound 1
        </button>
      </div>
    )
  }
}

function App() {
  return (
    <Container />
  );
}

export default App;
