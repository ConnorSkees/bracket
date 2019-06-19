import React, { Component } from 'react';
import Match from '../Match';
import './styles.scss';

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
  state = {
    focusedValue: "1095ea83-4bef-4457-9e3c-3ca762de1577",
    teams: this.props.teams
  };

  _pushAmount(arr, amt) {
    for(let i=0; i < amt; i++) {
      arr.unshift({ 'top': '', 'bottom': '' });
    }
    return arr;
  }

  _restructureTeams(teams) {
      let len = teams[0].length*2;
      let matchCounts = generateBracket(len);

      for (let key in matchCounts){
        let thisRound = teams[key-1];

        if (!thisRound){
          console.log(key);
          teams[key-1] = this._pushAmount([], matchCounts[key]);

        } else if (thisRound.length < matchCounts[key]) {
          console.log(thisRound);
          teams[key-1] = this._pushAmount(thisRound, matchCounts[key]-teams[key-1].length);

        } else if (thisRound.length > matchCounts[key]) {
          let difference = thisRound.length-matchCounts[key];
          // console.log(key, difference);
          teams[key-1] = thisRound.slice(0, thisRound.length-difference);
          if (teams[key]) {
            console.log(teams[key]);
            // teams[key] = thisRound.slice(thisRound.length-difference, thisRound.length)
          } else {
            teams[key] = thisRound.slice(thisRound.length-difference, thisRound.length)
          }
        } else if (thisRound.length === matchCounts[key]) {
          // console.log(thisRound);
        }
      }
    return teams;
  }

  _groupIntoColumns(teams) {
    let groups = []
    for(let i=0; i< teams.length;){
      groups.push(teams.slice(i, i+2))
      i += 2;
    }
    return groups;
  }

  updateFocus = (newFocusedValue) => {
    let { focusedValue } = this.state;
    if (newFocusedValue !== "" && focusedValue !== newFocusedValue) {
      this.setState({ focusedValue: newFocusedValue })
    }
  }

  renderMatch = matches => {
    let { focusedValue, teams } = this.state;
    let isFinalMatch = matches[0] === teams[teams.length-1][0];
    return (
        <div key={ uuidv4() } className={ `group ${matches.length === 1 ? "single" : ""}`}>
            <div className="col">
              <Match handleMouseOver={ x => this.updateFocus(x) } focusedValue={ focusedValue } top={ matches[0].top } bottom={ matches[0].bottom } winnerPos={ matches[0].winnerPos }/>
              { matches.length > 1
                ? <Match handleMouseOver={ x => this.updateFocus(x) } focusedValue={ focusedValue } top={ matches[1].top } bottom={ matches[1].bottom } winnerPos={ matches[1].winnerPos } />
                : ""
              }
            </div>
            { isFinalMatch ? "" : <div className="connector"></div> }
        </div>
    )
  }

  render() {
    let { title, teams } = this.props;
    let structuredTeams = teams;
    // let structuredTeams = this._restructureTeams(teams);
    return (
      <div className="ui-popup-container">
          <div className="bracket-view showing-bracket">
              <div className="bracket-full-wrapper">
                  <div className="v2-bracket bracket-content">
                      <div className="bracket-region">
                        { structuredTeams.map(team => {
                          return (
                            <div key={ uuidv4() } className="bracket-round">
                              <div className="matchups">
                                { this._groupIntoColumns(team).map(this.renderMatch) }
                              </div>
                            </div>
                          )
                        }) }
                        <div className="region-name">
                          <h3>{ title || "Placeholder Title" }</h3>
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
