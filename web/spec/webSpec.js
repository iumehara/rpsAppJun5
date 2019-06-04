import ReactDOM from "react-dom";
import React from 'react'
import PlayForm from "../src/PlayForm";

describe('Play Form', function () {
  let domFixture
  beforeEach(() => {
    domFixture = document.createElement('div')
    document.querySelector('body').appendChild(domFixture)
  })

  afterEach(() => {
    domFixture.remove()
  })

  function renderApp() {
    ReactDOM.render(
        <PlayForm />,
        domFixture
    )
  }

  it('tells the user the input is invalid', function () {
    renderApp()


    document.querySelector('button').click()


    expect(domFixture.innerText).toContain('INVALID')
  });
})
