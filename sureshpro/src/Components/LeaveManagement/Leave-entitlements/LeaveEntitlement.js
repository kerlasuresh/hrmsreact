import React from "react";
import { useForm } from "react-hook-form";
import InnerHeader from "../../Dashboard/InnerHeader";

import LeaveInnerNav from "../InnerNav/LeaveInnerNav";
function LeaveEntitlement() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => alert(JSON.stringify(data));

  return (
    <>
      <InnerHeader />
      <div className='p-2 mt-80'>
        <LeaveInnerNav />
        <div className='row p-3 mt-100'>
          <div className='container main mt-4'>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                      <option value='Vitel'>
                        BU1-Vitel Global Communication
                      </option>
                      <option value='Pranathi'>
                        BU1-Pranathi Software Services
                      </option>
                    </select>
                  </div>
                </div>
                <div>
                  {errors.business && (
                    <span className='text-danger'>
                      {errors.business.message}
                    </span>
                  )}
                </div>
              </div>

              <div class='row mb-3'>
                <div class='col-md-4'>
                  <div class='form-group'>
                    <label for='branch_id'>
                      Branch Name<span class='asterisk'></span>
                    </label>
                    <select
                      class='form-control '
                      name='branch'
                      {...register("branch", {
                        required: "Branch is  required",
                      })}>
                      <option value=''>-- Select Branch --</option>
                      <option value='West'>West India</option>
                      <option value='Vijayavada'>Vijayawada</option>
                      <option value='Begumpet'>Begumpet</option>
                    </select>
                  </div>
                </div>
                <div>
                  {errors.branch && (
                    <span className='text-danger'>{errors.branch.message}</span>
                  )}
                </div>
              </div>

              <div className='row '>
                <div className='col-md-4'>
                  <label>Select Leave Type *</label>
                  <div class='multiselect_div'>
                    <select
                      class='form-control'
                      name='leave'
                      multiple
                      {...register("leave", { required: "Leave is required" })}>
                      <option value=''>--Select Leave Type -- </option>
                      <option value='Paid'>Paid Leave - 12</option>
                      <option value='Planned'>Planned Leave - 10</option>
                      <option value='Maternity'>Maternity Leave - 15</option>
                      <option value='Regular'>Regular leaves - 10</option>
                      <option value='VACATION'>VACATION TYPE - 15</option>
                    </select>
                  </div>
                </div>
                <div>
                  {errors.leave && (
                    <span className='text-danger'>{errors.leave.message}</span>
                  )}
                </div>
              </div>

              <div className='row mt-3'>
                <div className='col-md-12'>
                  {/* <input type="submit" /> */}
                  <button className='btn btn-secondary' type='reset'>
                    Clear
                  </button>
                  <button className='btn btn-primary m-3 ' value='Submit'>
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default LeaveEntitlement;
