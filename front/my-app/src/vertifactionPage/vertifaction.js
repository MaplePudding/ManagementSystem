import React from 'react'
import {HashRouter as Router, Link, Route} from 'react-router-dom'
import LoginComponent from './login/login.js'
import SignupComponent from './signup/signup.js'
import './vertifaction.css'

function VertifactionComponent(){
    return(
        <div id="">
            VertifactionComponent
            <Router>
                <Link to='/vertifaction/signup'>signup</Link>
                <Link to='/vertifaction/login'>login</Link>
                <Route path='/vertifaction/signup' component={SignupComponent}></Route>
                <Route path='/vertifaction/login' component={LoginComponent}></Route>
            </Router>
        </div>
    )
}

export default VertifactionComponent;
