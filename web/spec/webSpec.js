import ReactDOM from 'react-dom'
import React from 'react'
import PlayForm from '../src/PlayForm'

describe('RPS App', function () {
  let domFixture

  function displayApp() {
    ReactDOM.render(<PlayForm/>, domFixture)
  }

  beforeEach(() => {
    domFixture = document.createElement('div')
    document.querySelector('body').appendChild(domFixture)
  })

  afterEach(() => {
    domFixture.remove()
  })

  describe('displays form', () => {
    it('with application name', function () {
      displayApp()
      expect(domFixture.innerText).toContain('Janken Game')
    })
    it('with p1 input', function () {
      displayApp()
      expect(domFixture.innerText).toContain('P1')
    })
    it('with p2 input', function () {
      displayApp()
      expect(domFixture.innerText).toContain('P2')
    })
    it('with play button', function () {
      displayApp()
      expect(domFixture.querySelector('button').innerText).toContain('Play')
    })
  })
})
