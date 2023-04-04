import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";

const OrganizationAdd = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
    clearErrors,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    reset();
    // setSuccessAlert(true);
  };
   const handleClear = () => {
     clearErrors();
     reset();
   };

  // const [formErrors, setFormErrors] = useState({});
  // const [isSubmit, setIsSubmit] = useState(false);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormValues({ ...formValues, [name]: value });
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setFormErrors(validate(formValues));
  //   setIsSubmit(true);
  // };

  // useEffect(() => {
  //   console.log(formErrors);
  //   if (Object.keys(formErrors).length === 0 && isSubmit) {
  //     console.log(formValues);
  //   }
  // }, [formErrors]);
 
  return (
    <>
      <div className='row'>
        <div className='col-md-10'>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <div className='row  m-1'>
              <div className='col-md-6'>
                <label
                  className='form-label fw-bold font-size'
                  for='companyNameId'>
                  Company Name
                  <span className='text-danger mandatory-fields'>*</span>
                </label>
                <input
                  className={`form-control ${errors.companyName && "invalid"}`}
                  type='text'
                  id='companyNameId'
                  name='companyName'
                  {...register("companyName", {
                    required: "Company Name Is Required",
                    pattern: {
                      value: /^[A-Za-z]+$/,
                      message: "Only Alphabets Are Allowed",
                    },
                  })}
                  onKeyUp={() => {
                    trigger("companyName");
                  }}
                />
                {errors.companyName && (
                  <small className='text-danger'>
                    {errors.companyName.message}
                  </small>
                )}
              </div>
              <div className='col-md-6 '>
                <label
                  for='companyPrefixId'
                  className='form-label fw-bold font-size'>
                  Company Prefix
                  <span className='text-danger mandatory-fields'></span>
                </label>
                <input
                  className={`form-control ${
                    errors.companyPrefix && "invalid"
                  }`}
                  type='text'
                  id='companyPrefixId'
                  name='companyPrefix'
                  {...register("companyPrefix", {
                    // required: "Company Name Is Required",
                    pattern: {
                      value: /^[A-Za-z0-9]+$/,
                      message: "Only AlphaNumeric Values Are Allowed",
                    },
                  })}
                  onKeyUp={() => {
                    trigger("companyPrefix");
                  }}
                />
                {errors.companyPrefix && (
                  <small className='text-danger'>
                    {errors.companyPrefix.message}
                  </small>
                )}
              </div>
              <div className='col-md-6 '>
                <label
                  for='employeeStartId'
                  className='form-label fw-bold font-size'>
                  Employee Start Code
                  <span className='text-danger mandatory-fields'>*</span>
                </label>
                <input
                  className={`form-control ${
                    errors.employeeStart && "invalid"
                  }`}
                  type='text'
                  id='employeeStartId'
                  name='employeeStart'
                  {...register(
                    "employeeStart",

                    {
                      required: "Employee Start Code Is Required",

                      pattern: {
                        value: /^[0-9]+$/,
                        message: "Only Numeric Values Are Allowed",
                      },
                      minLength: {
                        value: 4,
                        message: "Minimum 4 Characters Are Allowed",
                      },
                      maxLength: {
                        value: 4,
                        message: "Maximum 4 Characters Are Allowed",
                      },
                    }
                  )}
                  onKeyUp={() => {
                    trigger("employeeStart");
                  }}
                />
                {errors.employeeStart && (
                  <small className='text-danger'>
                    {errors.employeeStart.message}
                  </small>
                )}
              </div>
              <div className='col-md-6 '>
                <label
                  for='businessUnitId'
                  className='form-label fw-bold font-size'>
                  Business Unit
                  <span className='text-danger mandatory-fields'>*</span>
                </label>
                <input
                  className={`form-control ${errors.businessUnit && "invalid"}`}
                  type='text'
                  id='businessUnitId'
                  name='businessUnit'
                  {...register("businessUnit", {
                    required: "Business Unit Is Required",
                    pattern: {
                      value: /^[A-Za-z0-9]+$/,
                      message: "Only AlphaNumeric Values Are Allowed",
                    },
                  })}
                  onKeyUp={() => {
                    trigger("businessUnit");
                  }}
                />
                {errors.businessUnit && (
                  <small className='text-danger'>
                    {errors.businessUnit.message}
                  </small>
                )}
              </div>
              <div className='col-md-6 '>
                <label
                  for='contactNameId'
                  className='form-label fw-bold font-size'>
                  Contact Name
                  <span className='text-danger mandatory-fields'>*</span>
                </label>
                <input
                  className={`form-control ${errors.contactName && "invalid"}`}
                  type='text'
                  id='contactNameId'
                  name='contactName'
                  {...register("contactName", {
                    required: "Contact Name Is Required",
                    pattern: {
                      value: /^[a-zA-Z ]*$/,
                      message: "Only Alphabets And Space Are Allowed",
                    },
                  })}
                  onKeyUp={() => {
                    trigger("contactName");
                  }}
                />
                {errors.contactName && (
                  <small className='text-danger'>
                    {errors.contactName.message}
                  </small>
                )}
              </div>
              <div className='col-md-6'>
                <label
                  for='companyAddressId'
                  className='form-label fw-bold font-size'>
                  Company Address
                  <span className='text-danger mandatory-fields'>*</span>
                </label>
                <textarea
                  className={`form-control ${
                    errors.companyAddress && "invalid"
                  }`}
                  id='companyAddressId'
                  rows='1'
                  {...register("companyAddress", {
                    required: "Company Address Is Required",
                    // minLength: {
                    //   value: 5,
                    //   message: "Minimum 5 Characters Are Allowed",
                    // },
                    maxLength: {
                      value: 220,
                      message: "Minimum 220 Characters Are Allowed",
                    },
                    // pattern: {
                    //   value: /^[a-zA-Z0-9\s,.'-]{5,220}$/,
                    //   message: "Please Enter Alpha Numerics and , ' Are Allowed",
                    // },
                  })}
                  onKeyUp={() => {
                    trigger("companyAddress");
                  }}></textarea>
                {errors.companyAddress && (
                  <small className='text-danger'>
                    {errors.companyAddress.message}
                  </small>
                )}
              </div>
              <div className='col-md-6 '>
                <label for='pinCodeId' className='form-label fw-bold font-size'>
                  Pin Code (Enter pin will Auto Fill City And State)
                  <span className='text-danger mandatory-fields'>*</span>
                </label>
                <input
                  className={`form-control ${errors.pinCode && "invalid"}`}
                  type='text'
                  id='pinCodeId'
                  name='pinCode'
                  {...register("pinCode", {
                    required: "Pin Code Is Required",
                    pattern: {
                      value: /^(\d{5}|\d{6})$/,
                      message: "Enter only 5 or 6 digit numbers !",
                    },
                  })}
                  onKeyUp={() => {
                    trigger("pinCode");
                  }}
                />
                {errors.pinCode && (
                  <small className='text-danger'>
                    {errors.pinCode.message}
                  </small>
                )}
              </div>
              <div className='col-md-6 '>
                <label
                  for='companyPhoneId'
                  className='form-label fw-bold font-size'>
                  Company Phone
                  <span className='text-danger mandatory-fields'>*</span>
                </label>
                <input
                  className={`form-control ${errors.companyPhone && "invalid"}`}
                  type='text'
                  id='companyPhoneId'
                  name='companyPhone'
                  {...register("companyPhone", {
                    required: "Company Phone Is Required",
                    pattern: {
                      value: /^(\+\d{1,3}[- ]?)?\d{10,15}$/,
                      message: "Enter Proper Format of Phone Number...!",
                    },
                  })}
                  onKeyUp={() => {
                    trigger("companyPhone");
                  }}
                />
                {errors.companyPhone && (
                  <small className='text-danger'>
                    {errors.companyPhone.message}
                  </small>
                )}
              </div>

              <div className='col-md-6 '>
                <label for='cityId' className='form-label fw-bold font-size'>
                  City
                  <span className='text-danger mandatory-fields'>*</span>
                </label>
                <input
                  className={`form-control ${errors.city && "invalid"}`}
                  type='text'
                  id='cityId'
                  name='city'
                  {...register("city", {
                    required: "City Is Required",
                    pattern: {
                      value: /^[a-z]+$/i,
                      message: "Enter Only Alphabets",
                    },
                  })}
                  onKeyUp={() => {
                    trigger("city");
                  }}
                />
                {errors.city && (
                  <small className='text-danger'>{errors.city.message}</small>
                )}
              </div>
              <div className='col-md-6 '>
                <label
                  for='companyEmailId'
                  className='form-label fw-bold font-size'>
                  Company Email
                  <span className='text-danger mandatory-fields'>*</span>
                </label>
                <input
                  className={`form-control ${errors.companyEmail && "invalid"}`}
                  type='text'
                  id='companyEmailId'
                  name='companyEmail'
                  {...register("companyEmail", {
                    required: "Company Email Id Is Required",
                    pattern: {
                      value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                      message: "Invalid email format",
                    },
                  })}
                  onKeyUp={() => {
                    trigger("companyEmail");
                  }}
                />
                {errors.companyEmail && (
                  <small className='text-danger'>
                    {errors.companyEmail.message}
                  </small>
                )}
              </div>
              <div className='col-md-6 '>
                <label for='stateId' className='form-label fw-bold font-size'>
                  State
                  <span className='text-danger mandatory-fields'>*</span>
                </label>
                <input
                  className={`form-control ${errors.state && "invalid"}`}
                  type='text'
                  id='stateId'
                  name='state'
                  {...register("state", {
                    required: "State Is Required",
                    pattern: {
                      value: /^[a-z]+$/i,
                      message: "Enter Only Alphabets ",
                    },
                  })}
                  onKeyUp={() => {
                    trigger("state");
                  }}
                />
                {errors.state && (
                  <small className='text-danger'>{errors.state.message}</small>
                )}
              </div>

              <div className='col-md-6 '>
                <label
                  for='companyWebsiteId'
                  className='form-label fw-bold font-size'>
                  Company Website
                  <span className='text-danger mandatory-fields'></span>
                </label>
                <input
                  className={`form-control ${
                    errors.companyWebsite && "invalid"
                  }`}
                  type='text'
                  id='companyWebsiteId'
                  name='companyWebsite'
                  {...register("companyWebsite", {
                    pattern: {
                      value:
                        /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/,
                      message: "Enter valid format of website",
                    },
                  })}
                  onKeyUp={() => {
                    trigger("companyWebsite");
                  }}
                />
                {errors.companyWebsite && (
                  <small className='text-danger'>
                    {errors.companyWebsite.message}
                  </small>
                )}
              </div>
              <div className='col-md-6 '>
                <label
                  for='  companyVatId'
                  className='form-label fw-bold font-size'>
                  Company Vat
                                 </label>
                <input
                  className={`form-control ${errors.companyVat && "invalid"}`}
                  type='text'
                  id='companyVatId'
                  name='companyVat'
                  {...register("companyVat", {
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Enter only numbers!",
                    },
                    maxLength: {
                      value: 12,
                      message: "Maximum 12 digits are allowed",
                    },
                  })}
                  onKeyUp={() => {
                    trigger("companyVat");
                  }}
                />
                {errors.companyVat && (
                  <small className='text-danger'>
                    {errors.companyVat.message}
                  </small>
                )}
              </div>
              <div className='row'>
                <div className='col-12'>
                  <button
                    type='reset'
                    value='clear'
                    className='btn btn-primary '
                    onClick={handleClear}>
                    Clear
                  </button>
                  <button
                    type='submit'
                    className='btn btn-primary m-2'
                    //onClick={handleSuccess}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </Form>
        </div>
        <div className='col-md-1'></div>
      </div>
    </>
  );
};
export default OrganizationAdd;
