import React, { state, useState, useImperativeHandle, forwardRef} from 'react'
import './errorMessage.css'


function ErrorMessageCom(props, ref) {

    let [userNameExistFlag, setUserNameExistFlag] = useState(props.userNameExistFlag);
    let [userNameEmptyFlag, setUserNameEmptyFlag] = useState(props.userNameEmptyFlag);
    let [passwordEmptyFlag, setPasswordExistFlag] = useState(props.passwordEmptyFlag);

    useImperativeHandle(ref, () => ({
        
        changeErrorMessage: (userNameExistFlag, userNameEmptyFlag, passwordEmptyFlag) => {
            setUserNameEmptyFlag(userNameEmptyFlag);
            setUserNameExistFlag(userNameExistFlag);
            setPasswordExistFlag(passwordEmptyFlag);
        }
    }));
    

    return (
        <div className="errorMessageCom">
            <div className={userNameExistFlag ? "errorMessage errorMessageShow" : "errorMessage errorMessageHidden"}>Username already exists</div>
            <div className={userNameEmptyFlag ? "errorMessage errorMessageShow" : "errorMessage errorMessageHidden"}>Username can not be empty</div>
            <div className={passwordEmptyFlag ? "errorMessage errorMessageShow" : "errorMessage errorMessageHidden"}>Password can not be empty</div>
        </div>
    )
}

export default ErrorMessageCom = forwardRef(ErrorMessageCom)