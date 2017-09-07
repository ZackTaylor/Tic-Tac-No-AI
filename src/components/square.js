import React, { Component } from 'react';
import ReactDOM from 'react-dom';

function Square(props) {
    return (
      <td
        className={"cell " + squareClass(props.value)}
        id={ props.value }
        onClick={ props.onClick }>
      </td>
    );
}

const squareClass = (value) => {
  if (value === "X") {
    return "X";
  } else if (value === "O") {
    return "O";
  } else {
    return "empty";
  }
};

export default Square;
