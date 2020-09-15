import React from 'react'
import './login.css'

function LoginComponent() {
    return (
        <div id="loginCom">
            <form method="get" action="" id="loginForm">
                <input type="text" name="loginName" placeholder="Name:" />
                <input type="password" name="loginPwd" placeholder="Password:" />
                <button id="loginButton">
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