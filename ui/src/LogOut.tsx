import * as React from 'react';

function Logout() {

    function logout(){
        localStorage.clear();
        window.location.reload();
    }

    return <span onClick={logout} style={{color:'inherit',cursor:'pointer'}}>Logout</span>;
}

export default Logout;