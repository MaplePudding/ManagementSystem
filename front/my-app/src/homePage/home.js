import { HashRouter as Router, Link, Redirect, Route } from 'react-router-dom'
import React, { useState } from 'react'
import './home.css'
import userState from '../userState'
import HomeLeftCom from './homeLeft/homeLeft.js'
import HomeRightCom from './homeRight/homeRight'


function HomeComponent(props) {
    if(userState.getIdenty() === 'student'){
        return (
            <div id="homeCom">
                <Router>
                    <HomeLeftCom />
                    <HomeRightCom />
                </Router>
            </div>
        )
    }
}

export default HomeComponent