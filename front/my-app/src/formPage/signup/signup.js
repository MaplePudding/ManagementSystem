import React, {useState, useRef}from 'react'
import './signup.css'
import Axios from 'axios'
import ErrorMessageCom from './errorMessage';

function SignupComponent(props) {

    let userName = "";
    let password = "";
    let email = "";
    let position = "student";
    let userNameExistFlag = false;
    let userNameEmptyFlag = false;
    let passwordEmptyFlag = false;
    let errorMessageRef = useRef();



    function changeUserName(e){
        userName = e.target.value;
    }

    function changePassword(e){
        password = e.target.value;
    }

    function changeEmail(e){
        email = e.target.value;
    }

    function changePosition(e){
        position = e.target.value;
    }


    function sendSignupInfo(){
        Axios.post(`/api/signup?userName=${userName}&password=${password}&email=${email}&position=${position}`).then((res) =>{
            if(res.data.signupResponseRes === 'SignupSuccess'){
                userNameEmptyFlag = false;
                userNameExistFlag = false;
                passwordEmptyFlag = false;
                errorMessageRef.current.changeErrorMessage(userNameExistFlag, userNameEmptyFlag, passwordEmptyFlag);
                alert("Signup Success")
            }else{
                if(res.data.signupResponseRes === 'Empty'){
                    userNameEmptyFlag = true;
                    userNameExistFlag = false;
                    passwordEmptyFlag = true;
                    errorMessageRef.current.changeErrorMessage(userNameExistFlag, userNameEmptyFlag, passwordEmptyFlag)
                }else{
                    userNameEmptyFlag = false;
                    userNameExistFlag = true;
                    passwordEmptyFlag = false;
                    errorMessageRef.current.changeErrorMessage(userNameExistFlag, userNameEmptyFlag, passwordEmptyFlag)
                }
            }
        });
    }

    return (
        <div id="signupCom">
            <div id="signupForm">
                <input type="text" name="userName" placeholder="Name:" onChange={(e) => changeUserName(e)} />
                <input type="password" name="password" placeholder="Password:" onChange={(e) => changePassword(e)} />
                <input type="text" name="email" placeholder="Email" onChange={(e) => changeEmail(e)} />
                <div id="signupPositionGroup">
                    <div>
                        <label>student</label><input type="radio" name="position" value="student" onChange={(e) => changePosition(e)} checked/>
                    </div>
                    <div>
                        <label>teacher</label><input type="radio" name="position" value="teacher" onChange={(e) => changePosition(e)}/>
                    </div>
                </div>
                <ErrorMessageCom userNameExistFlag={userNameExistFlag} userNameEmptyFlag={userNameEmptyFlag} passwordEmptyFlag={passwordEmptyFlag} ref={errorMessageRef}/>
                <button id="signupButton" onClick={sendSignupInfo}>
                    Signup
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </div>
    )
}

export default SignupComponent;