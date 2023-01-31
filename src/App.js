import { useState } from 'react';
import './App.css';

// Objeto de turnos

const TURNS = {
  X: "X",
  O: "O"
};


// Componente que renderiza los cuadrados del tablero

const Square = ({ children, isSelected, updateBoard, index }) => {

  const className = `square ${isSelected ? 'is-selected' : ''}`

  // Funcion que maneja el evento de actualizar el tablero
  const handleClick = () => {
    updateBoard(index);
  }


  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

// Combinaciones ganadores
const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];


function App() {

  const [board, setBoard] = useState(Array(9).fill(null)) // Tablero
  const [turn, setTurn] = useState(TURNS.X) // Turnos
  const [winner, setWinner] = useState(null) // Ganador


  // Funcion que verifica el ultimo tablero y verifica si coincide con las combos ganadoras
  const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      if (boardToCheck[a] && boardToCheck[a] === boardToCheck[b] && boardToCheck[a] === boardToCheck[c]) {
        return boardToCheck[a]
      }
    }
    return null;
  }


  // Funcion que actualiza el tablero
  const updateBoard = (index) => {

    if (board[index] || winner) return // Verifica si hay algo en esa posicion

    // Actualiza el tablero con los clicks
    const newBoard = [...board]
    newBoard[index] = turn // Donde se da click se pone el X / O segun el state turn
    setBoard(newBoard)

    // Cambia de turno segun el state actual de turn
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    // Verifica si hay un nuevo ganador y setea el estado winner
    const newWinner = checkWinner(newBoard)
    if(newWinner) {
      setWinner(newWinner)
    }

  }

  // Render del tablero
  return (
    <main className="board">
      <h1> TIC TAC TOE</h1>
      <section className="game">
        {
          board.map((_, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {board[index]}
              </Square>
            )
          })
        }
      </section>

      <section className="turn">

        <Square isSelected={turn === TURNS.X}> {TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}> {TURNS.O}</Square>

      </section>
    </main>
  )

}

export default App;
