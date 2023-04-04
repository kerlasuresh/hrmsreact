import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { TabList, TabPanel, TabContext } from "@mui/lab";
import DataTables from "./DataTable";
import Form from "./Form";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "react-bootstrap/Modal";
import Header from "../../Dashboard/Header";
import LeaveInnerNav from "../InnerNav/LeaveInnerNav";
import InnerHeader from "../../Dashboard/InnerHeader";
import { FcOk } from "react-icons/fc";
// import Form from "react-bootstrap/Form";

import Button from "react-bootstrap/Button";
import { ResetTv } from "@mui/icons-material";

export default function LabTabs() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <InnerHeader />
      <div className='p-2 mt-80'>
        <LeaveInnerNav />
        <div className='row p-3 mt-100'>
          <div className='col-md-2'></div>
          <div className='col-md-8'>
            <DataTables />
          </div>
          <div className='col-md-2'></div>
        </div>
        <div className='row p-3'>
          <div className='col-md-2'></div>
          <div className='col-md-5 '>
            <LeaveAdd />
          </div>
          <div className='col-md-6'></div>
        </div>
      </div>
    </>
  );
}

//form

const LeaveAdd = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [date, setDate] = useState();
  const [datet, setDatet] = useState();
  const [successAlert, setSuccessAlert] = useState(false);
  const handleShow = () => {
    setShow(true);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setValue,
    getValues,
    reset,
  } = useForm();

  const onSubmit = (data) => {
    setShow(false);
    setSuccessAlert(true);
    clearErrors();
    reset();
  };
  setValue("startDate", date);
  setValue("endDate", datet);
  const resetData = () => {
    clearErrors();
    reset();
    console.log(errors);
  };
  console.log("end", datet);
  console.log("issues", errors);
  console.log("Start Date", getValues("startDate"));
  console.log("End Date", getValues("endDate"));
  return (
    <div>
      <button onClick={handleShow} className='btn btn-primary '>
        Add
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Leave Configuration</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className='' onSubmit={handleSubmit(onSubmit)}>
            <div class='row'>
              <div class='col-md-12'>
                <div class='form-group'>
                  <label for='address_id'>
                    Business Unit <span class='asterisk'></span>
                  </label>
                  <select
                    name='business'
                    className='form-control'
                    {...register("business", {
                      required: "Business is required",
                    })}>
                    <option value=''>-- Select Business Unit --</option>
                    <option value='Vitel'>
                      BU1-Vitel Global Communication
                    </option>
                    <option value='Pranathi'>
                      BU1-Pranathi Software Services
                    </option>
                    <option value='36'>BU1-GOOGLE</option>
                    <option value='37'>BU1-Pranathi software soultions</option>
                    <option value='38'>BU1-Varun technologies</option>
                    <option value='39'>BU1-CES ltd</option>
                    <option value='40'>BU1-VHS Ltd</option>
                    <option value='41'></option>
                  </select>
                </div>
              </div>
              <div>
                {errors.business && (
                  <span className='text-danger'>{errors.business.message}</span>
                )}
              </div>
            </div>

            <div class='row'>
              <div class='col-md-12'>
                <label for='address_id'>
                  Start Month and Year <span class='asterisk'></span>
                </label>
                <DatePicker
                  className='form-control'
                  name='startDate'
                  onChange={(date) => setDate(date)}
                  selected={date}
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode='select'
                  closeOnScroll={true}
                  disabledKeyboardNavigation
                  ref={{
                    ...register("startDate", {
                      required: "Start Date is required",
                    }),
                  }}
                />
              </div>
              <div>
                {errors.startDate && (
                  <span className='text-danger'>
                    {errors.startDate.message}
                  </span>
                )}
              </div>
            </div>

            <div class='row'>
              <div class='col-md-12'>
                <label for='address_id'>
                  End Month and Year <span class='asterisk'></span>
                </label>
                <DatePicker
                  className='form-control'
                  name='endDate'
                  onChange={(datet) => setDatet(datet)}
                  selected={datet}
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode='select'
                  closeOnScroll={true}
                  disabledKeyboardNavigation
                  ref={{
                    ...register("endDate", {
                      required: "End Date is required",
                    }),
                  }}
                />
              </div>
              <div>
                {errors.endDate && (
                  <span className='text-danger'>{errors.endDate.message}</span>
                )}
              </div>
            </div>

            <div class='row '>
              <div class='col-md-12'>
                <div class='form-group'>
                  <label for='branch_id'>
                    Weekend1<span class='asterisk'></span>
                  </label>
                  <select
                    class='form-control '
                    name='weekend1'
                    {...register("weekend1", {
                      required: "Weekend1 is  required",
                    })}>
                    <option value=''>--Select Weekend 1 --</option>
                    <option value='Monday'>Monday</option>
                    <option value='Tuesday'>Tuesday</option>
                    <option value='Wednesday'>Wednesday</option>
                    <option value='Thursday'>Thursday</option>
                    <option value='Friday'>Friday</option>
                    <option value='Saturday'>Saturday</option>
                    <option value='Sunday'>Sunday</option>
                  </select>
                </div>
              </div>
              <div>
                {errors.weekend1 && (
                  <span className='text-danger'>{errors.weekend1.message}</span>
                )}
              </div>
            </div>

            <div class='row'>
              <div class='col-md-12'>
                <div class='form-group'>
                  <label for='branch_id1'>
                    Weekend2<span class='asterisk'></span>
                  </label>
                  <select
                    class='form-control'
                    name='weekend2'
                    {...register("weekend2", {
                      required: "Weekend2 is  required",
                    })}>
                    <option value=''>--Select Weekend 2 --</option>
                    <option value='Monday'>Monday</option>
                    <option value='Tuesday'>Tuesday</option>
                    <option value='Wednesday'>Wednesday</option>
                    <option value='Thursday'>Thursday</option>
                    <option value='Friday'>Friday</option>
                    <option value='Saturday'>Saturday</option>
                    <option value='Sunday'>Sunday</option>
                  </select>
                </div>
              </div>
              <div>
                {errors.weekend2 && (
                  <span className='text-danger'>{errors.weekend2.message}</span>
                )}
              </div>
            </div>

            <div className='row mt-3'>
              <div className='col-md-12'>
                {/* <input type="submit" /> */}
                <button
                  className='btn btn-secondary'
                  type='reset'
                  onClick={resetData}>
                  Clear
                </button>
                <button className='btn btn-primary m-3 ' value='Submit'>
                  Add
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
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
            onClick={() => setSuccessAlert(false)}>
            Okay
          </button>
        </div>
      </Modal>
    </div>
  );
};
