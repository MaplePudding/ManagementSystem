import React from 'react'

function StudentItem(props){
    return(
        <div className="studentItem">
            <div className="studentItemName">{props.userName}</div>
            <div className="studentSex">{props.sex}</div>
        </div>
    )
}