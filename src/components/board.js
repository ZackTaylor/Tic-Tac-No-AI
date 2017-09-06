import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Square from './square.js';

class Board extends Component {
  renderSquare(i) {
    return <Square value={ i }/>;
  }

  render() {
    const status = 'Next player: X';
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

export default Board;
