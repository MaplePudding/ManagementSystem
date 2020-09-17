import React,{useState} from 'react'
import './login.css'
import Axios from 'axios'

function LoginComponent(props) {

    let userName;
    let password;
    let [errorMessageFlag, setMessageFlag] = useState(false);

    function sendLoginInfo(){
        Axios.get(`/api/login?userName=${userName}&password=${password}`).then((res) =>{
            console.log(res.data)
            if(res.data.loginResponseRes === 'LoginSuccess'){
                props.setFlag(1);
            }else{
                setMessageFlag(true)
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
            <div id="loginCom">
                <input type="text" name="userName" placeholder="Name:" onChange={(e) =>{changeUserName(e)}}/>
                <input type="password" name="password" placeholder="Password:" onChange={(e) =>{changePassword(e)}}/>
                <span className={errorMessageFlag === false ? "errorMessageHidden errorMessage" : "errorMessageShow errorMessage"}>wrong user name or password</span>
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