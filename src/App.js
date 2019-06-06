import React from 'react';
import Grid from '@material-ui/core/Grid'
import PanelColumn from './PanelColumn.js';
import ButtonPanel from './ButtonPanel.js';
import MultiButton from './MultiButton.js';
import SoundButton from './SoundButton.js';
import { Line } from 'rc-progress';
import _ from "lodash";
import './App.css';

class Container extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      progress: 0,
      playing: false
    }

    this.multiButtons = []

    this.audio = this.importBulk(require.context('./sounds', true, /\.(wav|mp3)$/))

    this.currentAudio = null
    this.playing = false
    this.interval = null

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
      .filter(mb => mb != null)
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
        </div>

        {/* Main grid */}
        {/* TODO: Place this grid in its own file */}
        <Grid
          container
          className="MainGrid"
          direction="row"
          justify="center"
          alignItems="flex-start"
          spacing={1}
        >
          {/* Column 1 */}
          <PanelColumn>
            <ButtonPanel
              title='Names' direction='row' spacing={1}
              alignItems='flex-start' maxWidth='200px'
            >
              <MultiButton
                text='David' size='small'
                options = {[
                  {text: '1', description: 'David', audioPath: 'names/david_1.wav', default: true},
                  {text: '2', description: 'David', audioPath: 'names/david_2.wav'},
                  {text: '3', description: 'David', audioPath: 'names/david_3.wav'},
                  {text: '4', description: 'David', audioPath: 'names/david_4.wav'},
                  {text: '5', description: 'David', audioPath: 'names/david_5.wav'},
                  {text: '6', description: 'David', audioPath: 'names/david_6.wav'},
                  {text: '7', description: 'David', audioPath: 'names/david_7.wav'},
                  {text: '8', description: 'David', audioPath: 'names/david_8.wav'},
                  {text: '9 (loud)', description: 'DAVID! (loud)', audioPath: 'names/david_9_loud.wav'}
                ]}
                onMouseUp={this.handleSoundButtonClick}
                ref={(mb) => this.multiButtons.push(mb)}
              />
              <MultiButton
                text='Harvey' size='small'
                options = {[
                  {text: '1', description: 'Harvey', audioPath: 'names/harvey_1.wav', default: true},
                  {text: '2', description: 'Harvey', audioPath: 'names/harvey_2.wav'}
                ]}
                onMouseUp={this.handleSoundButtonClick}
                ref={(mb) => this.multiButtons.push(mb)}
              />
              <MultiButton
                text='Richard' size='small'
                options = {[
                  {text: '1', description: 'Richard', audioPath: 'names/richard_1.wav', default: true},
                  {text: '2', description: 'Richard', audioPath: 'names/richard_2.wav'}
                ]}
                onMouseUp={this.handleSoundButtonClick}
                ref={(mb) => this.multiButtons.push(mb)}
              />
              <MultiButton
                text='Ron' size='small'
                options = {[
                  {text: '1', description: 'Ron', audioPath: 'names/ron_1.wav', default: true},
                  {text: '2', description: 'Ron', audioPath: 'names/ron_2.wav'}
                ]}
                onMouseUp={this.handleSoundButtonClick}
                ref={(mb) => this.multiButtons.push(mb)}
              />
              <MultiButton
                text='Elizabeth' size='small'
                options = {[
                  {text: '1', description: 'Elizabeth', audioPath: 'names/elizabeth_1.wav', default: true},
                  {text: '2', description: 'Elizabeth', audioPath: 'names/elizabeth_2.wav'}
                ]}
                onMouseUp={this.handleSoundButtonClick}
                ref={(mb) => this.multiButtons.push(mb)}
              />
              <SoundButton 
                text='Bojangles' size='small'
                description='Bojangles'
                audioPath='names/bojangles.wav'
                onClick={this.handleSoundButtonClick}
              />
              <SoundButton 
                text='Chuck' size='small'
                description='Chuck'
                audioPath='names/chuck.wav'
                onClick={this.handleSoundButtonClick}
              />
              <SoundButton 
                text='Clive Driscoll' size='small'
                description='Clive Driscoll'
                audioPath='names/clive_driscoll.wav'
                onClick={this.handleSoundButtonClick}
              />
              <SoundButton 
                text='Devlin Macgregor' size='small'
                description='Devlin Macgregor'
                audioPath='names/devlin_macgregor.wav'
                onClick={this.handleSoundButtonClick}
              />
              <SoundButton 
                text='Frank' size='small'
                description='Frank'
                audioPath='names/frank.wav'
                onClick={this.handleSoundButtonClick}
              />
              <SoundButton 
                text='Linus' size='small'
                description='Linus'
                audioPath='names/linus.wav'
                onClick={this.handleSoundButtonClick}
              />
              <SoundButton 
                text='Matthew Zelick' size='small'
                description='Matthew Zelick'
                audioPath='names/matthew_zelick.wav'
                onClick={this.handleSoundButtonClick}
              />
              <MultiButton
                text='Patrick' size='small'
                options = {[
                  {text: 'Patrick', description: 'Patrick', audioPath: 'names/patrick_1.wav', default: true},
                  {text: 'Patrick Tyson', description: 'Elizabeth', audioPath: 'names/patrick_tyson_1.wav'}
                ]}
                onMouseUp={this.handleSoundButtonClick}
                ref={(mb) => this.multiButtons.push(mb)}
              />
              <SoundButton 
                text='This is Marshall' size='small'
                description='This is Marshall'
                audioPath='names/this_is_marshall.wav'
                onClick={this.handleSoundButtonClick}
              />
            </ButtonPanel>
            <ButtonPanel 
              title='Numbers' direction='row' spacing={1}
              alignItems='flex-start' maxWidth='200px'>
              <SoundButton 
                text='48' size='small'
                description='Forty-eight'
                audioPath='numbers/48.wav'
                onClick={this.handleSoundButtonClick}
              />
              <SoundButton 
                text='100k' size='small'
                description='One-hundred-thousand'
                audioPath='numbers/100k.wav'
                onClick={this.handleSoundButtonClick}
              />
              <SoundButton 
                text='200k' size='small'
                description='Two-hundred-thousand'
                audioPath='numbers/200k.wav'
                onClick={this.handleSoundButtonClick}
              />
              <SoundButton 
                text='1 million' size='small'
                description='One-million'
                audioPath='numbers/a_million.wav'
                onClick={this.handleSoundButtonClick}
              />
              <SoundButton 
                text='2-niner-0' size='small'
                description='Two-niner-zero'
                audioPath='numbers/two_niner_zero.wav'
                onClick={this.handleSoundButtonClick}
              />
              <SoundButton 
                text='We got 5' size='small'
                description='We got five'
                audioPath='numbers/we_got_five.wav'
                onClick={this.handleSoundButtonClick}
              />
              <SoundButton 
                text='25 yrs' size='small'
                description='Twenty-five years'
                audioPath='numbers/25_years.wav'
                onClick={this.handleSoundButtonClick}
              />
            </ButtonPanel>
          </PanelColumn>
          {/* Column 2 */}
          <PanelColumn>
            <ButtonPanel title='Call related' direction='column' alignItems='flex-start'>
              <SoundButton 
                text='Can you talk?' size='small'
                audioPath='call/can_you_talk.wav'
                onClick={this.handleSoundButtonClick}
              />
              <SoundButton 
                text='Got a minute?' size='small'
                audioPath='call/got_a_minute.wav'
                onClick={this.handleSoundButtonClick}
              />
              <SoundButton 
                text='SPEAK!' size='small'
                audioPath='call/speak.wav'
                onClick={this.handleSoundButtonClick}
              />
              <SoundButton 
                text='Take me off speaker' size='small'
                description='Take me off the GD speakerphone!'
                audioPath='call/take_me_off_speakerphone.wav'
                onClick={this.handleSoundButtonClick}
              />
              <MultiButton
                text='Trace the call'
                size='small'
                options = {[
                  {text: '1', description: 'Trace the call.. follow your standard security procedures', 
                    audioPath: 'call/trace_the_call.wav', default: true},
                  {text: '2', description: 'Trace the GD call!', audioPath: 'call/trace_the_call_2.wav'}
                ]}
                onMouseUp={this.handleSoundButtonClick}
                ref={(mb) => this.multiButtons.push(mb)}
              />
            </ButtonPanel>
          </PanelColumn>

          {/* Column 3 */}
          <PanelColumn direction='row' maxWidth='660px' justify='flex-start'>
            <ButtonPanel title='Greetings' justify='flex-start' maxWidth='320px'>
              <MultiButton
                text='Hello' size='Large'
                options = {[
                  {text: '1', description: 'Helloo?', audioPath: 'greetings/hello_1.wav', default: true},
                  {text: '2', description: 'Hello?', audioPath: 'greetings/hello_2.wav'},
                  {text: '3', description: 'HELLO!', audioPath: 'greetings/hello_3.wav'},
                  {text: '4', description: 'HELLO!?', audioPath: 'greetings/af1_hello_1.wav'},
                  {text: '5', description: 'Hello... is anyone there?', audioPath: 'greetings/af1_hello_2.wav'}
                ]}
                onMouseUp={this.handleSoundButtonClick}
                ref={(mb) => this.multiButtons.push(mb)}
              />
              <MultiButton
                text='Anyone there?'
                options = {[
                  {text: '1', description: 'Anybody there?', audioPath: 'greetings/anybody_there.wav', default: true},
                  {text: '2', description: 'Anyone there? (1)', audioPath: 'greetings/anyone_there_1.wav'},
                  {text: '3', description: 'Anyone there? (2)', audioPath: 'greetings/anyone_there_2.wav'},
                  {text: '4', description: 'Still there?', audioPath: 'greetings/are_you_still_there.wav'}
                ]}
                onMouseUp={this.handleSoundButtonClick}
                ref={(mb) => this.multiButtons.push(mb)}
              />
              <SoundButton 
                text='Good morning' size='small'
                audioPath='greetings/good_morning.wav'
                onClick={this.handleSoundButtonClick}
              />
            </ButtonPanel>
            <ButtonPanel title='Agree / Disagree' maxWidth='220px'>
              <MultiButton
                text='Yes' size='Large'
                options = {[
                  {text: 'Yeah 1', description: 'Yeah (1)', audioPath: 'agree/yeah_1.wav', default: true},
                  {text: 'Yeah 2', description: 'Yeah (2)', audioPath: 'agree/yeah_2.wav', }
                ]}
                onMouseUp={this.handleSoundButtonClick}
                ref={(mb) => this.multiButtons.push(mb)}
              />
              <MultiButton
                text='Okay'
                options = {[
                  {text: 'Okay 1', description: 'Okay (1)', audioPath: 'agree/okay_1.wav', default: true},
                  {text: 'Okay 2', description: 'Okay (2)', audioPath: 'agree/okay_2.wav', },
                  {text: 'Alright', description: 'Alright', audioPath: 'agree/alright.wav', }
                ]}
                onMouseUp={this.handleSoundButtonClick}
                ref={(mb) => this.multiButtons.push(mb)}
              />
              <MultiButton
                text='No' size='Large'
                options = {[
                  {text: '1', description: 'No', audioPath: 'disagree/no_1.wav', default: true},
                  {text: '2', description: 'No', audioPath: 'disagree/no_2.wav'},
                  {text: '3', description: 'No', audioPath: 'disagree/no_3.wav'},
                  {text: '4', description: 'No (angry)', audioPath: 'disagree/no_4.wav'}
                ]}
                onMouseUp={this.handleSoundButtonClick}
                ref={(mb) => this.multiButtons.push(mb)}
              />
              <MultiButton
                text='Agree'
                options = {[
                  {text: 'Of course', description: 'Of Course', audioPath: 'agree/of_course.wav', default: true},
                  {text: "You're right", description: "You're right", audioPath: 'agree/youre_right.wav', },
                  {text: "Got it", description: "Got it", audioPath: 'agree/got_it.wav', },
                  {text: "I'll do it 1", description: "I'll do it (1)", audioPath: 'agree/ill_do_it_1.wav', },
                  {text: "I'll do it 2", description: "I'll do it (2)", audioPath: 'agree/ill_do_it_2.wav', }
                ]}
                onMouseUp={this.handleSoundButtonClick}
                ref={(mb) => this.multiButtons.push(mb)}
              />
            </ButtonPanel>
            <ButtonPanel title='Stall / Mumble' justify='flex-start' maxWidth='530px'>
              <MultiButton
                text='Uhh'
                options = {[
                  {text: 'Uhh 1', description: 'Uhh', audioPath: 'stall/uhh_1.wav', default: true},
                  {text: 'Uhh 2', description: 'Uhh', audioPath: 'stall/uhh_2.wav'},
                  {text: 'Uhh 3', description: 'Uhh', audioPath: 'stall/uhh_3.wav'}
                ]}
                onMouseUp={this.handleSoundButtonClick}
                ref={(mb) => this.multiButtons.push(mb)}
              />
              <MultiButton
                text='Hang on'
                options = {[
                  {text: 'Hang on 1', description: 'Hang on', audioPath: 'stall/hang_on_1.wav', default: true},
                  {text: 'Hang on 2', description: 'Hang on', audioPath: 'stall/hang_on_2.wav'},
                  {text: 'You just hang on', description: 'You just hang on', audioPath: 'stall/you_just_hang_on.wav'}
                ]}
                onMouseUp={this.handleSoundButtonClick}
                ref={(mb) => this.multiButtons.push(mb)}
              />
              <MultiButton
                text='Mumble'
                options = {[
                  {text: 'Mumbling 1', description: 'insert better desc', audioPath: 'stall/mumbling_1.wav', default: true},
                  {text: 'Mumbling 2', description: 'insert better desc', audioPath: 'stall/mumbling_2.wav'}
                ]}
                onMouseUp={this.handleSoundButtonClick}
                ref={(mb) => this.multiButtons.push(mb)}
              />
              <SoundButton 
                text='Give me a few moments' size='small'
                description='Give me a few moments'
                audioPath='stall/give_me_a_few_moments.wav'
                onClick={this.handleSoundButtonClick}
              />
              <SoundButton 
                text='Give me a minute alone' size='small'
                description='Give me a minute alone'
                audioPath='stall/give_me_a_minute_alone.wav'
                onClick={this.handleSoundButtonClick}
              />
              <SoundButton 
                text='Ok listen..' size='small'
                description='Ok listen.. uhh..'
                audioPath='stall/ok_listen_uhh.wav'
                onClick={this.handleSoundButtonClick}
              />
              <SoundButton 
                text="Let's not waste time" size='small'
                description="Let's not waste anymore time"
                audioPath='stall/lets_not_waste_any_more_time.wav'
                onClick={this.handleSoundButtonClick}
              />
            </ButtonPanel>
            <ButtonPanel title='Questions 1' justify='flex-start' maxWidth='310px'>
              <MultiButton
                text='What?'
                options = {[
                  {text: 'What? 1', description: 'What?', audioPath: 'questions/what_1.wav', default: true},
                ]}
                onMouseUp={this.handleSoundButtonClick}
                ref={(mb) => this.multiButtons.push(mb)}
              />
              <SoundButton 
                text="What, how?" size='small'
                audioPath='questions/what_how.wav'
                onClick={this.handleSoundButtonClick}
              />
              <SoundButton 
                text="What do u mean?" size='small'
                audioPath='questions/what_do_you_mean_1.wav'
                onClick={this.handleSoundButtonClick}
              />
              <SoundButton 
                text="What's that?" size='small'
                audioPath='questions/whats_that.wav'
                onClick={this.handleSoundButtonClick}
              />
              <SoundButton 
                text="What do u want?" size='small'
                audioPath='questions/what_do_you_want.wav'
                onClick={this.handleSoundButtonClick}
              />
              <SoundButton 
                text="What is it?" size='small'
                audioPath='questions/what_is_it.wav'
                onClick={this.handleSoundButtonClick}
              />
              <SoundButton 
                text="What's problem?" size='small'
                audioPath='questions/whats_the_problem.wav'
                onClick={this.handleSoundButtonClick}
              />
              <SoundButton 
                text="What u expect me to do?" size='small'
                audioPath='questions/what_do_you_expect_me_to_do.wav'
                onClick={this.handleSoundButtonClick}
              />
              <SoundButton 
                text="Do u see pattern?" size='small'
                audioPath='questions/do_you_not_see_a_pattern_here.wav'
                onClick={this.handleSoundButtonClick}
              />
            </ButtonPanel>
            <ButtonPanel title='Questions 2' justify='flex-start' maxWidth='220px'>
              <MultiButton
                text='Why?'
                options = {[
                  {text: 'Why? 1', description: 'Why?', audioPath: 'questions/why_1.wav', default: true},
                  {text: 'Why? (angry)', description: 'Why? (angry)', audioPath: 'questions/why_angry.wav'}
                ]}
                onMouseUp={this.handleSoundButtonClick}
                ref={(mb) => this.multiButtons.push(mb)}
              />
              <SoundButton 
                text="Why not?" size='small'
                audioPath='questions/why_not.wav'
                onClick={this.handleSoundButtonClick}
              />
              <SoundButton 
                text="R U kidding?" size='small'
                audioPath='questions/youre_kidding_right.wav'
                onClick={this.handleSoundButtonClick}
              />
              <SoundButton 
                text="A lot to ask?" size='small'
                audioPath='questions/is_that_a_lot_to_ask.wav'
                onClick={this.handleSoundButtonClick}
              />
              <SoundButton 
                text="Tactical options?" size='small'
                audioPath='questions/what_are_our_tactical_options.wav'
                onClick={this.handleSoundButtonClick}
              />
            </ButtonPanel>
          </PanelColumn>
        </Grid>
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
