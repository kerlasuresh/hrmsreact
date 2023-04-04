import React, { useState, useEffect } from "react";
import profileuserImg from "../../images/img/profile-user.png";
import menuIcon from "../../images/img/menu-icon.png";
import indianHrLogo from "../../images/img/logo.png";
import { Link, useNavigate } from "react-router-dom";
import SideNavigation from "./SideNavigation";
const TopHeader = () => {
    const [sideBar, setSideBar] = useState(false)
    const [userInfo, setUserInfo] = useState({ data: {} })
    const navigate = useNavigate();
    const Logout = () => {
        sessionStorage.removeItem("user-info");
        navigate("/");
    };
    useEffect(() => {
        var userInfo = JSON.parse(sessionStorage.getItem("user-info"));
        setUserInfo(userInfo);
    }, [])
    const showSidebar = () => {
        setSideBar(!sideBar);
    }
    return (
        <>
            <section className="topbardes">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="bars"><div onClick={() => showSidebar()}><img src={menuIcon} alt="Menu" loading="lazy" /></div></div>
                            <Link to="/" ><img src={indianHrLogo} alt="Indian HR" loading="lazy" /></Link>
                        </div>
                        <div className="col-lg-6 text-right">
                            <ul className="searchbell">
                                <li><a href="#"><i className="fa fa-bell" aria-hidden="true"></i> <b>4</b></a></li>
                                <li><small>Good morning</small>{userInfo.data.companyName}</li>
                                <li><img src={profileuserImg} alt="User" loading="lazy" /></li>
                            </ul>
                            <div className="dropdown droplist">
                                <button type="button" className="btn dropdown-toggle" data-toggle="dropdown"></button>
                                <div className="dropdown-menu dropdown-menu-right">
                                    <Link to="/workweeksetting" className="dropdown-item" >Settings</Link>
                                    <a className="dropdown-item" href="#">File Manager</a>
                                    <a className="dropdown-item" href="#">My Plan</a>
                                    <Link to="/changepassword" className="dropdown-item" >Change Password</Link>
                                    <a className="dropdown-item" onClick={() => Logout()}>Log Out</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <SideNavigation showSide={sideBar} />
        </>
    )
}

export default TopHeader;