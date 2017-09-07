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

  getScore(board, availSpots) {
    if (this.calculateWinner(board) === "X") {
      return {score: -10};
    } else if (this.calculateWinner(board) === "O") {
      return {score: 10};
    } else if (availSpots.length === 0) {
      return {score: 0};
    }

  }

  returnScore(board, player) {
    let result = this.minimax(board, player);
    return result.score;
  }

  generateMoves(board, availSpots, player) {
    let moves = [];

    for (let i = 0; i < availSpots.length; i++) {
      let move = {};
      move.index = board[availSpots[i]];
      board[availSpots[i]] = player;

      if (player === "O") {
        move.score = this.returnScore(board, "X");
      } else {
        move.score = this.returnScore(board, "O");
      }

      board[availSpots[i]] = move.index;

      moves.push(move);
    }
    return moves;
  }

  findBestMove(moves, player) {
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

  minimax(newBoard, player) {
    let availSpots = this.emptyIndices(newBoard);
    if (this.getScore(newBoard, availSpots)) return this.getScore(newBoard, availSpots);
    let moves = this.generateMoves(newBoard, availSpots, player);
    return this.findBestMove(moves, player);
  }

  render() {
    const winner = this.calculateWinner(this.state.squares);
    let status;
    if (winner === "O") {
      status = "Computer Wins!";
    } else if (winner === "X") {
      status = "You Win!";
    } else if (!winner && this.emptyIndices(this.state.squares).length === 0) {
      status = "Draw";
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
