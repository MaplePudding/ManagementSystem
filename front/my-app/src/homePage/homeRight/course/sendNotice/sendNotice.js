import React, { useState } from 'react'
import './sendNotice.css'
import closeImg from './img/close.png'
import Axios from 'axios'
import userState from '../../../../userState'

function SendNoticeCom(props) {

    let setSendNoticeComFlag = props.setSendNoticeComFlag;
    let sendNoticeComFlag = props.sendNoticeComFlag;
    let [file, setFile] = useState("");
    let userName = userState.getUserName();

    function changeFile(e){
        setFile(e.target.files[0]);
    }

    function uploadFile(){
        let formData = new FormData();
        let date = new Date().toString();
        let time = date.substring(0,date.lastIndexOf("("));
        console.log(time);
        let config ={
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        }

        if(file != ""){
            formData.append('file', file)
        }

        if(props.noticeCourseName != ''){
            formData.append('courseName', props.noticeCourseName);
        }

        formData.append('userName', userName);
        formData.append('time', time);
        

        console.log(userName)
        console.log(props.noticeCourseName)
        console.log(file)

        Axios.post('/api/uploadNotice', formData, config).then(res => console.log(res.data))
    }

    return (
        <div id="sendNoticeCom" className={props.sendNoticeComFlag ? "showSendNoticeCom" : "hiddenSendNoticeCom"}>
            <div id="sendNoticeComTitle">
                <img src={closeImg} onClick={props.changeSendNoticeComStatus} id="closeSendNoticeCom" />
                Write down the notifaction
            </div>
            <div id="sendNoticeComInner">
                <div id="noticeContent">
                    <label>Content:</label><textarea></textarea>
                </div>
                <div id="noticeAnnex">
                    <label>Add attachments:</label><input type="file" name="noticeFile" onChange={ e => changeFile(e)}/>
                </div>
                <button onClick={uploadFile}>Send</button>
            </div>
        </div>
    )
}

export default SendNoticeCom