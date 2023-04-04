import React, { useState } from "react";
import { Link } from "react-router-dom";
const AttendanceNav = () => {
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
            <div className='row ' style={{ background: "#0b0b45" }}>
                <div className='navbar navbar-expand-lg'>
                    <div className='container'>
                        <div className="row">
                            <div className='col-md-12'>
                                <h4 className='text-white'>Daily Attendance </h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default AttendanceNav;
