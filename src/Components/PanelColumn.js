import React from 'react'
import Grid from '@material-ui/core/Grid'

class PanelColumn extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      // The panel is a grid inside the larger main grid.
      // It's mean to columnize smaller panels.
      <Grid item key={this.props.key} style={{maxWidth: this.props.maxWidth}}>
        <Grid
          container
          className='PanelColumn'
          direction={this.props.direction}
          justify={this.props.justify}
          alignItems={this.props.alignItems}
          spacing={this.props.spacing}
        >
          {this.props.children}
        </Grid>
      </Grid>
    )
  }
}

PanelColumn.defaultProps = {
  direction: 'column',
  justify: 'center',
  alignItems: 'flex-start',
  spacing: 2,
  maxWidth: '500px'
}

export default PanelColumn
