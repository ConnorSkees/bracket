import React, { Component } from 'react';

class Round extends Component {
  state = {};

  renderTeam(teams){
    return (
      <React.Fragment>
        <li className="spacer">&nbsp;</li>

        <li className="game game-top winner">{ teams[0] }</li>
        <li className="game game-spacer">&nbsp;</li>
        <li className="game game-bottom loser">{ teams[1] }</li>
      </React.Fragment>
    )
  }

  render() {
    let { teams } = this.props;
    return (
      <ul className="round">
        { teams.map(this.renderTeam) }
        <li className="spacer">&nbsp;</li>
      </ul>
    )
  };
}

export default Round;
