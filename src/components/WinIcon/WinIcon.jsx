import React, { Component } from 'react';
import MdCheckCircle from 'react-icons/lib/md/check-circle';

class WinIcon extends Component {
  state = {};

  render() {
    return (
      <MdCheckCircle style={{ color: "green", opacity: .7 }}/>
    )
  };
}

export default WinIcon;
