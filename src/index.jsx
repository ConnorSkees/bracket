import React from 'react';
import ReactDOM from 'react-dom';
import Sandbox from './components/Sandbox';
import './styles.scss';
import * as serviceWorker from './serviceWorker';

const root = document.getElementById('root');

ReactDOM.render(<Sandbox />, root);

serviceWorker.unregister();
