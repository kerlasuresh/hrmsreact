import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import $ from "jquery";
import * as moment from "moment";
import DataTable from "react-data-table-component";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { AiOutlineClockCircle, AiOutlineSearch } from "react-icons/ai";
import { BiCalendar } from "react-icons/bi";
import { FcOk } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { IoIosRefresh } from "react-icons/io";
import Header from "../Dashboard/Header";
import MAttendanceInnerNav from "../ManualAttandence/MAttendanceInnerNav";

const ManualAttandance = () => {
  document.title = "HRMS | Manual Attandance";
  const [generalFilterSearch, setGeneralFilterSearch] = useState([]);
  const [editid, setEditid] = useState("");
  const [updateAttendanceModel, setUpdateAttendanceModel] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const handleUAModel = () => setUpdateAttendanceModel(false);
  const [manualAttendanceData, setManualAttendanceData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [mAEfilterData, setMAEfilterData] = useState([]);
  const [search, setSearch] = useState([""]);
  const handleUpdateAttendanceModel = () => {
    setUpdateAttendanceModel(true);
    reset();
  };
  const [manualAttendanceEmployee, setManualAttendanceEmployee] = useState([]);
  const [departmentNames, setDepartmentNames] = useState([]);
  const [advanceFilterEmployee, setAdvanceFilterEmployee] = useState("");
  const [advanceFilterDepartment, setAdvanceFilterDepartment] = useState("");
  const [advanceFilterDate, setAdvanceFilterDate] = useState("");
  const [advanceFilterTime, setAdvanceFilterTime] = useState("");

  //------------------use form ----------------//

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
    setValue,
    getValues,
  } = useForm();

  const onClear = () => {
    reset();
  };

  const changecheckbox = (value, i) => {
    $(".inputcheckbox").prop("checked", false);
    $(".buttonshadow").attr("disabled", true);
    if (value) {
      $(".inputcheckbox").each(function () {
        let dataid = $(this).attr("data-id");
        if (dataid == i) {
          $(this).prop("checked", true);
        }
      });

      $(".buttonshadow").each(function () {
        let dataid = $(this).attr("data-id");
        if (dataid == i) {
          $(this).attr("disabled", false);
        }
      });
    } else {
      //setShowButton(false);
    }
  };

  //----------------------- getting employee data -----------------//

  const getEmployee = async () => {
    try {
      const manualAttendanceEmployee = await axios.get(
        "/api/user/get_allemployeedata/"
      );
      setManualAttendanceEmployee(manualAttendanceEmployee.data);
      setMAEfilterData(manualAttendanceEmployee.data);
    } catch (error) {
      console.log("not found");
    }
  };
  //------------------------ getting department data --------------------//

  const getDepartment = async () => {
    try {
      const departmentResponse = await axios.get("/get_department/");
      setDepartmentNames(departmentResponse.data);

    } catch (error) {
      console.log("not found");
    }
  };
  //------------------------ getting MA data --------------------//

  const getManualAttendance = async () => {
    try {
      const manualAttendanceResponse = await axios.get(
        "/api/user/manual_attendance/"
      );
      let responseData = manualAttendanceResponse.data;
      responseData.map((item, i) => {
        item.Num = i + 1;
      });
      setManualAttendanceData(responseData);
      setGeneralFilterSearch(responseData);
      setLoader(true);
      $(".buttonshadow").attr("disabled", true);
    } catch (error) {
      console.log("not found");
      setLoader(true);
    }
  };
  useEffect(() => {
    getManualAttendance();
    getEmployee();
    getDepartment();
    setAdvanceFilterDate("");
    setAdvanceFilterTime("");
    setAdvanceFilterDepartment("");
    setAdvanceFilterEmployee("");
  }, []);
  //------------------------ onload values --------------------//
  const onloadvalues = async (data) => {
    var newdate = moment(data.created_date).format("YYYY-MM-DD");
    var checkInTimeFormat = data.check_in_time.slice(0, -3);
    var checkOutTimeFormat = data.check_out_time.slice(0, -3);
    console.log(newdate, checkInTimeFormat, checkOutTimeFormat);

    setValue("dateOfLogin", newdate);
    setValue("clockIn", checkInTimeFormat);
    setValue("clockOut", checkOutTimeFormat);
    setValue("reason", data.Reason);
    setValue("employeeName", data.First_Name);
    setValue("workLocation", data.work_location);
  };
  //------------------------ onSubmit  --------------------//
  const onSubmit = async (data) => {
    let id = editid;
    const selectEmployee = data.selectEmployee;
    const workLocation = data.workLocation;
    const clockIn = data.clockIn;
    const clockOut = data.clockOut;
    const reason = data.reason;
    var newUpdateDate = moment(data.dateOfLogin).format("YYYY-MM-DD");

    await axios
      .put(`/api/user/update_attendance/${id}/`, {
        emp_code: selectEmployee,
        work_location: workLocation,
        check_in_date: newUpdateDate,
        check_in_time: clockIn,
        check_out_time: clockOut,
        check_out_reason: reason,
      })
      .then((resp) => {
        console.log("on edit success resp", resp);
        $(".buttonshadow").attr("disabled", true);
        $(".inputcheckbox").prop("checked", false);
        getManualAttendance();
        getEmployee();
        setLoader(true);
      })
      .catch((err) => {
        console.log("error resp", err);
      });

    setUpdateAttendanceModel(false);
    setSuccessAlert(true);
  };
  //------------------------search function --------------------//
  useEffect(() => {
    const result = generalFilterSearch.filter((data) => {
      return (
        data.check_in_date.toLowerCase().match(search.toLowerCase()) ||
        data.emp_code.toLowerCase().match(search.toLowerCase()) ||
        data.work_location.toLowerCase().match(search.toLowerCase()) ||
        (data.check_in_time || "").toLowerCase().match(search.toLowerCase()) ||
        (data.check_out_time || "").toLowerCase().match(search.toLowerCase()) ||
        data.First_Name.toLowerCase().match(search.toLowerCase()) ||
        data.department.toLowerCase().match(search.toLowerCase())
      );
    });
    setManualAttendanceData(result);
  }, [search]);

  const columns = [
    {
      name: <span className='h6 fw-bold'></span>,
      width: "50px",
      selector: (row, index) => (
        <input
          type='checkbox'
          data-id={index + 1}
          className='inputcheckbox'
          onChange={(e) => changecheckbox(e.target.checked, index + 1)}
        />
      ),
      sortable: true,
    },

    {
      name: <span className='fs-6 fw-bold'>S.No</span>,
      selector: (row) => row.Num,
      width: "70px",
      sortable: true,
    },
    {
      name: <span className='fs-6 fw-bold'>Date</span>,
      selector: (row) => row.check_in_date,
      width: "150px",
      sortable: true,
    },
    {
      name: <span className='fs-6 fw-bold h3'>Emp ID</span>,
      selector: (row) => row.emp_code,
      sortable: true,
      width: "200px",
      style: {
        fontSize: "16px",
      },
    },
    {
      name: <span className='fs-6 fw-bold h3'>Employee Name</span>,
      selector: (row) => row.First_Name,
      sortable: true,
      width: "200px",
      style: {
        fontSize: "16px",
      },
    },
    {
      name: <span className='fs-6 fw-bold h3'>Department Name</span>,
      selector: (row) => row.department,
      sortable: true,
      width: "200px",
      style: {
        fontSize: "16px",
      },
    },
    {
      name: <span className='fs-6 fw-bold h3'>Work Location</span>,
      selector: (row) => row.work_location,
      sortable: true,
      width: "200px",
      style: {
        fontSize: "16px",
      },
    },
    {
      name: <span className='fs-6 fw-bold h3'>Clock In</span>,
      selector: (row) => row.check_in_time,
      sortable: true,
      width: "120px",
      style: {
        fontSize: "16px",
      },
    },
    {
      name: <span className='fs-6 fw-bold h3'>Clock Out</span>,
      width: "120px",
      selector: (row) => row.check_out_time,
      sortable: true,

      style: {
        fontSize: "16px",
      },
    },

    {
      name: <span className='fs-6 fw-bold'></span>,
      width: "200px",
      cell: (row, index) => (
        <div id='results' className='text-center'>
          <button
            data-id={index + 1}
            className='buttonshadow btn btn-sm btn-primary text-center'
            onClick={() => {
              setEditid(row.id);
              handleUpdateAttendanceModel();
              onloadvalues(row);
            }}>
            Update Attendance
          </button>
        </div>
      ),
    },
  ];
  const handlePageChange = () => {
    $(".buttonshadow").attr("disabled", true);
    $(".inputcheckbox").prop("checked", false);
  };
  // ------------------ advance search -----------------//
  const searchwithfilters = async (data) => {
    var res = {
      employee_Id: advanceFilterEmployee ? advanceFilterEmployee : "",
      checkin_date: advanceFilterDate ? advanceFilterDate : "",
      Check_In_Time: advanceFilterTime ? advanceFilterTime : "",
      af_department: advanceFilterDepartment ? advanceFilterDepartment : "",
    };
    console.log("res data", res);
    await axios
      .post("/api/user/manual_advancedfilter/", res)
      .then((result) => {
        console.log("res", result);
        result.data.map((item, i) => {
          item.Num = i + 1;
        });
        setManualAttendanceData(result.data);
        setLoader(true);
      })
      .catch((err) => {
        setLoader(true);
        console.log("errors", err);
      });
  };

  // ----------------- advance search  refresh----------------//

  const searchwithrefreshfilter = () => {
    $("#results").attr("disabled", true);
    $(".buttonshadow").attr("disabled", true);
    setAdvanceFilterDate("");
    setAdvanceFilterTime("");
    setAdvanceFilterDepartment("");
    setAdvanceFilterEmployee("");
    getManualAttendance();
  };

  return (
    <>
      <div className='container-fluid'>
        <MAttendanceInnerNav />
      </div>
      <div className='container mt-4'>
        {/* advanced form fields start here*/}
        <div className='row'>
          <div className='d-flex justify-content-center align-items-center'>
            <div className='row '>
              <div className='col-md-2'>
                <select
                  className='mdb-select md-form form-control'
                  searchable='Search here..'
                  value={advanceFilterEmployee}
                  onChange={(e) => setAdvanceFilterEmployee(e.target.value)}>
                  <option value=''> Select Employee</option>
                  {manualAttendanceEmployee.map((option) => (
                    <option key={option.Emp_Id} value={option.Emp_Id}>
                      {option.First_Name}
                    </option>
                  ))}
                </select>
              </div>
              <div className='col-md-2'>
                <select
                  className='mdb-select md-form form-control'
                  searchable='Search here..'
                  value={advanceFilterDepartment}
                  onChange={(e) => setAdvanceFilterDepartment(e.target.value)}>
                  <option value=''> Select Department </option>
                  {departmentNames.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.department_name1}
                    </option>
                  ))}
                </select>
              </div>

              <div className='col-md-3'>
                <div className='input-group'>
                  <span className='input-group-text'>Check In Date</span>
                  <input
                    className=' form-control '
                    type='date'
                    variant='outlined'
                    size='small'
                    sx={{ width: 300 }}
                    value={advanceFilterDate}
                    onChange={(e) => setAdvanceFilterDate(e.target.value)}
                  />
                </div>
              </div>
              <div className='col-md-2'>
                <div className='input-group'>
                  <span className='input-group-text'>Time</span>
                  <input
                    className=' form-control '
                    type='time'
                    variant='outlined'
                    value={advanceFilterTime}
                    onChange={(e) => setAdvanceFilterTime(e.target.value)}
                  />
                </div>
              </div>
              <div className='col-md-3'>
                <button
                  type='submit'
                  className='btn btn-primary'
                  onClick={searchwithfilters}>
                  <AiOutlineSearch />
                  &nbsp;Search
                </button>
                &nbsp; &nbsp;
                <button
                  type='submit'
                  className='btn btn-primary bg-success'
                  onClick={searchwithrefreshfilter}>
                  <IoIosRefresh />
                  &nbsp;Refresh
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className='container w-75 '>
          <hr />
        </div>

        {/* data table start here */}
        <div
          style={{
            width: "75%",
            margin: "auto",
            padding: "inherit",
          }}>
          {loader ? (
            <DataTable
              columns={columns}
              data={manualAttendanceData}
              pagination
              fixedHeader
              fixedHeaderScrollHeight='450px'
              highlightOnHover
              subHeader
              onChangePage={handlePageChange}
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
        </div>
        {/* update attendance model start here */}

        <Modal show={updateAttendanceModel} onHide={handleUAModel}>
          <Modal.Header closeButton>
            <Modal.Title>Manual Attendance</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <div className=' my-3'>
                <label className='form-label'>
                  Select Login Date
                  <span className='text-danger mandatory-fields'>*</span>
                </label>
                <input
                  className=' form-control '
                  type='date'
                  variant='outlined'
                  size='small'
                  sx={{ width: 300 }}
                  {...register("dateOfLogin", {
                    required: "Please select Login Date..!",
                  })}
                  onKeyUp={() => {
                    trigger("dateOfLogin");
                  }}
                />
                {errors.dateOfLogin && (
                  <small className='text-danger'>
                    {errors.dateOfLogin.message}
                  </small>
                )}
              </div>

              <div className='mb-3'>
                <label className='form-label '>
                  Work Location
                  <span className='text-danger mandatory-fields'>*</span>
                </label>
                <select
                  className=' form-select '
                  {...register("workLocation", {
                    required: "Please select Work Location..!",
                  })}
                  onKeyUp={() => {
                    trigger("workLocation");
                  }}>
                  <option value=''>Select Work Location</option>
                  <option value='WFH'>Work Form Home</option>
                  <option value='WFO'>Work From Office</option>
                </select>
                {errors.workLocation && (
                  <small className='text-danger'>
                    {errors.workLocation.message}
                  </small>
                )}
              </div>

              <div className='row'>
                <div className='col-md-6 my-3'>
                  <label className='form-label'>Clock In Time</label>
                  <input
                    className=' form-control '
                    type='time'
                    variant='outlined'
                    size='small'
                    {...register("clockIn")}
                    sx={{ width: 300 }}
                  />
                </div>
                <div className='col-md-6 my-3'>
                  <label className='form-label'>Clock Out Time</label>
                  <input
                    className=' form-control '
                    type='time'
                    label='Publish
                     Date
                     and
                     Time'
                    variant='outlined'
                    size='small'
                    sx={{ width: 300 }}
                    {...register("clockOut")}
                  />
                </div>
              </div>
              <div className='mb-3  '>
                <label className='fs-bold'>
                  Reason <span className='text-danger mandatory-fields'>*</span>
                </label>
                <Form.Control
                  as='textarea'
                  rows='3'
                  type='text'
                  name='reason'
                  {...register("reason", {
                    required: "Please Enter Reason..!",
                    minLength: {
                      value: 5,
                      message: "Minimum 5 Characters Are Allowed",
                    },
                    maxLength: {
                      value: 220,
                      message: "Maximum 220 Characters Are Allowed",
                    },
                  })}
                  onKeyUp={() => {
                    trigger("reason");
                  }}
                />
                {errors.reason && (
                  <small className='text-danger'>{errors.reason.message}</small>
                )}
              </div>
              <div>
                <Button className='btn btn-primary m-1' onClick={onClear}>
                  Clear
                </Button>
                <button className='btn btn-primary m-1'>Update</button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
        {/* success alert */}
        <Modal
          size='md'
          show={successAlert}
          onHide={() => setSuccessAlert(false)}
          className='text-center'>
          <Modal.Header closeButton></Modal.Header>
          <div className='text-center m-3'>
            <FcOk size='80px' />
          </div>
          <h4 className='text-center'>Updated Successfully</h4>
          <div className='text-center m-3'>
            <button
              className='btn btn-primary'
              onClick={() => setSuccessAlert(false)}>
              OK
            </button>
          </div>
        </Modal>
      </div>
    </>
  );
};
export default ManualAttandance;
