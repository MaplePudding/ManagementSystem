import React , {useState}from 'react'
import { HashRouter as Router, Link, Route, useHistory, withRouter } from 'react-router-dom'
import LoginComponent from './login/login.js'
import SignupComponent from './signup/signup.js'
import formImgSrc from '../logo.png'
import './form.css'

function FormComponent(props) {
	let [formOptionIsChecked, setFormOptionIsChecked] = useState('left');

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
				<Route path='/form/signup' component={SignupComponent}></Route>
				<Route path='/form/login' component={LoginComponent}></Route>
			</Router>
		</div>
	)
}

export default FormComponent;
