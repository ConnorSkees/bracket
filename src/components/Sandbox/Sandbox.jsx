import React, { Component } from 'react';
import Bracket from '../Bracket';
import "./styles.scss";

const uuidv4 = require('uuid/v4');

class Sandbox extends Component {
  state = {
    firstRoundTeams: [
      {uuid: uuidv4(), value: ""}
    ],
    isDeleting: false,
    isPreview: false
  };

  addFirstRoundTeam = () => {
    let { firstRoundTeams } = this.state;
    firstRoundTeams.push({uuid: uuidv4(), value: ""});
    this.setState({ firstRoundTeams })
  }

  removeFirstRoundTeam = uuid => {
    let { firstRoundTeams } = this.state;
    firstRoundTeams = firstRoundTeams.filter(team => team.uuid !== uuid);
    this.setState({ firstRoundTeams });
  }

  updateTeamName = (e, uuid) => {
    let { firstRoundTeams } = this.state;
    firstRoundTeams = firstRoundTeams.map(team => {
      if (team.uuid === uuid){
        team.value = e.target.value;
      }
      return team;
    });
    this.setState({ firstRoundTeams });
  }

  _organizeTeams(){
    let teams = this.state.firstRoundTeams.map(x => x.value);
    let rounds = []
    for(let i=0; i < teams.length;){
      let dict = {"top": teams[i]||""};
      if (i+1 < teams.length) {dict["bottom"] = teams[i+1]||"";}
      if (i+1 >= teams.length) {dict["winnerPos"] = "top"}
      console.log(dict);
      rounds.push(dict)
      i += 2;
    }
    return rounds;
  }

  render() {
    let { firstRoundTeams, isDeleting, isPreview } = this.state;
    console.log(this._organizeTeams());
    if (isPreview) {
      return <Bracket teams={ [this._organizeTeams()] } title={ "March Madness 2019" } />
    }
    return (
      <React.Fragment>
        <div style={{ width: "60%", height: "80%", marginLeft: "30%", marginTop: "5%" }}>
          <div className={ "flex-column" }>
            <label htmlFor="title">Bracket Title</label>
            <input type="text" maxLength="22" id="title" placeholder="Bracket Title" />
          </div>
          <div className={ "flex-column" }>
            <div className={ "team-label-container" }>
              <label htmlFor="title">Teams</label>
              <button type="button" onClick={ this.addFirstRoundTeam } className={ "button button-positive" } >+</button>
              <button type="button" onClick={ () => this.setState({isDeleting:!isDeleting}) } className={ "button button-negative" } >-</button>
              <button type="button" onClick={ () => this.setState({isPreview:true}) } className={ "button button-preview" }>Preview</button>
            </div>

            { firstRoundTeams.map((entry, idx) => {
              return <input type="text" style={{ display: "none" }} key={ entry.uuid } onChange={ val => this.updateTeamName(val, entry.uuid) } onClick={isDeleting ? () => this.removeFirstRoundTeam(entry.uuid) : () => {} } maxLength="22" id="title" placeholder={ `Team ${idx+1}`} />
            }) }
          </div>
        </div>
        <Bracket teams={ [this._organizeTeams()] } title={ "March Madness 2019" } />
      </React.Fragment>
    );
  }
}

export default Sandbox;
