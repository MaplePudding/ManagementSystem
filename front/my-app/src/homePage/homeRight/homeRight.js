import React from 'react'
import { HashRouter as Router, Link, Redirect, Route } from 'react-router-dom'
import MeCom from './me/me.js'
import CourseCom from './course/course.js'
import './homeRight.css'


function HomeRightCom(props) {

    return (
        <div id="homeRightCom">
            <Router>
                <Route path="/home/me" render={props => <MeCom history={props.history}/>}>
                    
                </Route>
                <Route path="/home">
                    <Redirect to="/home/me"/>
                </Route>
                <Route path="/home/course" component={CourseCom}/>
            </Router>
        </div>
    )
}

export default HomeRightCom
