import React from 'react';
import ReactDOM from 'react-dom';
import Sandbox from './components/Sandbox';
import Bracket from './components/Bracket';
import './styles.scss';
import * as serviceWorker from './serviceWorker';

const root = document.getElementById('root');
const _teams = [
  [
    {'top': 'Duke', 'bottom': 'Albany', 'winnerPos': 'top'},
    {'top': 'Colorado State', 'bottom': 'Harvard', 'winnerPos': 'top'},
    {'top': 'Oklahoma State', 'bottom': 'Oregon', 'winnerPos': 'bottom'},
    {'top': 'Saint Louis', 'bottom': 'New Mexico State', 'winnerPos': 'top'},
    {'top': 'Memphis', 'bottom': 'St. Mary\'s', 'winnerPos': 'top'},
    {'top': 'Michigan State', 'bottom': 'Valparaiso', 'winnerPos': 'top'},
    // {'top': 'Creighton', 'bottom': 'Cincinnati', 'winnerPos': 'top'},
  ],
  [
    {'top': 'Duke', 'bottom': 'Colorado State', 'winnerPos': 'top'},
    {'top': 'Oregon', 'bottom': 'Saint Louis', 'winnerPos': 'bottom'},
    {'top': 'Memphis', 'bottom': 'Michigan State', 'winnerPos': 'top'},
    {'top': 'Creighton', 'bottom': 'Cincinnati', 'winnerPos': 'top'},
  ],
  [
    {'top': 'Duke', 'bottom': 'Saint Louis', 'winnerPos': 'top'},
    {'top': 'Memphis', 'bottom': 'Creighton', 'winnerPos': 'top'},
  ],
  [
    {'top': 'Duke', 'bottom': 'Memphis', 'winnerPos': 'bottom'},
  ],
]


// ReactDOM.render(<Bracket teams={_teams}/>, root);
ReactDOM.render(<Sandbox />, root);

serviceWorker.unregister();
