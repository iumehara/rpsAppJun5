import React from 'react'
import ReactDOM from 'react-dom'
import PlayForm from './src/PlayForm'
import {Request, FakeRoundRepository} from 'rps'

const fakeRepo = new FakeRoundRepository()

const request = new Request(fakeRepo)

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