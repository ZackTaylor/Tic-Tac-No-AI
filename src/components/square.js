import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Square extends Component {
  render() {
    return (
      <td className={"cell " + this.props.value}
        id={ this.props.value }
        onClick={ () => this.props.onClick()}>
      </td>
    );
  }
}

export default Square;
