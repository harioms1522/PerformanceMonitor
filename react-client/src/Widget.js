import React, { Component } from 'react'
import Mem from './Mem'
import CPU from './CPU'
import Info from './Info'

export default class Widget extends Component {
  constructor(){
    super()
    this.state = {}
  }

  render() {
    return (
      <div>
        <h1>Widget!!</h1>
        <CPU />
        <Mem />
        <Info />
      </div>
    )
  }
}
