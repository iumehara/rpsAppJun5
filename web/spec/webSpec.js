import ReactDOM from 'react-dom'
import React from 'react'
import PlayForm from '../src/PlayForm'

describe('Janken Game', function () {
  let domFixture

  function displayApp(request) {
    ReactDOM.render(<PlayForm request={request}/>, domFixture)
  }

  beforeEach(() => {
    domFixture = document.createElement('div')
    document.querySelector('body').appendChild(domFixture)
  })

  afterEach(() => {
    domFixture.remove()
  })

  describe('画面表示', () => {
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

  describe('結果を正しく表示する', () => {
    it('displays P1 Wins! if player 1 wins', () => {
      const playAlwaysP1WinsStub = (p1, p2, observer) => observer.p1Wins()
      const request = { play: playAlwaysP1WinsStub }
      displayApp(request)

      expect(domFixture.innerText).not.toContain('P1 Wins!')
      domFixture.querySelector('button').click()

      expect(domFixture.innerText).toContain('P1 Wins!')
    })

    it('displays P2 Wins! if player 2 wins', () => {
      const playAlwaysP2WinsStub = (p1, p2, observer) => observer.p2Wins()
      const request = { play: playAlwaysP2WinsStub }
      displayApp(request)

      expect(domFixture.innerText).not.toContain('P2 Wins!')
      domFixture.querySelector('button').click()

      expect(domFixture.innerText).toContain('P2 Wins!')
    })

    it('displays Draw if aiko', () => {
      const playDrawStub = (p1, p2, observer) => observer.draw()
      const request = { play: playDrawStub }
      displayApp(request)

      expect(domFixture.innerText).not.toContain('Draw')
      domFixture.querySelector('button').click()

      expect(domFixture.innerText).toContain('Draw')
    })

    it('displays No Game if game no game', () => {
      const playNoGameStub = (p1, p2, observer) => observer.noGame()
      const request = { play: playNoGameStub }
      displayApp(request)

      expect(domFixture.innerText).not.toContain('No Game')
      domFixture.querySelector('button').click()

      expect(domFixture.innerText).toContain('No Game')
    })
  })

  describe('プレー内容でRequestを呼ぶ', () =>{

  })
})
