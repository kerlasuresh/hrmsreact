import React, { useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Eform() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    trigger,
  } = useForm();

  const [date, setDate] = useState();
  const [datet, setDatet] = useState();

  const onSubmit = (data) => alert(JSON.stringify(data));

  return (
    <>
      <div className=' card main mt-4'>
        <form className='p-4' onSubmit={handleSubmit(onSubmit)}>
          <div class='row mb-3'>
            <div class='col-md-4'>
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
                  <option value='Vitel'>BU1-Vitel Global Communication</option>
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

          <div class='row mb-3'>
            <div class='col-md-4'>
              <label for='address_id'>
                Start Month and Year <span class='asterisk'></span>
              </label>
              <DatePicker
                className='form-control'
                selected={date}
                onChange={(date) => setDate(date)}
              />
            </div>
          </div>

          <div class='row mb-3'>
            <div class='col-md-4'>
              <label for='address_id'>
                End Month and Year <span class='asterisk'></span>
              </label>
              <DatePicker
                className='form-control'
                selected={datet}
                onChange={(datet) => setDatet(datet)}
              />
            </div>
          </div>

          <div class='row mb-3'>
            <div class='col-md-4'>
              <div class='form-group'>
                <label for='branch_id'>
                  Weekend1<span class='asterisk'></span>
                </label>
                <select
                  class='form-control '
                  name='weekend1'
                  {...register("weekend1", {
                    required: "Weekend1 is  required",
                  })}
                  onKeyUp={() => {
                    trigger("weekend1");
                  }}>
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

          <div class='row mb-3'>
            <div class='col-md-4'>
              <div class='form-group'>
                <label for='branch_id1'>
                  Weekend2<span class='asterisk'></span>
                </label>
                <select
                  class='form-control '
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
                  {/* <option value='Saturday'>Saturday</option>
                  <option value='Sunday'>Sunday</option> */}
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
                onClick={() => clearErrors()}
                type='reset'>
                Clear
              </button>
              <button className='btn btn-primary m-3 ' value='Submit'>
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
      {/* <Modal
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
      </Modal> */}
    </>
  );
}

export default Eform;
