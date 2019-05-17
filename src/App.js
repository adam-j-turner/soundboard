import React from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import call_1 from './sounds/call_1.wav';
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
      editMode: false
      //isDraggable: false,
      //isResizable: false,
    }

    this.interval = null;
    this.changeEditMode = this.changeEditMode.bind(this)
    this.playSound = this.playSound.bind(this)
  }

  changeEditMode(value, event) {
    this.setState({ editMode: value });
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
    // don't play sounds during edit mode
    if (this.state.editMode) {return}

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
    var layout = [
      {i: 'a', x: 0, y: 0, w: 3, h: 1, minW: 2, maxW: 4}
    ];

    return (
      <div>
        <div className='header'>
          <Line className='progressBar' percent={this.state.progress} />
          <div className='editModeBar'>
            <h1>Edit Mode: </h1>
            <ToggleButtonGroup name="editMode" type="radio" onChange={this.changeEditMode}>
              <ToggleButton type="radio" value={true}>ON</ToggleButton>
              <ToggleButton type="radio" defaultChecked value={false} >OFF</ToggleButton>
            </ToggleButtonGroup>
          </div>
        </div>
        <GridLayout className="buttonGrid" layout={layout} cols={20} rowHeight={30} isDraggable={this.state.editMode} isResizable={this.state.editMode}>
          <button key='a' onClick={this.playSound}>
            Sound 1
          </button>
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
