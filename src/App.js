import React from 'react';
import DemoLayout from './DemoLayout.json'
import RGL, { WidthProvider } from 'react-grid-layout';
import MultiButton from './MultiButton.js';
import SoundButton from './SoundButton.js';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import { Line } from 'rc-progress';
import _ from "lodash";
import './App.css';
import '../node_modules/react-grid-layout/css/styles.css'
import '../node_modules/react-resizable/css/styles.css'

const GridLayout = WidthProvider(RGL);

class Container extends React.Component {
  static defaultProps = {
    defaultLayout: DemoLayout
  }

  constructor(props){
    super(props)
    this.state = {
      progress: 0,
      editMode: false,
      playing: false,
      layoutRaw: this.props.defaultLayout,
      layout: this.generateLayout(this.props.defaultLayout)
    }

    this.multiButtons = []

    this.audio = this.importBulk(require.context('./sounds', false, /\.(wav|mp3)$/))

    this.currentAudio = null
    this.playing = false
    this.interval = null

    this.handleEditModeChange = this.handleEditModeChange.bind(this)
    this.handleSoundButtonClick = this.handleSoundButtonClick.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
  }

  // Imports audio in bulk from a webpack context
  importBulk(context) {
    let clips = {}

    context.keys().map((item) => {
      clips[item.replace('./', '')] = new Audio(context(item))
    })

    _.forEach(clips, (clip) => {
      clip.preload = true
      clip.load()

      clip.addEventListener('ended', () => {
        this.setState({playing: false}, () => {
          this.stopProgress()
        })
      })
    })

    return clips;
  }

  generateLayout(def) {
    return _.map(def, function(item, i) {
      return {
        x: item.x,
        y: item.y,
        w: item.w,
        h: item.h,
        i: i.toString(),
      }
    })
  }

  generateSoundButtons() {
    var _this = this

    return _.map(this.state.layoutRaw, function(item, i) {
      return (
        <SoundButton 
          key={i} 
          text={item.text} 
          audioPath={item.audioPath} 
          onClick={() => _this.handleSoundButtonClick(item.audioPath)}>
        </SoundButton>
      )
    })
  }

  handleEditModeChange(value) {
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

  startProgress() {
    var _this = this
    this.interval = setInterval(
      function() {
        _this.setState({
          progress: _this.currentAudio.currentTime * 100 / _this.currentAudio.duration
        })
      },
      40
    )
  }

  stopProgress() {
    clearInterval(this.interval)
    this.setState({progress: 0})
  }

  startAudio() {
    this.startProgress()
    this.currentAudio.play()
  }

  stopAudio() {
    this.stopProgress()
    this.currentAudio.pause()
    this.currentAudio.currentTime = 0
  }

  handleSoundButtonClick(path) {
    // don't play sounds during edit mode
    if (this.state.editMode) {return}

    if (this.state.playing) {
      this.setState({playing: false}, () => {
        this.stopAudio()

        this.currentAudio = this.audio[path]
        this.setState({playing: true}, () => {
          this.startAudio()
        })
      })
    }
    else {
      this.currentAudio = this.audio[path]
      this.setState({playing: true}, () => {
        this.startAudio()
      })
    }    
  }

  // Uses callback refs to collapse all MultiButtons on mouseUp.
  // This allows for the MultiButtons to collapse no matter
  // where the cursor is positioned.
  handleMouseUp() {
    this.multiButtons
      .filter(node => node != null)
      .forEach((mb) => {
        mb.handleClose()
      })
  }

  render() {
    // Main soundboard page
    return (
      <div className='App' onMouseUp={this.handleMouseUp}>
        <div className='header'>
          <h1>The Ultimate Harrison Ford Soundboard</h1>
        </div>
        <div>
          <Line className='progressBar' strokeColor='var(--primary)' percent={this.state.progress} />
          <div className='editModeBar'>
            <h1>Edit Mode: </h1>
            <ToggleButtonGroup name="editMode" type="radio" onChange={this.handleEditModeChange} defaultValue={false}>
              <ToggleButton className="button" type="radio" value={true}>ON</ToggleButton>
              <ToggleButton className="button" type="radio" defaultChecked value={false}>OFF</ToggleButton>
            </ToggleButtonGroup>
          </div>
        </div>
        {/* Example usage of MultiButton */}
        <MultiButton
          text='Hello'
          options = {[
            {text: '1', description: 'Helloo?', audioPath: 'hello_1.wav', default: true},
            {text: '2', description: 'Hello?', audioPath: 'hello_2.wav'},
            {text: '3', description: 'HELLO!', audioPath: 'hello_3.wav'},
            {text: '4', description: 'HELLO!?', audioPath: 'af1_hello_1.wav'},
            {text: '5', description: 'Hello... is anyone there?', audioPath: 'af1_hello_2.wav'}
          ]}
          onMouseUp={this.handleSoundButtonClick}
          ref={(mb) => this.multiButtons.push(mb)}
        />
        <GridLayout
          layout={this.state.layout}
          compactType='vertical'
          cols={30} rowHeight={30}
          isDraggable={this.state.editMode}
          isResizable={this.state.editMode}
        >
          {this.generateSoundButtons()}
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
