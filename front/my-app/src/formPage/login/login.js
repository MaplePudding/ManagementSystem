import React,{useState, useRef} from 'react'
import './login.css'
import Axios from 'axios'
import ErrorMessageCom from './errorMessage.js'

function LoginComponent(props) {

    let userName = "";
    let password = "";
    let position = "student";
    let loginErrorFlag = false;
    let emptyFlag = false;
    let errorMessageRef = useRef();

    function sendLoginInfo(){
        Axios.get(`/api/login?userName=${userName}&password=${password}&position=${position}`).then((res) =>{
            if(res.data.loginResponseRes === 'LoginSuccess'){
                props.setFlag(1);
            }else{
                if(res.data.loginResponseRes === 'Empty'){
                    emptyFlag = true;
                    loginErrorFlag = false;
                    errorMessageRef.current.changeErrorMessage(loginErrorFlag, emptyFlag);
                }else{
                    emptyFlag = false;
                    loginErrorFlag = true;
                    errorMessageRef.current.changeErrorMessage(loginErrorFlag, emptyFlag);
                }
            }
        })
    }

    function changeUserName(e){
        userName = e.target.value;
    }

    function changePassword(e){
        password = e.target.value;
    }

    function changePosition(e){
        position = e.target.value;
    }

    return (
        <div id="loginCom">
            <div id="loginCom">
                <input type="text" name="userName" placeholder="Name:" onChange={(e) =>{changeUserName(e)}}/>
                <input type="password" name="password" placeholder="Password:" onChange={(e) =>{changePassword(e)}}/>
                <div id="loginPositionGroup">
                    <div>
                        <label>student</label><input type="radio" name="position" value="student" checked onChange = {(e) => changePosition(e)}/>
                    </div>
                    <div>
                        <label>teacher</label><input type="radio" name="position" value="teacher" onChange = {(e) => changePosition(e)}/>
                    </div>
                </div>
                <ErrorMessageCom loginErrorFlag={loginErrorFlag} emptyFlag={emptyFlag} ref={errorMessageRef}/>
                <button id="loginButton" onClick={sendLoginInfo}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Login
                    </button>
            </div>
        </div>
    )
}

export default LoginComponent;