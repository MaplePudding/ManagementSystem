import React, { state, useState, useImperativeHandle, forwardRef} from 'react'
import './errorMessage.css'

function ErrorMessageCom(props, ref){
    let [loginErrorFlag, setErrorFlag] = useState(props.loginErrorFlag);
    let [emptyFlag, setEmptyFlag] = useState(props.emptyFlag);

    useImperativeHandle(ref, () =>({
        changeErrorMessage: (loginErrorFlag, emptyFlag) =>{
            setEmptyFlag(emptyFlag);
            setErrorFlag(loginErrorFlag);
        }
    }));

    return(
        <div className="loginErrorMessageCom">
            <div className={loginErrorFlag ? "loginErrorMessage loginErrorMessageShow" : "loginErrorMessage loginErrorMessageHidden"}>
                Username or password error
            </div>
            <div className={emptyFlag ? "loginErrorMessage loginErrorMessageShow" : "loginErrorMessage loginErrorMessageHidden"}>
                Username or password cannot be empty
            </div>
        </div>
    )

}

export default ErrorMessageCom = forwardRef(ErrorMessageCom);