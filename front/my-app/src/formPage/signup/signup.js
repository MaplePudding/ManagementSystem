import React from 'react'
import './signup.css'

function SignupComponent(){
    return(
        <div id="signupCom">
                <form method="post" action="" id="signupForm">
                <input type="text" name="signupName" placeholder="Name:"/>
                <input type="password" name="signupPwd" placeholder="Password:"/>
                <input type="text" name="signupEmail" placeholder="Email"/>
                <button type="submit" id="signupButton">
                    Signup
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </form>
        </div>
    )
}

export default SignupComponent;