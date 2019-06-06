import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import PlayForm from '../src/PlayForm';
import {Round, RESULT} from '../../rps/rps';

describe('play form', () => {
    let domFixture;

    beforeEach(() => {
        domFixture = document.createElement('div');
        document.querySelector('body').appendChild(domFixture)
    });

    afterEach(() => {
        domFixture.remove()
    });

    describe('when the play use case tells the UI the input is invalid', () => {
        describe("game", () => {
            it('tells the user their input is invalid', () => {
                document.body.appendChild(domFixture);

                const alwaysInvalidRequest = {
                    play: (p1, p2, observer) => observer.invalid(),
                    history: () => {
                        return []
                    }
                };

                ReactDOM.render(<PlayForm
                    requests={alwaysInvalidRequest}
                    repo={{
                        save: () => {
                        }
                    }}/>, domFixture);
                expect(domFixture.innerText).not.toContain('INVALID!');

                document.querySelector('button[name="play"').click();

                expect(domFixture.innerText).toContain('INVALID!')
            });

            it("uses the RPS play use case", () => {
                document.body.appendChild(domFixture);

                const playSpy = jasmine.createSpy("play");

                const component = <PlayForm
                    requests={{
                        play: playSpy,
                        history: () => {
                            return []
                        }
                    }}
                    repo={{
                        save: () => {
                        }
                    }}/>;
                ReactDOM.render(component, domFixture);

                const p1Input = domFixture.querySelector('input[name="p1"]');
                ReactTestUtils.Simulate.change(p1Input, {target: {value: "rock"}});

                const p2Input = domFixture.querySelector('input[name="p2"]');
                ReactTestUtils.Simulate.change(p2Input, {target: {value: "scissors"}});

                document.querySelector('button[name="play"').click();

                expect(playSpy).toHaveBeenCalledWith("rock", "scissors", jasmine.any(Object), jasmine.any(Object))
            });
        });

        describe("history", () => {
            it("gets the history when button clicked", () => {
                document.body.appendChild(domFixture);

                const historySpy = jasmine.createSpy("history").and.returnValue([]);
                const component = <PlayForm requests={{history: historySpy}}/>;
                ReactDOM.render(component, domFixture);
                document.querySelector('button[name="history"').click();

                expect(historySpy).toHaveBeenCalled()
            });

            it("renders no results when empty", () => {
                document.body.appendChild(domFixture);

                const historyStub = {
                    history: () => {
                        return []
                    }
                };

                const component = <PlayForm requests={historyStub}/>;
                ReactDOM.render(component, domFixture);
                document.querySelector('button[name="history"').click();

                expect(domFixture.innerText).toContain('No Results')
            })

            it("renders results when not empty", () => {
                document.body.appendChild(domFixture);

                const historyStub = {
                    history: () => {
                        return [new Round('rock', 'paper', RESULT.P2WINS)]
                    }
                };

                const component = <PlayForm requests={historyStub}/>;
                ReactDOM.render(component, domFixture);
                document.querySelector('button[name="history"').click();

                expect(domFixture.innerText).toContain('rock');
                expect(domFixture.innerText).toContain('paper');
                expect(domFixture.innerText).toContain('Player 2 Wins')
            })
        })
    });
});
