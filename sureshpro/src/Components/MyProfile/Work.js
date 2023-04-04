import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEdit } from "react-icons/ai";
import axios from "axios";
import moment from "moment";
const MyProfileWork = ({ employeeID }) => {
  const { register, formState: { errors }, getValues, setValue, } = useForm();
  const [employeeBasicsDetails, setemployeeBasicsDetails] = useState({ department: {}, designation: {}, employeeType: {}, subDepartment :{}});
  const [employeeDetails, setemployeeDetails] = useState({});
  const [resignationMinDate, setResignationMinDate] = useState();
  const [resignationInfo, setresignationInfo] = useState({});
  const [editEmpWorkButton, setEditEmpWorkButton] = useState(true)
  const [editEmpWork, setEditEmpWork] = useState(true)
  const [workInfo, setWorkInfo] = useState(true)
  const [workInfoOnBtnClick, setWorkInfoOnBtnClick] = useState(true)
  const [registrationInfo, setRegistrationInfo] = useState(true)
  const [registrationInfoBtnClick, setRegistrationInfoBtnClick] = useState(true)
  const [employeeTypes, setemployeeTypes] = useState([])
  const [departments, setdepartments] = useState([])
  const [subDepartments, setsubDepartments] = useState([])
  const [designationNames, setdesignationNames] = useState([])
  const [workLocations, setworkLocations] = useState([])
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
  const getemployeeTypes = async () => {
    try {
      const response = await axios.get(`/api/directory/employee/type/`)
      setemployeeTypes(response.data)
    } catch (error) {
      console.log('not found')
    }
  }

  const getEmployeeDetails = async () => {
    await axios
      .get(`/api/directory/get_update/employee/${employeeID}/`)
      .then((result) => {
        if (result.data.workInfo){
          if (!result.data.workInfo.employeeType){
            result.data.workInfo.employeeType = {}
          }
          if (!result.data.workInfo.department){
            result.data.workInfo.department = {}
          }
          if (!result.data.workInfo.subDepartment) {
            result.data.workInfo.subDepartment = {}
          }
          if (!result.data.workInfo.designation) {
            result.data.workInfo.designation = {}
          }
          setemployeeBasicsDetails(result.data.workInfo);
        }
        
        if (result.data.resignationInfo){
          setresignationInfo(result.data.resignationInfo);
        }
        
        setemployeeDetails(result.data);
     
        setResignationMinDate(result.data.dateOfJoin)
      })
      .catch((err) => {
        console.log('errors', err)
      })
  }
  const getEditWorkInfo = () => {
    setEditEmpWork(!editEmpWork)
    setEditEmpWorkButton(!editEmpWorkButton);
    setValue("employeeNumber", employeeBasicsDetails.employeeNumber)
    setValue("dateOfJoin", employeeDetails.dateOfJoin)
    setValue("probationPeriod", employeeBasicsDetails.probationPeriod)
    setValue("employeeType", employeeBasicsDetails.employeeType.id)
    setValue("workLocation", employeeBasicsDetails.workLocation)
    setValue("experienceInYears", employeeBasicsDetails.experienceInYears)
    setValue("experienceInMonths", employeeBasicsDetails.experienceInMonths)
    setValue("employeeStatus", employeeBasicsDetails.employeeStatus)

  }
  const workInfoOnClick = () => {
    setWorkInfo(!workInfo)
    setWorkInfoOnBtnClick(!workInfoOnBtnClick)

    setValue("department", employeeBasicsDetails.department.id)
    changeDepartmentforSub(employeeBasicsDetails.department.id);
    setValue("designation", employeeBasicsDetails.designation.id)
    setValue("subDepartment", employeeBasicsDetails.subDepartment.id)
    setValue("jobTitle", employeeBasicsDetails.jobTitle)
  }
  const registrationInfoOnClick = () => {
    setValue("resignationDate", resignationInfo.resignationDate)
    setValue("resignationStatus", resignationInfo.resignationStatus)
    setValue("terminationDate", resignationInfo.terminationDate)
    setValue("noticePeriod", resignationInfo.noticePeriod)
    setRegistrationInfo(!registrationInfo)
    setRegistrationInfoBtnClick(!registrationInfoBtnClick)
  }
  const saveWorkinfowithDepartment = async () => {
    var req = {
      "work_details": {
        "department": getValues('department'),
        "designation": getValues('designation'),
        "jobTitle": getValues('jobTitle'),
        "subDepartment": getValues('subDepartment'),

      }
    }
    await axios
      .patch(`/api/directory/get_update/employee/${employeeID}/`, req)
      .then((result) => {
        getEmployeeDetails()
        setWorkInfo(!workInfo)
        setWorkInfoOnBtnClick(!workInfoOnBtnClick)
      })
      .catch((err) => {
        console.log('errors', err)
      })

  }
  const saveWorkDetails = async () => {
    var req = {
      "dateOfJoin": getValues('dateOfJoin'),
      "work_details": {
        "employeeNumber": getValues('employeeNumber'),
        "workLocation": getValues('workLocation'),
        "employeeType": getValues('employeeType'),
        "experienceInYears": getValues('experienceInYears'),
        "experienceInMonths": getValues('experienceInMonths'),
        "probationPeriod": getValues('probationPeriod'),
      }
    }
    await axios
      .patch(`/api/directory/get_update/employee/${employeeID}/`, req)
      .then((result) => {
        getEmployeeDetails()
        setEditEmpWork(!editEmpWork)
        setEditEmpWorkButton(!editEmpWorkButton);
      })
      .catch((err) => {
        console.log('errors', err)
      })

  }
  const changeDepartmentforSub = (id) => {
    var subdepartmnt = departments.filter(item => item.id === id);
    //console.log(subdepartmnt[0].sub_departments);
    setsubDepartments(subdepartmnt[0].subDepartments)
  }
  const getRegistation = async () => {
    var userinfo = JSON.parse(sessionStorage.getItem("user-info"));
    await axios.get(`/api/company/details/${userinfo.data.id}/`).then((result) => {
      var newarray = [];
      if (result.data.corporateAdressLine1 || result.data.corporateAdressLine2 || result.data.corporateCity || result.data.corporateCountry || result.data.corporatePincode || result.data.corporateState) {
        newarray.push("Corporate Address")
      }

      if (result.data.registeredAdressLine1 || result.data.registeredAdressLine2 || result.data.registeredCity || result.data.registeredCountry || result.data.registeredPincode || result.data.registeredState) {
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
          console.log("no address")
        } else {
          var newarray = [...data];
          result.data.map((item, i) => {
            newarray.push(item.addressTitle)
            return item;
          })
          setworkLocations([...newarray])
        }
      });
    } catch (err) {
      console.log(err)
    }
  }
  const saveResignationinfo =  async () => {


      var resignationInfo = {
        "noticePeriod": getValues('noticePeriod'),

        "resignationStatus": getValues('resignationStatus'),

      }

    
    if (getValues('resignationDate')){

            resignationInfo.resignationDate = moment(getValues('resignationDate')).format('DD/MM/YYYY')
        }
 if (getValues('terminationDate')){
  
            resignationInfo.terminationDate = moment(getValues('terminationDate')).format('DD/MM/YYYY')
        }
        var req = {resignationInfo}
    await axios
      .patch(`/api/directory/get_update/employee/${employeeID}/`, req)
      .then((result) => {
        getEmployeeDetails()
        setRegistrationInfo(!registrationInfo)
        setRegistrationInfoBtnClick(!registrationInfoBtnClick)
      })
      .catch((err) => {
        console.log('errors', err)
      })
  }
  useEffect(()=>{
    getEmployeeDetails();
    getDepartments();
    getDesignations();
    getemployeeTypes();
    getRegistation();
  }, [])
  return (
    <>
      <div className="borderwithline mt-3">
        <strong> BASIC INFO </strong>
        {editEmpWorkButton ? (
          <div
            className="editButtonOnright"
            onClick={() => {
              getEditWorkInfo()
            }}
          >
            <AiOutlineEdit />
          </div>
        ) : (
          ''
        )}
      </div>
     
      {editEmpWork ? (
        <div className="row borderwithshadow" style={{margin:0}}>
          <div className="col-md-6 marginbottom15">
            <div className="">
              <strong> Employee ID</strong>
            </div>
            <div className="">{employeeBasicsDetails.employeeNumber}  </div>
          </div>
          <div className="col-md-6 marginbottom15">
            <div className="">
              <strong>Date of Joining</strong>
            </div>
            <div className="">
              {employeeDetails.dateOfJoin}
            </div>
          </div>
          <div className="col-md-6 marginbottom15">
            <div className="">
              <strong> Probation Period</strong>
            </div>
            <div>{employeeBasicsDetails.probationPeriod}  </div>
          </div>
          <div className="col-md-6 marginbottom15">
            <div className="">
              <strong> Employee Type</strong>
            </div>
            <div>{employeeBasicsDetails.employeeType.value}  </div>
          </div>
          <div className="col-md-6 marginbottom15">
            <div className="">
              <strong> Work Location</strong>
            </div>
            <div>{employeeBasicsDetails.workLocation}  </div>
          </div>
          <div className="col-md-6 marginbottom15">
            <div className="">
              <strong> Employee Status</strong>
            </div>
            <div>{employeeBasicsDetails.employeeStatus}  </div>
          </div>
          <div className="col-md-6 marginbottom15">
            <div className="">
              <strong>Work Experience</strong>
            </div>
            <div>{employeeBasicsDetails.experienceInYears} Years  {employeeBasicsDetails.experienceInMonths} Months</div>
          </div>
        </div>
      ) : (
        <div className="borderwithshadow">
            <div className="row" style={{ margin: 0 }}  >
            <div className="col-md-4 marginbottom15">
              <strong className="form-label"> Employee ID </strong>
              <input
                className="form-control "
                type="text"
                {...register('employeeNumber', {
                  required: 'this field is required',
                })}
              />
              {errors.employeeID && (
                <small className="text-danger">
                  {errors.employeeID.message}
                </small>
              )}
            </div>
            <div className="col-md-4 marginbottom15">
              <strong className=" form-label">Employee Type</strong>
              <select
                name="employeeType"
                className="form-control "
                {...register('employeeType', {
                  required: 'this field required',
                })}
              >
                <option value="">-- Employee Type --</option>
                {employeeTypes.map((item, l) => {
                  return (
                    <option value={item.id} key={l}>
                      {item.value}
                    </option>
                  );
                })}
              </select>
              {errors.employeeType && (
                <small className="text-danger">
                  {errors.employeeType.message}
                </small>
              )}
            </div>
            <div className="col-md-4 marginbottom15">
              <strong className=" form-label">
                Employee Status
              </strong>
              <select
                name="HouseType"
                className="form-control "
                {...register('employeeStatus', {
                  required: 'this field required',
                })}
              >
                <option value="">-- Employee Status --</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="YetToJoin">Yet To Join</option>
              </select>
              {errors.employeeStatus && (
                <small className="text-danger">
                  {errors.employeeStatus.message}
                </small>
              )}
            </div>
          </div>
            <div className="row justify-content-center" style={{ margin: 0 }}>
            <div className="col-md-4 marginbottom15">
              <strong className="form-label"> Date Of Joining</strong>
              <div>
                <input
                  className="form-control"
                  type="date"
                  {...register('dateOfJoin', {
                    required: 'This field is required',
                  })}
                />
                {errors.doj && (
                  <small className="text-danger">
                    {errors.doj.message}
                  </small>
                )}
              </div>
            </div>
            <div className="col-md-4 marginbottom15">
              <strong className=" form-label">WorkLocation</strong>
              <select
                name="HouseType"
                className="form-control "
                {...register('workLocation', {
                  required: 'this field required',
                })}
              >
                <option value="">-- Work Location --</option>
                  {workLocations.map((item, i) => {
                    return (
                      <option value={item} key={i}>
                        {item}
                      </option>
                    );
                  })}
              </select>
              {errors.workLocation && (
                <small className="text-danger">
                  {errors.workLocation.message}
                </small>
              )}
            </div>

            <div className="col-md-4 ">
              <strong className="form-label"> Work Experience</strong>
              <div className="d-flex align-self-end">
                <div className="marginbottom15">
                  <input
                    className="form-control"
                    type="number"
                    {...register('experienceInYears', {
                      required: 'This field is required',
                    })}
                  />

                  {/* {errors.workEYears && (
                                <small className="text-danger">
                                  {errors.workEYears.message}
                                </small>
                              )} */}
                </div>
                <span className=" form-label mt-2">Years</span>
                <div className="marginbottom15">
                  <input
                    className="form-control"
                    type="number"
                    {...register('experienceInMonths', {
                      required: 'This field is required',
                    })}
                  />

                  {/* {errors.workEMonths && (
                                <small className="text-danger">
                                  {errors.workEMonths.message}
                                </small>
                              )} */}
                </div>
                <span className=" form-label mt-2">Months</span>
              </div>
            </div>
          </div>

            <div className="row " style={{ margin: 0 }}>
            <div className="col-md-4 marginbottom15">
              <strong className="form-label">Probation Period </strong>
              <div>
                <input
                  className="form-control"
                  type="text"
                  {...register('probationPeriod', {
                    required: 'This field is required',
                  })}
                />
                {errors.probationPeriod && (
                  <small className="text-danger">
                    {errors.probationPeriod.message}
                  </small>
                )}
              </div>
            </div>
          </div>

          {!editEmpWork ? (
            <div className="col-md-12">
              <br />
              <div className="text-end">
                <button
                  className="btn btn-warning m-1"
                  onClick={() => {
                    getEditWorkInfo()
                  }}
                >
                  Cancel
                </button>
                <button className="btn btn-primary m-1" onClick={() => saveWorkDetails()}>
                  Save
                </button>
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
      )}
      <br />
      <div className="row" style={{ margin: 0 }}>
        <div className="borderwithline">
          <strong>WORK INFO</strong>
          {workInfo ? (
            <div
              className="editButtonOnright"
              onClick={() => workInfoOnClick()}
            >
              <AiOutlineEdit />
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
      {workInfoOnBtnClick ? (
        <div className="row borderwithshadow" style={{ margin: 0 }}>
          <div className="col-md-6 marginbottom15">
            <div className="">
              <strong> Designation</strong>
            </div>
            <div className="">
              <div>{employeeBasicsDetails.designation.name} </div>
            </div>
          </div>

          <div className="col-md-6 marginbottom15">
            <div className="">
              <strong>Job Title</strong>
            </div>
            <div>{employeeBasicsDetails.jobTitle} </div>
          </div>
          <div className="col-md-6 marginbottom15">
            <div className="">
              <strong> Department</strong>
            </div>
            <div>{employeeBasicsDetails.department.name} </div>
          </div>
          <div className="col-md-6 marginbottom15">
            <div className="">
              <strong>Sub Department</strong>
            </div>
            <div>{employeeBasicsDetails.subDepartment.name} </div>
          </div>
        </div>
      ) : (
          <div className="row borderwithshadow" style={{ margin: 0 }}>
          <div className="col-md-6 marginbottom15">
            <div className="col-md-6">
              <strong> Designation</strong>
              <select
                name="HouseType"
                className="form-control "
                {...register("designation")}
              >
                <option value="">--Select Designation--</option>
                {designationNames.map((item, j) => {
                  return (
                    <option value={item.id} key={j}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
              {errors.designation && (
                <small className="text-danger">
                  {errors.designation.message}
                </small>
              )}
            </div>
          </div>

          <div className="col-md-6 marginbottom15">
            <div className="col-md-6">
              <strong> Job Title</strong>
              <input
                className="form-control "
                type="text"
                {...register('jobTitle', {
                  required: 'this field is required',
                })}
              />
              {errors.jobTitle && (
                <small className="text-danger">
                  {errors.jobTitle.message}
                </small>
              )}
            </div>
          </div>
          <div className="col-md-6 marginbottom15">
            <div className="col-md-6">
              <strong> Department</strong>
              <select
                name="HouseType"
                className="form-control "
                {...register("department")}
                onChange={(e) => changeDepartmentforSub(e.target.value)}
              >
                <option value="">-- Select Department --</option>
                {departments.map((item, i) => {
                  return (
                    <option value={item.id} key={i}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
              {errors.department && (
                <small className="text-danger">
                  {errors.department.message}
                </small>
              )}
            </div>
          </div>
          <div className="col-md-6 marginbottom15">
            <div className="col-md-6">
              <strong>Sub Department</strong>
              <select
                name="HouseType"
                className="form-control "
                {...register('subDepartment', {
                  required: 'this field required',
                })}
              >
                <option value="">-- Select Sub Department--</option>
                {subDepartments.map((item, id) => {
                  return (
                    <option value={item.id} key={id}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
              {errors.subDepartment && (
                <small className="text-danger">
                  {errors.subDepartment.message}
                </small>
              )}
            </div>
          </div>

          <div className="text-end">
            <button
              className="btn btn-warning m-1"
              onClick={() => workInfoOnClick()}
            >
              Cancel
            </button>
            <button className="btn btn-primary m-1" onClick={() => saveWorkinfowithDepartment()}>Save</button>
          </div>
        </div>
      )}

      <br />
      {/* WORK HISTORY */}
      {/* <div className="row" style={{ margin: 0 }}>
        <div className="borderwithline">
          <strong> WORK HISTORY </strong>
        </div>
      </div>
      <div className="row borderwithshadow" style={{ margin: 0 }}>
        <table className="table">
          <thead className="gray">
            <tr>
              <th scope="col">Department</th>
              <th scope="col">Designation</th>
              <th scope="col">From</th>
              <th scope="col">To</th>
            </tr>
          </thead>
          <tbody className="table table-striped">
            <tr>
              <td scope="row"><div>{employeeBasicsDetails.designation.name} </div></td>
              <td><div>{employeeBasicsDetails.designation.name} </div></td>
              <td>date</td>
              <td>date</td>
            </tr>
          </tbody>
        </table>
      </div> */}
      <br />
      {/* Registration info */}
      <div className="row" style={{ margin: 0 }}>
        <div className="borderwithline">
          <strong>RESIGNATION INFO</strong>
          {registrationInfo ? (
            <div
              className="editButtonOnright"
              onClick={() => registrationInfoOnClick()}
            >
              <AiOutlineEdit />
            </div>
          ) : (
            ''
          )}
        </div>
      </div>

      {registrationInfoBtnClick ? (
        <div className="row borderwithshadow" style={{ margin: 0 }}>
          <div className="col-md-4 marginbottom15">
            <div className="">
              <strong> Resignation Date</strong>
            </div>
            <div className="">
              {resignationInfo.resignationDate}
            </div>
          </div>

          <div className="col-md-4 marginbottom15">
            <div className="">
              <strong>Resignation Status</strong>
            </div>
            <div className="">{resignationInfo.resignationStatus}</div>
          </div>
          <div className="col-md-4 marginbottom15">
            <div className="">
              <strong> Notice Period</strong>
            </div>
            <div className="">
              {resignationInfo.noticePeriod}
            </div>
          </div>
          <div className="col-md-4 marginbottom15">
            <div className="">
              <strong>Termination Date</strong>
            </div>
            <div className="">{resignationInfo.terminationDate}</div>
          </div>
        </div>
      ) : (
        <div>
          <div className="borderwithshadow">
              <div className="row" style={{ margin: 0 }}>
              <div className="col-md-4 marginbottom15">
                <strong> Resignation Date</strong>
                <div>
                  <input
                    className="form-control"
                    type="date"
                    min={resignationMinDate}
                      {...register('resignationDate', {
                      required: 'This field is required',
                    })}
                  />
                  {errors.resignationDate && (
                    <small className="text-danger">
                      {errors.resignationDate.message}
                    </small>
                  )}
                </div>
              </div>
              <div className="col-md-4 marginbottom15">
                <strong>Resignation Status</strong>
                <input
                  className="form-control "
                  type="text"
                    {...register('resignationStatus', {
                    required: 'this field is required',
                  })}
                />
                {errors.resignationStatus && (
                  <small className="text-danger">
                    {errors.resignationStatus.message}
                  </small>
                )}
              </div>
              <div className="col-md-4 marginbottom15">
                <strong> Notice Period</strong>
                <input
                  className="form-control "
                  type="text"
                    {...register('noticePeriod', {
                    required: 'this field is required',
                  })}
                />
                {errors.noticePeriod && (
                  <small className="text-danger">
                    {errors.noticePeriod.message}
                  </small>
                )}
              </div>
              <div className="col-md-4 marginbottom15">
                <strong>Termination Date</strong>
                <div>
                  <input
                    className="form-control"
                    type="date"
                      min={resignationMinDate}
                      {...register('terminationDate', {
                      required: 'This field is required',
                    })}
                  />
                  {errors.terminationDate && (
                    <small className="text-danger">
                      {errors.terminationDate.message}
                    </small>
                  )}
                </div>
              </div>
            </div>
            <div className="text-end">
              <button
                className="btn btn-warning m-1"
                onClick={() => registrationInfoOnClick()}
              >
                Cancel
              </button>
                <button className="btn btn-primary m-1" onClick={() => saveResignationinfo()}>Save</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MyProfileWork;
