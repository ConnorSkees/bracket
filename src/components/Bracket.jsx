import React, { Component } from 'react';
import Match from './Match'

const uuidv4 = require('uuid/v4');

const teams = [
  [
    {'top': 'Lousvillle', 'bottom': 'NC A&T', 'winnerPos': 'top'},
    {'top': 'Colorado State', 'bottom': 'Missouri', 'winnerPos': 'top'},
    {'top': 'Oklahoma State', 'bottom': 'Oregon', 'winnerPos': 'top'},
    {'top': 'Saint Louis', 'bottom': 'New Mexico State', 'winnerPos': 'top'},
    {'top': 'Memphis', 'bottom': 'St. Mary\'s', 'winnerPos': 'top'},
    {'top': 'Michigan State', 'bottom': 'Valparaiso', 'winnerPos': 'top'},
    {'top': 'Creighton', 'bottom': 'Cincinnati', 'winnerPos': 'top'},
    {'top': 'Duke', 'bottom': 'Albany', 'winnerPos': 'top'},
  ],
  [
    {'top': 'Lousville', 'bottom': 'Colorado State', 'winnerPos': 'top'},
    {'top': 'Oklahoma State', 'bottom': 'Saint Louis', 'winnerPos': 'top'},
    {'top': 'Memphis', 'bottom': 'Michigan State', 'winnerPos': 'top'},
    {'top': 'Creighton', 'bottom': 'Duke', 'winnerPos': 'top'},
  ],
  [
    {'top': 'Lousville', 'bottom': 'Oklahoma State', 'winnerPos': 'top'},
    {'top': 'Memphis', 'bottom': 'Creighton', 'winnerPos': 'top'},
  ],
  [
    {'top': 'Lousville', 'bottom': 'Memphis'},
  ],
]

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
