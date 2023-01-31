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


function App() {

  const [board, setBoard] = useState(Array(9).fill(null)) // Tablero
  const [turn, setTurn] = useState(TURNS.X) // Turnos


  // Funcion que actualiza el tablero
  const updateBoard = (index) => {


    // Actualiza el tablero con los clicks
    const newBoard = [...board]
    newBoard[index] = turn // Donde se da click se pone el X / O segun el state turn
    setBoard(newBoard)

    // Cambia de turno segun el state actual de turn
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

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
