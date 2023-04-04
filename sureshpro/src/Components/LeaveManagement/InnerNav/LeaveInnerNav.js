import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
const LeaveInnerNav = () => {
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
        <div className='row' style={{ background: "#0b0b45" }}>
          <div className='navbar navbar-expand-lg'>
            <div className='container'>
              <div className='row' style={{ width: "100%" }}>
                <div className='col-md-12'>
                  <h4 className='text-white'>Leave Management</h4>
                  <div className='collapse navbar-collapse' id='navbarNav'>
                    <ul className='navbar-nav'>
                      <li className='nav-item'>
                      <NavLink className='nav-link text-white' to='/LeaveManagelogs' activeclassname="active">
                          Logs
                        </NavLink >
                      </li>
                      <li className='nav-item'>
                      <NavLink className='nav-link text-white' to='/leaveRules' activeclassname="active">
                          Rules
                        </NavLink >
                      </li>
                      <li className='nav-item' >
                      <NavLink className='nav-link text-white' to='/leavebalance' activeclassname="active">
                          Balance
                        </NavLink >
                      </li>
                      <li className='nav-item' >
                      <NavLink className='nav-link text-white' to='/leavesettings' activeclassname="active">
                          Settings
                        </NavLink >
                      </li>

                      
                    </ul>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
        
    </>
  );
};
export default LeaveInnerNav;
