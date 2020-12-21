import React from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

class BaseButton extends React.Component {
  constructor(props){
    super(props)
  }

  static defaultProps = {
    color: 'primary',
    variant: 'contained',
    gridItem: true
  }

  mainButton = () => {
    return (
      <Button
        {...this.props}
        className={'Button-base ' + this.props.className}
        classes={{
          sizeSmall: 'Button-base-small',
          sizeLarge: 'Button-base-large'
        }}
      >
        {this.props.children}
        {this.props.text}
      </Button>
    )
  }

  render() {
    if (this.props.gridItem) {
      return (
        <Grid item key={this.props.key}>
            {this.mainButton()}
        </Grid>
      )
    }
    else {
      return this.mainButton()
    }
  }
}

export default BaseButton
