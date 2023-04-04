import React, { useEffect, useState } from "react";
import SettingsNav from "./innerNav";
import attendanceicon from "../../images/img/attendance-icon.png";
import salaryicon from "../../images/img/salary-icon.png";
import reportsicon from "../../images/img/reports-icon.png";
import leaveicon from "../../images/img/leave-icon.png";
import monthlykraicon from "../../images/img/monthly-kra-icon.png";
function ModuleSelector() {
    return (
        <>
            <div className="container-fluid">
                <SettingsNav />
            </div>
            <section className='allservices'>
                <div className='container'>
                    <h5>Modules</h5>
                    <ul>
                        <li>
                            <a href='#'>
                                <div className='img-box'>
                                    <img src={attendanceicon} alt='Attendance' loading='lazy' />
                                </div>
                                <p>Attendance</p>
                            </a>
                        </li>
                        <li>
                            <a href='#'>
                                <div className='img-box'>
                                    <img src={salaryicon} alt='Salary' loading='lazy' />
                                </div>
                                <p>Payroll</p>
                            </a>
                        </li>
                        <li>
                            <a href='#'>
                                <div className='img-box'>
                                    <img src={reportsicon} alt='Reports' loading='lazy' />
                                </div>
                                <p>Reports</p>
                            </a>
                        </li>
                        <li>
                            <a href='#'>
                                <div className='img-box'>
                                    <img src={leaveicon} alt='Leave' loading='lazy' />
                                </div>
                                <p>Leave Management</p>
                            </a>
                        </li>
                        <li>
                            <a >
                                <div className='img-box'>
                                    <img src={monthlykraicon} alt='Monthly KRA' loading='lazy' />
                                </div>
                                <p>Monthly KRA</p>
                            </a>
                        </li>


                    </ul>
                </div>
            </section>

        </>
    )

}

export default ModuleSelector;