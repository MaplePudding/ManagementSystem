import React, { useState } from 'react'
import userState from '../../../userState.js'
import ClassListItemCom from './classListItem/classListItem.js'
import Axios from 'axios'
import close from './img/close.png'
import createImg from './img/submit.png'
import addImg from './img/add.png'
import joinImg from './img/joinCourse.png'
import refreshImg from './img/refresh.png'
import searchImg from './img/search.png'
import SearchCoursesItemCom from './searchCoursesItem/searchCoursesItem.js'
import CoursesListItem from './coursesListItem/coursesListItem.js'
import './course.css'

function CourseCom() {
    let [classesList, setClassesList] = useState([]);
    let [newClassName, setNewClassName] = useState('');
    let [classFormErrorFlag, setClassFormErrorFlag] = useState(false);
    let [classFormExistsFlag, setClassFormExistsFlag] = useState(false);
    let [showClassFormFlag, setClassFormFlag] = useState(false);
    let [renderedList, setRenderedList] = useState([]);
    let [searchContent, setSearchContent] = useState("");
    let [coursesFormFlag, setCoursesFormFlag] = useState(false);
    let [coursesSearchList, setCoursesSearchList] = useState(false);
    let [coursesList, setCoursesList] = useState("");
    let userName = userState.getUserName();

    if (userState.getIdenty() === 'student') {

        function changeCoursesFormStatus() {
            coursesFormFlag === false ? setCoursesFormFlag(true) : setCoursesFormFlag(false);
        }

        function changeSearchContent(e) {
            setSearchContent(e.target.value);
        }

        function searchCourses() {
            if(searchContent != ''){
                let searchContentFilter = ["*", "/", "?", ".", ",", "$", "!", "@", "%", "&"];
                
                for(let i = 0; i < searchContentFilter.length; ++i){
                    searchContent.repeat(searchContentFilter[i], "");
                }

                Axios.get(`/api/searchCourses?searchContent=${searchContent}&userName=${userName}`).then(res => {
                    let tempCoursesList = [];
                    for(let i = 0; i < res.data.length; ++i){
                        tempCoursesList.push(<SearchCoursesItemCom courseName={res.data[i].className} userName={userName} setCoursesSearchList={setCoursesSearchList}/>)
                    }
                    setCoursesSearchList(tempCoursesList);
                });
            }else{
                setCoursesSearchList([]);
            }
        }

        function getCoursesList() {
            Axios.get(`/api/studentCourses?userName=${userName}`).then(res =>{
                let tempCoursesList = [];
                res.data = res.data.split("*");
                for(let i = res.data.length - 1; i >= 0; --i){
                    if(res.data[i] === ""){
                        res.data.splice(i, 1);
                    }
                }
                for(let i = 0; i < res.data.length; ++i){
                    tempCoursesList.push(<CoursesListItem courseName={res.data[i]}/>)
                }
                setCoursesList(tempCoursesList);
            });
        }

        if(coursesList === ''){
            getCoursesList();
        }

        return (
            <div id="courseCom">
                <div id="searchCoursesForm" className={coursesFormFlag === false ? "hiddenCoursesForm" : "showCoursesForm"}>
                    <button onClick={changeCoursesFormStatus} id="closeCoursesForm">
                        <img src={close} />
                    </button>
                    <div id="searchOuter">
                        <input type="text" value={searchContent} onChange={e => changeSearchContent(e)} placeholder="Course Name:"/>
                        <button onClick={searchCourses} id="searchCourses">
                            <img src={searchImg}/>
                        </button>
                    </div>
                    <div id="searchCoursesContent">
                        {coursesSearchList}
                    </div>
                </div>
                <div id="courseTopTitle">
                    <div>My Courses</div>
                    <button onClick={changeCoursesFormStatus} id="joinCoursesButton">
                        <img src={joinImg} />
                        <div>Join</div>
                    </button>
                    <button onClick={getCoursesList} id="refreshButton">
                        <img src={refreshImg} />
                    </button>
                </div>
                <div id="coursesListContainer">
                    {coursesList}
                </div>
            </div>
        )

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
                for (let i = 0; i < res.data.length; ++i) {
                    tempList.push(<ClassListItemCom className={res.data[i].className} memberNum={res.data[i].memberNum} />);
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

        if (classesList.length == 0) {
            let tempList = [];
            Axios.get(`/api/teacherClasses?userName=${userName}`).then(res => {
                for (let i = 0; i < res.data.length; ++i) {
                    tempList.push(<ClassListItemCom className={res.data[i].className} memberNum={res.data[i].memberNum} />);
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