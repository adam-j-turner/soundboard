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
    // var _this = this
    // this.interval = setInterval(
    //   function() {
    //     _this.setState({
    //       progress: _this.currentAudio.currentTime * 100 / _this.currentAudio.duration
    //     })
    //   },
    //   30
    // )
  }

  stopProgress() {
    // clearInterval(this.interval)
    // this.setState({progress: 0})
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
          <PanelColumn alignItems='flex-end'>
            <ButtonPanel title='Locations' direction='column' alignItems='flex-start'>
              <SoundButton 
                text='St. Louis' size='small'
                description='St. Louis'
                audioPath='locations/st_louis_1.mp3'
                onClick={this.handleSoundButtonClick}
              />
              <SoundButton 
                text='389 Park Ave' size='small'
                description='389 Park Avenue'
                audioPath='locations/389_park_avenue.mp3'
                onClick={this.handleSoundButtonClick}
              />
            </ButtonPanel>
            <ButtonPanel title='Money' direction='column' alignItems='flex-start'>
              <SoundButton 
                text="What'd that cost?" size='small'
                description="What'd that cost me?"
                audioPath='money/whatd_that_cost_me.mp3'
                onClick={this.handleSoundButtonClick}
              />
            </ButtonPanel>
            <ButtonPanel title='Colors' direction='column' alignItems='flex-start'>
              <SoundButton 
                text='GYRW&B' size='small'
                description='Green, Yellow, Red White & Blue'
                audioPath='colors/colors.mp3'
                onClick={this.handleSoundButtonClick}
              />
            </ButtonPanel>
            <ButtonPanel title='Finish' direction='row' alignItems='flex-start' maxWidth='250px'>
              <SoundButton 
                text='Cancel' size='small'
                description='Cancel whatever I had.'
                audioPath='finish/cancel_whatever.mp3'
                onClick={this.handleSoundButtonClick}
              />
              <SoundButton 
                text="That's all" size='small'
                description="That's all"
                audioPath='finish/thats_all.mp3'
                onClick={this.handleSoundButtonClick}
              />
              <MultiButton
                text='Drop it' size='small'
                options = {[
                  {text: "..It's policy", description: "Drop it, it's policy.", 
                    audioPath: 'finish/drop_it_its_policy.mp3', default: true},
                  {text: '..or find yourself a ride', description: 'Drop it or find yourself a ride home', 
                    audioPath: 'finish/drop_it_or_find_yourself_a_ride.mp3'}
                ]}
                onMouseUp={this.handleSoundButtonClick}
                ref={(mb) => this.multiButtons.push(mb)}
              />
              <SoundButton 
                text="Gettin kinda late" size='small'
                description="It's gettin kinda late, I think I'll sleep out here"
                audioPath='finish/gettin_kinda_late.mp3'
                onClick={this.handleSoundButtonClick}
              />
            </ButtonPanel>
          </PanelColumn>

          {/* Column 2 */}
          <PanelColumn>
            <ButtonPanel
              title='Names' direction='row' spacing={1}
              alignItems='flex-start' maxWidth='200px'
            >
              <MultiButton
                text='David' size='small'
                options = {[
                  {text: '1', description: 'David', audioPath: 'names/david_1.mp3', default: true},
                  {text: '2', description: 'David', audioPath: 'names/david_2.mp3'},
                  {text: '3', description: 'David', audioPath: 'names/david_3.mp3'},
                  {text: '4', description: 'David', audioPath: 'names/david_4.mp3'},
                  {text: '5', description: 'David', audioPath: 'names/david_5.mp3'},
                  {text: '6', description: 'David', audioPath: 'names/david_6.mp3'},
                  {text: '7', description: 'David', audioPath: 'names/david_7.mp3'},
                  {text: '8', description: 'David', audioPath: 'names/david_8.mp3'},
                  {text: '9 (loud)', description: 'DAVID! (loud)', audioPath: 'names/david_9_loud.mp3'}
                ]}
                onMouseUp={this.handleSoundButtonClick}
                ref={(mb) => this.multiButtons.push(mb)}
              />
              <MultiButton
                text='Harvey' size='small'
                options = {[
                  {text: '1', description: 'Harvey', audioPath: 'names/harvey_1.mp3', default: true},
                  {text: '2', description: 'Harvey', audioPath: 'names/harvey_2.mp3'}
                ]}
                onMouseUp={this.handleSoundButtonClick}
                ref={(mb) => this.multiButtons.push(mb)}
              />
              <MultiButton
                text='Richard' size='small'
                options = {[
                  {text: '1', description: 'Richard', audioPath: 'names/richard_1.mp3', default: true},
                  {text: '2', description: 'Richard', audioPath: 'names/richard_2.mp3'}
                ]}
                onMouseUp={this.handleSoundButtonClick}
                ref={(mb) => this.multiButtons.push(mb)}
              />
              <MultiButton
                text='Ron' size='small'
                options = {[
                  {text: '1', description: 'Ron', audioPath: 'names/ron_1.mp3', default: true},
                  {text: '2', description: 'Ron', audioPath: 'names/ron_2.mp3'}
                ]}
                onMouseUp={this.handleSoundButtonClick}
                ref={(mb) => this.multiButtons.push(mb)}
              />
              <MultiButton
                text='Elizabeth' size='small'
                options = {[
                  {text: '1', description: 'Elizabeth', audioPath: 'names/elizabeth_1.mp3', default: true},
                  {text: '2', description: 'Elizabeth', audioPath: 'names/elizabeth_2.mp3'}
                ]}
                onMouseUp={this.handleSoundButtonClick}
                ref={(mb) => this.multiButtons.push(mb)}
              />
              <SoundButton 
                text='Bojangles' size='small'
                description='Bojangles'
                audioPath='names/bojangles.mp3'
                onClick={this.handleSoundButtonClick}
              />
              <SoundButton 
                text='Chuck' size='small'
                description='Chuck'
                audioPath='names/chuck.mp3'
                onClick={this.handleSoundButtonClick}
              />
              <SoundButton 
                text='Clive Driscoll' size='small'
                description='Clive Driscoll'
                audioPath='names/clive_driscoll.mp3'
                onClick={this.handleSoundButtonClick}
              />
              <SoundButton 
                text='Devlin Macgregor' size='small'
                description='Devlin Macgregor'
                audioPath='names/devlin_macgregor.mp3'
                onClick={this.handleSoundButtonClick}
              />
              <SoundButton 
                text='Frank' size='small'
                description='Frank'
                audioPath='names/frank.mp3'
                onClick={this.handleSoundButtonClick}
              />
              <SoundButton 
                text='Linus' size='small'
                description='Linus'
                audioPath='names/linus.mp3'
                onClick={this.handleSoundButtonClick}
              />
              <SoundButton 
                text='Matthew Zelick' size='small'
                description='Matthew Zelick'
                audioPath='names/matthew_zelick.mp3'
                onClick={this.handleSoundButtonClick}
              />
              <MultiButton
                text='Patrick' size='small'
                options = {[
                  {text: 'Patrick', description: 'Patrick', audioPath: 'names/patrick_1.mp3', default: true},
                  {text: 'Patrick Tyson', description: 'Elizabeth', audioPath: 'names/patrick_tyson_1.mp3'}
                ]}
                onMouseUp={this.handleSoundButtonClick}
                ref={(mb) => this.multiButtons.push(mb)}
              />
              <SoundButton 
                text='This is Marshall' size='small'
                description='This is Marshall'
                audioPath='names/this_is_marshall.mp3'
                onClick={this.handleSoundButtonClick}
              />
            </ButtonPanel>
            <ButtonPanel 
              title='Numbers' direction='row' spacing={1}
              alignItems='flex-start' maxWidth='200px'>
              <SoundButton 
                text='48' size='small'
                description='Forty-eight'
                audioPath='numbers/48.mp3'
                onClick={this.handleSoundButtonClick}
              />
              <SoundButton 
                text='100k' size='small'
                description='One-hundred-thousand'
                audioPath='numbers/100k.mp3'
                onClick={this.handleSoundButtonClick}
              />
              <SoundButton 
                text='200k' size='small'
                description='Two-hundred-thousand'
                audioPath='numbers/200k.mp3'
                onClick={this.handleSoundButtonClick}
              />
              <SoundButton 
                text='1 million' size='small'
                description='One-million'
                audioPath='numbers/a_million.mp3'
                onClick={this.handleSoundButtonClick}
              />
              <SoundButton 
                text='2-niner-0' size='small'
                description='Two-niner-zero'
                audioPath='numbers/two_niner_zero.mp3'
                onClick={this.handleSoundButtonClick}
              />
              <SoundButton 
                text='We got 5' size='small'
                description='We got five'
                audioPath='numbers/we_got_five.mp3'
                onClick={this.handleSoundButtonClick}
              />
              <SoundButton 
                text='25 yrs' size='small'
                description='Twenty-five years'
                audioPath='numbers/25_years.mp3'
                onClick={this.handleSoundButtonClick}
              />
            </ButtonPanel>
          </PanelColumn>

          {/* Column 3 */}
          <PanelColumn alignItems='center'>
            <ButtonPanel title='Call related' direction='column' alignItems='flex-start'>
              <SoundButton 
                text='Can you talk?' size='small'
                audioPath='call/can_you_talk.mp3'
                onClick={this.handleSoundButtonClick}
              />
              <SoundButton 
                text='Got a minute?' size='small'
                audioPath='call/got_a_minute.mp3'
                onClick={this.handleSoundButtonClick}
              />
              <SoundButton 
                text='SPEAK!' size='small'
                audioPath='call/speak.mp3'
                onClick={this.handleSoundButtonClick}
              />
              <SoundButton 
                text='Take me off speaker' size='small'
                description='Take me off the GD speakerphone!'
                audioPath='call/take_me_off_speakerphone.mp3'
                onClick={this.handleSoundButtonClick}
              />
              <MultiButton
                text='Trace the call'
                size='small'
                options = {[
                  {text: '1', description: 'Trace the call.. follow your standard security procedures', 
                    audioPath: 'call/trace_the_call.mp3', default: true},
                  {text: '2', description: 'Trace the GD call!', audioPath: 'call/trace_the_call_2.mp3'}
                ]}
                onMouseUp={this.handleSoundButtonClick}
                ref={(mb) => this.multiButtons.push(mb)}
              />
            </ButtonPanel>
            <ButtonPanel title="'You'" direction='column' alignItems='flex-start'>
              <SoundButton 
                  text='U told me so' size='small'
                  description='You told me so yourself.'
                  audioPath='you/you_told_me_so_yourself.mp3'
                  onClick={this.handleSoundButtonClick}
                />
              <SoundButton 
                text="'member what u told me?" size='small'
                description='Remember what you told me?'
                audioPath='you/remember_what_you_told_me.mp3'
                onClick={this.handleSoundButtonClick}
              />
              <MultiButton
                text='You said'
                options = {[
                  {text: '1', description: 'You said', audioPath: 'you/you_said_1.mp3', default: true},
                  {text: '2', description: 'You said', audioPath: 'you/you_said_2.mp3'}
                ]}
                onMouseUp={this.handleSoundButtonClick}
                ref={(mb) => this.multiButtons.push(mb)}
              />
              <SoundButton 
                text='U begged me' size='small'
                description='You begged me'
                audioPath='you/you_begged_me.mp3'
                onClick={this.handleSoundButtonClick}
              />
              <SoundButton 
                text='U should be' size='small'
                description='You should be'
                audioPath='you/you_should_be.mp3'
                onClick={this.handleSoundButtonClick}
              />
              <SoundButton 
                text='U r upset' size='small'
                description="You're upset"
                audioPath='you/youre_upset.mp3'
                onClick={this.handleSoundButtonClick}
              />
              <SoundButton 
                text='U r a linguist' size='small'
                description="You're quite a linguist"
                audioPath='you/youre_quite_a_linguist.mp3'
                onClick={this.handleSoundButtonClick}
              />
            </ButtonPanel>
          </PanelColumn>

          {/* Column 4 */}
          <PanelColumn direction='row' maxWidth='535px' justify='flex-start'>
            <ButtonPanel title='Greetings' justify='flex-start' maxWidth='320px'>
              <MultiButton
                text='Hello' size='Large'
                options = {[
                  {text: '1', description: 'Helloo?', audioPath: 'greetings/hello_1.mp3', default: true},
                  {text: '2', description: 'Hello?', audioPath: 'greetings/hello_2.mp3'},
                  {text: '3', description: 'HELLO!', audioPath: 'greetings/hello_3.mp3'},
                  {text: '4', description: 'HELLO!?', audioPath: 'greetings/af1_hello_1.mp3'},
                  {text: '5', description: 'Hello... is anyone there?', audioPath: 'greetings/af1_hello_2.mp3'}
                ]}
                onMouseUp={this.handleSoundButtonClick}
                ref={(mb) => this.multiButtons.push(mb)}
              />
              <MultiButton
                text='Anyone there?'
                options = {[
                  {text: '1', description: 'Anybody there?', audioPath: 'greetings/anybody_there.mp3', default: true},
                  {text: '2', description: 'Anyone there? (1)', audioPath: 'greetings/anyone_there_1.mp3'},
                  {text: '3', description: 'Anyone there? (2)', audioPath: 'greetings/anyone_there_2.mp3'},
                  {text: '4', description: 'Still there?', audioPath: 'greetings/are_you_still_there.mp3'}
                ]}
                onMouseUp={this.handleSoundButtonClick}
                ref={(mb) => this.multiButtons.push(mb)}
              />
              <SoundButton 
                text='Good morning' size='small'
                audioPath='greetings/good_morning.mp3'
                onClick={this.handleSoundButtonClick}
              />
            </ButtonPanel>
            <ButtonPanel title='Agree / Disagree' maxWidth='220px'>
              <MultiButton
                text='Yes' size='Large'
                options = {[
                  {text: 'Yeah 1', description: 'Yeah (1)', audioPath: 'agree/yeah_1.mp3', default: true},
                  {text: 'Yeah 2', description: 'Yeah (2)', audioPath: 'agree/yeah_2.mp3', }
                ]}
                onMouseUp={this.handleSoundButtonClick}
                ref={(mb) => this.multiButtons.push(mb)}
              />
              <MultiButton
                text='Okay'
                options = {[
                  {text: 'Okay 1', description: 'Okay (1)', audioPath: 'agree/okay_1.mp3', default: true},
                  {text: 'Okay 2', description: 'Okay (2)', audioPath: 'agree/okay_2.mp3', },
                  {text: 'Alright', description: 'Alright', audioPath: 'agree/alright.mp3', }
                ]}
                onMouseUp={this.handleSoundButtonClick}
                ref={(mb) => this.multiButtons.push(mb)}
              />
              <MultiButton
                text='No' size='Large'
                options = {[
                  {text: '1', description: 'No', audioPath: 'disagree/no_1.mp3', default: true},
                  {text: '2', description: 'No', audioPath: 'disagree/no_2.mp3'},
                  {text: '3', description: 'No', audioPath: 'disagree/no_3.mp3'},
                  {text: '4', description: 'No (angry)', audioPath: 'disagree/no_4.mp3'}
                ]}
                onMouseUp={this.handleSoundButtonClick}
                ref={(mb) => this.multiButtons.push(mb)}
              />
              <MultiButton
                text='Agree'
                options = {[
                  {text: 'Of course', description: 'Of Course', audioPath: 'agree/of_course.mp3', default: true},
                  {text: "You're right", description: "You're right", audioPath: 'agree/youre_right.mp3', },
                  {text: "Got it", description: "Got it", audioPath: 'agree/got_it.mp3', },
                  {text: "I'll do it 1", description: "I'll do it (1)", audioPath: 'agree/ill_do_it_1.mp3', },
                  {text: "I'll do it 2", description: "I'll do it (2)", audioPath: 'agree/ill_do_it_2.mp3', }
                ]}
                onMouseUp={this.handleSoundButtonClick}
                ref={(mb) => this.multiButtons.push(mb)}
              />
            </ButtonPanel>
            <ButtonPanel title='Stall / Mumble' justify='flex-start' maxWidth='530px'>
              <MultiButton
                text='Uhh'
                options = {[
                  {text: 'Uhh 1', description: 'Uhh', audioPath: 'stall/uhh_1.mp3', default: true},
                  {text: 'Uhh 2', description: 'Uhh', audioPath: 'stall/uhh_2.mp3'},
                  {text: 'Uhh 3', description: 'Uhh', audioPath: 'stall/uhh_3.mp3'}
                ]}
                onMouseUp={this.handleSoundButtonClick}
                ref={(mb) => this.multiButtons.push(mb)}
              />
              <MultiButton
                text='Hang on'
                options = {[
                  {text: 'Hang on 1', description: 'Hang on', audioPath: 'stall/hang_on_1.mp3', default: true},
                  {text: 'Hang on 2', description: 'Hang on', audioPath: 'stall/hang_on_2.mp3'},
                  {text: 'You just hang on', description: 'You just hang on', audioPath: 'stall/you_just_hang_on.mp3'}
                ]}
                onMouseUp={this.handleSoundButtonClick}
                ref={(mb) => this.multiButtons.push(mb)}
              />
              <MultiButton
                text='Mumble'
                options = {[
                  {text: 'Mumbling 1', description: 'insert better desc', audioPath: 'stall/mumbling_1.mp3', default: true},
                  {text: 'Mumbling 2', description: 'insert better desc', audioPath: 'stall/mumbling_2.mp3'}
                ]}
                onMouseUp={this.handleSoundButtonClick}
                ref={(mb) => this.multiButtons.push(mb)}
              />
              <SoundButton 
                text='Give me a few moments' size='small'
                description='Give me a few moments'
                audioPath='stall/give_me_a_few_moments.mp3'
                onClick={this.handleSoundButtonClick}
              />
              <SoundButton 
                text='Give me a minute alone' size='small'
                description='Give me a minute alone'
                audioPath='stall/give_me_a_minute_alone.mp3'
                onClick={this.handleSoundButtonClick}
              />
              <SoundButton 
                text='Ok listen..' size='small'
                description='Ok listen.. uhh..'
                audioPath='stall/ok_listen_uhh.mp3'
                onClick={this.handleSoundButtonClick}
              />
              <SoundButton 
                text="Let's not waste time" size='small'
                description="Let's not waste anymore time"
                audioPath='stall/lets_not_waste_any_more_time.mp3'
                onClick={this.handleSoundButtonClick}
              />
            </ButtonPanel>
            <ButtonPanel title='Questions 1' justify='flex-start' maxWidth='310px'>
              <MultiButton
                text='What?'
                options = {[
                  {text: 'What? 1', description: 'What?', audioPath: 'questions/what_1.mp3', default: true},
                ]}
                onMouseUp={this.handleSoundButtonClick}
                ref={(mb) => this.multiButtons.push(mb)}
              />
              <SoundButton 
                text="What, how?" size='small'
                audioPath='questions/what_how.mp3'
                onClick={this.handleSoundButtonClick}
              />
              <SoundButton 
                text="What do u mean?" size='small'
                audioPath='questions/what_do_you_mean_1.mp3'
                onClick={this.handleSoundButtonClick}
              />
              <SoundButton 
                text="What's that?" size='small'
                audioPath='questions/whats_that.mp3'
                onClick={this.handleSoundButtonClick}
              />
              <SoundButton 
                text="What do u want?" size='small'
                audioPath='questions/what_do_you_want.mp3'
                onClick={this.handleSoundButtonClick}
              />
              <SoundButton 
                text="What is it?" size='small'
                audioPath='questions/what_is_it.mp3'
                onClick={this.handleSoundButtonClick}
              />
              <SoundButton 
                text="What's problem?" size='small'
                audioPath='questions/whats_the_problem.mp3'
                onClick={this.handleSoundButtonClick}
              />
              <SoundButton 
                text="What u expect me to do?" size='small'
                audioPath='questions/what_do_you_expect_me_to_do.mp3'
                onClick={this.handleSoundButtonClick}
              />
              <SoundButton 
                text="Do u see pattern?" size='small'
                audioPath='questions/do_you_not_see_a_pattern_here.mp3'
                onClick={this.handleSoundButtonClick}
              />
            </ButtonPanel>
            <ButtonPanel title='Questions 2' justify='flex-start' maxWidth='220px'>
              <MultiButton
                text='Why?'
                options = {[
                  {text: 'Why? 1', description: 'Why?', audioPath: 'questions/why_1.mp3', default: true},
                  {text: 'Why? (angry)', description: 'Why? (angry)', audioPath: 'questions/why_angry.mp3'}
                ]}
                onMouseUp={this.handleSoundButtonClick}
                ref={(mb) => this.multiButtons.push(mb)}
              />
              <SoundButton 
                text="Why not?" size='small'
                audioPath='questions/why_not.mp3'
                onClick={this.handleSoundButtonClick}
              />
              <SoundButton 
                text="R U kidding?" size='small'
                audioPath='questions/youre_kidding_right.mp3'
                onClick={this.handleSoundButtonClick}
              />
              <SoundButton 
                text="A lot to ask?" size='small'
                audioPath='questions/is_that_a_lot_to_ask.mp3'
                onClick={this.handleSoundButtonClick}
              />
              <SoundButton 
                text="Tactical options?" size='small'
                audioPath='questions/what_are_our_tactical_options.mp3'
                onClick={this.handleSoundButtonClick}
              />
            </ButtonPanel>
          </PanelColumn>

          {/* Column 5 */}
          <PanelColumn>
            <ButtonPanel title='Angry' direction='row' justify='flex-start' maxWidth='250px'>
              <MultiButton
                text='Curse'
                options = {[
                  {text: 'Shit', description: 'Shit...', audioPath: 'angry/shit.mp3', default: true},
                  {text: 'Christ', description: 'Christ', audioPath: 'angry/christ_1.mp3'}
                ]}
                onMouseUp={this.handleSoundButtonClick}
                ref={(mb) => this.multiButtons.push(mb)}
              />
              <SoundButton 
                text="R U an idiot?" size='small'
                audioPath='angry/are_you_an_idiot.mp3'
                onClick={this.handleSoundButtonClick}
              />
              <SoundButton 
                text="How dare U" size='small'
                audioPath='angry/how_dare_you_1.mp3'
                onClick={this.handleSoundButtonClick}
              />
              <SoundButton 
                text="He's an idiot" size='small'
                audioPath='angry/hes_an_idiot.mp3'
                onClick={this.handleSoundButtonClick}
              />
              <SoundButton 
                text="Christ hurry up" size='small'
                audioPath='angry/christ_hurry_up.mp3'
                onClick={this.handleSoundButtonClick}
              />
              <SoundButton 
                text="LIE!" size='small'
                audioPath='angry/LIE.mp3'
                onClick={this.handleSoundButtonClick}
              />
              <SoundButton 
                text="My life makes ur life possible" size='small'
                audioPath='angry/my_life_makes_your_life_possible.mp3'
                onClick={this.handleSoundButtonClick}
              />
              <SoundButton 
                text="Burn in hell" size='small'
                audioPath='angry/burn_in_hell.mp3'
                onClick={this.handleSoundButtonClick}
              />
              <SoundButton 
                text="I could Burn in hell" size='small'
                audioPath='angry/i_could_burn_in_hell.mp3'
                onClick={this.handleSoundButtonClick}
              />
              <SoundButton 
                text="Don't ask me for ..." size='small'
                audioPath='angry/dont_ask_me_for_something_i_cant_give.mp3'
                onClick={this.handleSoundButtonClick}
              />
            </ButtonPanel>
            <ButtonPanel title='Sorry' direction='row' justify='flex-start' maxWidth='250px'>
              <MultiButton
                text='Sorry'
                options = {[
                  {text: 'Sorry', description: "I'm sorry", audioPath: 'apologies/im_sorry.mp3', default: true},
                  {text: 'Terribly sorry', description: "I'm terrible sorry", audioPath: 'apologies/im_terribly_sorry.mp3'},
                  {text: 'Sorry, made mistake', description: "I'm sorry I made a mistake", 
                    audioPath: 'apologies/im_sorry_made_a_mistake.mp3'},
                ]}
                onMouseUp={this.handleSoundButtonClick}
                ref={(mb) => this.multiButtons.push(mb)}
              />
              <SoundButton 
                text="Wish I could .." size='small'
                audioPath='apologies/i_wish_i_could.mp3'
                onClick={this.handleSoundButtonClick}
              />
              <SoundButton 
                text="Almost forgot" size='small'
                audioPath='apologies/oh_i_almost_forgot.mp3'
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
