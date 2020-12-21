import React from 'react';
import Grid from '@material-ui/core/Grid'
import PanelColumn from './Components/PanelColumn.js';
import ButtonPanel from './Components/ButtonPanel.js';
import MultiButton from './Components/MultiButton.js';
import SoundButton from './Components/SoundButton.js';
import SoundButtonGroup from './Components/SoundButtonGroup.js';
import SoundButtonRandom from './Components/SoundButtonRandom.js';
import DrawerButton from './Components/DrawerButton.js';
import Footer from './Components/Footer.js';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp'

import './App.css';

class Container extends React.Component {
  constructor(props){
    super(props)

    this.multiButtons = []

    this.handleMouseUp = this.handleMouseUp.bind(this)
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
            <ButtonPanel title='Date/Time' direction='row' alignItems='flex-start' maxWidth='260px'>
              <MultiButton
                text='Tmrw'
                options = {[
                  {text: '1', description: 'Tomorrow.', audioPath: 'datetime/tomorrow_1.mp3', default: true},
                  {text: '2', description: 'Tomorrow.', audioPath: 'datetime/tomorrow_2.mp3'}
                ]}
                ref={(mb) => this.multiButtons.push(mb)}
              />
              <SoundButton 
                text='Morning' size='small' themeName='red'
                description='This morning'
                audioPath='datetime/this_morning.mp3'
              />
              <SoundButton
                text='Afternoon' size='small'
                description='This afternoon'
                audioPath='datetime/this_afternoon.mp3'
              />
              <SoundButton
                text='Wednesday' size='small'
                audioPath='datetime/wednesday.mp3'
              />
              <SoundButton
                text='A couple days' size='small'
                audioPath='datetime/a_couple_days.mp3'
              />
              <SoundButton
                text='Had appointment?' size='small'
                description='Did we have an appointment?'
                audioPath='datetime/did_we_have_an_appointment.mp3'
              />
              <SoundButton
                text='No idea what time' size='small'
                description='I have no idea what time it is'
                audioPath='datetime/i_have_no_idea_what_time_it_is.mp3'
              />
            </ButtonPanel>
            <ButtonPanel title='Locations' direction='row' alignItems='flex-start' maxWidth='240px'>
             <MultiButton
                text='Addresses'
                options = {[
                  {text: '15 Willaby Ln', description: '15 Willaby Lane', audioPath: 'locations/15_willaby_lane.mp3', default: true},
                  {text: '389 Park Ave', description: '389 Park Avenue', audioPath: 'locations/389_park_avenue.mp3'}
                ]}
                ref={(mb) => this.multiButtons.push(mb)}
              />
              <SoundButton 
                text='St. Louis' size='small' themeName='default'
                description='St. Louis'
                audioPath='locations/st_louis_1.mp3'
              />
              <MultiButton
                text='San Fran' size='small'
                options = {[
                  {text: 'San Francisco 1', description: 'San Francisco', audioPath: 'locations/san_francisco.mp3', default: true},
                  {text: 'San Francisco 2', description: 'San Francisco', audioPath: 'locations/san_francisco_2.mp3'}
                ]}
                ref={(mb) => this.multiButtons.push(mb)}
              />
              <SoundButton 
                text='Florida' size='small'
                description='Florida'
                audioPath='locations/florida.mp3'
              />
              <SoundButton 
                text='Meet me'
                description='Meet me here this evening'
                audioPath='locations/meet_me_here.mp3'
              />
            </ButtonPanel>
            <ButtonPanel title='Money' direction='row' alignItems='flex-start' maxWidth='240px'>
              <SoundButton 
                text="What'd that cost?" size='small'
                description="What'd that cost me?"
                audioPath='money/whatd_that_cost_me.mp3'
              />
              <SoundButton 
                text="$5k" size='small'
                description="$5000"
                audioPath='money/5k_dollars.mp3'
              />
              <SoundButton 
                text="$2 mil" size='small'
                description="$2 million"
                audioPath='money/2_million_dollars.mp3'
              />
            </ButtonPanel>
            <ButtonPanel title='Colors' direction='column' alignItems='flex-start'>
              <SoundButtonGroup
                options = {[
                  {text: 'Blu', audioPath: 'colors/blue.mp3'},
                  {text: 'Red', audioPath: 'colors/red.mp3'},
                  {text: 'Grn', audioPath: 'colors/green.mp3'},
                  {text: 'Ylw', audioPath: 'colors/yellow.mp3'}
                ]}
                onButtonClick={this.handleSoundButtonClick}
              />
              <SoundButton 
                text='GYRW&B' size='small'
                description='Green, Yellow, Red White & Blue'
                audioPath='colors/colors.mp3'
              />
            </ButtonPanel>
          </PanelColumn>

          {/* Column 2 */}
          <PanelColumn>
            <ButtonPanel
              title='Names' direction='row' spacing={1}
              alignItems='flex-start' maxWidth='530px'
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
                ref={(mb) => this.multiButtons.push(mb)}
              />
              <MultiButton
                text='Harvey' size='small'
                options = {[
                  {text: '1', description: 'Harvey', audioPath: 'names/harvey_1.mp3', default: true},
                  {text: '2', description: 'Harvey', audioPath: 'names/harvey_2.mp3'}
                ]}
                ref={(mb) => this.multiButtons.push(mb)}
              />
              <MultiButton
                text='Richard' size='small'
                options = {[
                  {text: '1', description: 'Richard', audioPath: 'names/richard_1.mp3', default: true},
                  {text: '2', description: 'Richard', audioPath: 'names/richard_2.mp3'}
                ]}
                ref={(mb) => this.multiButtons.push(mb)}
              />
              <MultiButton
                text='Ron' size='small'
                options = {[
                  {text: '1', description: 'Ron', audioPath: 'names/ron_1.mp3', default: true},
                  {text: '2', description: 'Ron', audioPath: 'names/ron_2.mp3'}
                ]}
                ref={(mb) => this.multiButtons.push(mb)}
              />
              <MultiButton
                text='Elizabeth' size='small'
                options = {[
                  {text: '1', description: 'Elizabeth', audioPath: 'names/elizabeth_1.mp3', default: true},
                  {text: '2', description: 'Elizabeth', audioPath: 'names/elizabeth_2.mp3'}
                ]}
                ref={(mb) => this.multiButtons.push(mb)}
              />
              <SoundButton 
                text='Bojangles' size='small'
                description='Bojangles'
                audioPath='names/bojangles.mp3'
              />
              <SoundButton 
                text='Chuck' size='small'
                description='Chuck'
                audioPath='names/chuck.mp3'
              />
              <SoundButton 
                text='Clive Driscoll' size='small'
                description='Clive Driscoll'
                audioPath='names/clive_driscoll.mp3'
              />
              <SoundButton 
                text='Devlin Macgregor' size='small'
                description='Devlin Macgregor'
                audioPath='names/devlin_macgregor.mp3'
              />
              <SoundButton 
                text='Frank' size='small'
                description='Frank'
                audioPath='names/frank.mp3'
              />
              <SoundButton 
                text='Linus' size='small'
                description='Linus'
                audioPath='names/linus.mp3'
              />
              <SoundButton 
                text='Matthew Zelick' size='small'
                description='Matthew Zelick'
                audioPath='names/matthew_zelick.mp3'
              />
              <MultiButton
                text='Patrick' size='small'
                options = {[
                  {text: 'Patrick', description: 'Patrick', audioPath: 'names/patrick_1.mp3', default: true},
                  {text: 'Patrick Tyson', description: 'Elizabeth', audioPath: 'names/patrick_tyson_1.mp3'}
                ]}
                ref={(mb) => this.multiButtons.push(mb)}
              />
              <SoundButtonRandom size='small'
                text='Chuck ?'
                fromList='names_last'
                delimiterAudioPath='names/chuck.mp3'
                delimiterIndices={[-1]}
                queueLength={1}
                onButtonClick={this.handleSoundButtonClick}
              />
              <SoundButtonRandom size='small'
                text='Patrick ?'
                fromList='names_last'
                delimiterAudioPath='names/patrick_1.mp3'
                delimiterIndices={[-1]}
                queueLength={1}
                onButtonClick={this.handleSoundButtonClick}
              />
              <SoundButtonRandom size='small'
                text='David ?'
                fromList='names_last'
                delimiterAudioPath='names/david_5.mp3'
                delimiterIndices={[-1]}
                queueLength={1}
                onButtonClick={this.handleSoundButtonClick}
              />
              <SoundButton 
                text='This is Marshall' size='small'
                description='This is Marshall'
                audioPath='names/this_is_marshall.mp3'
              />
            </ButtonPanel>
            <ButtonPanel 
              title='Numbers' direction='row' spacing={1}
              alignItems='flex-start' maxWidth='200px'
            >
              <SoundButtonGroup size='small'
                options = {[
                  {text: '0', audioPath: 'numbers/0.mp3'},
                  {text: '1', audioPath: 'numbers/1.mp3'},
                  {text: '2', audioPath: 'numbers/2.mp3'},
                  {text: '4', audioPath: 'numbers/4.mp3'},
                  {text: '5', audioPath: 'numbers/5.mp3'}
                ]}
                onButtonClick={this.handleSoundButtonClick}
              />
              <SoundButtonGroup size='small'
                options = {[
                  {text: '6', audioPath: 'numbers/6.mp3'},
                  {text: '8', audioPath: 'numbers/8.mp3'},
                  {text: '9', audioPath: 'numbers/9.mp3'},
                  {text: '10', audioPath: 'numbers/10.mp3'},
                ]}
                onButtonClick={this.handleSoundButtonClick}
              />
              <MultiButton
                text='Small'
                options = {[
                  {text: '17', audioPath: 'numbers/17.mp3', default: true},
                  {text: '48', audioPath: 'numbers/48.mp3'},
                  {text: '55', audioPath: 'numbers/55.mp3'}
                ]}
                ref={(mb) => this.multiButtons.push(mb)}
              />
              <MultiButton
                text='Big'
                options = {[
                  {text: '5,000', audioPath: 'numbers/5k.mp3', default: true},
                  {text: '100k', audioPath: 'numbers/100k.mp3'},
                  {text: '200k', audioPath: 'numbers/200k.mp3'},
                  {text: '500k', audioPath: 'numbers/500k.mp3'},
                  {text: '1 million', audioPath: 'numbers/a_million.mp3'}
                ]}
                ref={(mb) => this.multiButtons.push(mb)}
              />
              <SoundButtonRandom size='small'
                text='Random phone #'
                audioPaths = {[
                  'numbers/0.mp3','numbers/1.mp3','numbers/2.mp3','numbers/4.mp3',
                  'numbers/5.mp3','numbers/6.mp3','numbers/8.mp3','numbers/9.mp3'
                ]}
                delimiterAudioPath='misc/breathing_2.mp3'
                delimiterIndices={[3,6]}
                queueLength={10}
                onButtonClick={this.handleSoundButtonClick}
              />
              <SoundButtonRandom size='small'
                text='Random ZIP Code'
                audioPaths = {[
                  'numbers/0.mp3','numbers/1.mp3','numbers/2.mp3','numbers/4.mp3',
                  'numbers/5.mp3','numbers/6.mp3','numbers/8.mp3','numbers/9.mp3'
                ]}
                queueLength={5}
                onButtonClick={this.handleSoundButtonClick}
              />
              <SoundButton 
                text='2-niner-0' size='small'
                description='Two-niner-zero'
                audioPath='numbers/two_niner_zero.mp3'
              />
              <SoundButton 
                text='We got 5' size='small'
                description='We got five'
                audioPath='numbers/we_got_five.mp3'
              />
              <SoundButton 
                text='25 yrs' size='small'
                description='Twenty-five years'
                audioPath='numbers/25_years.mp3'
              />
            </ButtonPanel>
            <ButtonPanel title='Explain / Describe' justify='flex-start' maxWidth='530px'>
              <SoundButton 
                text="It's my hobby" description="It's a hobby of mine"
                audioPath='explain/its_a_hobby_of_mine.mp3'
              />
              <SoundButton 
                text="It's a long story"
                audioPath='explain/its_a_long_story.mp3'
              />
              <SoundButton 
                text="I know all about it" size='small'
                audioPath='explain/i_know_all_about_it.mp3'
              />
              <SoundButton 
                text="I can prove it"
                audioPath='explain/i_can_prove_it.mp3'
              />
              <SoundButton 
                text="I have witnesses" size='small'
                audioPath='explain/i_have_witnesses.mp3'
              />
              <SoundButton 
                text="It's under control"
                audioPath='explain/its_under_control.mp3'
              />
              <SoundButton 
                text="It's an opportunity" size='small'
                audioPath='explain/its_an_opportunity.mp3'
              />
              <SoundButton 
                text="Put it on the market" size='small'
                audioPath='explain/i_wanna_put_it_on_the_market.mp3'
              />
              <SoundButton 
                text="Have pictures taken" size='small'
                audioPath='explain/have_a_few_pictures_taken.mp3'
              />
              <SoundButton 
                text="It's indestructible" size='small'
                audioPath='explain/the_damn_things_indestructible.mp3'
              />
              <SoundButton 
                text="It's not 100% secure" size='small'
                audioPath='explain/not_hundred_percent_secure.mp3'
              />
              <SoundButton 
                text="Wallstreet knows it" size='small'
                audioPath='explain/everyone_on_wall_street_knows_it.mp3'
              />
              <SoundButton 
                text="It happened in 24hrs" size='small'
                audioPath='explain/whole_thing_happened_in_24_hours.mp3'
              />
              <SoundButton 
                text="That's progress" size='small'
                audioPath='explain/thats_what_we_call_progress.mp3'
              />
              <SoundButton 
                text="Way of of the world" size='small'
                audioPath='explain/way_of_the_world.mp3'
              />
               <SoundButton 
                text="Difrnt on the news" size='small'
                audioPath='explain/its_diferent_on_the_news.mp3'
              />
            </ButtonPanel>
          </PanelColumn>

          {/* Column 3 */}
          <PanelColumn alignItems='center'>
            <ButtonPanel title='Call related' direction='row' alignItems='flex-start' maxWidth='240px'>
              <SoundButton 
                text='Can you talk?' size='small'
                audioPath='call/can_you_talk.mp3'
              />
              <SoundButton 
                text='Got a minute?' size='small'
                audioPath='call/got_a_minute.mp3'
              />
              <SoundButton 
                text='SPEAK!' size='small'
                audioPath='call/speak.mp3'
              />
              <SoundButton 
                text='Talk 2 me' size='small'
                audioPath='call/talk_to_me.mp3'
              />
              <SoundButton 
                text='Im still here' size='small'
                audioPath='call/im_still_here.mp3'
              />
              <SoundButton
                text='Tryn 2 reach' size='small'
                description="I'm trying to reach.."
                audioPath='call/im_trying_to_reach.mp3'
              />
              <MultiButton
                text='Listen to me'
                size='small'
                options = {[
                  {text: 'Listen to me', description: 'Listen to me', 
                    audioPath: 'call/listen_to_me_1.mp3', default: true},
                  {text: 'Listen to me, u know who I am', description: 'Listen to me, you know who I am', 
                    audioPath: 'call/listen_to_me_2.mp3'}
                ]}
                ref={(mb) => this.multiButtons.push(mb)}
              />
              <SoundButton 
                text='Take off speaker' size='small'
                description='Take me off the GD speakerphone!'
                audioPath='call/take_me_off_speakerphone.mp3'
              />
              <MultiButton
                text='Trace call'
                size='small'
                options = {[
                  {text: '1', description: 'Trace the call.. follow your standard security procedures', 
                    audioPath: 'call/trace_the_call.mp3', default: true},
                  {text: '2', description: 'Trace the GD call!', audioPath: 'call/trace_the_call_2.mp3'}
                ]}
                ref={(mb) => this.multiButtons.push(mb)}
              />
              <SoundButton 
                text='was starting 2 worry' size='small'
                description='I was beginning to worry'
                audioPath='call/i_was_beginning_to_worry.mp3'
              />
            </ButtonPanel>
            <ButtonPanel title="'You'" direction='row' alignItems='flex-start' maxWidth='240px'>
              <MultiButton
                text='Got it?'
                options = {[
                  {text: 'U got that?', description: 'You got that?', audioPath: 'you/you_got_that.mp3', default: true},
                ]}
                ref={(mb) => this.multiButtons.push(mb)}
              />
              <SoundButton 
                  text='U told me so' size='small'
                  description='You told me so yourself.'
                  audioPath='you/you_told_me_so_yourself.mp3'
                  />
              <MultiButton
                text="'Member what I told u?" size='small'
                options = {[
                  {text: 'Normal', description: 'Do you remember what I told you?', 
                    audioPath: 'you/remember_what_i_told_you.mp3', default: true},
                  {text: 'In the tunnel', description: 'Do you remember what I told you in the tunnel?', 
                    audioPath: 'you/remember_what_i_told_you_in_the_tunnel.mp3'}
                ]}
                ref={(mb) => this.multiButtons.push(mb)}
              />
              <SoundButton 
                text="'member what u told me?" size='small'
                description='Remember what you told me?'
                audioPath='you/remember_what_you_told_me.mp3'
              />
              <MultiButton
                text='You said'
                options = {[
                  {text: '1', description: 'You said', audioPath: 'you/you_said_1.mp3', default: true},
                  {text: '2', description: 'You said', audioPath: 'you/you_said_2.mp3'}
                ]}
                ref={(mb) => this.multiButtons.push(mb)}
              />
              <SoundButton 
                text='Fav ?' size='small'
                description="That's a favorite question of yours"
                audioPath='you/favorite_question.mp3'
              />
              <SoundButton 
                text='U begged me' size='small'
                description='You begged me'
                audioPath='you/you_begged_me.mp3'
              />
              <SoundButton 
                text='Ur fault' size='small'
                description="It's your fault"
                audioPath='you/its_your_fault.mp3'
              />
              <SoundButton 
                text='U should be' size='small'
                description='You should be'
                audioPath='you/you_should_be.mp3'
              />
              <SoundButton 
                text='U r upset' size='small'
                description="You're upset"
                audioPath='you/youre_upset.mp3'
              />
              <SoundButton 
                text='U r a linguist' size='small'
                description="You're quite a linguist"
                audioPath='you/youre_quite_a_linguist.mp3'
              />
              <SoundButton 
                text="I keep telling them that" size='small'
                description="That's what I keep telling them"
                audioPath='they/thats_what_i_keep_tellin_them.mp3'
              />
            </ButtonPanel>
            <ButtonPanel title="'Me'" direction='row' alignItems='flex-start' maxWidth='240px'>
              <MultiButton
                text='I want..' precursorAudioPath='me/stubs/i_want.mp3'
                options = {[
                  {text: 'Child', description: 'Child', audioPath: 'misc/child.mp3', default: true},
                  {text: 'Morphine', description: 'Morphine', audioPath: 'drugs/morphine_1.mp3'},
                  {text: 'Transvestite', description: 'Transvestite', audioPath: 'misc/transvestite.mp3'},
                  {text: 'PortableFax', description: 'Portable Fax Machine', audioPath: 'misc/portable_fax_machine.mp3'},
                  {text: 'RedJelloSupply', description: 'Two-day supply of red Jell-O', audioPath: 'misc/two_day_supply_of_red_jello.mp3'}
                ]}
                setNextAudio={this.setNextAudio}
                ref={(mb) => this.multiButtons.push(mb)}
              />
              <SoundButton 
                text='U know who I am' size='small'
                description="You know who I am"
                audioPath='me/u_know_who_i_am.mp3'
              />
              <SoundButton 
                text="I'm the president" size='small'
                description="I'm the president of the United States"
                audioPath='me/job/im_the_president.mp3'
              />
            </ButtonPanel>
          </PanelColumn>

          {/* Column 4 */}
          <PanelColumn direction='row' maxWidth='535px' justify='flex-start'>
            <ButtonPanel title='Greetings' justify='flex-start' maxWidth='320px'>
              <MultiButton
                text='Hello' size='large'
                options = {[
                  {text: '1', description: 'Hello?', audioPath: 'greetings/hello_1.mp3', default: true},
                  {text: '2', description: 'Hello??', audioPath: 'greetings/hello_2.mp3'},
                  {text: '3', description: 'Hello???', audioPath: 'greetings/hello_3.mp3'},
                  {text: '4', description: 'Hello.', audioPath: 'greetings/hello_4.mp3'},
                  {text: '5', description: 'HELLO!', audioPath: 'greetings/hello_5.mp3'},
                  {text: '6', description: 'HELLO!?', audioPath: 'greetings/af1_hello_1.mp3'},
                  {text: '7', description: 'Hello... is anyone there?', audioPath: 'greetings/af1_hello_2.mp3'}
                ]}
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
                ref={(mb) => this.multiButtons.push(mb)}
              />
              <MultiButton
                text='Gd morning' size='small'
                options = {[
                  {text: '1', description: 'Good morning', audioPath: 'greetings/good_morning_1.mp3', default: true},
                  {text: '2', description: 'Good morning', audioPath: 'greetings/good_morning_2.mp3'}
                ]}
                ref={(mb) => this.multiButtons.push(mb)}
              />
              <MultiButton
                text='How ya doin' size='small'
                options = {[
                  {text: 'How r u doin', description: 'How are you doing?',
                    audioPath: 'greetings/how_are_you_doin.mp3', default: true},
                  {text: 'Hey partner..', description: 'Hey partner, how ya doin?',
                    audioPath: 'greetings/hey_partner_how_ya_doin.mp3'}
                ]}
                ref={(mb) => this.multiButtons.push(mb)}
              />
              <MultiButton
                text='Whts ur name?' size='small'
                options = {[
                  {text: '1', description: "What's your name?",
                    audioPath: 'greetings/whats_your_name_1.mp3', default: true},
                  {text: '2', description: "What's your name?",
                    audioPath: 'greetings/whats_your_name_2.mp3'},
                  {text: "What's her name?",
                    audioPath: 'questions/whats_her_name.mp3'}
                ]}
                ref={(mb) => this.multiButtons.push(mb)}
              />
            </ButtonPanel>
            <ButtonPanel title='Agree / Disagree' maxWidth='220px'>
              <MultiButton
                text='Yes' size='large'
                options = {[
                  {text: 'Yeah 1', description: 'Yeah (1)', audioPath: 'agree/yeah_1.mp3', default: true},
                  {text: 'Yeah 2', description: 'Yeah (2)', audioPath: 'agree/yeah_2.mp3', },
                  {text: 'Uh huh', description: 'Uh huh', audioPath: 'agree/uh_huh.mp3', }
                ]}
                ref={(mb) => this.multiButtons.push(mb)}
              />
              <MultiButton
                text='No' size='large'
                options = {[
                  {text: '1', description: 'No', audioPath: 'disagree/no_1.mp3', default: true},
                  {text: '2', description: 'No', audioPath: 'disagree/no_2.mp3'},
                  {text: '3', description: 'No', audioPath: 'disagree/no_3.mp3'},
                  {text: '4', description: 'No', audioPath: 'disagree/no_4.mp3'},
                  {text: '5', description: 'No (angry)', audioPath: 'disagree/no_5_angry.mp3'}
                ]}
                ref={(mb) => this.multiButtons.push(mb)}
              />
              <MultiButton
                text='Okay'
                options = {[
                  {text: 'Okay 1', description: 'Okay (1)', audioPath: 'agree/okay_1.mp3', default: true},
                  {text: 'Okay 2', description: 'Okay (2)', audioPath: 'agree/okay_2.mp3', },
                  {text: 'Alright', description: 'Alright', audioPath: 'agree/alright.mp3', }
                ]}
                ref={(mb) => this.multiButtons.push(mb)}
              />
              <SoundButton 
                text='NVM'
                audioPath='disagree/nevermind.mp3'
              />
              <MultiButton
                text='Agree'
                options = {[
                  {text: 'Of course', description: 'Of Course', audioPath: 'agree/of_course.mp3', default: true},
                  {text: "You're right", description: "You're right", audioPath: 'agree/youre_right.mp3', },
                  {text: "I'll do it 1", description: "I'll do it (1)", audioPath: 'agree/ill_do_it_1.mp3', },
                  {text: "I'll do it 2", description: "I'll do it (2)", audioPath: 'agree/ill_do_it_2.mp3', }
                ]}
                ref={(mb) => this.multiButtons.push(mb)}
              />
              <SoundButton 
                text='None of it' size='small'
                audioPath='disagree/none_of_it.mp3'
              />
              <MultiButton
                text='Got it'
                options = {[
                  {text: 'Got it 1', description: 'Got it', audioPath: 'agree/got_it_1.mp3', default: true},
                  {text: 'Got it 2 (long)', description: 'Oh hey, I got it, I got it!', audioPath: 'agree/got_it_2.mp3', }
                ]}
                ref={(mb) => this.multiButtons.push(mb)}
              />
              <SoundButton 
                text='Never' size='small'
                audioPath='disagree/never_ever.mp3'
              />
              <SoundButton 
                text="That's it" size='small'
                audioPath='agree/thats_it.mp3'
              />
              <SoundButton 
                text="We cannot" size='small'
                audioPath='disagree/we_cannot.mp3'
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
                ref={(mb) => this.multiButtons.push(mb)}
              />
              <MultiButton
                text='Huh?'
                options = {[
                  {text: 'Huh? 1', description: 'Uhh', audioPath: 'stall/huh_1.mp3', default: true},
                  {text: 'Huh? 2', description: 'Uhh', audioPath: 'stall/huh_2.mp3'}
                ]}
                ref={(mb) => this.multiButtons.push(mb)}
              />
              <MultiButton
                text='IDK'
                options = {[
                  {text: 'IDK 1', audioPath: 'stall/i_dont_know_1.mp3', default: true},
                  {text: 'IDK 2', audioPath: 'stall/i_dont_know_2.mp3'},
                ]}
                ref={(mb) => this.multiButtons.push(mb)}
              />
              <MultiButton
                text='Hang on'
                options = {[
                  {text: 'Hold on 1', description: 'Hold on a second', audioPath: 'stall/hold_on_a_second.mp3', default: true},
                  {text: 'Hang on 1', description: 'Hang on', audioPath: 'stall/hang_on_1.mp3'},
                  {text: 'Hang on 2', description: 'Hang on', audioPath: 'stall/hang_on_2.mp3'},
                  {text: 'You just hang on', description: 'You just hang on', audioPath: 'stall/you_just_hang_on.mp3'}
                ]}
                ref={(mb) => this.multiButtons.push(mb)}
              />
              <MultiButton
                text='Mumble'
                options = {[
                  {text: 'Mumbling 1', description: 'insert better desc', audioPath: 'stall/mumbling_1.mp3', default: true},
                  {text: 'Mumbling 2', description: 'insert better desc', audioPath: 'stall/mumbling_2.mp3'}
                ]}
                ref={(mb) => this.multiButtons.push(mb)}
              />
              <SoundButton 
                text='It would be..'
                description='It would be umm..'
                audioPath='stall/it_would_be_um.mp3'
              />
              <SoundButton 
                text='Ready?'
                description='Are you ready?'
                audioPath='stall/are_you_ready.mp3'
              />
              <SoundButton 
                text='I think' size='small'
                description='I think'
                audioPath='stall/i_think.mp3'
              />
              <SoundButton 
                text='Give me a few moments' size='small'
                description='Give me a few moments'
                audioPath='stall/give_me_a_few_moments.mp3'
              />
              <SoundButton 
                text='In a meeting' size='small'
                description="I'm in a meeting"
                audioPath='stall/im_in_a_meeting.mp3'
              />
              <SoundButton 
                text='Give me a minute alone' size='small'
                description='Give me a minute alone'
                audioPath='stall/give_me_a_minute_alone.mp3'
              />
              <SoundButton 
                text='Ok listen..' size='small'
                description='Ok listen.. uhh..'
                audioPath='stall/ok_listen_uhh.mp3'
              />
              <SoundButton 
                text="Let's not waste time" size='small'
                description="Let's not waste anymore time"
                audioPath='stall/lets_not_waste_any_more_time.mp3'
              />
            </ButtonPanel>
            <ButtonPanel title='Plead / Help / Thank' justify='flex-start' maxWidth='530px'>
              <MultiButton
                text='Do it'
                options = {[
                  {text: 'Just do it', description: 'Just do it (whisper)', audioPath: 'help/just_do_it.mp3', default: true},
                  {text: 'Just do it man', audioPath: 'help/just_do_it_man.mp3'}
                ]}
                ref={(mb) => this.multiButtons.push(mb)}
              />
              <SoundButton 
                text="I need help"
                audioPath='help/i_need_help_1.mp3'
              />
              <MultiButton
                text='I need $$$'
                options = {[
                  {text: 'I need some money', audioPath: 'help/i_need_money_1.mp3', default: true},
                  {text: 'I need money', audioPath: 'help/i_need_money_2.mp3'}
                ]}
                ref={(mb) => this.multiButtons.push(mb)}
              />
              <SoundButton 
                text="Can somebody help?" size='small'
                description="Is there somebody here who can help me?"
                audioPath='help/is_there_somebody_here_who_can_help_me.mp3'
              />
              <MultiButton
                text='Thanks'
                options = {[
                  {text: '1', Description: 'Thanks', audioPath: 'thanks/thanks_1.mp3'},
                  {text: '2', Description: 'Ok thanks', audioPath: 'thanks/thanks_2.mp3', default: true},
                  {text: '3', Description: 'Thank you', audioPath: 'thanks/thanks_3.mp3'}
                ]}
                ref={(mb) => this.multiButtons.push(mb)}
              />
              <SoundButton 
                text="Yes, TY" size='small'
                description="Yes, thank you"
                audioPath='thanks/yes_thank_you.mp3'
              />
              <SoundButton 
                text="Thx 4 ur help" size='small'
                description="Thanks for your help"
                audioPath='thanks/thanks_for_your_help.mp3'
              />
              <SoundButton 
                text="Trying 2 solve puzzle" size='small'
                description="Well I am trying to solve a puzzle"
                audioPath='help/solve_a_puzzle.mp3'
              />
            </ButtonPanel>
            <ButtonPanel title='Questions 1' justify='flex-start' maxWidth='310px'>
              <MultiButton
                text='What?'
                options = {[
                  {text: 'What? 1', description: 'What?', audioPath: 'questions/what_1.mp3', default: true},
                  {text: 'What? 2', description: 'What?', audioPath: 'questions/what_2.mp3'},
                ]}
                ref={(mb) => this.multiButtons.push(mb)}
              />
              <SoundButton 
                text="What, how?" size='small'
                audioPath='questions/what_how.mp3'
              />
              <SoundButton 
                text="What do u mean?" size='small'
                audioPath='questions/what_do_you_mean_1.mp3'
              />
              <SoundButton 
                text="What R U saying?" size='small'
                audioPath='questions/what_are_you_saying.mp3'
              />
              <SoundButton 
                text="What's that?" size='small'
                audioPath='questions/whats_that.mp3'
              />
              <SoundButton 
                text="What can I do?" size='small'
                audioPath='questions/what_can_i_do.mp3'
              />
              <SoundButton 
                text="What do u want?" size='small'
                audioPath='questions/what_do_you_want.mp3'
              />
              <SoundButton 
                text="What is it?" size='small'
                audioPath='questions/what_is_it.mp3'
              />
              <SoundButton 
                text="What's problem?" size='small'
                audioPath='questions/whats_the_problem.mp3'
              />
              <SoundButton 
                text="What u expect me to do?" size='small'
                audioPath='questions/what_do_you_expect_me_to_do.mp3'
              />
              <SoundButton 
                text="Do u see pattern?" size='small'
                audioPath='questions/do_you_not_see_a_pattern_here.mp3'
              />
            </ButtonPanel>
            <ButtonPanel title='Questions 2' justify='flex-start' maxWidth='220px'>
              <MultiButton
                text='Why?'
                options = {[
                  {text: 'Why? 1', description: 'Why?', audioPath: 'questions/why_1.mp3', default: true},
                  {text: 'Why? 2', description: 'Why?', audioPath: 'questions/why_2.mp3'},
                  {text: 'Why? 3', description: 'Why?', audioPath: 'questions/why_3.mp3'},
                  {text: 'Why? 4 (Angry)', description: 'Why? (Angry)', audioPath: 'questions/why_4_angry.mp3'}
                ]}
                ref={(mb) => this.multiButtons.push(mb)}
              />
              <SoundButton
                text="Right?"
                audioPath='questions/right.mp3'
              />
              <SoundButton
                text="Why not?" size='small'
                audioPath='questions/why_not.mp3'
              />
              <SoundButton
                text="When?" size='small'
                audioPath='questions/when_1.mp3'
              />
              <SoundButton
                text="Where?" size='small'
                audioPath='questions/where.mp3'
              />
              <SoundButton 
                text="R U kidding?" size='small'
                audioPath='questions/youre_kidding_right.mp3'
              />
              <SoundButton 
                text="A lot to ask?" size='small'
                audioPath='questions/is_that_a_lot_to_ask.mp3'
              />
              <SoundButton 
                text="Tactical options?" size='small'
                audioPath='questions/what_are_our_tactical_options.mp3'
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
                ref={(mb) => this.multiButtons.push(mb)}
              />
              <MultiButton
                text='Stop'
                options = {[
                  {text: 'Stop', audioPath: 'angry/stop_1.mp3', default: true},
                  {text: 'Stop!!!', audioPath: 'angry/stop_2.mp3'}
                ]}
                ref={(mb) => this.multiButtons.push(mb)}
              />
              <SoundButton 
                text="R U an idiot?" size='small'
                audioPath='angry/are_you_an_idiot.mp3'
              />
              <SoundButton 
                text="How dare U" size='small'
                audioPath='angry/how_dare_you_1.mp3'
              />
              <SoundButton 
                text="He's an idiot" size='small'
                audioPath='angry/hes_an_idiot.mp3'
              />
              <SoundButton 
                text="Christ hurry up" size='small'
                audioPath='angry/christ_hurry_up.mp3'
              />
              <SoundButton 
                text="LIE!" size='small'
                audioPath='angry/LIE.mp3'
              />
              <SoundButton 
                text="My life makes ur life possible" size='small'
                audioPath='angry/my_life_makes_your_life_possible.mp3'
              />
              <SoundButton 
                text="Burn in hell" size='small'
                audioPath='angry/burn_in_hell.mp3'
              />
              <SoundButton 
                text="I could Burn in hell" size='small'
                audioPath='angry/i_could_burn_in_hell.mp3'
              />
              <SoundButton 
                text="Don't ask me for ..." size='small'
                audioPath='angry/dont_ask_me_for_something_i_cant_give.mp3'
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
                ref={(mb) => this.multiButtons.push(mb)}
              />
              <SoundButton 
                text="Wish I could .." size='small'
                audioPath='apologies/i_wish_i_could.mp3'
              />
              <SoundButton 
                text="Almost forgot" size='small'
                audioPath='apologies/oh_i_almost_forgot.mp3'
              />
            </ButtonPanel>
            <ButtonPanel title='Laugh / Joke' direction='row' justify='flex-start' maxWidth='250px'>
              <MultiButton
                text="Laugh"
                options = {[
                  {text: 'Chuckle', audioPath: 'laugh/laugh_1.mp3', default: true},
                  {text: "Nervous", audioPath: 'laugh/laugh_2.mp3'},
                ]}
                ref={(mb) => this.multiButtons.push(mb)}
              />
              <MultiButton
                text="It's a joke"
                options = {[
                  {text: "That's a little joke", description: "That's a little joke", audioPath: 'laugh/thats_a_little_joke.mp3', default: true},
                  {text: "It's a joke", description: "It's a joke", audioPath: 'laugh/its_a_joke.mp3'},
                ]}
                ref={(mb) => this.multiButtons.push(mb)}
              />
            </ButtonPanel>
            <ButtonPanel title='Finish' direction='row' alignItems='flex-start' maxWidth='250px'>
              <MultiButton
                text='Cancel'
                options = {[
                  {text: "Cancel whatever I've got'", description: "Cancel whatever I've got", 
                    audioPath: 'finish/cancel_whatever.mp3', default: true},
                  {text: 'We have to cancel', description: "I'm afraid we have to cancel", 
                    audioPath: 'finish/im_afraid_we_have_to_cancel.mp3'}
                ]}
                ref={(mb) => this.multiButtons.push(mb)}
              />
              <SoundButton 
                text="That's all" size='small'
                description="That's all"
                audioPath='finish/thats_all.mp3'
              />
              <MultiButton
                text='Drop it' size='small'
                options = {[
                  {text: "..It's policy", description: "Drop it, it's policy.", 
                    audioPath: 'finish/drop_it_its_policy.mp3', default: true},
                  {text: '..or find yourself a ride', description: 'Drop it or find yourself a ride home', 
                    audioPath: 'finish/drop_it_or_find_yourself_a_ride.mp3'}
                ]}
                ref={(mb) => this.multiButtons.push(mb)}
              />
              <SoundButton 
                text="Gettin kinda late" size='small'
                description="It's gettin kinda late, I think I'll sleep out here"
                audioPath='finish/gettin_kinda_late.mp3'
              />
              <SoundButton 
                text="It was a lie" size='small'
                description="It was all a lie."
                audioPath='finish/it_was_all_a_lie.mp3'
              />
              <SoundButton 
                text="See u soon, bye"
                description="Ok we'll see you soon, bye."
                audioPath='finish/see_you_soon_bye.mp3'
              />
              <SoundButton 
                text="Bye"
                audioPath='finish/bye.mp3'
              />
            </ButtonPanel>
          </PanelColumn>
        </Grid>

        <Footer>
          <DrawerButton text='Car / Vehicle' icon={<KeyboardArrowUp/>}>
            <ButtonPanel title='Make / Model' direction='column' alignItems='flex-start' maxWidth='300px'>
              <SoundButton 
                text='Blue BMW'
                description='Blue BMW'
                audioPath='car/blue_bmw.mp3'
              />
            </ButtonPanel>
            <ButtonPanel title='Start the car' direction='column' alignItems='flex-start' maxWidth='300px'>
              <SoundButton 
                text='Come on! (starting car)'
                description='Come on! (trying to start car noises).'
                audioPath='car/come_on_car.mp3'
              />
              <SoundButton 
                text='Tryin to get the car started'
                description='Just tryin to get the car started'
                audioPath='car/tryin_to_start_car.mp3'
              />
              <SoundButton 
                text="The keys don't work"
                description='The keys dont work'
                audioPath='car/the_keys_dont_work.mp3'
              />
              <SoundButton 
                text='Battery' size='small'
                description='Battery'
                audioPath='car/battery.mp3'
              />
            </ButtonPanel>
            <ButtonPanel title='Car sounds' direction='column' alignItems='flex-start' maxWidth='300px'>
              <SoundButton 
                text='Engine Sputter'
                description='Enginer Sputtering'
                audioPath='car/engine_sputtering_1.mp3'
              />
              <SoundButton 
                text='Honk Smash'
                description='Car Honk then Smash'
                audioPath='car/honk_smash.mp3'
              />
              <SoundButton 
                text='Honk Full'
                description='Car Honk Full GD'
                audioPath='car/honk_full.mp3'
              />
              <SoundButton 
                text='Keys Jingling'
                audioPath='car/keys_jingling.mp3'
              />
              <SoundButton 
                text='Key struggle'
                audioPath='noises/key_struggle.mp3'
              />
            </ButtonPanel>
          </DrawerButton>

          <DrawerButton text='Misc' icon={<KeyboardArrowUp/>}>
            <ButtonPanel title='Misc 1' direction='row' alignItems='center' maxWidth='400px'>
              <SoundButton 
                text='Eiffel Tower paperweights' size='small'
                description='Could you bring me one of those little Eiffel Tower paperweights?'
                audioPath='misc/eiffel_tower_paperweights.mp3'
              />
              <SoundButton 
                text='Flat panel screen' size='small'
                description='No one in the world has a flat panel screen this size'
                audioPath='misc/flat_panel_screen.mp3'
              />
              <SoundButton 
                text='2-day supply of red jello' size='small'
                description='A two-day supply of red jello'
                audioPath='misc/two_day_supply_of_red_jello.mp3'
              />
              <SoundButton 
                text='Give a mouse a cookie' size='small'
                description='If you give a mouse a cookie..'
                audioPath='misc/give_a_mouse_a_cookie.mp3'
              />
            </ButtonPanel>
            <ButtonPanel title='One-liners' direction='row' alignItems='center' maxWidth='300px'>
              <SoundButton 
                text='Transvestite' size='small'
                description='Transvestite'
                audioPath='misc/transvestite.mp3'
              />
              <SoundButton 
                text='Child' size='small'
                description='Child'
                audioPath='misc/child.mp3'
              />
              <SoundButton 
                text='Morphine' size='small'
                description='Morphine'
                audioPath='drugs/morphine_1.mp3'
              />
              <SoundButton 
                text='Portable fax machine' size='small'
                description='Portable fax machine'
                audioPath='misc/portable_fax_machine.mp3'
              />
            </ButtonPanel>
          </DrawerButton>
        </Footer>
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
