import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import PlayForm from '../src/PlayForm';

describe('play form', () => {
    let domFixture

    beforeEach(() => {
        domFixture = document.createElement('div');
        document.querySelector('body').appendChild(domFixture)
    });

    afterEach(() => {
        domFixture.remove()
    });

    describe('when the play use case tells the UI the input is invalid', () => {
        it('tells the user their input is invalid', () => {
            document.body.appendChild(domFixture);

            const alwaysInvalidRequest = {
                play: (p1, p2, observer) => observer.invalid()
            };

            ReactDOM.render(<PlayForm requests={alwaysInvalidRequest}/>, domFixture);
            expect(domFixture.innerText).not.toContain('INVALID!');

            document.querySelector('button').click();

            expect(domFixture.innerText).toContain('INVALID!')
        });

        it("uses the RPS play use case", () => {
            document.body.appendChild(domFixture);

            const playSpy = jasmine.createSpy("play");

            const component = <PlayForm requests={{play: playSpy}}/>;
            ReactDOM.render(component, domFixture);

            const p1Input = domFixture.querySelector('input[name="p1"]');
            ReactTestUtils.Simulate.change(p1Input, {target: {value: "rock"}});

            const p2Input = domFixture.querySelector('input[name="p2"]');
            ReactTestUtils.Simulate.change(p2Input, {target: {value: "scissors"}});

            document.querySelector('button').click();

            expect(playSpy).toHaveBeenCalledWith("rock", "scissors", jasmine.any(Object))
        })
    });
});
