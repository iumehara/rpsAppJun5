import ReactDOM from "react-dom";
import React from 'react'
import PlayForm from "../src/PlayForm";


describe('Play Form', function () {
  it('tells the user the input is invalid', function () {
    const domFixutre = document.createElement('div')
    document.querySelector('body').appendChild(domFixutre)
    ReactDOM.render(
        <PlayForm />,
        domFixutre
    )


    document.querySelector('button').click()


    expect(domFixutre.innerText).toContain('INVALID')
  });
})
