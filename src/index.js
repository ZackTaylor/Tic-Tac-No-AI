import React, { Component } from  'react';
import ReactDOM from  'react-dom';
import Square from './components/square.js';
import Game from './components/game.js';
import Board from './components/board.js';

class App extends Component {
  render() {
    return (
      <div className="container text-center">
        <h1>Tic Tac NO! AI</h1>
        <Game />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector(".root"));
