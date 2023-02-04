import React from 'react'
import drawCircle from './utilities/canvasLoadAnimation'

export default function CPU(props) {
  const canvas = document.querySelector(".canvas")
  drawCircle(canvas, props.cpuData.cpuLoad)
  return (
    <div className='col-sm-3 cpu cpu-widget'>
      <h3>CPU Load</h3>
      <div className='canvas-wrapper'>
        <canvas className='canvas' width="200" height="200"></canvas>
        <div className='cpu-text'>{props.cpuData.cpuLoad}</div>
      </div>
    </div>
  )
}
