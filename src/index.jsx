import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Bracket from './components/Bracket'
import * as serviceWorker from './serviceWorker';

const root = document.getElementById('root');
const teams = [
  [
    {'top': 'Duke', 'bottom': 'Albany', 'winnerPos': 'top'},
    {'top': 'Colorado State', 'bottom': 'Harvard', 'winnerPos': 'top'},
    {'top': 'Oklahoma State', 'bottom': 'Oregon', 'winnerPos': 'bottom'},
    {'top': 'Saint Louis', 'bottom': 'New Mexico State', 'winnerPos': 'top'},
    {'top': 'Memphis', 'bottom': 'St. Mary\'s', 'winnerPos': 'top'},
    {'top': 'Michigan State', 'bottom': 'Valparaiso', 'winnerPos': 'top'},
    {'top': 'Creighton', 'bottom': 'Cincinnati', 'winnerPos': 'top'},
  ],
  [
    {'top': 'Lousville', 'bottom': 'Colorado State', 'winnerPos': 'bottom'},
    {'top': 'Oklahoma State', 'bottom': '', 'winnerPos': 'top'},
    // {'top': 'Memphis', 'bottom': 'Michigan State', 'winnerPos': 'top'},
    // {'top': 'Creighton', 'bottom': 'Duke', 'winnerPos': 'top'},
  ],
  // [
  //   {'top': 'Lousville', 'bottom': 'Oklahoma State', 'winnerPos': 'top'},
  //   {'top': 'Memphis', 'bottom': 'Creighton', 'winnerPos': 'top'},
  // ],
  // [
  //   {'top': 'Lousville', 'bottom': 'Memphis'},
  // ],
]


ReactDOM.render(<Bracket teams={ teams } title={ "March Madness 2019" } />, root);

serviceWorker.unregister();
