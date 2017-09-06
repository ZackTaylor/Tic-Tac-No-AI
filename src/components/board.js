import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Square from './square.js';

class Board extends Component {
  constructor() {
    super();
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={ this.state.squares[i] }
        onClick={ () => this.handleClick(i) }
      />
    );
  }

  render() {
    const status = `Next player: ${ this.state.xIsNext ? 'X' : 'O' }`;
      return (
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
    );
  }
}

function calculateWinner(squares) {
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
}

export default Board;
