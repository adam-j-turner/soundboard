import React from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';
import sounds from './sounds.js'
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import { Line } from 'rc-progress';
import './App.css';
import '../node_modules/react-grid-layout/css/styles.css'
import '../node_modules/react-resizable/css/styles.css'

const GridLayout = WidthProvider(RGL);

class Container extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      progress: 0,
      editMode: false,
      playing: false
    }
    this.currentAudio = null
    this.interval = null

    this.changeEditMode = this.changeEditMode.bind(this)
    this.playSound = this.playSound.bind(this)
  }

  changeEditMode(value) {
    this.setState({ editMode: value });
  }

  updateProgress() {
    if (this.state.progress <= 100) {
      this.setState({progress: this.state.progress + 1})
    }
    else {
      this.stopProgress()
    }
  }

  stopProgress() {
    clearInterval(this.interval)
    this.setState({progress: 0})
  }

  startAudio(){
    this.setState({playing: true});
    this.currentAudio.play()
  }

  stopAudio() {
    this.setState({playing: false});
    this.currentAudio.pause()
    this.currentAudio.currentTime = 0
    this.stopProgress()
  }

  playSound(sound) {
    // don't play sounds during edit mode
    if (this.state.editMode) {return}

    if (this.state.playing) {
      this.stopAudio()
    }

    this.currentAudio = new Audio(sound.file);

    this.currentAudio.addEventListener('loadedmetadata', () => {
      var _this = this;
      this.interval = setInterval(
        function() {_this.updateProgress()},
        this.currentAudio.duration * 10
      )
    })

    this.startAudio()
  }

  render() {
    // Set the default layout for every sound button.
    const layout = [];
    sounds.map(
      (sound, i) => layout.push(
        {i: sound.key, x: 0, y: 0, w: 4, h: 1, minW: 2, maxW: 4}
      )
    )

    // Main soundboard page
    return (
      <div>
        <div className='header'>
          <Line className='progressBar' percent={this.state.progress} />
          <div className='editModeBar'>
            <h1>Edit Mode: </h1>
            <ToggleButtonGroup name="editMode" type="radio" onChange={this.changeEditMode} defaultValue={false}>
              <ToggleButton type="radio" value={true}>ON</ToggleButton>
              <ToggleButton type="radio" defaultChecked value={false} >OFF</ToggleButton>
            </ToggleButtonGroup>
          </div>
        </div>
        <GridLayout className="buttonGrid" layout={layout} cols={20} rowHeight={30} isDraggable={this.state.editMode} isResizable={this.state.editMode}>
          {sounds.map((sound, i) =>
            <button key={sound.key} onClick={() => this.playSound(sound)}>
              {sound.name}
            </button>)
          }
        </GridLayout>
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
