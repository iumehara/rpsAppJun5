import React from 'react'
import ReactDOM from 'react-dom'
import PlayForm from './src/PlayForm'
import {Request} from 'rps'

const request = new Request()

class App extends React.Component {
  render(){
    return (
      <div>
        <PlayForm request={request}/>
      </div>
    )
  }
}

ReactDOM.render(
  <App/>,
  document.querySelector('#app')
)