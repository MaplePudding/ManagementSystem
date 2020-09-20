import { HashRouter as Router, Link, Route } from 'react-router-dom'
import React, { useState } from 'react'
import Me from './me/me'
import './home.css'
import src from '../logo.png'
import userState from '../userState'
import meImg from './img/me.png'
import notifyImg from './img/notify.png'
import courseImg from './img/course.png'

function HomeComponent(props) {
    let [styleItemF, setStyleItemF] = useState("homeLeftChecked"); 
    let [styleItemS, setStyleItemS] = useState("homeLeftUnChecked");
    let [styleItemT, setStyleItemT] = useState("homeLeftUnChecked");
    let homeLeftItemStyleArr = [setStyleItemF, setStyleItemS, setStyleItemT];
    
    function changeLeftItemStyle(index){
        setStyleItemF("homeLeftUnChecked");
        setStyleItemS("homeLeftUnChecked");
        setStyleItemT("homeLeftUnChecked");
        homeLeftItemStyleArr[index]("homeLeftChecked");
    }

    if(userState.getIdenty() === 'student'){
        return (
            <div id="homeCom">
                <Router>
                    <div id="homeComLeft">
                        <img src={src} />
                        <div onClick={ () => changeLeftItemStyle(0)} className={styleItemF}>
                            <Link to="/home/me"><img src={meImg}/><div className={styleItemF}>Me</div></Link>
                        </div>
                        <div onClick={ () => changeLeftItemStyle(1)} className={styleItemS}>
                            <Link to="/home/course"><img src={courseImg}/><div className={styleItemS}>MyCourse</div></Link>
                        </div>
                        <div onClick={ () => changeLeftItemStyle(2)} className={styleItemT}>
                            <Link to="/home/notification"><img src={notifyImg}/><div className={styleItemT}>Notification</div></Link>
                        </div>
                    </div>
                    <div id="homeComRight">
                        <Route path="/home/me" />
                    </div>
                </Router>
            </div>
        )
    }
}

export default HomeComponent