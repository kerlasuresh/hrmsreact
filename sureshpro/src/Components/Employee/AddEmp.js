import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import moment from "moment";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FcOk } from "react-icons/fc";
import { MdError } from "react-icons/md";
const AddEmp = () => {
    document.title = "HRMS | Add Employee";
    const {
        register,
        getValues,
        handleSubmit,
        setValue,
        trigger,
        formState: { errors },
    } = useForm({ mode: "all" });
    const [departments, setdepartments] = useState([])
    const [subDepartments, setsubDepartments] = useState([])
    const [designationNames, setdesignationNames] = useState([])
    const [employeeTypes, setemployeeTypes] = useState([])
    const [bankaccountTypes, setbankaccountTypes] = useState([])
    const [workLocations, setworkLocations] = useState([])
    const [isNext, setIsnext] = useState(false);
    const [isError, setisError] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false);
    const [isPreOnBoard, setisPreOnBoard] = useState(false);
    const [MaxDateOfBith, setMaxDateOfBith] = useState()
    const [errorsDisplayAlert, seterrorsDisplayAlert] = useState(false)
    const [errorsDisplaymsg, seterrorsDisplaymsg] = useState(false)
    const [errorforDataofbirth, seterrorforDataofbirth] = useState("")
    const [errorforDepartment, seterrorforDepartment] = useState("")
    const [errorforDesignation, seterrorforDesignation] = useState("")
    const [errorforemployeeType, seterrorforemployeeType] = useState("")
    const [errorforprobationPeriod, seterrorforprobationPeriod] = useState("")
    const [errorforsubDepartment, seterrorforsubDepartment] = useState("")
    const [errorsofficialEmail, seterrorsofficialEmail] = useState("")
    const navigate = useNavigate();
    const [ifscDataPopUp, setIfscDataPopUp] = useState(false);
    const [ifscResponseData, setIfscResponseData] = useState({});
    const [employee, setemployee] = useState([])
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const nextTooptional = () => {
        if (getValues('first_name') && getValues('last_name') && getValues('official_email') && getValues('phone')) {
            setIsnext(true)
            setisError(false)
        } else {
            setisError(true)
        }
    }
    const emptyMessages = () => {
        seterrorsDisplaymsg("")
        seterrorforDataofbirth("")
        seterrorforDepartment("")
        seterrorforDesignation("")
        seterrorforemployeeType("")
        seterrorforprobationPeriod("")
        seterrorforsubDepartment("")
        seterrorsofficialEmail("");
    }
    const saveEmployeeData = async (data) => {
        emptyMessages();
        var userinfo = JSON.parse(sessionStorage.getItem("user-info"));
        var workInfo =  { }
        if (data.employee_number){
            workInfo.employee_number = data.employee_number
        }
        if (data.department) {
            workInfo.department = data.department
        }
        if (data.sub_department) {
            workInfo.sub_department = data.sub_department
        }
        if (data.designation) {
            workInfo.designation = data.designation
        }
        if (data.job_title) {
            workInfo.job_title = data.job_title
        }
        if (data.work_location) {
            workInfo.work_location = data.work_location
        }
        if (data.employee_type) {
            workInfo.employee_type = data.employee_type
        }
        if (data.probation_period) {
            workInfo.probation_period = data.probation_period
        }
        var req = {
            "company": userinfo.data.id,
            "first_name": data.first_name,
            "middle_name": data.middle_name,
            "last_name": data.last_name,
            "official_email": data.official_email,
            "phone": data.phone,
            "gender": data.gender,
            "pre_onboarding": data.pre_onboarding,
            "work_details": workInfo,
            "salary_details":{
                "ctc": data.ctc,
                "account_holder_name": data.account_holder_name,
                "account_number": data.account_number,
                "bank_name": data.bank_name,
                "city": data.city,
                "branch_name": data.branch_name,
                "ifsc_code": data.ifsc_code,
                "account_type": data.account_type
            }
        }

        if (data.date_of_birth){
            req.date_of_birth = moment(data.date_of_birth).format("DD-MM-YYYY")
        }
        if (data.date_of_join) {
            req.date_of_join = moment(data.date_of_join).format("DD-MM-YYYY")
        }
        try {
            const response = await axios.post(`/api/directory/add/employee/`, req)
            if (response.data.id){
                setSuccessAlert(true)
                
            }
        } catch (error) {
            if (error.response.data.dateOfBirth){
                seterrorforDataofbirth(error.response.data.dateOfBirth[0])
            }
            if (error.response.data.workDetails) {
                if (error.response.data.workDetails.designation) {
                    seterrorforDesignation("Designation: " + error.response.data.workDetails.designation[0])
                }
                if (error.response.data.workDetails.employeeType) {
                    seterrorforemployeeType("Employee Type: " + error.response.data.workDetails.employeeType[0])
                }
                if (error.response.data.workDetails.probationPeriod) {
                    seterrorforprobationPeriod("Probation Period: " + error.response.data.workDetails.probationPeriod[0])
                }
                if (error.response.data.workDetails.subDepartment) {
                    seterrorforsubDepartment("Sub Department: " + error.response.data.workDetails.subDepartment[0])
                }
                if (error.response.data.workDetails.department) {
                seterrorforDepartment("Department: "+error.response.data.workDetails.department[0])
                }
            }
            if (error.response.data.nonFieldErrors) {
                seterrorsDisplaymsg( error.response.data.nonFieldErrors[0])
            }
            if (error.response.data.officialEmail){
                seterrorsofficialEmail(error.response.data.officialEmail[0])
            }
            seterrorsDisplayAlert(true);
        }
    }
    const preonboardingChange = (data) => {
        setisPreOnBoard(data);
    }
    const getDepartments = async () => {
        var userinfo = JSON.parse(sessionStorage.getItem('user-info'));
        try {
            const response = await axios.get(`/api/company/department/${userinfo.data.id}/`)
            setdepartments(response.data)
        } catch (error) {
            console.log('not found')
        }
    }

    const getDesignations = async () => {
        var userinfo = JSON.parse(sessionStorage.getItem('user-info'));
        try {
            const response = await axios.get(`/api/company/designation/${userinfo.data.id}/`)
            setdesignationNames(response.data)
        } catch (error) {
            console.log('not found')
        }
    }
    const getEmplyee = async () => {
        var userinfo = JSON.parse(sessionStorage.getItem("user-info"));
        try {
            const response = await axios.get(
                `/api/directory/get/employee/${userinfo.data.id}/`
            );
            setemployee(response.data);
        } catch (error) {
            console.log("not found");
        }
    };
    const getemployeeTypes = async () => {
        try {
            const response = await axios.get(`/api/directory/employee/type/`)
            setemployeeTypes(response.data)
        } catch (error) {
            console.log('not found')
        }
    }

    const getBankaccounttype = async () => {
        try {
            const response = await axios.get(`/api/company/bankaccount/type/`)
            setbankaccountTypes(response.data)
        } catch (error) {
            console.log('not found')
        }
    }
    const getRegistation = async () => {
        var userinfo = JSON.parse(sessionStorage.getItem("user-info"));
        await axios.get(`/api/company/details/${userinfo.data.id}/`).then((result) => {
            var newarray  = [];
            if (result.data.corporateAdressLine1 || result.data.corporateAdressLine2 || result.data.corporateCity || result.data.corporateCountry || result.data.corporatePincode || result.data.corporateState){
                newarray.push("Corporate Address")
            }

            if (result.data.registeredAdressLine1 || result.data.registeredAdressLine2 || result.data.registeredCity || result.data.registeredCountry || result.data.registeredPincode || result.data.registeredState  ) {
                newarray.push("Registered Address")
            }
            
            getAddress(newarray);
        });
    };
    const getAddress = async (data) => {
        var userinfo = JSON.parse(sessionStorage.getItem("user-info"));
        try {
            await axios.get(`/api/company/custom/address/${userinfo.data.id}/`).then((result) => {
                if (result.data.length === 0) {
                    setworkLocations([...data])
                } else {
                    var newarray = [...data];
                    result.data.map((item,i)=>{
                        newarray.push(item.addressTitle)
                        return item
                    })
                    setworkLocations([...newarray])
                }
            });
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        var newDate = new Date();
        var substact = moment(newDate).subtract(18, 'years').format("YYYY-MM-DD");
        setMaxDateOfBith(substact)
        getDepartments();
        getDesignations();
        getemployeeTypes();
        getBankaccounttype();
        getRegistation();
        getEmplyee();
        
    }, [])
    const changeDepartmentforSub = (id) => {
        var subdepartmnt = departments.filter(item => item.id === id);
        //console.log(subdepartmnt[0].sub_departments);
        setsubDepartments(subdepartmnt[0].subDepartments)
    }
    const setSuccessAlert2 = () => {
        setSuccessAlert(false)
        navigate('/directory');
    }

    const ifscSubmit = async () => {
        let ifscValue = getValues('IFSCSearch')
        try {
            const bankData = await axios.get(`https://bank-apis.justinclicks.com/API/V1/IFSC/${ifscValue}/`);
            let responseData = bankData.data
            console.log('search data', responseData)

            setIfscResponseData(responseData)
            setIfscDataPopUp(true)
            handleClose(false)
        } catch (error) {
            console.log('not found')
        }
    }
    const SelectBankData = () => {
        //setshowAddinfo(true)

        setIfscDataPopUp(false)
        setValue('AccountTitle')
        setValue('bank_name', ifscResponseData.BANK)
        setValue('AccountNumber')
        setValue('branch_name', ifscResponseData.BRANCH)
        setValue('city', ifscResponseData.DISTRICT)
        setValue('ifsc_code', ifscResponseData.IFSC)
        setValue('AccountType')
    }
    return (
        <>
            <div className='container-fluid'>
                <div className='row' style={{ background: "#0b0b45" }}>
                    <div className='navbar navbar-expand-lg'>
                        <div className='container'>
                            <div className='row' style={{ width: "100%" }}>
                                <div className='col-md-12'>
                                    <h4 className='text-white'>ONBOARDING NEW EMPLOYEE</h4>
                                    <div className='collapse navbar-collapse' id='navbarNav'>
                                        <ul className='navbar-nav'>
                                            <li className='nav-item' onClick={()=>setIsnext(false)} >
                                                <div className={isNext ? 'nav-link text-white' : "nav-link text-white active"} >
                                                    Mandatory Info
                                                </div>
                                            </li>
                                            <li className='nav-item' >
                                                <div className={!isNext ? 'nav-link text-white' : "nav-link text-white active"} >
                                                    Optional Info
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className='container'>
                    <form onSubmit={handleSubmit(saveEmployeeData)}>
                        <div className='addEmployeeHolder'>
                            <div className={!isNext ? "row show" : "row hide"}>
                                <div className='col-md-12'>
                                    <div className='titleBg'>
                                        <div className='row'>
                                            <div className='col-md-9'>
                                                <p>MANDATORY INFO </p>
                                            </div>
                                            <div className='col-md-3 text-right'>
                                                <label className='checkbox-inline '>
                                                    PRE-ONBOARDING{" "}
                                                    <input
                                                        type='checkbox'
                                                        {...register("pre_onboarding")}
                                                        onChange={(e) =>
                                                            preonboardingChange(e.target.checked)
                                                        }
                                                        data-toggle='toggle'
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-md-4'>
                                    <div className='form-group'>
                                        <label htmlFor='exampleInputEmail1'>First Name</label>
                                        <input
                                            type='text'
                                            {...register("first_name", {
                                               // required: "Please enter first name",
                                                pattern: {
                                                    value: /^[a-zA-Z_ ]*$/,
                                                    message: "Please enter valid first name", // JS only: <p>error message</p> TS only support string
                                                },
                                            })}
                                            className='form-control'
                                            id='exampleInputEmail1'
                                            aria-describedby='emailHelp'
                                            placeholder='Enter First Name'
                                        />
                                        {errors.first_name && (
                                            <small id='emailHelp' className='form-text text-danger'>
                                                {errors.first_name.message}
                                            </small>
                                        )}
                                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className='form-group'>
                                        <label htmlFor='exampleInputEmail1'>Middle Name</label>
                                        <input
                                            type='text'
                                            {...register("middle_name", {
                                                pattern: {
                                                    value: /^[a-zA-Z_ ]+$/,
                                                    message: "Please enter valid middle name", // JS only: <p>error message</p> TS only support string
                                                },
                                            })}
                                            className='form-control'
                                            id='exampleInputEmail1'
                                            aria-describedby='emailHelp'
                                            placeholder='Enter Middle Name'
                                        />
                                        {errors.middle_name && (
                                            <small id='emailHelp' className='form-text text-danger'>
                                                {errors.middle_name.message}
                                            </small>
                                        )}
                                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className='form-group'>
                                        <label htmlFor='exampleInputEmail1'>Last Name</label>
                                        <input
                                            type='text'
                                            {...register("last_name", {
                                                //required: "Please enter last name",
                                                pattern: {
                                                    value: /^[a-zA-Z_ ]+$/,
                                                    message: "Please enter valid last name", // JS only: <p>error message</p> TS only support string
                                                },
                                            })}
                                            className='form-control'
                                            id='exampleInputEmail1'
                                            aria-describedby='emailHelp'
                                            placeholder='Enter Last Name'
                                        />
                                        {errors.last_name && (
                                            <small id='emailHelp' className='form-text text-danger'>
                                                {errors.last_name.message}
                                            </small>
                                        )}
                                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                                    </div>
                                </div>

                                <div className='col-md-4'>
                                    <div className='form-group'>
                                        <label htmlFor='exampleInputEmail1'>
                                            Official Email ID
                                        </label>
                                        <input
                                            type='email'
                                            {...register("official_email", {
                                                //required: "Please enter Official Email",
                                                pattern: {
                                                    value:
                                                        /^[A-Z0-9._%+-]+@[A-Z0-9.-]{2,}\.+[A-Z]{2,}$/i,
                                                    message: "Please enter valid Official Email", // JS only: <p>error message</p> TS only support string
                                                },
                                            })}
                                            className='form-control'
                                            id='exampleInputEmail1'
                                            aria-describedby='emailHelp'
                                            placeholder='Enter Official Email'
                                        />
                                        {errors.official_email && (
                                            <small id='emailHelp' className='form-text text-danger'>
                                                {errors.official_email.message}
                                            </small>
                                        )}
                                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className='form-group'>
                                        <label htmlFor='exampleInputEmail1'>Phone Number</label>
                                        <input
                                            type='text'
                                            {...register("phone", {
                                                //required: "Please enter 10 digit Mobile Number",
                                                pattern: {
                                                    value: /^[0-9]+$/,
                                                    message: "Please enter 10 digit Mobile Number", // JS only: <p>error message</p> TS only support string
                                                },
                                                minLength: {
                                                    value: 10,
                                                    message:
                                                        "Please enter Minimum 10 and Maximum 15 Mobile Number", // JS only: <p>error message</p> TS only support string
                                                },
                                                maxLength: {
                                                    value: 15,
                                                    message:
                                                        "Please enter Minimum 10 and Maximum 15 Mobile Number", // JS only: <p>error message</p> TS only support string
                                                },
                                            })}
                                            className='form-control'
                                            id='exampleInputEmail1'
                                            aria-describedby='emailHelp'
                                            placeholder='Enter Phone Number'
                                        />
                                        {errors.phone && (
                                            <small id='emailHelp' className='form-text text-danger'>
                                                {errors.phone.message}
                                            </small>
                                        )}
                                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                                    </div>
                                </div>
                                {isPreOnBoard ? (
                                    <div className='col-md-4'>
                                        <div className='form-group'>
                                            <label htmlFor='exampleInputEmail1'>
                                                Date Of Joining
                                            </label>
                                            <input
                                                type='date'
                                                {...register("date_of_join")}
                                                className='form-control'
                                                id='exampleInputEmail1'
                                                aria-describedby='emailHelp'
                                                placeholder='Enter Date Of Birth'
                                            />
                                            {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                                        </div>
                                    </div>
                                ) : (
                                    ""
                                )}
                                <div className='col-md-12'>
                                    <div className='text-right'>
                                        {isError ? (
                                            <span className='text-left text-danger'>
                                                * Please enter Name, Email and Phone.
                                            </span>
                                        ) : (
                                            ""
                                        )}
                                        <button type="button" className='btn btn-light'>Cancel</button> &nbsp;
                                        <button
                                            className='btn btn-primary'
                                            type="button"
                                            onClick={() => nextTooptional()}>
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className={isNext ? "row show" : "row hide"}>
                                <div className='col-md-12'>
                                    <div className='titleBg'>
                                        <p>PERSONAL </p>
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className='form-group'>
                                        <label htmlFor='exampleInputEmail1'>Date Of Birth</label>
                                        <input
                                            type='date'
                                            max={MaxDateOfBith}
                                            {...register("date_of_birth")}
                                            className='form-control'
                                            id='exampleInputEmail1'
                                            aria-describedby='emailHelp'
                                            placeholder='Enter Date Of Birth'
                                        />
                                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className='form-group'>
                                        <label htmlFor='exampleInputEmail1'>Gender</label>
                                        <select
                                            name='Gender'
                                            className='form-control'
                                            {...register("gender")}>
                                            <option value=''>-- Select Gender --</option>
                                            <option value='MALE'>MALE</option>
                                            <option value='FEMALE'>FEMALE</option>
                                            <option value='TRANSGENDER'>TRANSGENDER</option>
                                            <option value='UNDEFINED'>UNDEFINED</option>
                                        </select>
                                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                                    </div>
                                </div>
                                <div className='col-md-12'>
                                    <div className='titleBg'>
                                        <p>Work </p>
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className='form-group'>
                                        <label htmlFor='exampleInputEmail1'>Employee ID</label>
                                        <input
                                            type='text'
                                            {...register("employee_number")}
                                            className='form-control'
                                            id='exampleInputEmail1'
                                            aria-describedby='emailHelp'
                                            placeholder='Enter Employee ID'
                                        />
                                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className='form-group'>
                                        <label htmlFor='exampleInputEmail1'>Department</label>
                                        <select
                                            name='Department_Name'
                                            className='form-control'
                                            {...register("department")}
                                            onChange={(e)=>changeDepartmentforSub(e.target.value)}    
                                        >
                                            <option value=''>-- Select Department --</option>
                                            {departments.map((item, i) => {
                                                return (
                                                    <option value={item.id} key={i}>
                                                        {item.name}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className='form-group'>
                                        <label> Sub Department </label>
                                        <select
                                            name='subDepartment_Name'
                                            className='form-control'
                                            {...register("sub_department")}
                                        //onChange={ (e)=>getcurrentsubdept(e.target.value)}
                                        >
                                            <option value=''>-- Select Sub Department --</option>
                                            {subDepartments.map((item, id) => {
                                                return (
                                                    <option value={item.id} key={id}>
                                                        {item.name}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className='form-group'>
                                        <label>Designation</label>
                                        <select
                                            name='designation'
                                            className='form-control'
                                            {...register("designation")}>
                                            <option value=''>-- Select Designation --</option>
                                            {designationNames.map((item, j) => {
                                                return (
                                                    <option value={item.id} key={j}>
                                                        {item.name}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className='form-group'>
                                        <label htmlFor='exampleInputEmail1'>Job Title</label>
                                        <input
                                            type='text'
                                            {...register("job_title")}
                                            className='form-control'
                                            id='exampleInputEmail1'
                                            aria-describedby='emailHelp'
                                            placeholder='Enter Job Title'
                                        />
                                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className='form-group'>
                                        <label>Reporting Manager </label>
                                        <select
                                            name='Reporting_Manager'
                                            className='form-control'
                                            {...register("Reporting_Manager")}>
                                            <option value=''>Select Reporting Manager</option>
                                            <option value={1}>Testing</option>
                                            {employee.map((item, i) => {
                                                return (
                                                    <option value={item.id} key={i}>
                                                        {item.name}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                </div>

                                <div className='col-md-4'>
                                    <div className='form-group'>
                                        <label>Work Location </label>
                                        <select
                                            name='Reporting_Manager'
                                            className='form-control'
                                            {...register("work_location")}>
                                            <option value=''>Select Work Location</option>
                                            {workLocations.map((item, i) => {
                                                return (
                                                    <option value={item} key={i}>
                                                        {item}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                </div>

                                <div className='col-md-4'>
                                    <div className='form-group'>
                                        <label>Employee Type </label>
                                        <select
                                            name='Reporting_Manager'
                                            className='form-control'
                                            {...register("employee_type")}>
                                            <option value=''>Select Employee Type</option>
                                            {employeeTypes.map((item,l) => {
                                                return (
                                                    <option value={item.id} key={l}>
                                                        {item.value}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className='form-group'>
                                        <label htmlFor='exampleInputEmail1'>
                                            Probation Period
                                        </label>
                                        <input
                                            type='number'
                                            {...register("probation_period")}
                                            className='form-control'
                                            id='exampleInputEmail1'
                                            aria-describedby='emailHelp'
                                            placeholder='Enter Probation Period'
                                        />
                                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                                    </div>
                                </div>
                                <div className='col-md-12'>
                                    <div className='titleBg'>
                                        <p>SALARY DETAILS </p>
                                    </div>
                                </div>

                                <div className='col-md-6'>
                                    <div className='form-group'>
                                        <label htmlFor='exampleInputEmail1'>CTC</label>
                                        <input
                                            type='number'
                                            {...register("ctc")}
                                            className='form-control'
                                            id='exampleInputEmail1'
                                            aria-describedby='emailHelp'
                                            placeholder='Enter CTC'
                                        />
                                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className='form-group'>
                                        <label htmlFor='exampleInputEmail1'>
                                            Account Holder's Name
                                        </label>
                                        <input
                                            type='text'
                                            {...register("account_holder_name")}
                                            className='form-control'
                                            id='exampleInputEmail1'
                                            aria-describedby='emailHelp'
                                            placeholder="Enter Account Holder's Name"
                                        />
                                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                                    </div>
                                </div>
                                <div className='col-md-12'>
                                    <button className='btn btn-primary' type="button" onClick={handleShow}>
                                        Find my Branch
                                    </button>
                                </div>
                                <div className='col-md-12'>
                                    <br />
                                </div>
                                <div className='col-md-4'>
                                    <div className='form-group'>
                                        <label htmlFor='exampleInputEmail1'>Bank Name</label>
                                        <input
                                            type='text'
                                            {...register("bank_name")}
                                            className='form-control'
                                            id='exampleInputEmail1'
                                            aria-describedby='emailHelp'
                                            placeholder='Enter Bank Name'
                                        />
                                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className='form-group'>
                                        <label htmlFor='exampleInputEmail1'>City</label>
                                        <input
                                            type='text'
                                            {...register("city")}
                                            className='form-control'
                                            id='exampleInputEmail1'
                                            aria-describedby='emailHelp'
                                            placeholder='Enter City'
                                        />
                                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className='form-group'>
                                        <label htmlFor='exampleInputEmail1'>Branch Name</label>
                                        <input
                                            type='text'
                                            {...register("branch_name")}
                                            className='form-control'
                                            id='exampleInputEmail1'
                                            aria-describedby='emailHelp'
                                            placeholder='Enter Branch Name'
                                        />
                                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                                    </div>
                                </div>

                                <div className='col-md-4'>
                                    <div className='form-group'>
                                        <label htmlFor='exampleInputEmail1'>IFSC Code</label>
                                        <input
                                            type='text'
                                            {...register("ifsc_code")}
                                            className='form-control'
                                            id='exampleInputEmail1'
                                            aria-describedby='emailHelp'
                                            placeholder='Enter IFSC Code'
                                        />
                                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className='form-group'>
                                        <label htmlFor='exampleInputEmail1'>Account Number</label>
                                        <input
                                            type='text'
                                            {...register("account_number")}
                                            className='form-control'
                                            id='exampleInputEmail1'
                                            aria-describedby='emailHelp'
                                            placeholder='Enter Account Number'
                                        />
                                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className='form-group'>
                                        <label htmlFor='exampleInputEmail1'>account_type</label>
                                        <select
                                            name='account_type'
                                            className='form-control'
                                            {...register("account_type")}>
                                            <option value=''>-- Select Account Type --</option>
                                            {bankaccountTypes.map((item,m) => {
                                                return (
                                                    <option value={item.id} key={m}>
                                                        {item.value}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                                    </div>
                                </div>
                                <div className='col-md-12'>
                                    <div className='text-right'>
                                        <button
                                            className='btn btn-light'
                                            type="button"
                                            onClick={() => setIsnext(false)}>
                                            Back
                                        </button>{" "}
                                        &nbsp;
                                        <button type='submit' className='btn btn-primary'>
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {/* //////////////////////////////////////////////////////////////////////////////MODEL POPUIP ////////////////////////////////////////////// */}
            <Modal show={show} onHide={handleClose} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {" "}
                    <div className='container'>
                        <div className='row col-md-12 m-2'>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='IFSC Code'
                                {...register("IFSCSearch")}
                                onKeyUp={(e) => {
                                    trigger("IFSCSearch");
                                }}
                            />{" "}
                            {errors.IFSCSearch && (
                                <small className='text-danger '>
                                    {errors.IFSCSearch.message}
                                </small>
                            )}{" "}
                            <p></p>
                            <div
                                for='exampleDataList'
                                className='btn btn-primary col-md-3 '
                               onClick={() => ifscSubmit()}
                               
                            >
                                Search
                            </div>
                        </div>

                        <div className='text-center m-3'>Or</div>
                        <hr className='m-3 text-danger' />
                        <div className='row  m-2'>
                            <div className='col-md-6'>
                                <select className='form-select'>
                                    <option selected>Select Bank</option>
                                    <option value=''>''</option>
                                </select>
                            </div>
                            <div className='col-md-6'>
                                <select className='form-select'>
                                    <option selected>Select state</option>
                                    <option value=''>''</option>
                                </select>
                            </div>
                        </div>
                        <div className='row  m-2'>
                            <div className='col-md-6'>
                                <select className='form-select'>
                                    <option selected>Select City</option>
                                    <option value=''>''</option>
                                </select>
                            </div>
                            <div className='col-md-6'>
                                <select className='form-select'>
                                    <option selected>Select Branch</option>
                                    <option value=''>''</option>
                                </select>
                            </div>
                        </div>
                        <div className='d-flex justify-content-end m-2'>
                            <div className='btn btn-primary'>Submit</div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            <Modal
                size='md'
                show={ifscDataPopUp}
                onHide={() => setIfscDataPopUp(false)}
                className='text-center'>
                <Modal.Header closeButton> Find Branch </Modal.Header>
                <div>
                    <table className='table'>
                        <tbody>
                            <tr>
                                <th scope='row'>IFSC Code</th>
                                <td>{ifscResponseData.IFSC}</td>
                            </tr>
                            <tr>
                                <th scope='row'>MICR Code</th>
                                <td>{ifscResponseData.MICR}</td>
                            </tr>
                            <tr>
                                <th scope='row'>Bank</th>
                                <td>{ifscResponseData.BANK}</td>
                            </tr>
                            <tr>
                                <th scope='row'>Address</th>
                                <td>{ifscResponseData.ADDRESS}</td>
                            </tr>
                            <tr>
                                <th scope='row'>District</th>
                                <td>{ifscResponseData.DISTRICT}</td>
                            </tr>
                            <tr>
                                <th scope='row'>State</th>
                                <td>{ifscResponseData.STATE}</td>
                            </tr>
                            <tr>
                                <th scope='row'>Phone Number</th>
                                <td>{ifscResponseData.CONTACT}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='d-flex justify-content-end m-3'>
                    <div className='btn btn-primary'
                     onClick={SelectBankData}
                    >
                        SELECT BANK
                    </div>
                </div>
            </Modal>
            <Modal
                size='md'
                show={successAlert}
                onHide={() => setSuccessAlert(false)}
                className='text-center'>
                <Modal.Header closeButton></Modal.Header>
                <div className='text-center m-3'>
                    <FcOk size='80px' />
                </div>
                <h4 className='text-center'>Added Successfully</h4>
                <div className='text-center m-3'>
                    <button
                        className='btn btn-primary'
                        onClick={() => {
                            setSuccessAlert2(false);

                            // setisEdited(false);
                        }}>
                        OK
                    </button>
                </div>
            </Modal>

            <Modal
                size='md'
                show={errorsDisplayAlert}
                onHide={() => seterrorsDisplayAlert(false)}
                className='text-center'>
                <Modal.Header closeButton></Modal.Header>
                <div className='text-center m-3'>
                    <MdError size='80px' style={{color:"red"}} />
                </div>
                <div>
                    <small id='emailHelp' className='form-text text-danger'>
                        {errorforDataofbirth}
                    </small>
                    <small id='emailHelp' className='form-text text-danger'>
                        {errorforDepartment}
                    </small>
                    <small id='emailHelp' className='form-text text-danger'>
                        {errorforDesignation}
                    </small>
                    <small id='emailHelp' className='form-text text-danger'>
                        {errorforemployeeType}
                    </small>
                    <small id='emailHelp' className='form-text text-danger'>
                        {errorforprobationPeriod}
                    </small>
                    <small id='emailHelp' className='form-text text-danger'>
                        {errorforsubDepartment}
                    </small>
                    <small id='emailHelp' className='form-text text-danger'>
                        {errorsofficialEmail}
                    </small>
                    <small id='emailHelp' className='form-text text-danger'>
                        {errorsDisplaymsg}
                    </small>
                    
                </div>
                <div className='text-center m-3'>
                    <button
                        className='btn btn-primary'
                        onClick={() => {
                            seterrorsDisplayAlert(false);
                            // setisEdited(false);
                        }}>
                        OK
                    </button>
                </div>
            </Modal>
        </>
    );
}

export default AddEmp;