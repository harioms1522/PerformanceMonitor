import './App.css';
import Widget from './Widget';
import socket from './utilities/socketConnection';

import React, { Component } from 'react'

export default class App extends Component {

  constructor(){
    super()
    this.state = {
      performanceData : {}
    }
  }

  componentDidMount(){
    socket.on("data",(perfData)=>{
      const currentState = ({...this.state.performanceData})

      currentState[perfData.mac] = perfData

      this.setState({
        performanceData: currentState
      })
    })
  }

  render() {
    return (
      <div className="App">
        <Widget></Widget>
      </div>
    );
  }
}
