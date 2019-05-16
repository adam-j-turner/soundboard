import React from 'react';
import call_1 from './sounds/call_1.wav';
import './App.css';

function playSound() {
  console.log('play a sound');
  var audio = new Audio(call_1);
  audio.play();
}

function App() {
  return (
    // for each sound in list of lists
    <button onClick={playSound}>
      Sound 1
    </button>
  );
}

export default App;
