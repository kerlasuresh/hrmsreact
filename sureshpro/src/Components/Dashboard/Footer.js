import React from 'react';
// import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


import logo from "../../images/hrms-logo.png";
// import SideNavigation from './SideNavigation';

const Footer=()=> {
    return (
    <div className='container'>
        <div>
            <img src={logo} alt="Logo" className='p-5'/>
            <a href='/' className='m-5'>Terms & conditions</a>
            <a href='/'>Privicy Policy</a>
        </div>
        
    
    </div>
    );
}
export default Footer;
