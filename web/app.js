import React from 'react'
import ReactDOM from 'react-dom'
import PlayForm from "./src/PlayForm";
import {Requests} from "../rps/rps";

const requests = new Requests();
const repo = {
    save: () => {
    }
};

class App extends React.Component {
    render() {
        return (
            <div>
                <h1>Rps App</h1>
                <PlayForm requests={requests} repo={repo}/>
            </div>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.querySelector('#app')
);