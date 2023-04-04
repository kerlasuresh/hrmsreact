import React from 'react';
import { Navigate } from 'react-router-dom';
import TopHeader from "./Components/Dashboard/TopHeader";
const PrivateRoute = ({ children }) => (
    <div className="">
        {!sessionStorage.getItem('user-info') ? <><Navigate to="/" /></> : <> <TopHeader />{children}</>}
    </div>
)
export default PrivateRoute;