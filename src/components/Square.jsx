// Componente que renderiza los cuadrados del tablero

export const Square = ({ children, isSelected, updateBoard, index }) => {

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