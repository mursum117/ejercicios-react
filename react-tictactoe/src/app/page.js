"use client";

import "../css/index.css"
import { useState } from "react"
import { Square } from "@/components/Square";
import { TURNS} from "@/constants/constants";
import { checkWinner, checkEndGame } from "@/logic/board";
import { WinnerModal } from "@/components/WinnerModal";

export default function Home() {
  const [board, setBoard] = useState(() =>{
    const boardFromStorage = window.localStorage.getItem("board");
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  });
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem("turn");
    return turnFromStorage ?? TURNS.X
  })
  const [winner, setWinner] = useState(null)

  const resetGame = () =>{
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X)
    setWinner(null)

    window.localStorage.removeItem("board");
    window.localStorage.removeItem("turn");
  }

  const updateBoard = (index) => {
    //Validamos esta posición
    if(board[index] || winner) return
    //Se actualiza el tablero
    const newBoard = [...board] 
    newBoard[index] = turn
    setBoard(newBoard)
    //Se cambia el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    //Guardar la partida
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)
    //Revisar si hay ganador
    const newWinner = checkWinner(newBoard)
    if(newWinner){
      setWinner(newWinner)
    } else if(checkEndGame(newBoard)){
      setWinner(false)
    }
  }

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset del Juego</button>
      <section className="game">
        {
          board.map((_, index) => {
            return(
              <Square key={index} index={index} updateBoard={updateBoard}>
                {board[index]}
              </Square>
            )
          })
        }
      </section>
      <section className="turn">
        <Square isSelected = {turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected = {turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>
      <WinnerModal resetGame={resetGame} winner={winner}/>
    </main>
  );
}

