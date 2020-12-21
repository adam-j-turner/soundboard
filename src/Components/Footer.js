import React from 'react'
import Grid from '@material-ui/core/Grid'

class Footer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div className='Footer-main'>
        <Grid
          container
          className='Footer-grid'
          direction='row'
          justify={this.props.justify}
          alignItems={this.props.alignItems}
          spacing={this.props.spacing}
        >
          {this.props.children}
        </Grid>
      </div>
    )
  }
}

Footer.defaultProps = {
  justify: 'center',
  alignItems: 'center',
  spacing: 2
}

export default Footer
