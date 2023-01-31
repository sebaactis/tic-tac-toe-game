import { useState } from 'react';
import './App.css';
import confetti from 'canvas-confetti';
import { TURNS } from './constants.js'
import { checkWinner, checkEndGame } from './logic/board';
import { WinnerModal } from './components/WinnerModel';
import { Game } from './components/Game';
import { TurnSection } from './components/TurnSection';


function App() {

  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem("board")
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  }) 
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem("turn")
    return turnFromStorage ?? TURNS.X
  }) 
  const [winner, setWinner] = useState(null) 


  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    window.localStorage.removeItem("board")
    window.localStorage.removeItem("turn")
  }

  const updateBoard = (index) => {

    if (board[index] || winner) return
  
    const newBoard = [...board]
    newBoard[index] = turn 
    setBoard(newBoard)
    
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    window.localStorage.setItem("board", JSON.stringify(newBoard))
    window.localStorage.setItem("turn", newTurn)

    
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  return (
    <main className="board">

      <button onClick={resetGame}> Reset Game </button>
      <h1> TIC TAC TOE</h1>

      <Game board={board} updateBoard={updateBoard} />

      <TurnSection turn={turn} />

      <WinnerModal winner={winner} resetGame={resetGame} />

    </main>
  )
}

export default App;
