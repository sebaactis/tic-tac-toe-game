import { Square } from "./Square"

export const WinnerModal = ({ winner, resetGame }) => {

    if (winner === null) return null

    const winnerText = winner === false ? "TIE" : "The Winner is: "

    return (
        <section className="winner">
            <div className="text">
                <header className="win">
                    {winner && <Square>{winner}</Square>}
                </header>

                <h2>
                    {winnerText}
                </h2>
                <footer>
                    <button onClick={resetGame}>Empezar de nuevo</button>
                </footer>
            </div>
        </section>

    )

}