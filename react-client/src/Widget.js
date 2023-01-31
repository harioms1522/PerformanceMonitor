import React, { Component } from 'react'
import Mem from './Mem'
import CPU from './CPU'
import Info from './Info'

export default class Widget extends Component {
  constructor(){
    super()
    this.state = {
      // perfData: this.props.perfData
    }
  }

  render() {
    if(this.props.perfData){
      const {osType,uptime,freeMem,totalMem,memUsage,usedMem,cpuModel,cpuSpeed, numCores,cpuLoad, macA } = this.props.perfData
      
      const cpu = {cpuLoad}
      const mem = {freeMem, totalMem, memUsage, usedMem}
      const info = {osType, uptime, cpuModel, cpuSpeed, numCores, macA}


      return (
        <div className='widget col-sm-12'>
          <CPU cpuData={cpu}/>
          <Mem memData={mem}/>
          <Info infoData={info}/>
        </div>
      )
    }
  }
}
