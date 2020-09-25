import React, { useState } from 'react'
import Axios from 'axios'
import './classListItem.css'
import extendImg from './img/extend.png'

function ClassListItemCom(props) {

    let [heightFlag, setHeightFlag] = useState(false);

    function getClassItemDetail(){
        
    }

    function changeItemHeight(){
        heightFlag === false ? setHeightFlag(true) : setHeightFlag(false);
    }

    
    return (
        <div className={heightFlag ? "classListItemCom classListItemExtend" : "classListItemCom classListItemComShrink"}>
            <img src={extendImg} className={heightFlag ? "extendImg extendImgRotate" : "extendImg"} onClick={changeItemHeight}/>
            <div className="classListItemName">
                {props.className}
            </div>
            <div className="classListItemNum">
            Number of students:{props.memberNum}
            </div>
            <div className="classListContentTable">

            </div>
        </div>)
}

export default ClassListItemCom