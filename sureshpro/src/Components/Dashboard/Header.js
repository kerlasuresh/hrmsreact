import React, { useState, useEffect } from "react";
// import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav, Navbar, Form, Button, Container } from "react-bootstrap";
// import { AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import { AiOutlineMenu } from "react-icons/ai";

import logo from "../../images/hrms-logo1.png";
import profile from "../../images/xs/avatar1.jpg";
// import SideNavigation from "./SideNavigation";
import { Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { RiNotificationFill } from "react-icons/ri";
import { RiArrowDownSFill } from "react-icons/ri";
import Dropdown from "react-bootstrap/Dropdown";
import "./Header.css";
import SideNavigation from "./SideNavigation";
import { Logout } from "@mui/icons-material";
import CheckInOut from "./CheckInOut";
//header
const Header = () => {
  let user = JSON.parse(sessionStorage.getItem("user-info"));
  const navigate = useNavigate();
  const [clockIn, setClockIn] = useState(true);
  const [clockOut, setClockOut] = useState(false);

  const webClockIn = () => {
    setClockIn(false);
    setClockOut(true);
  };
  const webClockOut = () => {
    setClockOut(false);
    setClockIn(true);
  };
  const Logout = () => {
    sessionStorage.removeItem("user-info");
    navigate("/");
  };
  // useEffect(()=>{
  //   if(!sessionStorage.getItem('user-info')){
  //     navigate("/");
  //   }
  // },[])
  return (
    // global-container
    <div className='global-container'>
      <div className='  bg-light  p-1  align-items-center row'>
        <div className='col-md-3'>
          <div className='px-3 ' style={{ marginLeft: "58px" }}>
            <Link to='/dashboard'>
              <img src={logo} alt='LOGO' />
            </Link>
          </div>
        </div>


        <div className='col-md-7'>
          <div className='px-3'>
            <CheckInOut />
          </div>
        </div>
        <div className=' d-flex align-items-center col-md-2'>
          <div className='px-3'>
            <RiNotificationFill size={20} />
          </div>
          <div className='px-3'>
            <img src={profile} alt='profile pic' className='rounded-circle' />
          </div>
          <div className='px-3'>
            <Dropdown>
              <Dropdown.Toggle variant='success'></Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>Settings</Dropdown.Item>
                <Dropdown.Item>File Manager</Dropdown.Item>
                <Dropdown.Item>My Plan</Dropdown.Item>
                <Dropdown.Item>Change Password</Dropdown.Item>
                <Dropdown.Item onClick={Logout}>Log Out</Dropdown.Item>
                <Dropdown.Item>{sessionStorage.getItem('username')}</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
      <SideNavigation />
    </div>
  );
};

export default Header;
