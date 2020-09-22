import React, { useState } from 'react'
import Axios from 'axios'
import userState from '../../../userState'
import { HashRouter as Router, Link, Redirect, Route } from 'react-router-dom'
import './me.css'

let renderFlag = false;

function Me(props) {

    let userName = userState.getUserName();
    let identy = userState.getIdenty();
    let [sex, setSex] = useState('');
    let [phone, setPhone] = useState('');
    let [grade, setGrade] = useState('');
    let [password, setPassword] = useState('');
    let [email, setEmail] = useState('');
    let paramsArray = [sex, phone, email, userName];
    let ar= ["sex", "phoneNumber", "email", "userName"];
    let [emailInfoFlag, setEmailInfoFlag] = useState(false);
    let [phoneInfoFlag, setPhoneInfoFlag] = useState(false);

    function changeSex(e) {
        setSex(e.target.value);
    }

    function changePhone(e) {
        setPhone(e.target.value);
        if(e.target.value === '' && phoneInfoFlag === false){
            setPhoneInfoFlag(true);
        }else if(phoneInfoFlag === true){
            setPhoneInfoFlag(false);
        }
    }

    function changeEmail(e) {
        setEmail(e.target.value);
        if(e.target.value === '' && emailInfoFlag === false){
            setEmailInfoFlag(true);
        }else if(emailInfoFlag === true){
            setEmailInfoFlag(false);
        }
    }


    if (grade === '') {
        renderFlag = true;
        Axios.get(`/api/me?userName=${userName}&identy=${identy}`).then((res) => {
            setGrade(res.data.grade);
            setEmail(res.data.email);
            setPassword(res.data.password);
            setSex(res.data.sex)
            setPhone(res.data.phoneNumber);
        })
        setGrade("12");
    }

    function submit(){
        Axios.post('/api/meSubmit', paramsArray, {
            transformRequest:[
                function(data){
                    let ret = '';
                    for(let i in data){
                        ret += encodeURIComponent(ar[i]) + '=' + encodeURIComponent(paramsArray[i]) + '&';
                    }
                    return ret;
                }
            ],
            headers:{
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then((res) =>{
            if(res.data.meSubmitRes === 'SubmitSuccess'){
                alert("Submit Success")
            }else{
                alert("Submit Error")
            }
        })
    }

    return (
        <div id="meCom">
            <div id="meTopTitle">
                Personal Information
            </div>
            <form method="post" action="/api/meSubmit" id="meForm">
                <div>
                    <label>UserName:</label><input value={userName} type="text" readOnly />
                </div>
                <div>
                    <label>Password:</label><input value={password} type="text" readOnly />
                </div>
                <div>
                    <label>Sex:</label>
                    <label>F:</label><input value="F" type="radio" name="sex" checked={sex === 'F' ? true : false} onChange={(e) => changeSex(e)} />
                    <label>M:</label><input value="M" type="radio" name="sex" checked={sex === 'M' ? true : false} onChange={(e) => changeSex(e)} />
                </div>
                <div>
                    <label>Grade:</label><input value={grade} type="text" readOnly />
                </div>
                <div>
                    <label>Email:</label><input value={email} type="text" onChange={(e) => changeEmail(e)} />
                </div>
                <span className={emailInfoFlag === true ? 'showMeItemErrorInfo meItemErrorInfo' : 'hiddenMeItemErrorInfo meItemErrorInfo'}>Not Empty</span>
                <div>
                    <label>Phone:</label><input value={phone} type="text" onChange={(e) => changePhone(e)} />
                </div>
                <span className={phoneInfoFlag === true ? 'showMeItemErrorInfo meItemErrorInfo' : 'hiddenMeItemErrorInfo meItemErrorInfo'}>Not Empty</span>
                <input value="Submit" type="button" onClick={submit} id="submit"/>
            </form>
        </div>
    )
}

export default Me