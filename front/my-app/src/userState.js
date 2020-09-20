let userState = {
    userName: '',
    identy: '',

    getUserName: function(){
        return this .userName;
    },

    setUserName: function(userName){
        this.userName = userName;
    },

    getIdenty: function(){
        return this.identy;
    },

    setIdenty: function(identy){
        this.identy = identy;
    }
}



export default userState