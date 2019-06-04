import React from 'react';
import ReactDOM from 'react-dom';
import PlayForm from '../src/PlayForm';

describe('play form', () => {
    describe('when the play use case tells the UI the input is invalid', () => {
        it('tells the user their input is invalid', () => {
            const domFixture = document.createElement('div');
            document.body.appendChild(domFixture);

            const alwaysInvalidRequest = {
                play: (p1, p2, observer) => observer.invalid()
            };

            ReactDOM.render(<PlayForm requests={alwaysInvalidRequest}/>, domFixture);

            document.querySelector('button').click();
            expect(domFixture.innerText).toContain('INVALID!')
        });
    });
});
