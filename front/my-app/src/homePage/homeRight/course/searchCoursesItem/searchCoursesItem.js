import React from 'react'
import './searchCoursesItem.css'
import Axios from 'axios'
import userEvent from '@testing-library/user-event'

function SearchCoursesItemCom(props){

    function joinCourse(){
        Axios.get(`/api/joinCourse?userName=${props.userName}&courseName=${props.courseName}`).then(res =>{
            if(res.data === 'Success'){
                props.setCoursesSearchList([]);
                alert("Join Success");
            }else{
                alert("Join Error");
            }
        })
    }

    return(
        <div className="searchCoursesItemCom">
            <div className="searchCoursesItemName">
                {props.courseName}
            </div>
            <button onClick={joinCourse}>Join</button>
        </div>
    )
}

export default SearchCoursesItemCom;