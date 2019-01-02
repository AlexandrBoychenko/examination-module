import React from 'react';
import ReactDOM from 'react-dom';
import Result from './components/Result';
import Questions from './components/Questions';

import { HashRouter, Route, Switch } from 'react-router-dom';

import './style/index.css';
import './style/default.css';
import './style/radio.css';
import './style/checkboxes.css';
import './style/select.css';


const App = () => (
    <Switch>
        <Route exact path='/' component={Examine}/>
        <Route path='/result/:number' component={Result}/>
    </Switch>
);

class Examine extends React.Component {

    render() {
        return (
            <form className="examine">
                <ExamineTitle/>
                <Questions />
            </form>
        );
    }
}

class ExamineTitle extends React.Component {

    render() {
        return (
            <div className="titles">
                <h1>Экзаменационный модуль</h1>
                <h2>Тема: Астрономия</h2>
            </div>
        )
    }
}

ReactDOM.render((
    <HashRouter>
        <App />
    </HashRouter>
    ), document.getElementById('root'));
