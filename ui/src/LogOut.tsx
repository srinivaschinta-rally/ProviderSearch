import * as React from 'react';

function Logout() {

    function logout(){
        localStorage.clear();
        window.location.reload();
    }

    return <a href='#' onClick={logout} style={{color:'inherit'}}>Logout</a>;
}

export default Logout;