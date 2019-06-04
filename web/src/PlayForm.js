import React from 'react';

class PlayForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            p1: null,
            p2: null,
            result: null,
            history: []
        };
    }

    componentDidMount() {
        const history = this.props.requests.history();
        this.setState({history: history})
    }

    submit() {
        this.props.requests.play(
            this.state.p1,
            this.state.p2,
            this,
            this.props.repo
        );
    }

    onP1Change(event) {
        this.setState({p1: event.target.value})
    }

    onP2Change(event) {
        this.setState({p2: event.target.value})
    }

    tie() {
        this.setState({result: 'TIE!'})
    }

    invalid() {
        this.setState({result: 'INVALID!'})
    }

    p1Wins() {
        this.setState({result: 'Player 1 Wins!'})
    }

    p2Wins() {
        this.setState({result: 'Player 2 Wins!'})
    }

    renderHistory() {
        if (this.state.history.length > 0) {
            return this.state.history.map(round => {
                return <div key={round}>
                    <div>{round.p1}</div>
                    <div>{round.p2}</div>
                    <div>{round.result}</div>
                </div>
            })
        }

        return 'No Results';
    }


    render() {
        return <div>
            {this.state.result ?
                <pre>
                {this.state.result}
                </pre> : null
            }
            <input name="p1" onChange={this.onP1Change.bind(this)}/>
            <input name="p2" onChange={this.onP2Change.bind(this)}/>
            <button onClick={this.submit.bind(this)}>PLAY</button>
            <div>
                {this.renderHistory()}
            </div>
        </div>;
    }
}

export default PlayForm;
