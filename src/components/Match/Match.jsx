import React, { Component } from 'react';
import WinIcon from '../WinIcon';
import LoseIcon from '../LoseIcon';

class Match extends Component {
  state = {};

  renderBottom() {
    let { bottom, inProgress, winnerPos } = this.props;
    let rowClass = winnerPos === 'bottom' ? "team__row winner" : "team__row loser";
    let icon = winnerPos === 'bottom' ? <WinIcon /> : <LoseIcon />

    if (bottom && !inProgress){
      return (
        <div className={ rowClass }>
            <div className="text">
                <div className="team__picked">
                { icon } { bottom.toUpperCase() }
                </div>
            </div>
        </div>
      )
    }
    return "";
  }

  renderTop() {
    let { top, inProgress, winnerPos } = this.props;
    let rowClass = winnerPos === 'top' ? "team__row winner" : "team__row loser";
    let icon = winnerPos === 'top' ? <WinIcon /> : <LoseIcon />
    if (top && !inProgress){
      return (
        <div className={ rowClass }>
            <div className="text">
                <div className="team__picked">
                  { icon } { top.toUpperCase() }
                </div>
            </div>
        </div>
      )
    }
    return "";
  }

  renderInProgress(){
    let { inProgress, top, bottom } = this.props;
    if (inProgress) {
      return (
        <React.Fragment>
          <div className="team__row">
              <div className="text">
                  <div className="team__picked">
                      { top.toUpperCase() }
                  </div>
              </div>
          </div>
          <div className="team__row">
              <div className="text">
                  <div className="team__picked">
                      { bottom.toUpperCase() }
                  </div>
              </div>
          </div>
        </React.Fragment>
      )
    }
  }

  render() {
    return (
      <div className="v2-matchup">
          <div className="matchup__container">
              <div className="matchup__teams">
                  { this.renderInProgress() }
                  { this.renderTop() }
                  { this.renderBottom() }
              </div>
          </div>
      </div>
    )
  };
}

export default Match;
