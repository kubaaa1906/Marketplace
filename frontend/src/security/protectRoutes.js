import React from "react";
import {Navigate} from "react-router-dom";

const protectRoutes = ({role, allowedRoles, children}) => {
    if(!role){
        return <Navigate to="/login" replace/>
    }
    if(!allowedRoles.includes(role)){
        return <Navigate to="/main" replace/>
    }

    return children;
}

export default protectRoutes;