import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Board from './board.js';

class Game extends Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
      </div>
    );
  }
}

export default Game;
