import './App.css';
import Widget from './Widget';
import socket from './utilities/socketConnection';
import "./widget.css"

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

      // current state is an object so that each time data is updated then we can get the widgets for the keys of the state 
      currentState[perfData.macA] = perfData

      // console.log(currentState)
      this.setState({
        performanceData: currentState
      })
    })
  }

  render() {
    const widgets = []
    Object.entries(this.state.performanceData).forEach(([key, val])=>{
      widgets.push(<Widget key={key} perfData={val}></Widget>)
    })

    return (
      <div className="App">
        {widgets}
      </div>
    );
  }
}
