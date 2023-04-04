import React, { useState } from "react";
// import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav, Navbar, Form, Button, Container } from "react-bootstrap";
// import { AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import { AiOutlineMenu } from "react-icons/ai";

import logo from "../../images/hrms-logo1.png";
import profile from "../../images/xs/avatar1.jpg";
// import SideNavigation from "./SideNavigation";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { RiNotificationFill } from "react-icons/ri";
import { RiArrowDownSFill } from "react-icons/ri";
import Dropdown from "react-bootstrap/Dropdown";
import "./Header.css";
import SideNavigation from "./SideNavigation";
import InnerSideNavigation from "./InnerSideNavigation";
import DepartmentInnerNav from "../EimAdmin/InnerNav/DepartmentInnerNav";
//header
const Header = () => {
  // const [clockIn, setClockIn] = useState(true);
  // const [clockOut, setClockOut] = useState(false);

  // const webClockIn = () => {
  //   setClockIn(false);
  //   setClockOut(true);
  // };
  // const webClockOut = () => {
  //   setClockOut(false);
  //   setClockIn(true);
  // };
  return (
    <>
      {/* // global-container */}
      <div className='global-container'>
        <div className='  bg-light  p-3  align-items-center row'>
          <div className=' d-flex align-items-center col-md-3'>
            {/* <div className='px-3'>
            <AiOutlineMenu size={40} className='' />
          </div> */}
            <div className='px-3'>
              <Link to='/dashboard'>
                <img src={logo} alt='LOGO' />
              </Link>
            </div>
          </div>
          <div className='col-md-1 d-flex align-items-center'></div>
          <div className=' d-flex align-items-center col-md-4'>
            <div className=' '>
              <input
                className='form-control shadow-lg '
                type='search'
                placeholder='Search'
                aria-label='Search'
              />
            </div>
            <div className=''>
              <button className='btn-secondary shadow-lg rounded'>
                <BsSearch className='m-2 ' color='black' size={16} />
              </button>
            </div>
          </div>
          <div className=' d-flex align-items-center col-md-4'>
            {/* {clockIn ? (
              <div className='px-3'>
                <button
                  className='btn-danger rounded shadow-lg'
                  onClick={webClockIn}>
                  WEB CLOCK-IN
                </button>
              </div>
            ) : null}
            {clockOut ? (
              <div className='px-3'>
                <button
                  className='btn-primary rounded shadow-lg'
                  onClick={webClockOut}>
                  WEB CLOCK-OUT
                </button>
              </div>
            ) : null} */}

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
                  <Dropdown.Item>Log Out</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>

        {/* <DepartmentInnerNav /> */}
        {/* <SideNavigation /> */}
        <InnerSideNavigation />
      </div>
    </>
  );
};

export default Header;
