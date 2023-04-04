import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import moment from "moment";
import DatePicker from "react-datepicker";
import { IoIosArrowBack } from "react-icons/io";
import Header from "../Dashboard/Header";
import EmployeeInnerNav from "./EmployeeInnerNav";
import { useNavigate } from "react-router-dom";
import { AiOutlineCaretRight } from "react-icons/ai";
// import { Link, Routes, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import { subDays } from "date-fns";
import Button from "react-bootstrap/Button";
const Max_Steps = 5;
const colors = {
  "2 MB": "2097152",
  "3 MB": "3145728",
  "4 MB": "4194304",
};
const AddEmployee = () => {
  const [file, setFile] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [currentAddress, setCurrentAddress] = useState(false);
  const [listEmployes, setListEmployes] = useState([]);
  const [ShowSuccess, setShowSuccess] = useState(false)
  const [onClickFalse, setonClickFalse] = useState(false);
  const handleShow = () => {
    setShow(true);
  };
  const [MarritalStatus, getMarritalStatus] = useState("")
  const [formStep, setFormStep] = useState(0);
  const [dates, setDates] = useState();
  const [departments, setDepartments] = useState([]);
  const [organization, setOrganization] = useState([]);
  const [designation, setDesignation] = useState([]);
  const [MaxDateOfBith, setMaxDateOfBith] = useState()
  const [designationsListbyDep, setDesignationsListbyDep] = useState([]);
  const [branchesListbyloc, setBranchesListbyloc] = useState([]);
  const [branchList, setBranchList] = useState([]);
  const [locationList, setLocationList] = useState([]);
  const [formValues, setFormValues] = useState([]);
  const [color, setColor] = useState("2097152");
  const navigate = useNavigate();
  const [Checkedid, setCheckedid] = useState(false);
  const [designationNames, setDesignationNames] = useState([]);
  const [subDepartments, setSubDepartments] = useState([]);
  const [subDepartmentValue, setSubDepartmentValue] = useState([]);
  // [{ name: "" }];
  const {
    register,
    getValues,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors, isValid },
  } = useForm({ mode: "all" });
  const completeFormStep = () => {
    setFormStep(cur => cur + 1);
  };

  useEffect(() => {
    renderButton();
  }, [formStep])
  const getlocationswithpincurrent = async (data) => {
    if (data.length === 6) {
      await axios
        .post("/postzipcode/ ", { pincode: data })
        .then(result => {
          setValue("CCity", result.data.City)
          setValue("CState", result.data.State)
        })
        .catch(err => {
          setValue("CPin_Code", "")
          setValue("CCity", "");
          setValue("CState", "");
        });
    }
  };
  const getlocationswithpinPermanent = async (data) => {
    setCurrentAddress(false)
    if (data.length === 6) {
      await axios
        .post("/postzipcode/ ", { pincode: data })
        .then(result => {
          setValue("PCity", result.data.City)
          setValue("PState", result.data.State)

        })
        .catch(err => {
          setValue("PPin_Code", "")
          setValue("PCity", "");
          setValue("PState", "");
        });
    }
  };
  const getemployeeData = async () => {
    try {
      const response = await axios.get(
        "/api/user/get_allemployeedata/"
      );
      setListEmployes(response.data);
    } catch (error) {
      console.log("not found");
      setListEmployes([]);
    }
  };
  useEffect((async) => {
    const getdepartments = async () => {

      await axios
        .get("/get_department/ ")
        .then(result => {
          setDepartments(result.data)
          console.log('department get api calling', result.data);

        })
        .catch(err => {

        });
    };

    const getorganization = async () => {

      await axios
        .get("/get_organization/ ")
        .then(result => {
          setOrganization(result.data)
        })
        .catch(err => {

        });
    };
    const getdesignations = async () => {

      await axios
        .get("/get_designation/ ")
        .then(result => {
          setDesignation(result.data)
        })
        .catch(err => {

        });
    };
    const getlocation = async () => {

      await axios
        .get("/location_get/")
        .then(result => {
          setLocationList(result.data)
        })
        .catch(err => {

        });
    };
    const getbranch = async () => {

      await axios
        .get("/Branch_get/")
        .then(result => {
          setBranchList(result.data)
        })
        .catch(err => {

        });
    };
    getdepartments(); // run it, run it
    getorganization();
    getdesignations();
    getlocation();
    getbranch();
    getemployeeData();
    var newDate = new Date();
    var substact = moment(newDate).subtract(18, 'years').format("YYYY-MM-DD");
    setMaxDateOfBith(substact)
    //setValue("Date_of_Birth", substact);
  }, [])
  const renderButton = () => {
    var temp = false;
    if (formStep > 5) {
      return undefined;
    } else if (formStep === 4) {
      console.log('isvalid', isValid, 'onClickFalse', onClickFalse)
      if (isValid === true && onClickFalse === false) {
        temp = false;
      } else if (isValid === true && onClickFalse === true) {
        temp = true;
      } else if (isValid === false && onClickFalse === false) {
        temp = true;
      } else if (isValid === false && onClickFalse === true) {
        temp = true;
      }
      return (

        <>
          <div className="text-center">
            Check all details given in inputs
          </div>
          <button type='submit' className=''>
            Submit
          </button>
        </>
      );
    } else {
      return (
        <button
          type="button"
          disabled={!isValid}
          onClick={completeFormStep}
          className="btn"
        >
          Next Step
        </button>
      );
    }
  };

  const goToPreviousStep = () => {
    setFormStep(cur => cur - 1);
  };
  //attachements
  // let handleChange = (i, e) => {
  //   //size
  //   for (let j = 0; j <= i; j++) {
  //     let file_size = e.target.files[j].size;
  //     console.log("size", file_size);
  //     console.log("selectedsize", color);
  //     if (file_size >= color) {
  //       console.log("File size exceeds 2 MiB");
  //     } else {
  //       //validation
  //       let newFormValues = [...formValues];
  //       newFormValues[i][e.target.name] = e.target.value;
  //       setFormValues(newFormValues);
  //     }
  //   }
  // };

  let addFormFields = () => {
    setFormValues([...formValues, { name: "", file1: "" }]);
  };

  let removeFormFields = i => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };
  const okemployeesuccess = () => {
    setShowSuccess(false);
  }
  const currentAddressissame = (data) => {
    setCheckedid(data);
    //isValid = true;
    //formState.isValid = true;
    var holeData = getValues();
    if (data) {
      setCurrentAddress(true);
      setValue("CAdress1", holeData.PAdress1);
      setValue("CAdress2", holeData.PAdress2);
      setValue("CPin_Code", holeData.PPin_Code);
      setValue("CCity", holeData.PCity);
      setValue("CState", holeData.PState);


    } else {
      setCurrentAddress(false);
    }
  }

  const searchwithfilters1 = async (data) => {
    var res = {
      af_desg_dept_id: data ? data : "",
    };
    await axios
      .post(`/designation_filter2/`, res)
      .then((result) => {
        console.log(result.data);
        setDesignationsListbyDep(result.data);
      })
      .catch((err) => { });
  };

  const setLocationbybranchesList = async (data) => {
    var res = {
      location_name: data ? data : "",
    };
    await axios
      .post(`/branch_filter2/`, res)
      .then((result) => {
        console.log(result.data);
        setBranchesListbyloc(result.data);
      })
      .catch((err) => { });
  }
  const submitForm = async () => {
    setonClickFalse(true)
    const data = getValues();
    let years = getValues("years");
    let month = getValues("month");
    // let workExperience = years + "Years" + month + "Months";
    //workExperience.join(' . ');
    // console.log("only work experiance value", workExperience);
    // console.log('user submited data',data.subDepartment_Name)
    const formData = new FormData();
    // var subDepart = new Array();

    // data.subDepartment_Name.map((item) => {
    //   subDepart.push(item)
    // })
    formData.append("Company_name", data.Company_name);
    formData.append("First_Name", data.First_Name);
    formData.append("Middle_Name", data.Middle_Name);
    formData.append("Last_Name", data.Last_Name);
    formData.append("Mother_Name", data.Mother_Name);
    formData.append("Father_Name", data.Father_Name);
    formData.append("Date_of_Birth", data.Date_of_Birth);
    formData.append("Gender", data.Gender);
    formData.append("Pan_CardNumber", data.Pan_CardNumber);
    formData.append("Adhaar_Card", data.Adhaar_Card);
    formData.append("Marrital_Status", data.Marrital_Status);
    formData.append("Nationality", data.Nationality);
    formData.append("Alternate_Mobile_Number", data.Alternate_Mobile_Number);
    formData.append("Personal_Email", data.Personal_Email);
    formData.append("Department_Name", data.Department_Name);
    formData.append("Designation_Name", data.Designation_Name);
    formData.append("sub_department", data.subDepartment_Name);
    formData.append("Designation_title", data.designationTitle);
    formData.append("Employee_type", data.employeeType);
    formData.append("Work_Experience_Years", years);
    formData.append("Work_Experience_Months", month);
    //---- work history--//
    formData.append("PDepartment_Name", data.PDepartment_Name);
    formData.append("PDesignation_Name", data.PDesignation_Name);
    formData.append("From_Date", data.FromYear);
    formData.append("To_Date", data.To);
    formData.append("Probation_period", data.probationPeriod);
    formData.append("Reporting_Manager", data.Reporting_Manager);
    formData.append("Date_Of_Joining", data.Date_Of_Joining);
    formData.append("Location", data.Location);
    formData.append("Branch_Name", data.Branch_Name);
    formData.append("Mobile_No", data.Mobile_No);
    formData.append("Emargency_Contact_No", data.Emargency_Contact_No);
    formData.append("Official_Email", data.Official_Email);
    formData.append("PAdress1", data.PAdress1);
    formData.append("PAdress2", data.PAdress2);
    formData.append("PPin_Code", data.PPin_Code);
    formData.append("PState", data.PState);
    formData.append("PCity", data.PCity);
    formData.append("CAdress1", data.CAdress1);
    formData.append("CAdress2", data.CAdress2);
    formData.append("CPin_Code", data.CPin_Code);
    formData.append("CState", data.CState);
    formData.append("CCity", data.CCity);
    formData.append("married_date", data.married_date);
    formData.append("spoues_name", data.spoues_name);
    formData.append("spouse_birthday", data.spouse_birthday);
    formData.append("Upload_AdhaarCard", data.Upload_AdhaarCard[0]);
    formData.append("Upload_PanCard", data.Upload_PanCard[0]);
    formData.append("Upload_Photograph", data.Upload_Photograph[0]);

    if (data.Attachment1) {
      formData.append("Attachment1", data.Attachment1[0]);
    }
    if (data.Attachment2) {
      if (data.Attachment2[0]) {
        formData.append("Attachment2", data.Attachment2[0]);
      }

    }
    if (data.Attachment3) {
      if (data.Attachment3[0]) {
        formData.append("Attachment3", data.Attachment3[0]);
      }
    }

    console.log(formData)
    if (formStep === 4) {
      await axios
        .post("/api/user/add-employee/", formData)
        .then(result => {
          setShowSuccess(true)

        })
        .catch(err => {
          console.log(err)
          alert('Check your details and resubmit')
          console.log("errors", err);
          setFormStep(0);
        });
    }
  };
  document.title = "HRMS | Add Employee";
  const movetoStepone = (num) => {
    setFormStep(num)
  }
  const checkfilesizeandremove = (event, name) => {
    console.log(event.target.files[0])
    if (event.target.files[0].size >= color) {
      alert("Your Uploaded More size your select size")
      setValue(name, "")
    }
  }


  //================================================//
  useEffect(() => {
    getDesignation();
  }, []);


  const getDesignation = async () => {
    try {
      const response = await axios.get(
        "/get_designation/"
      );
      setDesignationNames(response.data);
      // console.log("prasad data",response.data)
    } catch (error) { console.log('errr', error) }
  };


  const onChangeSubDepartment = (id) => {
    if (id) {
      console.log(id)

      var subdepart = departments.filter(item => item.id == id)
      setSubDepartments(subdepart[0].sub_department);
    }
    // else { 
    //   var subdepart = ''
    //    setSubDepartments('')
    // }

  };


  return (
    <>
      <div className='container-fluid' >
        <EmployeeInnerNav />
        <div className='container'>
          <div className='row'>
            <div className="col-md-12">

              <ul className="stepper stepper-horizontal">
                <li className={formStep >= 0 ? "activeBG" : ""}>
                  <a onClick={() => movetoStepone(0)}>
                    <span className="circle">1</span>
                    {/* <span className="label">First step</span> */}
                  </a>
                </li>


                <li className={formStep >= 1 ? "activeBG" : ""}>
                  <a onClick={() => movetoStepone(1)}>
                    <span className="circle">2</span>
                    {/* <span className="label">Second step</span> */}
                  </a>
                </li>


                <li className={formStep >= 2 ? "activeBG" : ""}>
                  <a onClick={() => movetoStepone(2)}>
                    <span className="circle">3</span>
                    {/* <span className="label">Third step</span> */}
                  </a>
                </li>

                <li className={formStep >= 3 ? "activeBG" : ""}>
                  <a onClick={() => movetoStepone(3)}>
                    <span className="circle">4</span>
                    {/* <span className="label">Four step</span> */}
                  </a>
                </li>
                <li className={formStep >= 4 ? "activeBG" : ""}>
                  <a onClick={() => movetoStepone(4)}>
                    <span className="circle">5</span>
                    {/* <span className="label">Fifth step</span> */}
                  </a>
                </li>

              </ul>


            </div>
            <div className="col-md-12">
              <form onSubmit={handleSubmit(submitForm)}>
                {formStep < Max_Steps && (
                  <div className='flex-items-center'>
                    {formStep > 0 && (
                      <button type='button' onClick={goToPreviousStep}>
                        <IoIosArrowBack />
                      </button>
                    )}
                    <p>
                      step {formStep + 1} of {Max_Steps}
                    </p>
                  </div>
                )}
                {formStep >= 0 && (
                  <section style={{ display: formStep === 0 ? "block" : "none" }}>
                    <h2 className='font-semibold text-3xl mb-8'>Personal Details</h2>

                    {/* paste */}
                    <div className='row'>
                      <div className='col-md-6 mb-2 linhe'>
                        <div className='form-group'>
                          <label className='form-label'>Company Name <span className='text-danger mandatory-field'>*</span></label>
                          <select
                            name='Company_name'
                            className='form-control'
                            {...register("Company_name", {
                              required: "Please select company Name",
                            })}>

                            <option value=''>-- Select Company name --</option>
                            {organization.map((item) => {
                              return <option value={item.id} key={item.id}>{item.company_name}</option>
                            })}

                          </select>
                          {/* <p className="text-danger fnsd">Company name is required!</p> */}
                        </div>
                        {/* <div> */}
                        {errors.Company_name && (
                          <span className='text-danger fnsd'>
                            {errors.Company_name.message}
                          </span>
                        )}
                        {/* </div> */}
                      </div>

                      {/* <div className='col-md-6 mb-2 linhe'>
                        <div className='form-group'>
                          <label className='form-label'>Business Unit</label>
                          <select
                            name='Business_Unit'
                            className='form-control'
                            {...register("Business_Unit", {
                              required: "Business Unit is Required",
                            })}>
                            <option value=''>-- Select Business Unit --</option>
                            <option value='73'>Pranathi Software Services</option>
                            <option value='34'>Vitel Global Communication</option>
                          </select>
                         
                        </div>
                        <div>
                          {errors.Business_Unit && (
                            <span className='text-danger fnsd'>
                              {errors.Business_Unit.message}
                            </span>
                          )}
                        </div>
                      </div> */}

                      <div className='col-md-6 mb-2 linhe'>
                        <div className='form-group'>
                          <label className='form-label'>First Name <span className='text-danger mandatory-field'>*</span></label>
                          <input
                            className='form-control'
                            type='text'
                            maxLength={20}
                            {...register("First_Name", {
                              required: "Please enter first name",
                              pattern: {
                                value: /^[a-zA-Z_ ]*$/,
                                message: "Please enter valid first name", // JS only: <p>error message</p> TS only support string
                              },
                            })}
                          />
                        </div>
                        <div>
                          {errors.First_Name && (
                            <span className='text-danger fnsd'>
                              {errors.First_Name.message}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className='col-md-6 mb-2 linhe'>
                        <div className='form-group'>
                          <label className='form-label'>Middle Name</label>
                          <input
                            className='form-control'
                            type='text'
                            maxLength={20}
                            {...register("Middle_Name",
                              {
                                pattern: {
                                  value: /^[a-zA-Z_ ]+$/,
                                  message: "Please enter valid last name", // JS only: <p>error message</p> TS only support string
                                },
                              }

                            )}
                          />
                        </div>
                        <div>
                          {errors.Middle_Name && (
                            <span className='text-danger fnsd'>
                              {errors.Middle_Name.message}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className='col-md-6 mb-2 linhe'>
                        <div className='form-group'>
                          <label className='form-label'>Last Name <span className='text-danger mandatory-field'>*</span></label>
                          <input
                            className='form-control '
                            type='text'
                            maxLength={20}
                            {...register("Last_Name", {
                              required: "Please enter last name",
                              pattern: {
                                value: /^[a-zA-Z_ ]+$/,
                                message: "Please enter valid last name", // JS only: <p>error message</p> TS only support string
                              },
                            })}
                          />
                        </div>
                        <div>
                          {errors.Last_Name && (
                            <span className='text-danger fnsd'>
                              {errors.Last_Name.message}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className='col-md-6 mb-2 linhe'>
                        <div className='form-group'>
                          <label className='form-label'>Mother Name <span className='text-danger mandatory-field'>*</span></label>
                          <input
                            className='form-control'
                            type='text'
                            maxLength={20}
                            {...register("Mother_Name", {
                              required: "Please enter mother name",
                              pattern: {
                                value: /^[a-zA-Z_ ]+$/,
                                message: "Please enter valid mother name", // JS only: <p>error message</p> TS only support string
                              },
                            })}
                          />
                        </div>
                        <div>
                          {errors.Mother_Name && (
                            <span className='text-danger fnsd'>
                              {errors.Mother_Name.message}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className='col-md-6 mb-2 linhe'>
                        <div className='form-group'>
                          <label className='form-label'>Father Name <span className='text-danger mandatory-field'>*</span></label>
                          <input
                            className='form-control'
                            type='text'
                            maxLength={20}
                            {...register("Father_Name", {
                              required: "Please enter father name",
                              pattern: {
                                value: /^[a-zA-Z ]+$/,
                                message: "Please enter valid father name", // JS only: <p>error message</p> TS only support string
                              },
                            })}
                          />
                        </div>
                        <div>
                          {errors.Father_Name && (
                            <span className='text-danger fnsd'>
                              {errors.Father_Name.message}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className='col-md-6 mb-2 linhe'>
                        <div className='form-group'>
                          <label className='form-label'>Date of Birth <span className='text-danger mandatory-field'>*</span></label>

                          <input
                            className='form-control'
                            type='date'
                            max={MaxDateOfBith}
                            {...register("Date_of_Birth", {
                              required: "Please select date of birth",

                            })}
                          />
                          <div>
                            {errors.Date_of_Birth && (
                              <span className='text-danger fnsd'>
                                {errors.Date_of_Birth.message}
                              </span>
                            )}
                          </div>
                        </div>
                        <div></div>
                      </div>

                      <div className='col-md-6 mb-2 linhe'>
                        <div className='form-group'>
                          <label className='form-label'>Gender <span className='text-danger mandatory-field'>*</span></label>
                          <select
                            name='Gender'
                            className='form-control'
                            {...register("Gender", {
                              required: "Please select gender",
                            })}>
                            <option value=''>-- Select Gender --</option>
                            <option value='Male'>Male</option>
                            <option value='Female'>Female</option>
                          </select>
                        </div>
                        <div>
                          {errors.Gender && (
                            <span className='text-danger fnsd'>
                              {errors.Gender.message}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className='col-md-6 mb-2 linhe'>
                        <div className='form-group'>
                          <label className='form-label'>PAN Number <span className='text-danger mandatory-field'>*</span> <small>Sample Pan (ABCTY1234D)</small></label>
                          <input
                            className='form-control'
                            type='text'
                            placeholder="ABCTY1234D"
                            {...register("Pan_CardNumber", {
                              required: "Please enter pan card number",
                              pattern: {
                                value: /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/,
                                message: "Please enter valid pan card number", // JS only: <p>error message</p> TS only support string
                              },
                            })}
                          />
                        </div>
                        <div>
                          {errors.Pan_CardNumber && (
                            <span className='text-danger fnsd'>
                              {errors.Pan_CardNumber.message}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className='col-md-6 mb-2 linhe'>
                        <div className='form-group'>
                          <label className='form-label'>Upload Pan Card <span className='text-danger mandatory-field'>*</span></label>
                          <input
                            className='form-control'
                            type='file'
                            accept="image/png, image/jpeg"
                            // onChange={e => {
                            //   setFile(e.target.files[0]);
                            //   console.log(e.target.files[0]);
                            // }}
                            {...register("Upload_PanCard")}
                          />
                        </div>
                        <div>
                          {errors.Upload_PanCard && (
                            <span className='text-danger fnsd'>
                              {errors.Upload_PanCard.message}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className='col-md-6 mb-2 linhe'>
                        <div className='form-group'>
                          <label className='form-label'>Aadhaar <span className='text-danger mandatory-field'>*</span></label>
                          <input
                            className='form-control'
                            type='number'
                            maxLength={12}
                            {...register("Adhaar_Card", {
                              required: "Please enter 12 digit aadhaar number",
                              pattern: {
                                value: /^[0-9]+$/,
                                message: "Please enter valid 12 digit aadhaar number", // JS only: <p>error message</p> TS only support string
                              },
                              minLength: {
                                value: 12,
                                message: "Please enter valid 12 digit aadhaar number", // JS only: <p>error message</p> TS only support string
                              },
                              maxLength: {
                                value: 12,
                                message: "Please enter valid 12 digit aadhaar number", // JS only: <p>error message</p> TS only support string
                              },
                            })}

                          />
                        </div>
                        <div>
                          {errors.Adhaar_Card && (
                            <span className='text-danger fnsd'>
                              {errors.Adhaar_Card.message}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className='col-md-6 mb-2 linhe'>
                        <div className='form-group'>
                          <label className='form-label'>Upload Aadhaar card <span className='text-danger mandatory-field'>*</span></label>
                          <input
                            className='form-control'
                            type='file'
                            accept="image/png, image/jpeg"
                            {...register("Upload_AdhaarCard")}
                          />
                        </div>
                        <div>
                          {errors.Upload_AdhaarCard && (
                            <span className='text-danger fnsd'>
                              {errors.Upload_AdhaarCard.message}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className='col-md-6 mb-2 linhe'>
                        <div className='form-group'>
                          <label className='form-label'>Marital Status <span className='text-danger mandatory-field'>*</span></label>
                          <select
                            name='marital'
                            className='form-control'
                            {...register("Marrital_Status", {
                              required: "Marital Status is Required",
                            })}
                            onChange={(e) => getMarritalStatus(e.target.value)}
                          >
                            <option value=''>-- Select Marital Status --</option>
                            <option value='Married'>Married</option>
                            <option value='Single'>Single</option>
                          </select>
                          {/* <p className="text-danger fnsd">Company name is required!</p> */}
                        </div>
                        <div>
                          {errors.Marrital_Status && (
                            <span className='text-danger fnsd'>
                              {errors.Marrital_Status.message}
                            </span>
                          )}
                        </div>
                      </div>
                      {MarritalStatus === "Married" ?
                        (<><div className='col-md-6 mb-2 linhe'>
                          <div className='form-group'>
                            <label className='form-label'>Spouse Birthday</label>

                            <input
                              className='form-control'
                              type='date'
                              {...register("spouse_birthday")}
                            />

                          </div>
                          <div></div>
                        </div>
                          <div className='col-md-6 mb-2 linhe'>
                            <div className='form-group'>
                              <label className='form-label'>Married Date</label>

                              <input
                                className='form-control'
                                type='date'
                                {...register("married_date")}
                              />

                            </div>
                            <div></div>
                          </div>
                          <div className='col-md-6 mb-2 linhe'>
                            <div className='form-group'>
                              <label className='form-label'>Spouse Name</label>
                              <input
                                className='form-control'
                                maxLength={20}
                                type='text'
                                {...register("spoues_name", {
                                  pattern: {
                                    value: /^[a-zA-Z_ ]+$/,
                                    message: "Only Alphabets allowed", // JS only: <p>error message</p> TS only support string
                                  },
                                })}
                              />
                            </div>

                          </div>
                        </>
                        ) : ""}

                      <div className='col-md-6 mb-2 linhe'>
                        <div className='form-group'>
                          <label className='form-label'>Nationality <span className='text-danger mandatory-field'>*</span></label>
                          <input
                            className='form-control'
                            type='text'
                            maxLength={20}
                            {...register("Nationality", {
                              required: "Please enter nationality",
                              pattern: {
                                value: /^[a-zA-Z_ ]+$/,
                                message: "Please enter valid nationality", // JS only: <p>error message</p> TS only support string
                              },
                            })}
                          />
                        </div>
                        <div>
                          {errors.Nationality && (
                            <span className='text-danger fnsd'>
                              {errors.Nationality.message}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className='col-md-6 mb-2 linhe'>
                        <div className='form-group'>
                          <label className='form-label'>Alternate Mobile no <span className='text-danger mandatory-field'>*</span></label>
                          <input
                            className='form-control'
                            type='number'
                            maxLength={15}
                            {...register("Alternate_Mobile_Number", {
                              required: "Please enter alternate mobile number",
                              pattern: {
                                value: /^[0-9]+$/,
                                message: "Please enter 10 digit alternate mobile number", // JS only: <p>error message</p> TS only support string
                              },
                              minLength: {
                                value: 10,
                                message: "Please enter 10 to 15 digit alternate mobile number ", // JS only: <p>error message</p> TS only support string
                              },
                              maxLength: {
                                value: 15,
                                message: "Please enter 10 to 15 digit alternate mobile number  ", // JS only: <p>error message</p> TS only support string
                              },
                            })}
                          />
                        </div>
                        <div>
                          {errors.Alternate_Mobile_Number && (
                            <span className='text-danger fnsd'>
                              {errors.Alternate_Mobile_Number.message}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className='col-md-6 mb-2 linhe'>
                        <div className='form-group'>
                          <label className='form-label'>Personal Email <span className='text-danger mandatory-field'>*</span></label>
                          <input
                            className='form-control'
                            type='text'
                            {...register("Personal_Email", {
                              required: "Please enter personal email",
                              pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]{2,}\.+[A-Z]{2,}$/i,
                                message: "Please enter valid personal email", // JS only: <p>error message</p> TS only support string
                              },
                            })}
                          />
                        </div>
                        <div>
                          {errors.Personal_Email && (
                            <span className='text-danger fnsd'>
                              {errors.Personal_Email.message}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className='col-md-6 mb-2 linhe'>
                        <div className='form-group'>
                          <label className='form-label'>Upload Photograph <span className='text-danger mandatory-field'>*</span></label>
                          <input
                            className='form-control'
                            type='file'
                            accept="image/png, image/jpeg"
                            {...register("Upload_Photograph", {
                              required: "Photograph  is Required",
                            })}
                          />
                        </div>
                        <div>
                          {errors.Upload_Photograph && (
                            <span className='text-danger fnsd'>
                              {errors.Upload_Photograph.message}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </section>
                )}
                {formStep >= 1 && (
                  <section style={{ display: formStep === 1 ? "block" : "none" }}>
                    <h2 className='font-semibold text-3xl mb-8'>Employment Details</h2>


                    <div className='row'>
                      <div className='col-md-6 mb-2 linhe'>
                        <div className='form-group'>
                          <label className='form-label'>Department Name <span className='text-danger mandatory-field'>*</span></label>
                          <select
                            name='Department_Name'
                            className='form-control'
                            {...register("Department_Name", {
                              required: "Please select department name",
                            })}
                            onChange={(e) => {
                              searchwithfilters1(e.target.value)
                              onChangeSubDepartment(e.target.value)
                            }}

                          >
                            <option value=''>-- Select Department Name --</option>
                            {departments.map((item) => {
                              return <option value={item.id} key={item.id}>{item.department_name1}</option>
                            })}


                          </select>
                        </div>
                        <div>
                          {errors.Department_Name && (
                            <span className='text-danger fnsd'>
                              {errors.Department_Name.message}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className='col-md-6 mb-2 linhe'>
                        <div className='form-group'>
                          <label className='form-label'> Sub Department Name <span className='text-danger mandatory-field'></span></label>
                          <select
                            name='subDepartment_Name'
                            className='form-control'
                            multiple
                            {...register("subDepartment_Name")}
                          //onChange={ (e)=>getcurrentsubdept(e.target.value)}
                          >
                            <option value=''>-- Select Sub Department Name --</option>
                            {subDepartments.map((item, id) => {
                              return <option value={item} key={item}>{item}</option>
                            })}

                          </select>
                        </div>
                        <div>
                          {errors.subDepartment_Name && (
                            <span className='text-danger fnsd'>
                              {errors.subDepartment_Name.message}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className='col-md-6 mb-2 linhe'>
                        <div className='form-group'>
                          <label className='form-label'>Designation Name <span className='text-danger mandatory-field'>*</span></label>
                          <select
                            name='Designation_Name'
                            className='form-control'

                            {...register("Designation_Name", {
                              required: "Please select designation name",
                            })}>
                            <option value=''>-- Select Designation Name --</option>
                            {designationNames.map((item) => {
                              return <option value={item.id} key={item.id}>{item.department}</option>
                            })}

                          </select>
                        </div>
                        <div>
                          {errors.Designation_Name && (
                            <span className='text-danger fnsd'>
                              {errors.Designation_Name.message}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className='col-md-6 mb-2 linhe'>
                        <div className='form-group'>
                          <label className='form-label'>Designation Title <span className='text-danger mandatory-field'></span></label>
                          <input
                            className='form-control'
                            type='text'
                            {...register("designationTitle")}
                          />
                        </div>
                        <div>
                          {errors.designationTitle && (
                            <span className='text-danger fnsd'>
                              {errors.designationTitle.message}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className='col-md-6 mb-2 linhe'>
                        <div className='form-group'>
                          <label className='form-label'>Reporting Manager <span className='text-danger mandatory-field'>*</span></label>
                          <select
                            name='Reporting_Manager'
                            className='form-control'
                            {...register("Reporting_Manager", {
                              required: "Please select reporting manager",
                            })}>
                            <option value=''>
                              Select Reporting Manager
                            </option>
                            <option value={1} >Testing</option>
                            {listEmployes.map((item) => {
                              return <option value={item.id} key={item.id}>{item.First_Name}</option>
                            })}
                          </select>
                        </div>
                        <div>
                          {errors.Reporting_Manager && (
                            <span className='text-danger fnsd'>
                              {errors.Reporting_Manager.message}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className='col-md-6 mb-2 linhe'>
                        <div className='form-group'>
                          <label className='form-label'>Date of Joining <span className='text-danger mandatory-field'>*</span></label>
                          <input
                            className='form-control'
                            type='date'
                            {...register("Date_Of_Joining", {
                              required: "Please select date of joining",
                            })}
                          />
                        </div>
                        <div>
                          {errors.Date_Of_Joining && (
                            <span className='text-danger fnsd'>
                              {errors.Date_Of_Joining.message}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className='col-md-6 mb-2 linhe'>
                        <div className='form-group'>
                          <label className='form-label'>Location <span className='text-danger mandatory-field'>*</span></label>
                          <select
                            name='Location'
                            className='form-control'
                            {...register("Location", {
                              required: "Please select Loaction",
                            })}
                            onChange={(e) => setLocationbybranchesList(e.target.value)}
                          >
                            <option value=''>-- Select Location --</option>
                            {locationList.map((item) => {
                              return <option value={item.id}>{item.location_name}</option>
                            })}
                          </select>
                        </div>
                        <div>
                          {errors.Location && (
                            <span className='text-danger fnsd'>
                              {errors.Location.message}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className='col-md-6 mb-2 linhe'>
                        <div className='form-group'>
                          <label className='form-label'>Branch Name <span className='text-danger mandatory-field'>*</span></label>
                          <select
                            name='Branch_Name'
                            className='form-control'
                            {...register("Branch_Name", {
                              required: "Please select branch name",
                            })}>
                            <option value=''>-- Select Branch --</option>
                            {branchesListbyloc.map((item) => {
                              return <option value={item.id}>{item.branch_name}</option>
                            })}

                          </select>
                        </div>
                        <div>
                          {errors.Branch_Name && (
                            <span className='text-danger fnsd'>
                              {errors.Branch_Name.message}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className='col-md-6 mb-2 linhe'>
                        <div className='form-group'>
                          <label className='form-label'>Mobile no <span className='text-danger mandatory-field'>*</span></label>
                          <input
                            className='form-control'
                            type='number'
                            maxLength={15}
                            {...register("Mobile_No", {
                              required: "Please enter 10 digit Mobile Number",
                              pattern: {
                                value: /^[0-9]+$/,
                                message: "Please enter 10 digit Mobile Number", // JS only: <p>error message</p> TS only support string
                              },
                              minLength: {
                                value: 10,
                                message: "Please enter Minimum 10 and Maximum 15 Mobile Number", // JS only: <p>error message</p> TS only support string
                              },
                              maxLength: {
                                value: 15,
                                message: "Please enter Minimum 10 and Maximum 15 Mobile Number", // JS only: <p>error message</p> TS only support string
                              },
                            })}

                          />
                        </div>
                        <div>
                          {errors.Mobile_No && (
                            <span className='text-danger fnsd'>
                              {errors.Mobile_No.message}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className='col-md-6 mb-2 linhe'>
                        <div className='form-group'>
                          <label className='form-label'>Emergency contact no <span className='text-danger mandatory-field'>*</span></label>
                          <input
                            className='form-control'
                            type='number'
                            maxLength={15}
                            {...register("Emargency_Contact_No", {
                              required: "Please enter 10 digit emergency number",
                              pattern: {
                                value: /^[0-9]+$/,
                                message: "Please enter 10 digit emergency number", // JS only: <p>error message</p> TS only support string
                              },
                              minLength: {
                                value: 10,
                                message: "Please enter Minimum 10 and Maximum 15 emergency number", // JS only: <p>error message</p> TS only support string
                              },
                              maxLength: {
                                value: 15,
                                message: "Please enter Minimum 10 and Maximum 15 emergency number", // JS only: <p>error message</p> TS only support string
                              },
                            })}
                          />
                        </div>
                        <div>
                          {errors.Emargency_Contact_No && (
                            <span className='text-danger fnsd'>
                              {errors.Emargency_Contact_No.message}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className='col-md-6 mb-2 linhe'>
                        <div className='form-group'>
                          <label className='form-label'>Official Email <span className='text-danger mandatory-field'>*</span></label>
                          <input
                            className='form-control'
                            type='text'
                            {...register("Official_Email", {
                              required: "Please enter Official Email",
                              pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]{2,}\.+[A-Z]{2,}$/i,
                                message: "Please enter valid Official Email",  // JS only: <p>error message</p> TS only support string
                              },
                            })}
                          />
                        </div>
                        <div>
                          {errors.Official_Email && (
                            <span className='text-danger fnsd'>
                              {errors.Official_Email.message}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className='col-md-6 mb-2 linhe'>
                        <div className='form-group'>
                          <label className='form-label'> Employee Type<span className='text-danger mandatory-field'>*</span></label>
                          <select className="form-control"
                            {...register("employeeType", {
                              required: "Please select  Employee Type...!",
                            })}
                            onKeyUp={() => {
                              trigger("employeeType");
                            }}>
                            <option value='' >Select Employee Type</option>
                            <option value='Full Time'>Full Time</option>
                            <option value='Part Time' >Part Time</option>
                            <option value='Intern' >Intern</option>
                            <option value='On Contract' >On Contract</option>
                          </select>
                        </div>
                        <div>
                          {errors.employeeType && (
                            <span className='text-danger fnsd'>
                              {errors.employeeType.message}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className='col-md-6 mb-2 linhe'>
                        <div className='form-group'>
                          <label className='form-label'>Probation Period <span className='text-danger mandatory-field'>*</span></label>
                          <select className="form-control"
                            {...register("probationPeriod", {
                              required: "Please select probation period..!",
                            })}
                            onKeyUp={() => {
                              trigger("probationPeriod");
                            }}>
                            <option value='' >Select probation period</option>
                            <option value='0'>0</option>
                            <option value='15' >15</option>
                            <option value='30' >30</option>
                            <option value='45' >45</option>
                            <option value='60' >60</option>
                            <option value='75' >75</option>
                            <option value='90' >90</option>
                            <option value='120' >120</option>
                            <option value='150' >150</option>
                            <option value='180' >180</option>
                          </select>
                        </div>
                        <div>
                          {errors.probationPeriod && (
                            <span className='text-danger fnsd'>
                              {errors.probationPeriod.message}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className='col-md-6 mb-2 linhe'>
                        <div className='form-group'>
                          <label className='form-label'> Work Experience <span className='text-danger mandatory-field'>*</span></label>
                          <div className="row">
                            <div className="col-md-4 d-flex align-items-center"> <input
                              className='form-control justify-content-start'
                              type='text'
                              {...register("years", {
                                required: "This Field is Requried..!",
                                pattern: {
                                  value: /^\d+$/,
                                  message: "Please enter only numbers",
                                },
                              })} onKeyUp={() => {
                                trigger("years");
                              }}
                            />  <span className="justify-content-end ">Years</span> </div>
                            <div className="col-md-4 d-flex align-items-center"><input
                              className='form-control justify-content-start'
                              type='text'
                              {...register("month", {
                                required: "This Field is Requried..!",
                                pattern: {
                                  value: /^\d+$/,
                                  message: "Please enter only numbers",
                                },
                              })} onKeyUp={() => {
                                trigger("month");
                              }}
                            />  <span className="justify-content-end align-items-center">Month</span> </div>
                          </div>
                        </div>
                        <div>
                          {errors.years && (
                            <span className='text-danger fnsd'>
                              {errors.years.message}
                            </span>
                          )}
                          {errors.month && (
                            <span className='text-danger fnsd'>
                              {errors.month.message}
                            </span>
                          )}
                        </div>
                      </div>
                      <div>
                        <h1>Previous Work History</h1>
                        <div> <div className='row'>
                          <div className='col-md-3 mb-2 linhe'>
                            <div className='form-group'>
                              <label className='form-label'> Department Name <span className='text-danger mandatory-field'></span></label>
                              <input
                                className='form-control'
                                name='PDepartment_Name'
                                type='text'
                                {...register("PDepartment_Name")}
                              />
                            </div></div>
                          <div className='col-md-3 mb-2 linhe'>
                            <div className='form-group'>
                              <label className='form-label'> Designation Name <span className='text-danger mandatory-field'></span></label>
                              <input
                                className='form-control'
                                name='PDesignation_Name'
                                type='text'
                                {...register("PDesignation_Name")}
                              />
                            </div></div>
                          <div className='col-md-3 mb-2 linhe'>
                            <div className='form-group'>
                              <label className='form-label'>From <span className='text-danger mandatory-field'></span></label>
                              <input
                                className='form-control'
                                name='FromYear'
                                type='date'
                                {...register("FromYear")}
                              />
                            </div></div>
                          <div className='col-md-3 mb-2 linhe'>
                            <div className='form-group'>
                              <label className='form-label'> To <span className='text-danger mandatory-field'></span></label>
                              <input
                                className='form-control'
                                name='To'
                                type='date'
                                {...register("To")}
                              />
                            </div></div>
                        </div>

                        </div>
                      </div>
                    </div>

                  </section>
                )}
                {formStep >= 2 && (
                  <section style={{ display: formStep === 2 ? "block" : "none" }}>
                    <h2 className='font-semibold text-3xl mb-8'>Contact Details</h2>
                    <div className='row m-0'>
                      <div className='col-md-6 '>
                        <h3><input type="checkbox" checked="checked" onChange={(e) => currentAddressissame(e.target.checked)} /> Permanent Address</h3>

                        <div className='row'>
                          <div className='col-md-12 mb-2 linhe'>
                            <div className='form-group'>
                              <label className='form-label'>Address 1 <span className='text-danger mandatory-field'>*</span></label>
                              <input
                                className='form-control '
                                type='text'
                                maxLength={20}
                                {...register("PAdress1", {
                                  required: "Please enter permanent address 1",
                                  pattern: {
                                    // value: /^[a-zA-Z]+$/,
                                    message: "Please enter permanent address 1", // JS only: <p>error message</p> TS only support string
                                  },
                                })}

                                onChange={(e) => { setCurrentAddress(false); }}
                              />
                            </div>
                            <div>
                              {errors.PAdress1 && (
                                <span className='text-danger fnsd'>
                                  {errors.PAdress1.message}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className='col-md-12 mb-2 linhe'>
                            <div className='form-group'>
                              <label className='form-label'>Address 2 <span className='text-danger mandatory-field'>*</span></label>
                              <input
                                className='form-control '
                                type='text'
                                maxLength={20}
                                {...register("PAdress2", {
                                  required: "Please enter permanent address 2",
                                  pattern: {
                                    // value: /^[a-zA-Z]+$/,
                                    message: "Please enter permanent valid address 2", // JS only: <p>error message</p> TS only support string
                                  },
                                })}
                                onChange={(e) => { setCurrentAddress(false); }}
                              />
                            </div>
                            <div>
                              {errors.PAdress2 && (
                                <span className='text-danger fnsd'>
                                  {errors.PAdress2.message}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className='col-md-12 mb-2 linhe'>
                            <div className='form-group'>
                              <label className='form-label'>Pin Code <span className='text-danger mandatory-field'>*</span></label>
                              <input
                                className='form-control'
                                type='number'
                                maxLength={6}
                                {...register("PPin_Code", {
                                  required: "Please enter Pin Code",
                                  pattern: {
                                    value: /^[0-9]+$/,
                                    message: "Please enter 6 digit valid Pin Code", // JS only: <p>error message</p> TS only support string
                                  },
                                  minLength: {
                                    value: 6,
                                    message: "Please enter 6 digit valid Pin Code ", // JS only: <p>error message</p> TS only support string
                                  },
                                  maxLength: {
                                    value: 6,
                                    message: "Please enter 6 digit valid Pin Code", // JS only: <p>error message</p> TS only support string
                                  },
                                })}
                                onKeyUp={(e) => { getlocationswithpinPermanent(e.target.value); }}
                              />
                            </div>
                            <div>
                              {errors.PPin_Code && (
                                <span className='text-danger fnsd'>
                                  {errors.PPin_Code.message}
                                </span>
                              )}
                            </div>
                            <span className='fnsd' style={{ marginTop: "20px" }}>
                              Note:Please enter the area pincode in order to populate
                              the City and State
                            </span>
                          </div>

                          <div className='col-md-12 mb-2 linhe'>
                            <div className='form-group'>
                              <label className='form-label'>State</label>
                              <input
                                className='form-control '
                                readOnly
                                type='text'
                                {...register("PState")}
                              />
                            </div>
                            <div>
                              {errors.PState && (
                                <span className='text-danger fnsd'>
                                  {errors.PState.message}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className='col-md-12 mb-2 linhe'>
                            <div className='form-group'>
                              <label className='form-label'>City</label>
                              <input
                                className='form-control '
                                readOnly
                                type='text'
                                {...register("PCity")}
                              />
                            </div>
                            <div>
                              {errors.PCity && (
                                <span className='text-danger fnsd'>
                                  {errors.PCity.message}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className='col-md-6'>
                        <h3><input type="checkbox" checked={currentAddress ? "checked" : ""} onChange={(e) => currentAddressissame(e.target.checked)} /> Current Address</h3>

                        <div className='row'>
                          <div className='col-md-12 linhe mb-2'>
                            <div className='form-group'>
                              <label className='form-label'>Address 1 <span className='text-danger mandatory-field'>*</span></label>
                              <input
                                className='form-control '
                                type='text'
                                maxLength={20}
                                {...register("CAdress1", {
                                  required: "Please enter current address 1",
                                  pattern: {
                                    // value: /^[a-zA-Z]+$/,
                                    message: "Please enter valid current address 1", // JS only: <p>error message</p> TS only support string
                                  },
                                })}
                                onKeyUp={() => {
                                  trigger("CAdress1");
                                }}
                              />
                            </div>
                            <div>
                              {errors.CAdress1 && (
                                <span className='text-danger fnsd'>
                                  {errors.CAdress1.message}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className='col-md-12 linhe mb-2'>
                            <div className='form-group'>
                              <label className='form-label'>Address 2 <span className='text-danger mandatory-field'>*</span></label>
                              <input
                                className='form-control '
                                type='text'
                                maxLength={20}
                                {...register("CAdress2", {
                                  required: "Please enter current address 2",
                                  pattern: {
                                    // value: /^[a-zA-Z]+$/,
                                    message: "Please enter valid current address 2", // JS only: <p>error message</p> TS only support string
                                  },
                                })}
                                onKeyUp={() => {
                                  trigger("CAdress2");
                                }}
                              />
                            </div>
                            <div>
                              {errors.CAdress2 && (
                                <span className='text-danger fnsd'>
                                  {errors.CAdress2.message}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className='col-md-12 mb-2 linhe'>
                            <div className='form-group'>
                              <label className='form-label'>Pin Code <span className='text-danger mandatory-field'>*</span></label>
                              <input
                                className='form-control'
                                type='number'
                                maxLength={6}
                                {...register("CPin_Code", {
                                  required: "Please enter 6 digit pin code",
                                  pattern: {
                                    value: /^[0-9]+$/,
                                    message: "Please enter 6 digit valid pin code", // JS only: <p>error message</p> TS only support string
                                  },
                                  minLength: {
                                    value: 6,
                                    message: "Please enter 6 digit valid pin code", // JS only: <p>error message</p> TS only support string
                                  },
                                  maxLength: {
                                    value: 6,
                                    message: "Please enter 6 digit valid pin code", // JS only: <p>error message</p> TS only support string
                                  },
                                })}
                                onKeyUp={(e) => { getlocationswithpincurrent(e.target.value); trigger("CPin_Code"); }}
                              />
                            </div>
                            <div>
                              {errors.CPin_Code && (
                                <span className='text-danger fnsd'>
                                  {errors.CPin_Code.message}
                                </span>
                              )}
                            </div>
                            <span className='fnsd' style={{ marginTop: "20px" }}>
                              Note:Please enter the area pincode in order to populate
                              the City and State
                            </span>
                          </div>

                          <div className='col-md-12 linhe mb-2'>
                            <div className='form-group'>
                              <label className='form-label'>State</label>
                              <input
                                readOnly
                                className='form-control '
                                type='text'
                                {...register("CState")}
                              />
                            </div>
                            <div>
                              {errors.CState && (
                                <span className='text-danger fnsd'>
                                  {errors.CState.message}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className='col-md-12 mb-2 linhe'>
                            <div className='form-group'>
                              <label className='form-label'>City</label>
                              <input
                                className='form-control '
                                type='text'
                                readOnly
                                {...register("CCity")}
                              />
                            </div>
                            <div>
                              {errors.CCity && (
                                <span className='text-danger fnsd'>
                                  {errors.CCity.message}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                )}
                {formStep >= 3 && (
                  <section style={{ display: formStep === 3 ? "block" : "none" }}>

                    <div className='col-md-12'>
                      <h3>Attachments</h3>
                    </div>
                    {formValues.map((element, index) => (
                      <div className=' row form-inline mb-2' key={index}>
                        <div className='col-md-6'>
                          <input
                            type='file'
                            className='form-control'
                            accept='.png,.jpg,.pdf,.gif,.doc'
                            maxsize={color}
                            {...register(`Attachment${index + 1}`)}
                            onChange={(e) => { checkfilesizeandremove(e, `Attachment${index + 1}`); }}
                          />
                          <div className='text-danger'></div>
                          {/* jpg, png, gif, doc, pdf */}
                        </div>
                        <div className='col-md-5'>
                          {index ? (
                            <button
                              type='button'
                              className='button remove btn btn-danger'
                              onClick={() => removeFormFields(index)}>
                              Delete
                            </button>
                          ) : null}
                        </div>
                      </div>
                    ))}
                    <div>
                      <select value={color} onChange={e => setColor(e.target.value)}>
                        {Object.entries(colors).map(c => (
                          <option value={c[1]}>{c[0]}</option>
                        ))}
                      </select>
                    </div>
                    <div className='button-section m-2'>
                      <button
                        className='button add btn btn-primary'
                        type='button'
                        onClick={() => addFormFields()}>
                        Add More Files
                      </button>


                    </div>
                  </section>
                )}


                {renderButton()}
                {/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}
              </form>
            </div>
          </div>
          <div className='col-md-2'></div>
        </div>
        {/* <div className='row p-3'>
          <div className='col-md-2'></div>
          <div className='col-md-5 '>
            <DepartmentAdd />
          </div>
          <div className='col-md-6'></div>
        </div> */}

        <Modal
          size='md'
          show={ShowSuccess}
          onHide={() => setShowSuccess(false)}
          aria-labelledby='example-modal-sizes-title-md'
          className='text-center'>
          <Modal.Body>
            <div className="padding100">
              <AiOutlineCaretRight size={100} className="text-success" />
            </div>
            <h4 className='text-center padding20'>Employee added Successfully</h4>

            <Button variant='primary' onClick={() => okemployeesuccess()}>
              Ok
            </Button>
          </Modal.Body>

        </Modal>
      </div>
    </>

  );
};

export default AddEmployee;
