import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

class ButtonPanel extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      // The panel is a grid inside the larger main grid.
      <Grid item key={this.props.key} style={{maxWidth: this.props.maxWidth}}>
        <Paper>
          <span className='ButtonPanel-label'>
            {this.props.title}
          </span>
          <Grid
            container
            className='ButtonPanel'
            direction={this.props.direction}
            justify={this.props.justify}
            alignItems={this.props.alignItems}
            spacing={this.props.spacing}
          >
            {this.props.children}
          </Grid>
        </Paper>
      </Grid>
    )
  }
}

ButtonPanel.defaultProps = {
  title: "ButtonPanel",
  direction: "row",
  justify: "center",
  alignItems: "center",
  spacing: 1,
  maxWidth: '400px'
}

export default ButtonPanel
