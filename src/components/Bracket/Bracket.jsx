import React, { Component } from 'react';
import Match from '../Match';
import './styles.scss';

const uuidv4 = require('uuid/v4');

function generateBracket(teamCount) {
  // takes number of teams and gives dict of `round_num: num_of_matches`
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
    bracketLayout: this.props.teams ? generateBracket(this.props.teams.length) : generateBracket(this.props.rounds[0].length),
    rounds: this.props.rounds
  };

  addMissingMatches = (rounds) => {
    let { bracketLayout } = this.state;
    let newRound = rounds;
    for (const [round, numOfMatches] of Object.entries(bracketLayout)) {
      if (rounds[round - 1] === undefined){
        rounds[round - 1] = [];
      }
      let roundLength = rounds[round - 1].length;
      if (roundLength < numOfMatches) {
        for (let i = 0; i < numOfMatches - roundLength; i++){
          newRound[round - 1].push({ 'top': '', 'bottom': '' });
        }
      } else if (roundLength > numOfMatches) {
        console.error(`Too many teams in round ${round} (expected ${numOfMatches} but got ${roundLength})`);
      }
    }
    return newRound;
  }

  sortKeys(unordered) {
    const ordered = {};
    Object.keys(unordered).sort().forEach(function (key) {
      ordered[key] = unordered[key];
    });
    return ordered;
  }

  ensureOrder = (rounds) => {
    // start at one because the order of the first round isn't modified
    for (let ii = 1; ii < rounds.length; ii++) {
      let priorRound = this.groupIntoColumns(rounds[ii-1]);
      let thisRound = rounds[ii];
      let roundOrder = {};
      for (let jj = 0; jj < thisRound.length; jj++){
        let thisMatch = thisRound[jj];
        if (priorRound[jj] === undefined){
          if (roundOrder[-1] === undefined) {
            roundOrder[-1] = [];
          }
          if (thisMatch["top"] === "" && thisMatch["bottom"] === "") {
            roundOrder[-1].unshift(thisMatch);
          } else {
            roundOrder[-1].push(thisMatch);
          }
          continue
        }
        
        let top, bottom;
        if (priorRound[jj].length > 0) {
          top = priorRound[jj][0][priorRound[jj][0]["winnerPos"]];
        }
        if (priorRound[jj].length > 1) {
          bottom = priorRound[jj][1][priorRound[jj][1]["winnerPos"]];
        }
        
        if (thisMatch["top"] === top && thisMatch["bottom"] === bottom){
          roundOrder[jj] = thisMatch;
          continue;
        }
        else {
          let found = false;
          for (let kk = 0; kk < priorRound.length; kk++) {

            if (priorRound[kk].length > 0) {
              top = priorRound[kk][0][priorRound[kk][0]["winnerPos"]];
            }
            if (priorRound[kk].length > 1) {
              bottom = priorRound[kk][1][priorRound[kk][1]["winnerPos"]];
            }
            if (thisMatch["top"] === top && thisMatch["bottom"] === bottom){
              roundOrder[kk] = thisMatch;
              found = true;
              break;
            }

            if (!found) {
              if (roundOrder[-1] === undefined) {
                roundOrder[-1] = [];
              }
              if (thisMatch["top"] === "" && thisMatch["bottom"] === "") {
                roundOrder[-1].unshift(thisMatch);
              } else {
                roundOrder[-1].push(thisMatch);
              }
              break;
            }

          }
        }
      }
      rounds[ii] = Object.values(roundOrder).flat();
    }

  }

  groupIntoColumns(teams) {
    let groups = []
    for(let i=0; i< teams.length; i += 2) {
      groups.push(teams.slice(i, i+2))
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
    let { focusedValue, rounds } = this.state;
    let isFinalMatch = matches[0] === rounds[rounds.length-1][0];
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
    let { title, fillMissing } = this.props;
    let { rounds } = this.state;
    rounds = fillMissing ? this.addMissingMatches(rounds) : rounds;
    // this.ensureOrder(rounds);
    return (
      <div className="ui-popup-container">
          <div className="bracket-view showing-bracket">
              <div className="bracket-full-wrapper">
                  <div className="v2-bracket bracket-content">
                      <div className="bracket-region">
                        { rounds.map(round => {
                          return (
                            <div key={ uuidv4() } className="bracket-round">
                              <div className="matchups">
                                { this.groupIntoColumns(round).map(this.renderMatch) }
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

Bracket.defaultProps = {
  fillMissing: true,
}


export default Bracket;
