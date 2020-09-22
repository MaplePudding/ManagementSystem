import React, {useState}from 'react'
import { HashRouter as Router, Link, Redirect, Route } from 'react-router-dom'
import './homeLeft.css'
import meImg from '../img/me.png'
import notifyImg from '../img/notify.png'
import courseImg from '../img/course.png'
import src from '../../logo.png'

function HomeLeftCom() {

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

    return (
        <div id="homeLeftCom">
            <img src={src} />
            <div onClick={() => changeLeftItemStyle(0)} className={styleItemF}>
                <Link to="/home/me"><img src={meImg} /><div className={styleItemF}>Me</div></Link>
            </div>
            <div onClick={() => changeLeftItemStyle(1)} className={styleItemS}>
                <Link to="/home/course"><img src={courseImg} /><div className={styleItemS}>MyCourse</div></Link>
            </div>
            <div onClick={() => changeLeftItemStyle(2)} className={styleItemT}>
                <Link to="/home/notification"><img src={notifyImg} /><div className={styleItemT}>Notification</div></Link>
            </div>
        </div>
    )
}

export default HomeLeftCom