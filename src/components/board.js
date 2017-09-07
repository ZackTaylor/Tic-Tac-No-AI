import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Square from './square.js';

class Board extends Component {
  constructor() {
    super();
    this.state = {
      squares: Array.from(Array(9).keys()),
    };
  }

  calculateWinner(squares) {
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
    return false;
  }

  handleClick(i) {
    const squares = this.state.squares.slice();

    if (this.calculateWinner(squares) || squares[i] === "X" || squares[i] === "O") {
      return;
    }

    squares[i] = "X";
    this.setState({
      squares: this.computerMove(squares),
    });
  }

  computerMove(squares) {
      let bestMove = this.minimax(squares, "O");
      let squaresCopy = squares.slice();
      squaresCopy[bestMove.index] = "O";
      return squaresCopy;
  }

  renderSquare(i) {
    return (
      <Square
        value={ this.state.squares[i] }
        onClick={ () => this.handleClick(i) }
      />
    );
  }

  emptyIndices(board) {
    return board.filter( space => space !== "O" && space !== "X");
  }

  minimax(newBoard, player) {
    let availSpots = this.emptyIndices(newBoard);

    if (this.calculateWinner(newBoard) === "X") {
      return {score: -10};
    } else if (this.calculateWinner(newBoard) === "O") {
      return {score: 10};
    } else if (availSpots.length === 0) {
      return {score: 0};
    }

    let moves = [];

    for (let i = 0; i < availSpots.length; i++) {
      let move = {};
      let result;
      move.index = newBoard[availSpots[i]];
      newBoard[availSpots[i]] = player;

      if (player === "O") {
        result = this.minimax(newBoard, "X");
        move.score = result.score;
      } else {
        result = this.minimax(newBoard, "O");
        move.score = result.score;
      }

      newBoard[availSpots[i]] = move.index;

      // push the object to the array
      moves.push(move);
    }

    let bestMove;
    if (player === "O") {
      let bestScore = -10000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else {
      var bestScore = 10000;
      for(var i = 0; i < moves.length; i++) {
        if(moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }
    return moves[bestMove];
  }

  render() {
    const winner = this.calculateWinner(this.state.squares);
    let status;
    if (winner === "O") {
      status = "Computer Wins!";
    } else if (winner === "X") {
      status = "You Win!";
    }
    
      return (
        <div>
          <div className="status">{status}</div>
          <table>
            <tbody>
              <tr>
                { this.renderSquare(0) }
                { this.renderSquare(1) }
                { this.renderSquare(2) }
              </tr>
              <tr>
                { this.renderSquare(3) }
                { this.renderSquare(4) }
                { this.renderSquare(5) }
              </tr>
              <tr>
                { this.renderSquare(6) }
                { this.renderSquare(7) }
                { this.renderSquare(8) }
              </tr>

            </tbody>
        </table>
      </div>
    );
  }


}

export default Board;
