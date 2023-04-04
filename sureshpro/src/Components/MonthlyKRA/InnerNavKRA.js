import React, { useState } from "react";
import { Link } from "react-router-dom";
const InnerNavKRA = () => {
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
                        <div className="row">
                            <div className='col-md-12'>
                                <h4 className='text-white'>Monthly KRA</h4>
                                <div className='collapse navbar-collapse' id='navbarNav'>
                                    <ul className='navbar-nav'>
                                        <li className='nav-item active'>
                                            <Link className='nav-link text-white' to='/monthlykra'>
                                                Add Questionnaire
                                            </Link>
                                        </li>
                                        <li className='nav-item'>
                                            <Link className='nav-link text-white' to='/SendQuestionnaire'>
                                                Send Questionnaire
                                            </Link>
                                        </li>
                                        <li className='nav-item' disabled>
                                            <Link className='nav-link text-white' to='/allkrafromlist'>
                                                All KRA Form List
                                            </Link>
                                        </li>
                                        <li className='nav-item' disabled>
                                            <Link className='nav-link text-white' to='/notificationdate'>
                                                Notification Date
                                            </Link>
                                        </li>
                                        <li className='nav-item' disabled>
                                            <Link className='nav-link text-white' to='/employeekra'>
                                                Employee KRA
                                            </Link>
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
export default InnerNavKRA;
