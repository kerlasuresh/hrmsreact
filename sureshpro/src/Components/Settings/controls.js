import React, { useEffect, useState } from "react";
import SettingsNav from "./innerNav";
import Switch from '@mui/material/Switch';
const label = { inputProps: { 'aria-label': 'Switch demo' } };
function ControlsPermissions() {
    return (
        <>
            <div className="container-fluid">
                <SettingsNav />
            </div>
            <section className='allservices'>
                <div className='container'>
                    <div className="col-md-12">
                        <table className="table">
                            <tr>
                                <th colSpan={2}>DIRECTORY CONTROLS</th>

                            </tr>
                            <tr>
                                <th colSpan={2}>Make employee information visible to all employees</th>
                            </tr>
                            <tr>
                                <td>Email ID</td>
                                <td><div><Switch {...label} defaultChecked /></div></td>
                            </tr>

                            <tr>
                                <td>Phone Number</td>
                                <td><div><Switch {...label} defaultChecked /></div></td>
                            </tr>
                            <tr>
                                <td>Social Info (Facebook, Twitter, Linkedin)</td>
                                <td><div><Switch {...label} defaultChecked /></div></td>
                            </tr>
                            <tr>
                                <td>Work Location</td>
                                <td><div><Switch {...label} defaultChecked /></div></td>
                            </tr>
                            <tr>
                                <td>Department</td>
                                <td><div><Switch {...label} defaultChecked /></div></td>
                            </tr>
                            <tr>
                                <td>Designation</td>
                                <td><div><Switch {...label} /></div></td>
                            </tr>

                            <tr>
                                <td>Date of Birth</td>
                                <td><div><Switch {...label} /></div></td>
                            </tr>

                            <tr>
                                <td>Marital Status</td>
                                <td><div><Switch {...label} /></div></td>
                            </tr>



                        </table>
                    </div>
                </div>
            </section>

        </>
    )

}

export default ControlsPermissions;