import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Square extends Component {
  render() {
    return (
      <td className="cell" id={ this.props.value }></td>
    );
  }
}

export default Square;
