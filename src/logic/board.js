import { WINNER_COMBOS } from "../constants";


// Funcion que verifica el ultimo tablero y verifica si coincide con las combos ganadoras
export const checkWinner = (boardToCheck) => {
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo
    if (boardToCheck[a] && boardToCheck[a] === boardToCheck[b] && boardToCheck[a] === boardToCheck[c]) {
      return boardToCheck[a]
    }
  }
  return null;
}

// Funcion que verifica si termino el juego: si todas las square son distintas a null es que se termino.
export const checkEndGame = (newBoard) => {
  return newBoard.every((square) => square !== null)
}

