import React from 'react';
import ReactDOM from 'react-dom';
import Exam from './components/Exam';
import Result from './components/Result';

import { HashRouter, Route, Switch } from 'react-router-dom';

import './style/index.css';
import './style/default.css';
import './style/radio.css';
import './style/checkboxes.css';
import './style/select.css';


const App = () => (
    <Switch>
        <Route exact path='/' component={Exam}/>
        <Route path='/result/:number' component={Result}/>
    </Switch>
);

ReactDOM.render((
    <HashRouter>
        <App />
    </HashRouter>
    ), document.getElementById('root'));
