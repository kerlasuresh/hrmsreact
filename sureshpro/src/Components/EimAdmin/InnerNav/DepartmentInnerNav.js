import React, { useState } from "react";
import { NavLink } from "react-router-dom";
const DepartmentInnerNav = () => {
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
              <h4 className='text-white'>Company Profile</h4>
              <div className='collapse navbar-collapse' id='navbarNav'>
                <ul className='navbar-nav'>
                  <li className='nav-item' >
                    <NavLink className='nav-link text-white' to='/organization' activeclassname="active">
                      Overview
                    </NavLink >
                  </li>
                  <li className='nav-item' >
                    <NavLink className='nav-link text-white' to='/address' activeclassname="active">
                      Address
                    </NavLink >
                  </li>
                  <li className='nav-item'>
                    <NavLink className='nav-link text-white' to='/department' activeclassname="active">
                      Department
                    </NavLink >
                  </li>
                  <li className='nav-item'>
                    <NavLink className='nav-link text-white' to='/designation' activeclassname="active">
                      Designation
                    </NavLink >
                  </li>
                  <li className='nav-item' >
                    <NavLink className='nav-link text-white' to='/announcement' activeclassname="active">
                      Announcement
                    </NavLink >
                  </li>
                  <li className='nav-item' >
                    <NavLink className='nav-link text-white' to='/policiess' activeclassname="active">
                      Policies
                    </NavLink >
                  </li>

                  <li className='nav-item' >
                    <NavLink className='nav-link text-white' to='/statutory' activeclassname="active">
                      Statutory
                    </NavLink >
                  </li>
                  <li className='nav-item' >
                    <NavLink className='nav-link text-white' to='/admin' activeclassname="active">
                      Admin
                    </NavLink >
                  </li>
                  {/* <li className='nav-item' disabled>
                      <Link
                        className='nav-link text-white'
                        to='/organizationhrms'>
                        Organization HRMS
                      </Link>
                    </li> */}



                  {/* <li className='nav-item' >
                    <NavLink className='nav-link text-white' to='/messages'>
                      Messages
                    </NavLink >
                  </li> */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default DepartmentInnerNav;
