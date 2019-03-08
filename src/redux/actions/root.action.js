

export const LOGGEDIN = 'LOGGEDIN';
export const LOGGED_OUT = 'LOGGED_OUT';
export const EDIT_OBJ = 'EDIT_OBJ'


  export function USER_LOGGEDIN(data){
    console.log(data);
    return { type: LOGGEDIN, payload : data }
  }

  export function USER_LOGGEDOUT(){
    return { type: LOGGED_OUT }
  }

  export function EDIT_OBJ_DATA(data) {
    return { type: EDIT_OBJ, payload : data }    
  }