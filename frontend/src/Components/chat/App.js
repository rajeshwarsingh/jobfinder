import React from 'react'
import socketIOClient from 'socket.io-client'
const ENDPOINT = 'http://127.0.0.1:4001'

export class App extends React.Component {
  constructor () {
    super()
    this.state = {
      time: ''
    }
  }

  componentDidMount () {
    const socket = socketIOClient(ENDPOINT)
    socket.on('FromAPI', data => {
      this.setState({ time: data })
    })

    socket.emit('testEmit', 'test!')
  }

  render () {
    return (
      <div>
        <p>
          It's <time dateTime={this.state.time}>{this.state.time}</time>
        </p>
      </div>
    )
  }
}

export default App
