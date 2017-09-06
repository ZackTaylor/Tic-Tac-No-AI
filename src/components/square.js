import React, { Component } from 'react';
import ReactDOM from 'react-dom';

function Square(props) {
    return (
      <td
        className={"cell " + props.value}
        id={ props.value }
        onClick={ props.onClick }>
      </td>
    );
}

export default Square;
