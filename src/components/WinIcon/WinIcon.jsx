import React, { Component } from 'react';
import MdCheckCircle from 'react-icons/lib/md/check-circle';
import "./styles.scss";

class WinIcon extends Component {
  state = {};

  render() {
    return (
      <MdCheckCircle className={ "win-icon" } />
    )
  };
}

export default WinIcon;
