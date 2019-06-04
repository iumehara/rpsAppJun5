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

  function renderApp(requests) {
    ReactDOM.render(
        <PlayForm requests={requests} />,
        domFixture
    )
  }

  it('tells the user the input is invalid', function () {
    const playInvalidStub = {
      play: (p1Throw, p2Throw, observer) => observer.invalid()
    }
    renderApp(playInvalidStub)


    expect(domFixture.innerText).not.toContain('INVALID')
    document.querySelector('button').click()


   expect(domFixture.innerText).toContain('INVALID')
})
})
