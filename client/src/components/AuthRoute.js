import React from 'react'
import { Navigate } from 'react-router-dom';
const AuthRoute = ({isLoggedIn,children}) => {
    if(isLoggedIn){
        return children;
      }
      else{
        return <Navigate to="/login"/>
      }
    }

export default AuthRoute
