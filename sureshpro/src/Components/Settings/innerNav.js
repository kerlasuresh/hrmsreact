import React, { useState } from "react";
import { NavLink } from "react-router-dom";
const SettingsNav = () => {
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
    return (
        <>
            <div className='row ' style={{ background: "#0b0b45", marginTop: 0 }}>
                <div className='navbar navbar-expand-lg'>
                    <div className='container'>
                        <div className="row">
                            <h4 className='text-white px-2'>Settings</h4>
                            <div className='collapse navbar-collapse' id='navbarNav'>
                                <ul className='navbar-nav'>
                                    <li className='nav-item' >
                                        <NavLink className='nav-link text-white' to='/workweeksetting' activeclassname="active">
                                            Work Week
                                        </NavLink >
                                    </li>
                                    <li className='nav-item' >
                                        <NavLink className='nav-link text-white' to='/moduleselector' activeclassname="active">
                                            Module Selector
                                        </NavLink >
                                    </li>
                                    <li className='nav-item'>
                                        <NavLink className='nav-link text-white' to='/controlPermissions' activeclassname="active">
                                            Controls and Permissions
                                        </NavLink >
                                    </li>
                                    <li className='nav-item'>
                                        <NavLink className='nav-link text-white' to='/designation' activeclassname="active">
                                            Bank Integration
                                        </NavLink >
                                    </li>
                                    <li className='nav-item' >
                                        <NavLink className='nav-link text-white' to='/announcement' activeclassname="active">
                                            QuickBooks
                                        </NavLink >
                                    </li>
                                    <li className='nav-item' >
                                        <NavLink className='nav-link text-white' to='/setupwizard' activeclassname="active">
                                            Setup Wizard
                                        </NavLink >
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default SettingsNav;
