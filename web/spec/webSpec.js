import ReactDOM from 'react-dom'
import React from 'react'
import PlayForm from '../src/PlayForm'
import ReactTestUtils from 'react-dom/test-utils'

describe('Janken Game', function () {
  let domFixture

  function displayApp(request) {
    ReactDOM.render(<PlayForm request={request}/>, domFixture)
  }

  function setInputValue(name, value) {
    const p1Input = document
        .querySelector(`input[name="${name}"]`)
    p1Input.value = value
    ReactTestUtils.Simulate.change(p1Input)
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
      expect(domFixture.querySelector('button[name="play"]').innerText).toContain('Play')
    })
  })

  describe('結果を正しく表示する', () => {
    it('displays P1 Wins! if player 1 wins', () => {
      const playAlwaysP1WinsStub = (p1, p2, observer) => observer.p1Wins()
      const request = { play: playAlwaysP1WinsStub }
      displayApp(request)

      expect(domFixture.innerText).not.toContain('P1 Wins!')
      domFixture.querySelector('button[name="play"]').click()

      expect(domFixture.innerText).toContain('P1 Wins!')
    })

    it('displays P2 Wins! if player 2 wins', () => {
      const playAlwaysP2WinsStub = (p1, p2, observer) => observer.p2Wins()
      const request = { play: playAlwaysP2WinsStub }
      displayApp(request)

      expect(domFixture.innerText).not.toContain('P2 Wins!')
      domFixture.querySelector('button[name="play"]').click()

      expect(domFixture.innerText).toContain('P2 Wins!')
    })

    it('displays Draw if aiko', () => {
      const playDrawStub = (p1, p2, observer) => observer.draw()
      const request = { play: playDrawStub }
      displayApp(request)

      expect(domFixture.innerText).not.toContain('Draw')
      domFixture.querySelector('button[name="play"]').click()

      expect(domFixture.innerText).toContain('Draw')
    })

    it('displays No Game if game no game', () => {
      const playNoGameStub = (p1, p2, observer) => observer.noGame()
      const request = { play: playNoGameStub }
      displayApp(request)

      expect(domFixture.innerText).not.toContain('No Game')
      domFixture.querySelector('button[name="play"]').click()

      expect(domFixture.innerText).toContain('No Game')
    })
  })

  describe('プレー内容でRequestを呼ぶ', () => {
    it('sends p1 input and p2 input to play', () => {
      const playSpy = jasmine.createSpy('play')
      const request = {play: playSpy}
      displayApp(request)

      setInputValue('p1Hand', 'rock')
      setInputValue('p2Hand', 'scissors')

      domFixture.querySelector('button[name="play"]').click()


      expect(playSpy).toHaveBeenCalled()
      expect(playSpy)
          .toHaveBeenCalledWith('rock', 'scissors', jasmine.any(Object))
    })
  })

  describe("history", () => {
    it("shows nothing before history is clicked", () => {
      displayApp({})

      expect(domFixture.innerText).not.toContain('No Rounds')
    })

    it("shows no results when no games have been played", () => {
      const historyStub = (observer) => observer.noRounds()
      const request = { history: historyStub }
      displayApp(request)

      domFixture.querySelector('button[name="history"]').click()

      expect(domFixture.innerText).toContain('No Rounds')
    })
  });
})
