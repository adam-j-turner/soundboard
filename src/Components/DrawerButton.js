import React from 'react';
import Util from '../Util.js';
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";

class DrawerButton extends React.Component {
  constructor(props){
    super(props)

    this.closeDrawer = this.closeDrawer.bind(this)
    this.state = {
      open: false
    }
  }

  closeDrawer() {
    this.setState({open: false})
  }

  toggleDrawer(open=false) {
    this.setState({open: open})
  }

  render() {
    const childrenWithProps = Util.recursiveMap(this.props.children, child => 
      React.cloneElement(child, { mouseUpExtra: this.closeDrawer }))

    return (
      <Grid item key={this.props.key}>
        <Button
          {...this.props}
          className='DrawerButton'
          classes={{
            sizeSmall: 'Button-base-small',
            sizeLarge: 'Button-base-large'  
          }}
          variant="outlined"
          color="primary"
          onMouseDown={() => {this.toggleDrawer(true)}}
        >
            {this.props.icon}
            {this.props.text}
        </Button>
        <Drawer anchor={this.props.anchor} open={this.state.open}
          transitionDuration = {0}
          onClose={() => {this.toggleDrawer(false)}}
          onOpen={() => {this.toggleDrawer(true)}}
        >
          <Grid container direction='row' alignItems='center' justify='center'>
            {childrenWithProps}
          </Grid>
        </Drawer>
      </Grid>
    )
  }
}

DrawerButton.defaultProps = {
  anchor: 'bottom',
}

export default DrawerButton
