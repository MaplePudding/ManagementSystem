import React, { useState } from 'react'
import userState from '../../../userState.js'
import ClassListItemCom from './classListItem/classListItem.js'
import Axios from 'axios'
import close from './img/close.png'
import createImg from './img/submit.png'
import addImg from './img/add.png'
import refreshImg from './img/refresh.png'
import './course.css'

function CourseCom() {
    let [classesList, setClassesList] = useState([]);
    let [newClassName, setNewClassName] = useState('');
    let [classFormErrorFlag, setClassFormErrorFlag] = useState(false);
    let [classFormExistsFlag, setClassFormExistsFlag] = useState(false);
    let [showClassFormFlag, setClassFormFlag] = useState(false);
    let [renderedList, setRenderedList] = useState([]);
    let userName = userState.getUserName();

    if (userState.getIdenty === 'student') {

    } else {

        function changeClassName(e) {
            if (e.target.value === '') {
                setClassFormErrorFlag(true);
            } else {
                setClassFormErrorFlag(false);
                setClassFormExistsFlag(false);
            }
            setNewClassName(e.target.value)
        }

        function getClassList() {
            Axios.get(`/api/teacherClasses?userName=${userName}`).then(res => {
                let tempList = [];
                for(let i = 0; i < res.data.length; ++i){
                    tempList.push(<ClassListItemCom className={res.data[i].className} memberNum={res.data[i].memberNum}/>);
                }
                setRenderedList(tempList);
            })
        }

        function newClassNameFilter() {
            let targetCharArr = ["*", "/", "?", ".", ",", "$", "!", "@", "%", "&"];
            for (let i = 0; i < targetCharArr.length; ++i) {
                newClassName = newClassName.replace(targetCharArr[i], "");
            }
        }

        function submitClassForm() {
            newClassNameFilter();
            if (newClassName != '') {
                Axios.get(`/api/newClass?userName=${userName}&className=${newClassName}`).then(res => {
                    console.log(res.data)
                    if (res.data.createClassRes === "Creation failed") {
                        setClassFormExistsFlag(true);
                    } else {
                        alert("Success");
                    }
                })
            }
        }

        function changeClassFormStatus() {
            showClassFormFlag === false ? setClassFormFlag(true) : setClassFormFlag(false);
            setClassFormErrorFlag(false);
            setClassFormExistsFlag(false);
        }

        if(classesList.length == 0){
            let tempList = [];
            Axios.get(`/api/teacherClasses?userName=${userName}`).then(res =>{
                for(let i = 0; i < res.data.length; ++i){
                    tempList.push(<ClassListItemCom className={res.data[i].className} memberNum={res.data[i].memberNum}/>);
                }
                setRenderedList(tempList);
                res.data.push("back");
                setClassesList(res.data)
            })
        }

        return (

            <div id="courseCom">
                <div id="newClassForm" className={showClassFormFlag === true ? "showClassForm" : "hiddenClassForm"}>
                    <div id="classFormInner">
                        <button onClick={changeClassFormStatus} id="closeClassForm">
                            <img src={close} />
                        </button>
                        <input type="text" placeholder="Your Class Name" value={newClassName} onChange={(e) => changeClassName(e)} />
                        <div className={classFormErrorFlag === false ? "classFormErrorMessage classFormErrorHidden" : "classFormErrorMessage classFormErrorShow"}>Class Name Can Not Be Empty</div>
                        <div className={classFormExistsFlag === false ? "classFormErrorMessage classFormErrorHidden" : "classFormErrorMessage classFormErrorShow"}>Class Name Already Exists</div>
                        <button onClick={submitClassForm} id="submitClassForm">Create
                            <img src={createImg} />
                        </button>
                    </div>
                </div>
                <div id="courseTopTitle">
                    <div>My Classes</div>
                    <button onClick={changeClassFormStatus} id="newClassButton">
                        <img src={addImg} />
                        <div>New</div>
                    </button>
                    <button onClick={getClassList} id="refreshButton">
                        <img src={refreshImg} />
                    </button>
                </div>

                <div id="classListContainer">
                    {renderedList}
                </div>
            </div>
        )
    }
}

export default CourseCom