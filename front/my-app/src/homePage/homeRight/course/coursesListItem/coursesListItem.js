import React from 'react'
import './coursesListItem.css'

function CoursesListItemCom(props){

    return(
        <div className="coursesListItem">
            <div className="coursesListItemName">
                {props.courseName}
            </div>
            <button>Delete</button>
        </div>
    )

}

export default CoursesListItemCom