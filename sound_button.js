'use strict';

const e = React.createElement;

class SoundButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { play: false };
  }

  render() {
    if (this.state.play) {
      // Firefox 58, Fedora 27 doesn't support MP3's? Works on Chrome.
      var audio = new Audio('sounds/Soft_and_Furious_-_09_-_Horizon_Ending.mp3');
      audio.play();
      return 'Play the sound.';
    }

    return e(
      'button',
      { onClick: () => this.setState({ play: true }) },
      'Sound 1'
    );
  }
}

const domContainer = document.querySelector('#sound_button_container');
ReactDOM.render(e(SoundButton), domContainer);