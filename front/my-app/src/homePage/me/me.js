import React from 'react'
import Axios from 'axios'
import userState from '../../userState'


function Me(props){
    let userName = userState.getUserName();
    let identy = userState.getIdenty();
    Axios.get(`/api/me?userName=${userName}&identy=${props.identy}`).then((res) =>{
        console.log(res.data)
    })

    return(
        <div id="MeCom">

        </div>
    )
}

export default Me