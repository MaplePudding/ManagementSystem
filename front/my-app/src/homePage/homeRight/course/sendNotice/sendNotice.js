import React, { useState } from 'react'
import './sendNotice.css'
import closeImg from './img/close.png'
import Axios from 'axios'

function SendNoticeCom(props) {

    let setSendNoticeComFlag = props.setSendNoticeComFlag;
    let sendNoticeComFlag = props.sendNoticeComFlag;

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
                    <label>Add attachments:</label><input type="file" name="noticeFile" />
                </div>
                <button>Send</button>
            </div>
        </div>
    )
}

export default SendNoticeCom