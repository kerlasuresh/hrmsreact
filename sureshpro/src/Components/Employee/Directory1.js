import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {
  AiOutlineClockCircle,
  AiTwotoneMail,
  AiFillMobile,
  AiFillExclamationCircle,
  AiOutlineUpload,
  AiOutlineDownload,
  AiFillPlusCircle,
} from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import Header from "../Dashboard/Header";
import EmployeeInnerNav from "./EmployeeInnerNav";
import { useForm } from "react-hook-form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import $ from "jquery";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import moment from "moment";
const Directory = () => {
  document.title = "HRMS | Directory";
  const {
    register,
    unregister,
    handleSubmit,
    trigger,
    getValues,
    setValue,
    formState: { errors, isValid },
  } = useForm({ mode: "all" });
  const navigate = useNavigate();
  const [directoryList, setDirectoryList] = useState([]);
  const [selectedEmp, setselectedEmp] = useState([]);
  const [mailsLists, setmailsLists] = useState([]);
  const [selectedIDEmp, setselectedIDEmp] = useState([]);
  const [resendActivations, setresendActivations] = useState([]);
  const [search, setSearch] = useState([" "]);
  const [selectedEmployees, setselectedEmployees] = useState(0);
  const [showlist, setShowlist] = useState(false);
  const [departmentshow, setDepartmentshow] = useState(true);
  const [designationShow, setDesignationShow] = useState(true);
  const [bulkeditSuccessPopup, setbulkeditSuccessPopup] = useState(false);
  const [resendActivationSuccessPopup, setresendActivationSuccessPopup] =
    useState(false);
  const [pleaseSelectOneEmployee, setpleaseSelectOneEmployee] = useState(false);
  const [importEmployeeSuccessPopup, setimportEmployeeSuccessPopup] =
    useState(false);
  const [errorImportEmployees, seterrorImportEmployees] = useState(false);
  // const [bulkEditShow, setbulkEditShow] = useState(false)
  const [ExportHoleData, setExportHoleData] = useState(false);
  const [importHoleData, setimportHoleData] = useState(false);
  const [resendActivation, setresendActivation] = useState(false);
  const [grade, setGrade] = useState(true);
  const [manager, setManager] = useState(true);
  const [email, setEmail] = useState(true);
  const [phone, setPhone] = useState(true);
  const [DOB, setDOB] = useState(true);
  const [location, setLocation] = useState(true);
  const [signedIn, setSignedIn] = useState(true);
  const [employeeType, setEmployeeType] = useState(true);
  const [subDepartment, setSubDepartment] = useState(true);
  const [DOJ, setDOJ] = useState(true);
  const [status, setStatus] = useState(true);
  const [attendanceRules, setAttendanceRules] = useState(false);
  const [leaveRules, setLeaveRules] = useState(false);
  const [hideDirector, setHideDirector] = React.useState(true);
  const [bulkEditShowPopUp, setBulkEditShowPopUp] = useState(false); //pop-upss
  const [bulkEditShowInnerPopUp, setBulkEditShowInnerPopUp] = useState(false);
  const [bulkEditCheckCondition, setBulkEditCheckCondition] = useState(false);
  const [loader, setLoader] = useState(false);
  const [bulkEditText, setBulkEditText] = useState("");
  const [selectsub_departmenterror, setselectsub_departmenterror] =
    useState("");
  const [errorToselectFile, setErrorToselectFile] = useState("");
  const [erroreffectiveDate, seterroreffectiveDate] = useState("");
  const [erroreffectiveDate2, seterroreffectiveDate2] = useState("");
  const [isCheckBoxValue, setIsCheckBoxValue] = useState(false);
  const [employeeTypes, setemployeeTypes] = useState([]);
  const [departments, setdepartments] = useState([]);
  const [subDepartments, setsubDepartments] = useState([]);
  const [designationNames, setdesignationNames] = useState([]);
  const [workLocations, setworkLocations] = useState([]);
  const [employee, setemployee] = useState([]);
  const [Gradess, setGradess] = useState([]);
  const [importemployeeMessageError, setimportemployeeMessageError] =
    useState("");

  const changeDepartmentforSub = (id) => {
    var subdepartmnt = departments.filter((item) => item.id == id);
    //console.log(subdepartmnt[0].sub_departments);
    setsubDepartments(subdepartmnt[0].subDepartments);
  };

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
  const selectAllCheckbox = (value) => {
    if (value) {
      $(".individualcheckbox").prop("checked", true);
      setselectedEmployees(directoryList.length);
      var ids = [];
      var emails = [];
      var emailandphone = [];
      directoryList.map((item, i) => {
        ids.push(item.id);
        emails.push(item.officialEmail);
        emailandphone.push({ email: item.officialEmail, phone: item.phone });
      });
      setselectedIDEmp([...ids]);
      setselectedEmp([...directoryList]);
      setmailsLists([...emails]);
      setresendActivations([...emailandphone]);
    } else {
      $(".individualcheckbox").prop("checked", false);
      setselectedEmployees("0");
    }
  };
  const individualCheckbox = (value, email, phone, emp, empID) => {
    var checked = $(".individualcheckbox:checked").length;
    if (checked === directoryList.length) {
      $(".selectAll").prop("checked", true);
    } else {
      $(".selectAll").prop("checked", false);
    }
    setselectedEmployees(checked);
    setselectedEmp([...selectedEmp, emp]);
    setmailsLists([...mailsLists, email]);
    setselectedIDEmp([...selectedIDEmp, empID]);
    setresendActivations([
      ...resendActivations,
      { email: email, phone: phone },
    ]);
  };
  const columns = [
    {
      name: (
        <input
          type='checkbox'
          onChange={(e) => selectAllCheckbox(e.target.checked)}
          className='inputcheckbox selectAll'
        />
      ),
      width: "50px",
      selector: (row, index) => (
        <input
          type='checkbox'
          data-id={index + 1}
          onChange={(e) =>
            individualCheckbox(
              e.target.checked,
              row.officialEmail,
              row.phone,
              row,
              row.id
            )
          }
          className='inputcheckbox individualcheckbox'
        />
      ),
      sortable: true,
    },
    {
      name: <span className='h6 fw-bold'>ID</span>,
      width: "75px",
      selector: (row) => row.number,
      sortable: true,
    },

    {
      name: <span className='h6 fw-bold'>Employee Name</span>,
      width: "150px",
      selector: (row) => (
        <div className='d-flex align-items-center'>
          <Link to={`/ViewEmployee/${row.id}`}>
            {/* <span className=" border border-1 rounded-circle badge bg-success p-3">{row.name.charAt(0)}</span>    */}

            <span>&nbsp;{row.name}</span>
          </Link>
        </div>
      ),
      sortable: true,
    },
    departmentshow
      ? {
          name: <span className='h6 fw-bold'>Department</span>,
          width: "150px",
          selector: (row) => row.department,
          sortable: true,
        }
      : {
          omit: hideDirector,
        },

    designationShow
      ? {
          name: <span className='h6 fw-bold'>Designation</span>,
          selector: (row) => row.designation,
          sortable: true,
        }
      : {
          omit: hideDirector,
        },
    manager
      ? {
          name: <span className='h6 fw-bold'>Manager</span>,
          selector: (row) => row.manager,
          sortable: true,
        }
      : {
          omit: hideDirector,
        },
    location
      ? {
          name: <span className='h6 fw-bold'>Location</span>,
          selector: (row) => row.workLocation,
          sortable: true,
        }
      : {
          omit: hideDirector,
        },
    subDepartment
      ? {
          name: <span className='h6 fw-bold'>Sub Department</span>,
          selector: (row) => row.subDepartment,
          sortable: true,
        }
      : {
          omit: hideDirector,
        },
    DOJ
      ? {
          name: <span className='h6 fw-bold'>Date of Joining</span>,
          selector: (row) => row.dateOfJoin,
          sortable: true,
        }
      : {
          omit: hideDirector,
        },
    leaveRules
      ? {
          name: <span className='h6 fw-bold'>Leave Rules</span>,
          selector: (row) => "-",
          sortable: true,
        }
      : {
          omit: hideDirector,
        },
  ];
  const getUsersList = async () => {
    var userinfo = JSON.parse(sessionStorage.getItem("user-info"));
    try {
      const response = await axios.get(
        `/api/directory/get/employee/${userinfo.data.id}/`
      );
      response.data.map((item, i) => {
        item.Num = i + 1;
      });
      console.log(response.data);
      console.log(typeof response.data);
      setDirectoryList(response.data);
      setLoader(true);
    } catch (error) {
      console.log("not found");
    }
  };
  const showAllcolums = () => {
    setShowlist(!showlist);
  };
  const getDepartmentValue = (value) => {
    setDepartmentshow(value);

    setHideDirector(!hideDirector);
  };
  const getDesignationValue = (value) => {
    setDesignationShow(value);
    setHideDirector(!hideDirector);
  };

  const getManager = (value) => {
    setManager(value);
    setHideDirector(!hideDirector);
  };

  const getLocation = (value) => {
    setLocation(value);
    setHideDirector(!hideDirector);
  };

  const getSubDepartment = (value) => {
    setSubDepartment(value);
    setHideDirector(!hideDirector);
  };
  const getDOJ = (value) => {
    setDOJ(value);
    setHideDirector(!hideDirector);
  };

  //------------------------- m start here ---------------//
  const bulkEditPopUp = () => {
    setBulkEditShowPopUp(true);
    seterroreffectiveDate("");
    seterroreffectiveDate2("");
    setValue("selectedEffectiveDate", "");
  };

  //-------
  const bulkEditInnerPopUp = () => {
    setBulkEditShowInnerPopUp(true);
    setBulkEditShowPopUp(false);
  };
  //------------- department ---------------
  const getBulkEditValue = (value) => {
    setValue("selectDepartment", "");
    setValue("selectsub_department", "");
    setValue("selectdesignation", "");
    setValue("selectwork_location", "");
    setValue("selectemployee_type", "");
    setValue("selectemployeeStatus", "");
    setValue("selectEmployeeGrade", "");

    setBulkEditCheckCondition(value);
    bulkEditInnerPopUp();

    setBulkEditText(value);
  }; //

  //-------
  const getCompareAllValues = () => {
    if (departmentshow) {
      setValue("Department", true);
    }
    if (designationShow) {
      setValue("designation", true);
    }
    if (grade) {
      setValue("grade", true);
    }
    if (manager) {
      setValue("manager", true);
    }
    if (email) {
      setValue("email", true);
    }
    if (phone) {
      setValue("phone", true);
    }
    if (DOB) {
      setValue("dob", true);
    }
    if (signedIn) {
      setValue("signedin", true);
    }
    if (employeeType) {
      setValue("type", true);
    }
    if (subDepartment) {
      setValue("sub_department", true);
    }

    if (status) {
      setValue("status", true);
    }
    if (attendanceRules) {
      setValue("attendance_rules", true);
    }
    if (leaveRules) {
      setValue("leave_rules", true);
    }
    if (showlist) {
      setValue("workweek_rules", true);
    }
    if (DOJ) {
      setValue("start_date", true);
    }
    if (location) {
      setValue("location", true);
    }
  };
  //=======
  const bulkEditInnerPopUpClose = () => {
    setBulkEditShowInnerPopUp(false);
  };
  // const sendMailforAll = () => {
  //   if (mailsLists.length !== 0){
  //     window.location = `mailto:${mailsLists.join(',')}`;
  //     console.log(mailsLists)
  //   }else{
  //     setpleaseSelectOneEmployee(true)
  //   }

  // }
  const bulkEditInnerSaveSection = async () => {
    setselectsub_departmenterror("");
    seterroreffectiveDate2("");
    seterroreffectiveDate("");
    if (selectedIDEmp !== 0) {
      var work_details = {};

      if (getValues("selectdesignation")) {
        work_details.designation = getValues("selectdesignation");
      }
      if (getValues("selectwork_location")) {
        work_details.work_location = getValues("selectwork_location");
      }
      if (getValues("selectemployee_type")) {
        work_details.employee_type = getValues("selectemployee_type");
      }
      if (getValues("selectemployeeStatus")) {
        work_details.employeeStatus = getValues("selectemployeeStatus");
      }
      if (getValues("selectEmployeeGrade")) {
        work_details.employeeGrade = getValues("selectEmployeeGrade");
      }
      if (getValues("selectreportingManager")) {
        work_details.reportingManager = getValues("selectreportingManager");
      }

      if (getValues("selectDepartment") && getValues("selectsub_department")) {
        work_details.department = getValues("selectDepartment");
        work_details.sub_department = getValues("selectsub_department");
      }

      if (getValues("selectDepartment")) {
        if (!getValues("selectsub_department")) {
          setselectsub_departmenterror("Please select sub department");
          return false;
        } else {
          setselectsub_departmenterror("");
        }
      }
      var req = {
        id: selectedIDEmp,
        work_details: work_details,
        effectiveDate: getValues("selectedEffectiveDate")
          ? moment(getValues("selectedEffectiveDate")).format("DD-MM-YYYY")
          : "",
      };
      console.log(req);
      if (getValues("selectedEffectiveDate")) {
        if (
          getValues("selectDepartment") ||
          getValues("selectreportingManager") ||
          getValues("selectwork_location") ||
          getValues("selectdesignation") ||
          getValues("selectEmployeeGrade") ||
          getValues("selectemployeeStatus") ||
          getValues("selectemployee_type")
        ) {
          try {
            const response = await axios.post(
              `/api/directory/bulk_update/employee/`,
              req
            );
            if (response.data) {
              bulkEditInnerPopUpClose();
              getUsersList();
              setbulkeditSuccessPopup(true);
            }
          } catch (error) {
            console.log("not found");
          }
        } else {
          seterroreffectiveDate2("Please select any one of the above");
        }
      } else {
        seterroreffectiveDate("Please select effective date");
      }
    } else {
      setpleaseSelectOneEmployee(true);
    }
  };
  const resendActivationLink = async () => {
    if (resendActivations.length !== 0) {
      try {
        const response = await axios.post(
          `/api/user/resend-activation-link/`,
          resendActivations
        );
        if (response.data) {
          setresendActivationSuccessPopup(true);
          setresendActivation(false);
        }
      } catch (error) {
        console.log("not found");
      }
    } else {
      setpleaseSelectOneEmployee(true);
    }
  };
  const importEmployeeFiles = async () => {
    setErrorToselectFile("");
    var userinfo = JSON.parse(sessionStorage.getItem("user-info"));
    var FilesList = getValues("employee_file");
    const formData = new FormData();
    if (FilesList[0]) {
      formData.append("employee_file", FilesList[0]);
      formData.append("company", userinfo.data.id);
      try {
        const response = await axios.post(
          `/api/directory/import/employee/`,
          formData
        );
        if (response.data) {
          setimportHoleData(false);
          setimportEmployeeSuccessPopup(true);
          getUsersList();
          // setresendActivationSuccessPopup(true)
          // setresendActivation(false)
        }
      } catch (error) {
        if (error.response.data.error) {
          setimportemployeeMessageError(error.response.data.error[0]);
        }
        seterrorImportEmployees(true);
        console.log("not found");
      }
    } else {
      setErrorToselectFile("Please Select a file");
    }
  };
  useEffect(() => {
    getUsersList();
    getCompareAllValues();
    // getDepartments();
    // getDesignations();
    // getemployeeTypes();
    // getRegistation();
    getEmplyee();
    // getGrades();
  }, []);
  return (
    <>
      <div className='container-fluid'>
        <EmployeeInnerNav />
        <div className='container'>
          <div className='row'>
            <div className='col-md-12 mt-4'>
              <div className='row'>
                {/* <ul className="direcoryTop">
                  <li>
                    <input type="checkbox" /> Inactive Employees
                  </li>
                  <li>
                    <span>
                      {' '}
                      <AiTwotoneMail />
                    </span>{' '}
                    Invalid Email{' '}
                  </li>
                  <li>
                    <span>
                      <AiFillMobile />
                    </span>{' '}
                    Mobile Not Verified
                  </li>
                  <li>
                    <span>
                      <AiFillExclamationCircle />
                    </span>{' '}
                    Signed In
                  </li>
                  <li>
                    <span>
                      <AiOutlineClockCircle />
                    </span>{' '}
                    Not Signed In
                  </li>
                  <li>
                    <button
                      className="btn btn-primary"
                      onClick={() => resendActivationpopup()}
                    >
                      Resend Activation
                    </button>
                  </li>
                </ul> */}
              </div>
              <hr />

              <div className='tableexportInfo'>
                <div className='optioninfo'>
                  <div className='selectedemployeenumbers'>
                    <div className='numbershow'>{selectedEmployees}</div>
                  </div>
                  {/* <div
                    className="bulkEditEmployee"
                    onClick={() => bulkeditShowpopup()}
                  >
                    <div className="bulkedit">
                      <span>
                        <AiTwotoneMail />
                      </span>
                    </div>
                    <div className="textInfo">Bulk Edit</div>
                  </div> */}
                  <div
                    className='bulkEditEmployee'
                    onClick={() => bulkEditPopUp()}>
                    <div className='bulkedit'>
                      <span>
                        <AiTwotoneMail />
                      </span>
                    </div>
                    <div className='textInfo'>Assign Rules</div>
                  </div>

                  <div
                    className='importEmployee'
                    // onClick={() => importholeDatapopup()}
                  >
                    <div className='bulkedit'>
                      <span>
                        <MdDelete />
                      </span>
                    </div>
                    <div className='textInfo'>Bulk Delete</div>
                  </div>
                </div>
                <div className=''>
                  <div
                    className={
                      showlist
                        ? "columnsShowtohide active"
                        : "columnsShowtohide"
                    }>
                    <ul className='pop-up-check-items m-0 p-0'>
                      <li>
                        <fieldset className='form-group'>
                          <input
                            className='filled-in col-selector'
                            {...register("Department")}
                            onChange={(e) =>
                              getDepartmentValue(e.target.checked)
                            }
                            id='colSelectorCheckbox0'
                            type='checkbox'
                          />
                          <label
                            className='ft-14'
                            htmlFor='colSelectorCheckbox0'>
                            Department
                          </label>
                        </fieldset>
                      </li>
                      <li>
                        <fieldset className='form-group'>
                          <input
                            className='filled-in col-selector'
                            {...register("designation")}
                            onChange={(e) =>
                              getDesignationValue(e.target.checked)
                            }
                            id='colSelectorCheckbox1'
                            type='checkbox'
                          />
                          <label
                            className='ft-14'
                            htmlFor='colSelectorCheckbox1'>
                            Designation
                          </label>
                        </fieldset>
                      </li>
                      {/* <li>
                        <fieldset className="form-group">
                          <input
                            className="filled-in col-selector"
                            {...register('grade')}
                            onChange={(e) => getGrade(e.target.checked)}
                            id="colSelectorCheckbox2"
                            type="checkbox"
                         
                          />
                          <label
                            className="ft-14"
                            htmlFor="colSelectorCheckbox2"
                          >
                            Grade
                          </label>
                        </fieldset>
                      </li> */}
                      <li>
                        <fieldset className='form-group'>
                          <input
                            className='filled-in col-selector'
                            {...register("manager")}
                            onChange={(e) => getManager(e.target.checked)}
                            id='colSelectorCheckbox3'
                            type='checkbox'
                          />
                          <label
                            className='ft-14'
                            htmlFor='colSelectorCheckbox3'>
                            Manager
                          </label>
                        </fieldset>
                      </li>
                      {/* <li>
                        <fieldset className="form-group">
                          <input
                            className="filled-in col-selector"
                            {...register('email')}
                            onChange={(e) => getEmail(e.target.checked)}
                            id="colSelectorCheckbox4"
                            type="checkbox"
                            
                          />
                          <label
                            className="ft-14"
                            htmlFor="colSelectorCheckbox4"
                          >
                            Email
                          </label>
                        </fieldset>
                      </li> */}
                      {/* <li>
                        <fieldset className="form-group">
                          <input
                            className="filled-in col-selector"
                            {...register('phone')}
                            onChange={(e) => getPhone(e.target.checked)}
                            id="colSelectorCheckbox5"
                            type="checkbox"
                            
                          />
                          <label
                            className="ft-14"
                            htmlFor="colSelectorCheckbox5"
                          >
                            Phone
                          </label>
                        </fieldset>
                      </li> */}
                      {/* <li>
                        <fieldset className="form-group">
                          <input
                            className="filled-in col-selector"
                            {...register('signedin')}
                            onChange={(e) => getSignedIn(e.target.checked)}
                            id="colSelectorCheckbox6"
                            type="checkbox"
                            
                          />
                          <label
                            className="ft-14"
                            htmlFor="colSelectorCheckbox6"
                          >
                            Signed In
                          </label>
                        </fieldset>
                      </li> */}
                      {/* <li>
                        <fieldset className="form-group">
                          <input
                            className="filled-in col-selector"
                            {...register('dob')}
                            onChange={(e) => getDOB(e.target.checked)}
                            id="colSelectorCheckbox7"
                            type="checkbox"
                         
                          />
                          <label
                            className="ft-14"
                            htmlFor="colSelectorCheckbox7"
                          >
                            Date of Birth
                          </label>
                        </fieldset>
                      </li> */}
                      <li>
                        <fieldset className='form-group'>
                          <input
                            className='filled-in col-selector'
                            {...register("location")}
                            onChange={(e) => getLocation(e.target.checked)}
                            id='colSelectorCheckbox8'
                            type='checkbox'
                          />
                          <label
                            className='ft-14'
                            htmlFor='colSelectorCheckbox8'>
                            Location
                          </label>
                        </fieldset>
                      </li>
                      {/* <li>
                        <fieldset className="form-group">
                          <input
                            className="filled-in col-selector"
                            {...register('type')}
                            onChange={(e) => getEmployeeType(e.target.checked)}
                            id="colSelectorCheckbox9"
                            type="checkbox"
                            
                          />
                          <label
                            className="ft-14"
                            htmlFor="colSelectorCheckbox9"
                          >
                            Employee Type
                          </label>
                        </fieldset>
                      </li> */}
                      <li>
                        <fieldset className='form-group'>
                          <input
                            className='filled-in col-selector'
                            {...register("sub_department")}
                            onChange={(e) => getSubDepartment(e.target.checked)}
                            id='colSelectorCheckbox10'
                            type='checkbox'
                          />
                          <label
                            className='ft-14'
                            htmlFor='colSelectorCheckbox10'>
                            Sub Department
                          </label>
                        </fieldset>
                      </li>
                      <li>
                        <fieldset className='form-group'>
                          <input
                            className='filled-in col-selector'
                            {...register("start_date")}
                            onChange={(e) => getDOJ(e.target.checked)}
                            id='colSelectorCheckbox11'
                            value='start_date'
                            type='checkbox'
                          />
                          <label
                            className='ft-14'
                            htmlFor='colSelectorCheckbox11'>
                            Date of Joining
                          </label>
                        </fieldset>
                      </li>
                      {/* <li>
                        <fieldset className="form-group">
                          <input
                            className="filled-in col-selector"
                            {...register('status')}
                            onChange={(e) => getStatus(e.target.checked)}
                            id="colSelectorCheckbox12"
                            type="checkbox"
                           
                          />
                          <label
                            className="ft-14"
                            htmlFor="colSelectorCheckbox12"
                          >
                            Status
                          </label>
                        </fieldset>
                      </li> */}
                      {/* <li>
                        <fieldset className="form-group">
                          <input
                            className="filled-in col-selector"
                            {...register('attendance_rules')}
                            onChange={(e) =>
                              getAttendanceRules(e.target.checked)
                            }
                            id="colSelectorCheckbox13"
                            type="checkbox"
                           
                          />
                          <label
                            className="ft-14"
                            htmlFor="colSelectorCheckbox13"
                          >
                            Attendance Rules
                          </label>
                        </fieldset>
                      </li> */}
                      {/* <li>
                        <fieldset className="form-group">
                          <input
                            className="filled-in col-selector"
                            {...register('leave_rules')}
                            onChange={(e) => getLeaveRules(e.target.checked)}
                            id="colSelectorCheckbox14"
                            type="checkbox"
                          
                          />
                          <label
                            className="ft-14"
                            htmlFor="colSelectorCheckbox14"
                          >
                            Leave Rules
                          </label>
                        </fieldset>
                      </li> */}
                      {/* <li>
                        <fieldset className="form-group">
                          <input
                            className="filled-in col-selector"
                            {...register('workweek_rules')}
                            id="colSelectorCheckbox15"
                            type="checkbox"
                        
                          />
                          <label
                            className="ft-14"
                            htmlFor="colSelectorCheckbox15"
                          >
                            Workweek Rules
                          </label>
                        </fieldset>
                      </li> */}
                    </ul>
                    {/* <ul>
                                        <li>Test</li>
                                        <li>Test</li>
                                        <li>Test</li>
                                        <li>Test</li>
                                        <li>Test</li>
                                        <li>Test</li>
                                        <li>Test</li>
                                    </ul> */}
                  </div>
                  {loader ? (
                    <DataTable
                      columns={columns}
                      data={directoryList}
                      pagination
                      fixedHeader
                      fixedHeaderScrollHeight='450px'
                      highlightOnHover
                      subHeader
                      subHeaderComponent={
                        <input
                          type='text'
                          className='form-control w-25'
                          placeholder='Search'
                          onChange={(e) => setSearch(e.target.value)}
                        />
                      }
                    />
                  ) : (
                    <div className='text-center'>
                      <div className='spinner-border ' role='status'>
                        <span className='sr-only'>Loading...</span>
                      </div>
                    </div>
                  )}

                  <div className='selectColums'>
                    <div className='bulkedit'>
                      <span onClick={() => showAllcolums()}>
                        {" "}
                        <AiFillPlusCircle />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <Modal
        size="lg"
        show={bulkEditShow}
        onHide={() => setbulkEditShow(false)}
        aria-labelledby="example-modal-sizes-title-md"
        className="text-center"
      >
        <Modal.Header closeButton> Bulk Edit</Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <div className="select">1 Employee Selected</div>
              <br />
              <select
                className="form-control"
                {...register('probationPeriod', {
                  required: 'Please select probation period..!',
                })}
                onKeyUp={() => {
                  trigger('probationPeriod')
                }}
              >
                <option value="">Select Department</option>
                <option value="0">0</option>
              </select>
              <br />
              <select
                className="form-control"
                {...register('probationPeriod', {
                  required: 'Please select probation period..!',
                })}
                onKeyUp={() => {
                  trigger('probationPeriod')
                }}
              >
                <option value="">Select Reporting Manager</option>
                <option value="0">0</option>
              </select>
              <br />
              <select
                className="form-control"
                {...register('probationPeriod', {
                  required: 'Please select probation period..!',
                })}
                onKeyUp={() => {
                  trigger('probationPeriod')
                }}
              >
                <option value="">Select Grade</option>
                <option value="0">0</option>
              </select>
              <br />
              <select
                className="form-control"
                {...register('probationPeriod', {
                  required: 'Please select probation period..!',
                })}
                onKeyUp={() => {
                  trigger('probationPeriod')
                }}
              >
                <option value="">Select Employee Status</option>
                <option value="0">Active</option>
                <option value="0">Inactive</option>
                <option value="0">Yes To Join</option>
              </select>
            </div>
            <div className="col-md-6">
              <div className="select">
                <input type="date" className="form-control" />
              </div>
              <br />
              <select
                className="form-control"
                {...register('probationPeriod', {
                  required: 'Please select probation period..!',
                })}
                onKeyUp={() => {
                  trigger('probationPeriod')
                }}
              >
                <option value="">Select Sub Department</option>
                <option value="0">0</option>
              </select>
              <br />
              <select
                className="form-control"
                {...register('probationPeriod', {
                  required: 'Please select probation period..!',
                })}
                onKeyUp={() => {
                  trigger('probationPeriod')
                }}
              >
                <option value="">Select Designation</option>
                <option value="0">0</option>
              </select>
              <br />
              <select
                className="form-control"
                {...register('probationPeriod', {
                  required: 'Please select probation period..!',
                })}
                onKeyUp={() => {
                  trigger('probationPeriod')
                }}
              >
                <option value="">Select Location</option>
                <option value="0">0</option>
              </select>

              <br />
              <select
                className="form-control"
                {...register('probationPeriod', {
                  required: 'Please select probation period..!',
                })}
                onKeyUp={() => {
                  trigger('probationPeriod')
                }}
              >
                <option value="">Select Employee Type</option>
                <option value="0">Full Time</option>
                <option value="0">Part Time</option>
                <option value="0">Intern</option>
                <option value="0">On contract</option>
              </select>
              <br />
              <br />
            </div>
          </div>
          <Button variant="primary" onClick={() => setbulkEditShow(false)}>
            Cancel
          </Button>{' '}
          &nbsp;
          <Button variant="primary">Save</Button>
        </Modal.Body>
      </Modal>  */}

      <Modal
        size='md'
        show={bulkEditShowPopUp}
        onHide={() => setBulkEditShowPopUp(false)}
        className='text-center'>
        <Modal.Header closeButton>
          <h4 className='text-start'>Assign Rules</h4>
        </Modal.Header>
        {selectedEmployees > 0 ? (
          <div className='text-start ml-2'>
            <div
              className='mb-2'
              // onClick={() => getBulkEditValue("Department")}
            >
              <input type='checkbox' id='Casual' className='me-2' />
              <label for='Casual'>Casual Leave</label>
              <br />
            </div>
            <div
              className='mb-2'
              // onClick={() => getBulkEditValue("Designation")}
            >
              <input type='checkbox' id='Earned' className='me-2' />
              <label for='Earned'>Earned Leave</label>
              <br />
            </div>
            <div
              className='mb-2'
              // onClick={() => getBulkEditValue("Reporting Manager")}
            >
              <input type='checkbox' id='Paternity' className='me-2' />
              <label for='Paternity'>Paternity Leave</label>
              <br />
            </div>
            <div
              className='mb-2'
              //  onClick={() => getBulkEditValue("Grades")}
            >
              <input type='checkbox' id='Maternity' className='me-2' />
              <label for='Maternity'>Maternity Leave</label>
              <br />
            </div>
            <hr />

            <div className='mb-2'>
              <div class='md-form mb-0'>
                <label class='form-label'>Effective Date</label>
                <br />
                <input
                  data-date-format='dd/mm/yyyy'
                  class='form-control'
                  placeholder='DD/MM/YYYY'
                  type='date'
                />
                <br />
              </div>
            </div>

            <div className='mt-2 mb-3'>
              <button
                className='btn btn-default me-2'
                onClick={setBulkEditShowPopUp}>
                Cancel
              </button>
              <button className='btn btn-primary'>Apply</button>
            </div>
            {/* <div
              className='mb-2'
              //  onClick={() => getBulkEditValue("Location")}
            >
              Location
            </div>
            <div
              className='mb-2'
              // onClick={() => getBulkEditValue("Employee Status")}
            >
              Employee Status
            </div>
            <div
              className='mb-2'
              // onClick={() => getBulkEditValue("Employee Type")}
            >
              Employee Type
            </div> */}
          </div>
        ) : (
          <div>
            <h5> please select atleast one employee </h5>
          </div>
        )}
      </Modal>

      <Modal
        size='lg'
        show={bulkEditShowInnerPopUp}
        onHide={() => setBulkEditShowInnerPopUp(false)}
        className='text-center'>
        <Modal.Header closeButton>
          {" "}
          <h4> {bulkEditText + " Edit "}</h4>
        </Modal.Header>
        <div className='row m-3'>
          <div className='col-md-6 rounded-pill text-center mx-auto'>
            <p className=' text-primary m-1 mx-auto'>
              {selectedEmployees} Employees Selected
            </p>
          </div>
          <div className='col-md-6'>
            <div class='input-group mb-3'>
              <span class='input-group-text' id='basic-addon1'>
                Effective Date:
              </span>
              <input
                type='date'
                class='form-control'
                {...register("selectedEffectiveDate", {
                  required: "Please select Effective Date..!",
                })}
                min={moment(new Date()).format("YYYY-MM-DD")}
              />
            </div>
            <small className='text-danger'>{erroreffectiveDate}</small>
          </div>
        </div>
        {bulkEditCheckCondition == "Department" ? (
          <div>
            <div className='row m-3'>
              <div className='col-md-6'>
                <select
                  className='form-control'
                  {...register("selectDepartment", {
                    required: "Please select  Department..!",
                  })}
                  onChange={(e) => changeDepartmentforSub(e.target.value)}
                  onKeyUp={() => {
                    trigger("selectDepartment");
                  }}>
                  <option value=''>Select Department</option>
                  {departments.map((item, i) => {
                    return (
                      <option value={item.id} key={i}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className='col-md-6'>
                <select
                  className='form-control'
                  {...register("selectsub_department", {
                    required: "Please select sub Department..!",
                  })}
                  onKeyUp={() => {
                    trigger("selectsub_department");
                  }}>
                  <option value=''>Select Sub Department</option>
                  {subDepartments.map((item, id) => {
                    return (
                      <option value={item.id} key={id}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>

                <small className='text-danger'>
                  {selectsub_departmenterror}
                </small>
              </div>{" "}
            </div>
          </div>
        ) : (
          ""
        )}
        {bulkEditCheckCondition == "Designation" ? (
          <div>
            <div className=' w-50 m-auto'>
              <select
                className='form-control'
                {...register("selectdesignation", {
                  required: "Please select  Designation..!",
                })}
                onKeyUp={() => {
                  trigger("selectdesignation");
                }}>
                <option value=''>Select Designation</option>
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
        ) : (
          ""
        )}

        {bulkEditCheckCondition == "Reporting Manager" ? (
          <div>
            <div className=' w-50 m-auto'>
              <select
                className='form-control'
                {...register("selectreportingManager", {
                  required: "Please select  Employee..!",
                })}
                onKeyUp={() => {
                  trigger("selectreportingManager");
                }}>
                <option value=''>Select Employee</option>
                {employee.map((item, i) => {
                  return (
                    <option value={item.id} key={i}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>{" "}
          </div>
        ) : (
          ""
        )}

        {bulkEditCheckCondition == "Grades" ? (
          <div>
            <div className=' w-50 m-auto'>
              <select
                className='form-control'
                {...register("selectEmployeeGrade", {
                  required: "Please select Grade..!",
                })}
                onKeyUp={() => {
                  trigger("selectEmployeeGrade");
                }}>
                <option value=''>Select Grade</option>
                {Gradess.map((grade, i) => {
                  return (
                    <option value={grade.id} key={i}>
                      {grade.grade}
                    </option>
                  );
                })}
              </select>
            </div>{" "}
          </div>
        ) : (
          ""
        )}
        {bulkEditCheckCondition == "Location" ? (
          <div>
            <div className=' w-50 m-auto'>
              <select
                className='form-control'
                {...register("selectwork_location", {
                  required: "Please select  Location..!",
                })}
                onKeyUp={() => {
                  trigger("selectwork_location");
                }}>
                <option value=''>Select Location</option>
                {workLocations.map((item, i) => {
                  return (
                    <option value={item} key={i}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>{" "}
          </div>
        ) : (
          ""
        )}

        {bulkEditCheckCondition == "Employee Status" ? (
          <div>
            <div className=' w-50 m-auto'>
              <select
                className='form-control'
                {...register("selectemployeeStatus", {
                  required: "Please select  Status..!",
                })}
                onKeyUp={() => {
                  trigger("selectemployeeStatus");
                }}>
                <option value=''>-- Employee Status --</option>
                <option value='Active'>Active</option>
                <option value='Inactive'>Inactive</option>
                <option value='YetToJoin'>Yet To Join</option>
              </select>
            </div>{" "}
          </div>
        ) : (
          ""
        )}

        {bulkEditCheckCondition == "Employee Type" ? (
          <div>
            <div className=' w-50 m-auto'>
              <select
                className='form-control'
                {...register("selectemployee_type", {
                  required: "Please select  Employee Type..!",
                })}
                onKeyUp={() => {
                  trigger("selectemployee_type");
                }}>
                <option value=''>Select Type</option>
                {employeeTypes.map((item, l) => {
                  return (
                    <option value={item.id} key={l}>
                      {item.value}
                    </option>
                  );
                })}
              </select>
            </div>{" "}
          </div>
        ) : (
          ""
        )}

        <div className={`m-3 text-center `}>
          <small className='text-danger'>{erroreffectiveDate2}</small>
          <br />
          <button
            className='btn btn-primary'
            onClick={() => {
              bulkEditInnerSaveSection();
            }}>
            OK
          </button>{" "}
          &nbsp; &nbsp;
          <button
            className='btn btn-primary'
            onClick={() => {
              bulkEditInnerPopUpClose();
            }}>
            Cancel
          </button>
        </div>
      </Modal>

      <Modal
        size='md'
        show={bulkeditSuccessPopup}
        onHide={() => setbulkeditSuccessPopup(false)}
        className='text-center'>
        <Modal.Header closeButton>Success</Modal.Header>
        <h4 className='text-center'>Updated Successfully</h4>
        <div className='text-center m-3'>
          <button
            className='btn btn-primary'
            onClick={() => {
              setbulkeditSuccessPopup(false);
            }}>
            {" "}
            OK
          </button>
        </div>
      </Modal>
      <Modal
        size='md'
        show={importEmployeeSuccessPopup}
        onHide={() => setimportEmployeeSuccessPopup(false)}
        className='text-center'>
        <Modal.Header closeButton>Success</Modal.Header>
        <h4 className='text-center'>Employee Details imported Successfully</h4>
        <div className='text-center m-3'>
          <button
            className='btn btn-primary'
            onClick={() => {
              setimportEmployeeSuccessPopup(false);
            }}>
            {" "}
            OK
          </button>
        </div>
      </Modal>
      <Modal
        size='md'
        show={resendActivationSuccessPopup}
        onHide={() => setresendActivationSuccessPopup(false)}
        className='text-center'>
        <Modal.Header closeButton>Success</Modal.Header>
        <h4 className='text-center'>Resend Activation Successfully</h4>
        <div className='text-center m-3'>
          <button
            className='btn btn-primary'
            onClick={() => {
              setresendActivationSuccessPopup(false);
            }}>
            {" "}
            OK
          </button>
        </div>
      </Modal>

      <Modal
        size='md'
        show={pleaseSelectOneEmployee}
        onHide={() => setpleaseSelectOneEmployee(false)}
        className='text-center'>
        <Modal.Header closeButton>Alert</Modal.Header>
        <h4 className='text-center'>Please Select at least One Employee.</h4>
        <div className='text-center m-3'>
          <button
            className='btn btn-primary'
            onClick={() => {
              setpleaseSelectOneEmployee(false);
            }}>
            {" "}
            OK
          </button>
        </div>
      </Modal>

      <Modal
        size='md'
        show={errorImportEmployees}
        onHide={() => seterrorImportEmployees(false)}
        className='text-center'>
        <Modal.Header closeButton>Alert</Modal.Header>
        <h4 className='text-center'>{importemployeeMessageError}</h4>
        <div className='text-center m-3'>
          <button
            className='btn btn-primary'
            onClick={() => {
              seterrorImportEmployees(false);
            }}>
            {" "}
            OK
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Directory;
