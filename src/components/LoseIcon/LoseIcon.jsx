import React, { Component } from 'react';
import MdCancel from 'react-icons/lib/md/cancel';

class LoseIcon extends Component {
  state = {};

  render() {
    return (
      <MdCancel style={{ color: "red" }}/>
    )
  };
}

export default LoseIcon;
