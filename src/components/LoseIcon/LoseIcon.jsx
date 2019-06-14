import React, { Component } from 'react';
import MdCancel from 'react-icons/lib/md/cancel';
import "./styles.scss";

class LoseIcon extends Component {
  state = {};

  render() {
    return (
      <MdCancel className={ "lose-icon" } />
    )
  };
}

export default LoseIcon;
