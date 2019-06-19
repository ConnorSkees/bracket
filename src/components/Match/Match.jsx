import React, { Component } from 'react';
import WinIcon from '../WinIcon';
import LoseIcon from '../LoseIcon';

class Match extends Component {
  state = {};
  render() {
    let { top, bottom, focusedValue, winnerPos } = this.props;
    let defaultFocusedValue = "1095ea83-4bef-4457-9e3c-3ca762de1577";
    top = top || "";

    let winPosTop = winnerPos === 'top';
    let winPosBtm = winnerPos === 'bottom';
    let winnerExists = winPosTop || winPosBtm;

    let topIcon = winnerExists ? (winPosTop ? <WinIcon /> : <LoseIcon />) : "";
    let btmIcon = winnerExists ? (winPosBtm ? <WinIcon /> : <LoseIcon />) : "";

    let isSolo = Boolean((top && !bottom) || (!top && bottom) || bottom === undefined);
    top = top.toUpperCase();
    bottom = isSolo ? undefined : bottom.toUpperCase();

    // console.log(focusedValue, top);

    let topClass = `team-row ${(focusedValue === top) ? "focused" : "" } ${ winnerExists ? (winPosTop ? "winner" : "loser") : "" } ${ isSolo ? "solo" : "" }`;
    let btmClass = `team-row ${(!isSolo && focusedValue === bottom) ? "focused" : "" } ${ winnerExists ? (winPosBtm ? "winner" : "loser") : "" }`;

    return (
      <div className="match">
          <div className="matchup-container">
              <div className="matchup-teams">
                <div onMouseLeave={ () => this.props.handleMouseOver(defaultFocusedValue)} onMouseOver={ () => this.props.handleMouseOver(top.toUpperCase())} className={ topClass }>
                    <div className="text">
                        { topIcon } { top.toUpperCase() }
                    </div>
                </div>
                { isSolo ? "" : (
                  <div onMouseLeave={ () => this.props.handleMouseOver(defaultFocusedValue)} onMouseOver={ () => this.props.handleMouseOver(bottom.toUpperCase())} className={ btmClass }>
                    <div className="text">
                        { btmIcon } { bottom.toUpperCase() }
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
