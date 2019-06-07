import React from 'react'
import ReactDOM from 'react-dom'
import PlayForm from './src/PlayForm'
import {Request, Round} from 'rps'

const emptyRepo = {
    save: () => {},
    isEmpty: () => true,
    all: () => []
}

const stubRepo = {
    save: () => {},
    isEmpty: () => false,
    all: () => [new Round('rock', 'paper', 'p2wins')]
}

const request = new Request(stubRepo)

class App extends React.Component {
    render() {
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