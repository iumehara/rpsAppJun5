import React from 'react'

class PlayForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            result: 'No GAME'
        }
    }

    playGame() {
        this.props.requests.play(null, null, this)
    }

    invalid() {
        this.setState({result: 'INVALID'})
    }

    render() {
        return (
            <div>
                <button onClick={this.playGame.bind(this)}>send</button>
                <div>{this.state.result}</div>
            </div>
        )
    }
}

export default PlayForm