import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import * as moment from "moment";
import axios from "axios";
const CheckInOut = () => {
  var [date, setDate] = useState(new Date());
  const [visibleText, setVisibleText] = useState("");
  const [showDateFromDB, setshowDateFromDB] = useState("");
  const [reasonenterinput, setReasonEnterinput] = useState(false);
  const [ReasonenterFullok, setReasonenterFullok] = useState(false);
  const [showtimeFromDB, setshowtimeFromDB] = useState("");
  const [indate, setIndate] = useState("");
  const [intime, setIntime] = useState("");
  const [outtime, setOuttime] = useState("");
  const [outdate, setOutdate] = useState("");
  //const [showtimeFromDB, setshowtimeFromDB] = useState("");
  const [workLocation, setWorkLocation] = useState("");
  var [updatedTime, setUpdatedTime] = useState("");
  const [IPaddress, setIPaddress] = useState("");
  const [userInfo, setUserInfo] = useState("");
  const [loginEmpDetails, setLoginEmpDetails] = useState({});
  const [clockIn, setClockIn] = useState(false);
  const [clockOut, setClockOut] = useState(false);
  const [wLDropdown, setWLDropdown] = useState(false);
  const [data, setData] = useState("");
  const [infoText, setInfoText] = useState(false);
  const [infoDummyText, setInfoDummyText] = useState(false);
  const [loginSuccessAlert, setLoginSuccessAlert] = useState(false); //loginSuccessAlert sub popup
  const [logOutSuccessAlert, setLogOutSuccessAlert] = useState(false); //updated successfully pop up
  const [loginValidation, setLoginValidation] = useState(false);
  const [infoClockOutText, setInfoClockOutText] = useState(false);
  const [infoDummySpace, setInfoDummySpace] = useState(false);
  const [reasonchangestore, setReasonchangestore] = useState("");
  //------------------use form ----------------//
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();
  useEffect(() => {
    //passing getData method to the lifecycle method
    let userInfo = sessionStorage.getItem("user-info");
    JSON.parse(userInfo);
    setUserInfo(userInfo);
    setClockIn(true);
    setClockOut(false); //button
    setWLDropdown(true);
    getData();
    getCheckInDetails();
    getCheckOutDetails(null, null);
  }, []);
  const getData = async () => {
    const res = await axios.get("https://geolocation-db.com/json/");
    setIPaddress(res.data.IPv4);
  };
  const getCheckInDetails = async () => {
    let userInfo = sessionStorage.getItem("user-info");
    var empID = JSON.parse(userInfo);
    var req = {
      emp_id: empID.emp_id,
      created_date: moment(new Date()).format("MM/DD/YYYY"),
    };

    await axios
      .post(`/api/user/check_in_details/`, req)
      .then((result) => {
        if (
          moment(new Date(result.data[0].check_in_date)).format(
            "MM/DD/YYYY"
          ) === moment(new Date()).format("MM/DD/YYYY")
        ) {
          setVisibleText("Last Login was on:");
          setshowDateFromDB(
            moment(result.data[0].check_in_date).format("D MMMM YYYY")
          );
          setshowtimeFromDB(result.data[0].check_in_time);

          setIntime(result.data[0].check_in_time);
          setIndate(result.data[0].check_in_date);
          setInfoDummyText(false);
          setClockIn(false);
          setClockOut(true); //button
          setWLDropdown(false);
          setWLDropdown(false);
          setInfoText(true);
          setInfoDummyText(false);
          getCheckOutDetails(
            result.data[0].check_in_time,
            result.data[0].check_in_date
          );

          //setInfoDummySpace(true);
          //setInfoClockOutText(true);
        } else {
          setIntime(result.data[0].check_in_time);
          setIndate(result.data[0].check_in_date);
          // setVisibleText("Last Login :");
          // setshowDateFromDB(result.data[0].check_in_date)
          // setshowtimeFromDB(result.data[0].check_in_time)
          // setInfoText(true);
          // setInfoDummyText(false);
          getCheckOutDetails(
            result.data[0].check_in_time,
            result.data[0].check_in_date
          );
        }
      })
      .catch((err) => { });
  };

  const getCheckOutDetails = async (time, datevalue) => {
    let userInfo = sessionStorage.getItem("user-info");
    var empID = JSON.parse(userInfo);
    var req = {
      emp_id: empID.emp_id,
      created_date: moment(new Date()).format("MM/DD/YYYY"),
    };

    await axios
      .post(`/api/user/check_out_details/`, req)
      .then((result) => {
        if (
          moment(new Date(result.data[0].check_out_date)).format(
            "MM/DD/YYYY"
          ) === moment(new Date()).format("MM/DD/YYYY")
        ) {
          setshowDateFromDB(
            moment(result.data[0].check_out_date).format("D MMMM YYYY")
          );
          setshowtimeFromDB(result.data[0].check_out_time);

          setLoginEmpDetails(result.data[0]);
          setInfoDummyText(false);
          setLogOutSuccessAlert(false);

          setClockOut(false);
          setClockIn(false);
          setWLDropdown(false);
          setInfoDummySpace(true);
          setInfoText(true);
          setInfoClockOutText(false);
          setVisibleText("Last Logout was on:");
        } else {
          if (
            result.data[0].check_out_date === null &&
            result.data[0].check_out_time === null
          ) {
            if (
              moment(datevalue).format("MM/DD/YYYY") ===
              moment(new Date()).format("MM/DD/YYYY")
            ) {
              setInfoDummyText(false);
              setClockIn(false);
              setClockOut(true); //button
              setWLDropdown(false);
              setWLDropdown(false);
              setInfoText(true);
              setInfoDummyText(false);
            } else {
              setInfoDummyText(false);
              setClockIn(true);
              setClockOut(false); //button
              setWLDropdown(true);
              setWLDropdown(true);
              setInfoText(true);
              setInfoDummyText(false);
            }
          } else {
            setClockIn(true);
            setClockOut(false); //button
            setWLDropdown(true);
            setVisibleText("Last Logout was on:");
            setshowDateFromDB(
              moment(result.data[0].check_out_date).format("D MMMM YYYY")
            );
            setshowtimeFromDB(result.data[0].check_out_time);
            setInfoDummySpace(false);
            setInfoText(true);
          }
        }
      })
      .catch((err) => { });
  };

  //------- submitting the form ----------//
  const onSubmit = async (data) => {
    setData(data);
    if (workLocation !== "") {
      var empID = JSON.parse(userInfo);
      var req = {
        work_location: workLocation,
        check_in_date: moment(new Date()).format("YYYY-MM-DD"),
        check_in_time: moment(new Date()).format("HH:mm:ss"),
        check_in_ip_address: IPaddress,

        emp_code: empID.emp_id,
      };
      console.log(req);
      try {
        await axios.post(`/api/user/checkin_post/`, req);
        setLoginSuccessAlert(true);
        getCheckInDetails();
        setTimeout(() => setLoginSuccessAlert(false), 2000);
      } catch (error) {
        console.log("on submit delete error ", error);
      }
    } else {
      setLoginValidation(true);
    }
  };
  const SelectWorkLocation = (data) => {
    if (data) {
      setWorkLocation(data);
    } else {
      setLoginValidation(true);
      setWorkLocation("");
    }
  };
  //-----------------use effect of time and date------------------//

  const putCheckoutFunctions = async () => {
    //setUpdatedLogDate(d>ate.toLocaleDateString());
    var empID = JSON.parse(userInfo);
    var req = {
      check_out_date: moment(new Date()).format("YYYY-MM-DD"),
      check_out_time: moment(new Date()).format("HH:mm"),
      check_out_ip_address: IPaddress,
      created_date: moment(new Date()).format("YYYY-MM-DD"),
      modified_date: moment(new Date()).format("YYYY-MM-DD"),
      check_in_date: moment(new Date()).format("YYYY-MM-DD"),
      check_out_reason: reasonchangestore,
      emp_id: empID.emp_id,
    };
    try {
      var res = await axios.put(`/api/user/checkout_post/`, req);
      getCheckOutDetails(res.data.check_in_time, res.data.check_in_date);
    } catch (error) {
      console.log("on submit delete error ", error);
    }

    setUpdatedTime(date.toLocaleTimeString());
    setTimeout(() => setLogOutSuccessAlert(false), 2000);
  };
  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });

  const webClockOut = async () => {
    setData("");
    reset();
    setReasonenterFullok(false);
    console.log("webclock out exicuted", data);
    // var outtime = moment(new Date()).format("MM/DD/YYYY") + moment(new Date()).format("HH:mm")
    moment(intime).format("MM/DD/YYYY");
    var converttodatetime = moment(indate + " " + intime, "MM/DD/YYYY HH:mm");
    var added9Hours = converttodatetime.add(moment.duration(9, "hours"));
    var currentlogouttime = moment(new Date()).format("MM/DD/YYYY HH:mm");
    if (currentlogouttime > added9Hours) {
      putCheckoutFunctions();
    } else {
      setReasonEnterinput(true);
    }
  };
  useEffect(() => {
    if (ReasonenterFullok) {
      putCheckoutFunctions();
    }
  }, [ReasonenterFullok]);
  return (
    <>
      <div className=''>
        <div className='row '>
          {infoText ? (
            <div className='mb-3 text-center p-2 col-md-3 text-danger'>
              {visibleText}&nbsp;
              {showDateFromDB} {showtimeFromDB}
            </div>
          ) : null}
          <div className={wLDropdown ? "mb-3 col-md-4" : "md-1 col-md-1"}>
            {wLDropdown ? (
              <div>
                <select
                  className=' form-select '
                  name='workLocation'
                  onChange={(e) => SelectWorkLocation(e.target.value)}>
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
            ) : null}
            <div>
              {infoClockOutText ? (
                <div className='mb-3 text-center p-2 text-danger'>
                  {visibleText}&nbsp;
                  {updatedTime}
                </div>
              ) : null}
            </div>
          </div>

          <div className='col-md-4'>
            {clockIn ? (
              <div>
                <button
                  className='btn-danger rounded btn-sm p-1 m-1 '
                  onClick={() => onSubmit()}>
                  WEB CLOCK-IN {date.toLocaleTimeString()}
                </button>
              </div>
            ) : null}
            {clockOut ? (
              <div>
                <button
                  className='btn-primary rounded btn-sm p-1 m-1 '
                  onClick={() => webClockOut()}>
                  WEB CLOCK-OUT {date.toLocaleTimeString()}
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <Modal
        size='md'
        show={loginSuccessAlert}
        onHide={() => setLoginSuccessAlert(false)}
        style={{ marginTop: "300px " }}
        className='text-center'>
        <div className='text-center m-3'>
          <h4 className='text-center'>
            {" "}
            Good day.! you have successfully marked attendance for the day.!
          </h4>
        </div>
        <div className='text-center m-3'>
          <button
            className='btn btn-primary px-4'
            onClick={() => setLoginSuccessAlert(false)}>
            Ok
          </button>
        </div>
      </Modal>
      <Modal
        size='md'
        show={logOutSuccessAlert}
        onHide={() => setLogOutSuccessAlert(false)}
        style={{ marginTop: "300px " }}
        className='text-center'>
        <div className='text-center m-3'>
          <h4 className='text-center'>
            You have successfully check out for the day.!
          </h4>
        </div>
        <div className='text-center m-3'>
          <button
            className='btn btn-primary px-4'
            onClick={() => setLogOutSuccessAlert(false)}>
            OK
          </button>
        </div>
      </Modal>
      <Modal
        size='md'
        show={loginValidation}
        onHide={() => setLoginValidation(false)}
        style={{ marginTop: "300px " }}
        className='text-center '>
        <div className='text-center m-3'>
          <h4 className='text-center'>
            Please select the work location in order to mark your today's
            attendance.
          </h4>
        </div>
        <div className='text-center m-3 '>
          <button
            className='btn btn-primary px-4'
            onClick={() => setLoginValidation(false)}>
            OK
          </button>
        </div>
      </Modal>

      <Modal
        size='md'
        show={reasonenterinput}
        onHide={() => setReasonEnterinput(false)}
        style={{ marginTop: "300px " }}
        className='text-center '>
        <div className='text-center m-3'>
          <h4 className='text-center'>Please enter reason for early logout</h4>
          <textarea
            className='form-control'
            rows='3'
            onChange={(e) => setReasonchangestore(e.target.value)}></textarea>
        </div>
        <div className='text-center m-3 '>
          <button
            className='btn btn-primary px-4'
            onClick={() => {
              setReasonenterFullok(true);
              setReasonEnterinput(false);
            }}>
            OK
          </button>
        </div>
      </Modal>
    </>
  );
};
export default CheckInOut;
