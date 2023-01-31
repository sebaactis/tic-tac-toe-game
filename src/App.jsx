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
  }) // Tablero
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem("turn")
    return turnFromStorage ?? TURNS.X
  }) // Turnos
  const [winner, setWinner] = useState(null) // Ganador

  //Funcion que resetea el juego a su estado inicial
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    window.localStorage.removeItem("board")
    window.localStorage.removeItem("turn")
  }

  // Funcion que actualiza el tablero
  const updateBoard = (index) => {

    // Verifica si hay algo en esa posicion
    if (board[index] || winner) return

    // Actualiza el tablero con los clicks
    const newBoard = [...board]
    newBoard[index] = turn // Donde se da click se pone el X / O segun el state turn
    setBoard(newBoard)

    // Cambia de turno segun el state actual de turn
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    // Guardar el estado del juego en el localStorage

    window.localStorage.setItem("board", JSON.stringify(newBoard))
    window.localStorage.setItem("turn", newTurn)

    // Verifica si hay un nuevo ganador y setea el estado winner
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  // Render del tablero
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
