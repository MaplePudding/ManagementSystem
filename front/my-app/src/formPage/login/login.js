import React from 'react'
import './login.css'
import Axios from 'axios'

function LoginComponent(props) {

    let userName;
    let password;

    function sendLoginInfo(){
        Axios.get('/api/login',{
            params:{
                userName: userName,
                password: password
            }
        }).then((res) =>{
            if(res.data.loginResponseRes === 'LoginSuccess'){
                props.setFlag(1);
            }
        })
    }

    function changeUserName(e){
        userName = e.target.value;
    }

    function changePassword(e){
        password = e.target.value;
    }

    return (
        <div id="loginCom">
            <form method="get" action="" id="loginForm">
                <input type="text" name="userName" placeholder="Name:" onChange={(e) =>{changeUserName(e)}}/>
                <input type="password" name="password" placeholder="Password:" onChange={(e) =>{changePassword(e)}}/>
                <button id="loginButton" onClick={sendLoginInfo}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Login
                    </button>
            </form>
        </div>
    )
}

export default LoginComponent;