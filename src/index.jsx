import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Bracket from './components/Bracket'
import * as serviceWorker from './serviceWorker';

const rounds = {
  "1": [
    {
      "winner": "Lousville",
      "loser": "NC A&T"
    },
    {
      "winner": "Colorado State",
      "loser": "Missouri"
    },
    {
      "winner": "Colorado State",
      "loser": "Missouri"
    },
    {
      "winner": "Colorado State",
      "loser": "Missouri"
    },
    {
      "winner": "Oklahoma State",
      "loser": "Oregon"
    },
    {
      "winner": "Saint Louis",
      "loser": "New Mexico State"
    },
    {
      "winner": "Memphis",
      "loser": "St. Mary's"
    },
    {
      "winner": "Michigan State",
      "loser": "Valparaiso"
    },
    {
      "winner": "Creighton",
      "loser": "Cincinnati"
    },
    {
      "winner": "Duke",
      "loser": "Albany"
    }
  ],
  "2": [
    {
      "winner": "Lousville",
      "loser": "NC A&T"
    },
    {
      "winner": "Colorado State",
      "loser": "Missouri"
    },
    {
      "winner": "Oklahoma State",
      "loser": "Oregon"
    },
    {
      "winner": "Saint Louis",
      "loser": "New Mexico State"
    }
  ],
  "3": [
    {
      "winner": "Lousville",
      "loser": "NC A&T"
    },
    {
      "winner": "Colorado State",
      "loser": "Missouri"
    }
  ],
  "4": [
    {
      "winner": "Lousville",
      "loser": "NC A&T"
    }
  ]
}

const root = document.getElementById('root');

ReactDOM.render(<Bracket rounds={ rounds }/>, root);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
