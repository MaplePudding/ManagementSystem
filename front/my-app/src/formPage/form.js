import React , {useState}from 'react'
import { HashRouter as Router, Link, Redirect, Route, useHistory, withRouter } from 'react-router-dom'
import LoginComponent from './login/login.js'
import SignupComponent from './signup/signup.js'
import formImgSrc from '../logo.png'
import './form.css'

function FormComponent(props) {
	let [formOptionIsChecked, setFormOptionIsChecked] = useState('right');

	function changeFormOptionStyle(styleStr) {
		setFormOptionIsChecked(styleStr)
	}

	return (
		<div id="formCom">
			<img src={formImgSrc} />
			<Router>
				<div id="formOption">
					<Link to='/form/signup'><div onClick={() => { changeFormOptionStyle('left') }} className={formOptionIsChecked === 'left' ? 'isChecked' : 'unChecked'}>Signup</div></Link>
					<Link to='/form/login'><div onClick={() => { changeFormOptionStyle('right') }} className={formOptionIsChecked === 'right' ? 'isChecked' : 'unChecked'}>Login</div></Link>
				</div>
				<Route path='/form/signup' render={() => <SignupComponent setFlag={props.setFlag}/>}></Route>
				<Route path='/form/login' render={() => <LoginComponent setFlag={props.setFlag}/>}></Route>
				<Route path='/form'>
					<Redirect to='/form/login'/>
				</Route>
			</Router>
		</div>
	)
}

export default FormComponent;
