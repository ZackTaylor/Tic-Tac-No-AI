import React, { Component } from  'react';
import ReactDOM from  'react-dom';
import Square from './components/square.js';
import Game from './components/game.js';
import Board from './components/board.js';

class App extends Component {
  render() {
    return (
          <Game />
    );
  }
}

ReactDOM.render(<App />, document.querySelector(".root"));
