import React, { Component } from 'react';
import './App.css';
import './index.css';
import HomeScreen from './screens/home/home.screen';
import BatalhaScreen from './screens/batalha/batalha.screen';
import { Switch, Route } from 'react-router-dom';

class App extends Component {
	render() {
		return (
			<Switch>
				<Route path="/" component={HomeScreen} exact />
				<Route path="/batalha" component={BatalhaScreen} />
			</Switch>
		);
	}
}
export default App;
