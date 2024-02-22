import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  
  const calculateWinner = squares => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = index => {
    if (winner || board[index]) return;

    const newBoard = [...board];
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);

    const result = calculateWinner(newBoard);
    if (result) {
      setWinner(result);
    } else if (!newBoard.includes(null)) {
      setWinner('No one');
    }

    // Apply clicked class to the clicked block
    const square = document.getElementById(`square-${index}`);
    square.classList.add('clicked');
    setTimeout(() => {
      square.classList.remove('clicked');
    }, 200); // Duration of the scale transformation in milliseconds
  };

  const renderSquare = index => {
    return (
      <button id={`square-${index}`} className="square" onClick={() => handleClick(index)}>
        {board[index]}
      </button>
    );
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setXIsNext(true);
  };

  const renderStatus = () => {
    if (winner) {
      return winner === 'No one' ? (
        <div className="winner-message">
          <p>Oops... No one is the winner!</p>
          <img src="looser1.gif" alt="Looser's GIF" style={{ width: '200px', height: 'auto', marginTop: '20px' }} />
        </div>
      ) : (
        `Winner: ${winner}`
      );
    } else {
      return `Next Player: ${xIsNext ? 'X' : 'O'}` ;
    }
  };
  
  
  return (
    <div className="game">
      <h1>Tic Tac Toe</h1>
      <div className="game-board">
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <div className="game-info">{renderStatus()}</div>
      <button className="reset-button" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
};

export default App;
