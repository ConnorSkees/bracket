import React, { Component } from 'react';
import Match from './Match'

const uuidv4 = require('uuid/v4');

function generateBracket(teamCount) {
  let round = 1;
  let layout = {};
  let exceptions = {
      0: {1: 0},
      2: {1: 1},
      4: {1: 2, 2: 1},
      6: {1: 3, 2: 2, 3: 1},
      8: {1: 4, 2: 2, 3: 1},
  };

  if (teamCount < 0) {
    return {1: 0};
  }

  if (teamCount % 2 !== 0) {
    teamCount++;
  }

  if (exceptions[teamCount]) {
    return exceptions[teamCount];
  }

  let nearestSixteen = 16;
  while (nearestSixteen < teamCount) {
      nearestSixteen *= 2;
  }
  nearestSixteen = Math.floor(nearestSixteen/2);
  layout[1] = teamCount - (nearestSixteen % teamCount);
  round += 1;
  nearestSixteen = Math.floor(nearestSixteen/2);
  while (nearestSixteen >= 1) {
      layout[round] = nearestSixteen;
      nearestSixteen = Math.floor(nearestSixteen/2);
      round += 1;
  }
  return layout
}

class Bracket extends Component {
  state = {};
  _groupIntoColumns(teams) {
    let groups = []
    for(let i=0; i< teams.length;){
      groups.push(teams.slice(i, i+2))
      i += 2;
    }
    return groups;
  }

  renderTeam(matches){
    return (
        <div key={ uuidv4() } className={ matches.length === 1 ? "group single" : "group"}>
            <div className="col">
              <Match top={ matches[0].top } bottom={ matches[0].bottom } inProgress={ !matches[0].winnerPos } winnerPos={ matches[0].winnerPos }/>
              { matches.length > 1 ? <Match top={ matches[1].top } bottom={ matches[1].bottom } inProgress={ !matches[1].winnerPos } winnerPos={ matches[0].winnerPos } /> : "" }
            </div>
            { matches[0] === teams[teams.length-1][0] ? "" : <div className="connector"></div> }
        </div>
    )
  }

  render() {
    return (
      <div className="ui__popup--container">
          <div className="bracket-view showing-bracket">
              <div className="bracket--full__wrapper">
                  <div className="v2-bracket bracket__content">
                      <div className="bracket__region">
                        { teams.map(team => {
                          return (
                            <div key={ uuidv4() } className="bracket__round">
                              <div className="matchups">
                                { this._groupIntoColumns(team).map(this.renderTeam) }
                              </div>
                            </div>
                          )
                        }) }
                        <div className="region__name">
                          <h3>{ this.props.title || "Placeholder Title" }</h3>
                        </div>
                    </div>
                  </div>
              </div>
          </div>
        </div>
      )
  };
}

export default Bracket;
