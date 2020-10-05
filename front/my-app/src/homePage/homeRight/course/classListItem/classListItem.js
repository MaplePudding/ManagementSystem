import React, { useState } from 'react'
import Axios from 'axios'
import './classListItem.css'
import './studentItem/studentItem.js'
import extendImg from './img/extend.png'
import sendImg from './img/send.png'
import StudentItemCom from './studentItem/studentItem.js'

function ClassListItemCom(props) {

    let [heightFlag, setHeightFlag] = useState(false);
    let [studentList, setStudentList] = useState([]);
    let sendNoticeComFlag = props.sendNoticeFlag;
    let setSendNoticeComFlag = props.setSendNoticeComFlag;

    function removeEmptyStr(arr){
        for(let i = arr.length - 1; i >= 0; --i){
            if(arr[i] === ''){
                arr.splice(i, 1);
            }
        }
    }

    function addCptToArr(arr, targetArr){
        for(let i = 0; i < arr.length; ++i){
            targetArr.push(<StudentItemCom userName={arr[i]}/>);
        }
    }

    function getClassItemDetail() {
        Axios.get(`/api/classStudentsList?className=${props.className}`).then(
            res =>{
                let tempStudentList = [];
                res.data = res.data.split("*");
                removeEmptyStr(res.data);
                addCptToArr(res.data, tempStudentList);
                setStudentList(tempStudentList);
            }
        )
    }

    function changeItemHeight() {
        heightFlag === false ? setHeightFlag(true) : setHeightFlag(false);
    }

    return (
        <div className={heightFlag ? "classListItemCom classListItemExtend" : "classListItemCom classListItemComShrink"}>
            <img src={extendImg} className={heightFlag ? "extendImg extendImgRotate" : "extendImg"} onClick={() => { changeItemHeight();getClassItemDetail() }} />
            <img src={sendImg} onClick={ () => {props.changeSendNoticeComStatus(); props.setNoticeCourseName(props.className)}} className="showNoticeImg"/>
            <div className="classListItemName">
                {props.className}
            </div>
            <div className="classListItemNum">
                Number of students:{props.memberNum}
            </div>
            <div className="classListContentTable">
                {studentList}
            </div>
        </div>)
}

export default ClassListItemCom