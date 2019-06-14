import React, { Component } from 'react';
import WinIcon from '../WinIcon';
import LoseIcon from '../LoseIcon';

class Match extends Component {
  state = {};

  render() {
    let { top, bottom, winnerPos } = this.props;

    let winPosTop = winnerPos === 'top';
    let winPosBtm = winnerPos === 'bottom';
    let winnerExists = winPosTop || winPosBtm;

    let topIcon = winnerExists ? (winPosTop ? <WinIcon /> : <LoseIcon />) : "";
    let btmIcon = winnerExists ? (winPosBtm ? <WinIcon /> : <LoseIcon />) : "";

    let isSolo = (bottom === "" && top !== "");

    let topClass = `team-row ${ winnerExists ? (winPosTop ? "winner" : "loser") : "" } ${ isSolo ? "solo" : "" }`;
    let btmClass = `team-row ${ winnerExists ? (winPosBtm ? "winner" : "loser") : "" }`;

    return (
      <div className="v2-matchup">
          <div className="matchup-container">
              <div className="matchup-teams">

                <div className={ topClass }>
                    <div className="text">
                          { topIcon }  { top.toUpperCase() }
                    </div>
                </div>
                { isSolo ? "" : (
                  <div className={ btmClass }>
                    <div className="text">
                        { btmIcon }  { bottom.toUpperCase() }
                    </div>
                  </div>)
                }

              </div>
          </div>
      </div>
    )
  };
}

export default Match;
