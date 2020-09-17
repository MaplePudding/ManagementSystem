import React, {useState}from 'react';
import logo from './logo.svg';
import './App.css';
import { HashRouter as Router, Link, Redirect, Route} from 'react-router-dom'
import Form from './formPage/form.js'
import HomeComponent from './homePage/home.js'
import FormComponent from './formPage/form.js';
import userEvent from '@testing-library/user-event';


/**
 * function App(props) {
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
 */

function App(props){

		let [reRenderFlag, setFlag] = useState(0);

		if(reRenderFlag == 1){
			console.log(2)
			return(
				<div id="outer">
					<Router>
						<Redirect to='/home'/>
						<Route path='/home' component={HomeComponent}/>
					</Router>
				</div>
			)
		}else{
			return(
				<div id="outer">
					<Router>
						<Redirect to='/form'/>
						<Route path='/form' render={ props => <FormComponent setFlag={setFlag}/>}/>
					</Router>
				</div>
			)
		}

}


export default App;
