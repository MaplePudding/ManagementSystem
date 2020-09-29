import React from 'react'
import './studentItem.css'

function StudentItemCom(props){
    return(
        <div className="studentItem">
            <div className="studentItemName">{props.userName}</div>
            <button className="removeStudent">Remove</button>
        </div>
    )
}

export default StudentItemCom