import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Bracket from './components/Bracket';
import * as serviceWorker from './serviceWorker';

const root = document.getElementById('root');

ReactDOM.render(<App />, root);

serviceWorker.unregister();
