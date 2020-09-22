import React from 'react'
import { HashRouter as Router, Link, Redirect, Route } from 'react-router-dom'
import Me from './me/me.js'
import './homeRight.css'


function HomeRightCom(props) {

    return (
        <div id="homeRightCom">
            <Router>
                <Route path="/home/me" render={props => <Me history={props.history}/>} />
                <Route path="/home">
                    <Redirect to="/home/me" />
                </Route>
            </Router>
        </div>
    )
}

export default HomeRightCom
