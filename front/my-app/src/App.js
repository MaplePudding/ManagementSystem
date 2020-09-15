import React from 'react';
import logo from './logo.svg';
import './App.css';
import { HashRouter as Router, Link, Route, useHistory} from 'react-router-dom'
import Form from './formPage/form.js'
import HomeComponent from './homePage/home.js'
import state from './state.js'

function App() {

	if(state.auth == true){
		return(
			<div id="outer">
				<HomeComponent/>
			</div>
		)
	}else{
		return(
			<div id="outer">
				<Form/>
			</div>
		)
	}
}

export default App;
