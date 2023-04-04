import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Header from "../Dashboard/Header";
import EmployeeInnerNav from "./EmployeeInnerNav";
import { useParams } from "react-router-dom";
const ViewEmployee2 = () => {
    const { id } = useParams();
    const [employeeDetails, setEmployeeDetails] = useState({})
    const getEmployeeDetails = async () => {
        await axios.get(`/api/user/update-employee/${id}/`)
            .then(result => {
                console.log("res", result);
                setEmployeeDetails(result.data)
                // setFilteredCountries(result.data);
                // setLoader(true)
            })
            .catch(err => {
                console.log("errors", err);
            });
    }
    useEffect(() => {
        getEmployeeDetails();
    }, [])
    return (
        <>
            <div className='container-fluid'>
                <EmployeeInnerNav />
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <h4>Employee Details</h4>
                            <ul className="viewEmployeeList">
                                <li><span className="keyname">Company Name:</span> <span className="keyvalue">{employeeDetails.Company_name}</span></li>
                                <li><span className="keyname">Full Name:</span> <span className="keyvalue">{employeeDetails.First_Name}{employeeDetails.Last_Name}</span></li>
                                <li><span className="keyname">Father Name:</span> <span className="keyvalue">{employeeDetails.Father_Name}</span></li>
                                <li><span className="keyname">Email address:</span> <span className="keyvalue">{employeeDetails.Official_Email}</span></li>
                                <li><span className="keyname">Mobile:</span> <span className="keyvalue">{employeeDetails.Mobile_No}</span></li>
                                <li><span className="keyname">Address:</span> <span className="keyvalue">{employeeDetails.CAdress1} {employeeDetails.CCity}{employeeDetails.CPin_Code}</span></li>

                                <li><span className="keyname">Mother Name:</span> <span className="keyvalue">{employeeDetails.Mother_Name}</span></li>
                                {/* <li><span className="keyname">Spouse Name:</span> <span className="keyvalue">{employeeDetails.Company_name}</span></li> */}
                                <li><span className="keyname">Date of Birth:</span> <span className="keyvalue">{employeeDetails.Date_of_Birth}</span></li>
                                {/* <li><span className="keyname">Spouse Birthday:</span> <span className="keyvalue">{employeeDetails.Company_name}</span></li> */}
                                <li><span className="keyname">Gender:</span> <span className="keyvalue">{employeeDetails.Gender}</span></li>
                                <li><span className="keyname">Marital Status:</span> <span className="keyvalue">{employeeDetails.Marrital_Status}</span></li>
                                {/* <li><span className="keyname">Married Date:</span> <span className="keyvalue">{employeeDetails.Company_name}</span></li> */}
                                <li><span className="keyname">Nationality:</span> <span className="keyvalue">{employeeDetails.Nationality}</span></li>
                                <li><span className="keyname">Alternate Mobile No.:</span> <span className="keyvalue">{employeeDetails.Alternate_Mobile_Number}</span></li>
                                <li><span className="keyname">Personal Email :</span> <span className="keyvalue">{employeeDetails.Personal_Email}</span></li>
                                <li><span className="keyname">Pan Number:</span> <span className="keyvalue">{employeeDetails.Pan_CardNumber}</span></li>
                                <li><span className="keyname">Pan Card Photograph:</span> <span className="keyvalue">----------</span></li>
                                <li><span className="keyname">Aadhar Number:</span> <span className="keyvalue">{employeeDetails.Adhaar_Card}</span></li>
                                <li><span className="keyname">Aadhar Card Photograph:</span> <span className="keyvalue">-------------</span></li>
                                <li><span className="keyname">Photograph:</span> <span className="keyvalue">------------</span></li>



                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default ViewEmployee2;