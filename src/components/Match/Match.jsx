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
          <div className="matchup__container">
              <div className="matchup-teams">

                <div className={ topClass }>
                    <div className="text">
                        <div className="team__picked">
                          { topIcon }  { top.toUpperCase() }
                        </div>
                    </div>
                </div>
                { isSolo ? "" : (
                  <div className={ btmClass }>
                    <div className="text">
                      <div className="team__picked">
                        { btmIcon }  { bottom.toUpperCase() }
                      </div>
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
