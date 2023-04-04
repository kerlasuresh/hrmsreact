import React, { useEffect, useState } from 'react'
import axios from 'axios'
import logo from '../../images/img/logo.png'
import CarouselImg from '../../images/img/1.png'
import CarouselImg1 from '../../images/img/2.png'
import CarouselImg2 from '../../images/img/3.png'
import { useForm } from 'react-hook-form'
import { FcOk } from 'react-icons/fc'
import { Link } from 'react-router-dom'
import Modal from "react-bootstrap/Modal";
import {  AiOutlineDelete } from "react-icons/ai";

function SignUp() {
  document.title = "HRMS | Sign Up";
  const [show, setShow] = useState(true)
  const [successAlert, setSuccessAlert] = useState(false)
  const [otpButton, setOtpButton] = useState(false)
  const [SignUpErorrs, setSignUpErorrs] = useState(false)
  const [enterOtp, setEnterOtp] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState()
  const [otpErrorMessage, setOtpErrorMessage] = useState('')
  const [errorMessagePop, seterrorMessagePop] = useState('')
  const [errorMessagePop2, seterrorMessagePop2] = useState('')
  const [errorMessagePop3, seterrorMessagePop3] = useState('')
  const [comapnyNameErrorMessage, setcomapnyNameErrorMessage] = useState('')
  const [comapnyNameError, setcomapnyNameError] = useState(false)
  const [otpSuccessMessage, setOtpSuccessMessage] = useState('')
  const [otpVerificationCondition, setOtpVerificationCondition] = useState(false)
  const [otpVerificationChecking, setOtpVerificationChecking] = useState(false)
  const [signUpCondition, setSignUpCondition] = useState(true)
  const { register, handleSubmit, trigger, getValues, setValue, formState: { errors } } = useForm();
  const { register: register1, formState: { errors: errors1 }, handleSubmit: handleSubmit1, getValues: getValues1, setValue: setValue1, trigger: trigger1, reset: reset1 } = useForm({ mode: 'onBlur' })
  const mobileRegex = /^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/
  const mailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]{2,}\.+[A-Z]{2,}$/i
  const [verifyMailCondition, setVerifyMailCondition] = useState(false)
  const [verifyMailErrorMessage, setVerifyMailErrorMessage] = useState()
  const [verifyPhoneNumberCondition, setVerifyPhoneNumberCondition] = useState(false,)
  const [verifyPhoneNumberErrorMessage, setVerifyPhoneNumberErrorMessage] = useState()
  const [moduleList, setModuleList] = useState([]);
  const [roleList, setRoleList] = useState([]);
  const getModulesList = async () => {
    await axios.get('/api/user/get_modulemanagement/').then((resp) => {
      setModuleList(resp.data)
    }).catch((err) => {
      console.log('error resp', err)
    })
  }
  const getRolesList = async () => {
    await axios.get('/api/user/get_rollmanagement/').then((resp) => {
      setRoleList(resp.data)
    }).catch((err) => {
      console.log('error resp', err)
    })
  }
  useEffect(() => {
    //getRolesList();
    //getModulesList();
  }, [])
  const mailVerification = async (e) => {
    var emailVerification = getValues('emailAddress')
    let mailVerify
    let mValue = e.target.value
    if (mValue.match(mailRegex)) {
      await axios.post('/api/user/filter_email/', { email: emailVerification }).then((resp) => {
        setVerifyMailCondition(true)
        mailVerify = resp.data.status;
        if (mailVerify === false) {
          setVerifyMailErrorMessage('This email already exists. Please try another email')
        } else {
          setVerifyMailErrorMessage('')
        }
      })
        .catch((err) => {
          console.log('error resp', err)
        })
    } else {
      console.log('else part mobile verification', mValue)
    }
  }
  const checkcompanyNameis = async (data) => {
    var req = { "Company_Name": data }
    await axios.post('/companyname_validate/', req).then((resp) => {
      if (resp.data.status === false) {
        //setcomapnyNameError(true)
        //setcomapnyNameErrorMessage("company Name not there")
      } else {
        setcomapnyNameError(true)
        setcomapnyNameErrorMessage("Company Name already exits")
      }
    })
      .catch((err) => {
        console.log('error resp', err)
      })
  }
  //------------------------------------------------------------//
  const onSubmit = async (data) => {
    // setValue1('companyName', '')
    // setValue1('enterPassword', '')
    setShow(false)
  }
  const onNextSubmit = async (data) => {
    seterrorMessagePop("")
    seterrorMessagePop2("")
    seterrorMessagePop3("")
    var req = {
      company_name: getValues1('companyName'),
      reg_details: {
        email: getValues('emailAddress'),
        name: getValues('yourName'),
        terms_and_conditions: getValues('checkboxRemember'),
        phone: getValues('mobileNumber'),
        company_size: getValues1('organizationSize'),
        password: getValues1('enterPassword'),
      },
    }
    await axios.post('/api/user/register/', req).then((resp) => {
      sessionStorage.setItem('username', getValues('emailAddress'))
      sessionStorage.setItem('password', getValues1('enterPassword'))
      setSignUpCondition(false)
    })
      .catch((err) => {
        setSignUpErorrs(true);
        
        if (err.response.data.errors.company_name){
          setShow(true)
          seterrorMessagePop(err.response.data.errors.company_name[0])
        }

        if (err.response.data.errors.reg_details) {
          if (err.response.data.errors.reg_details.email){
            setShow(true)
            seterrorMessagePop2(err.response.data.errors.reg_details.email[0])
          }
          
        }

        if (err.response.data.errors.reg_details) {
          if (err.response.data.errors.reg_details.phone) {
          setShow(true)
          seterrorMessagePop3( err.response.data.errors.reg_details.phone[0])
          }
        }
        console.log('error resp', err)
      })
  }
  //------------------------------------------------------------//

  const phoneNumberVerification = async (e) => {
    let mValue = e.target.value
    let phonenumber = getValues('mobileNumber')
    let phoneNumberVerify
    setPhoneNumber(e.target.value)
    if (mValue.match(mobileRegex)) {
      if (mValue.length >= 10) {
        setOtpButton(true)
        await axios.post('/api/user/validate_phone/', { phone: phonenumber }).then((resp) => {
          setVerifyPhoneNumberCondition(true)
          phoneNumberVerify = resp.data.status
          if (phoneNumberVerify === false) {
            setVerifyPhoneNumberErrorMessage('This number already exists. Please try another number')
            setOtpButton(false)
          } else {
            setVerifyPhoneNumberErrorMessage('')
          }
        })
          .catch((err) => { console.log('error resp', err) })
      }
    } else {
      setOtpButton(false)
    }
  }

  const getOtpSend = async (event) => {
    setOtpButton(false)
    setPhoneNumber(event.target.value)
    await axios.post('/api/user/validate_phone/', { phone: phoneNumber }).then((resp) => {
      setEnterOtp(true)
    })
      .catch((err) => {
        console.log('error resp', err)
      })
  }
  //------------------------------------------------------------//
  const otpVerify = async (event) => {
    let otpVerifyNumber = event.target.value
    let otpVerifyStatus
    var phonenumber = getValues('mobileNumber')
    if (otpVerifyNumber.length >= 6) {
      await axios.post('/api/user/validate_otp/', {
        phone: phonenumber,
        otp: event.target.value,
      })
        .then((resp) => {
          otpVerifyStatus = resp.data.status
          if (otpVerifyStatus === true) {
            setOtpVerificationCondition(true)
            setOtpVerificationChecking(true)
            setOtpErrorMessage('')
            setOtpSuccessMessage('Otp verified successfully')
          } else {
            setOtpVerificationCondition(false)
            setOtpErrorMessage('This otp is incorrect Please enter valid Otp')
          }
        })
        .catch((err) => {
          console.log('error resp', err)
        })
    } else {
      console.log('verify otp else part')
    }
  }
  //------------------------------------------------------------//
  return (
    <div className='mainlogin'>
      <div className='container'>
        <div className='text-center'>
          <div className='topbar pt-4'>
            <Link to='/'>
              <img src={logo} alt='Logo' loading='lazy' />
            </Link>
          </div>
        </div>

        <div className='row py-5'>
          {signUpCondition ? (
            <div className='col-lg-6'>
              <div className={show ? "loginform" : "loginform hide"}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className='login-form-header mb-3'>
                    <h5>Create an Account</h5>
                    <span>
                      Already have an account? <Link to='/'>Sign In</Link>
                    </span>
                  </div>

                  <div className='form-group mb-4'>
                    <input
                      type='text'
                      className='form-control'
                      name='yourName'
                      placeholder='Your Name'
                      autocomplete='off'
                      {...register("yourName", {
                        required: "This field is required",
                        pattern: {
                          value: /^[A-Za-z][A-Za-z-\s]+$/,
                          message: "This field allow only alphabets and spaces but not accepted space at 1st character",
                        },
                        minLength: {
                          value: 3,
                          message: "Please enter min 3 characters ",
                        },
                      })}
                      onKeyUp={() => {
                        trigger("yourName");
                      }}
                    />
                    {errors.yourName && (
                      <small className='text-danger font-bold '>
                        {errors.yourName.message}
                      </small>
                    )}
                  </div>
                  <div className='form-group mb-4'>
                    <input
                      type='email'
                      className='form-control'
                      placeholder='Email Address'
                      id='emailaddress'
                      {...register("emailAddress", {
                        required: "This field is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]{2,}\.+[A-Z]{2,}$/i,
                          message: "Please enter a valid email address.",
                        },
                      })}
                      onKeyUp={(e) => {
                        trigger("emailAddress");
                        //mailVerification(e)
                      }}
                    />{" "}
                    {errors.emailAddress && (
                      <small className='text-danger font-bold'>
                        {errors.emailAddress.message}
                      </small>
                    )}
                    {verifyMailCondition ? (
                      <small className='text-danger font-bold'>
                        {verifyMailErrorMessage}
                      </small>
                    ) : null}
                  </div>
                  <div className=' form-group mb-4 positionRelative'>
                    <input
                      type='tel'
                      className='form-control'
                      name='yourphone'
                      placeholder='Mobile Number'
                      id='phone'
                      {...register("mobileNumber", {
                        required: "This field is required",
                        pattern: {
                          value:
                            /^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/,
                          message: "Please enter a valid mobile number.",
                        },
                        minLength: {
                          value: 10,
                          message: "Please enter min 10 numbers ",
                        },
                        maxLength: {
                          value: 15,
                          message: "Please enter max 15 numbers ",
                        },
                      })}
                      onKeyUp={(e) => {
                        trigger("mobileNumber");
                      }}
                    />

                    {errors.mobileNumber && (
                      <small className='text-danger font-bold'>
                        {errors.mobileNumber.message}
                      </small>
                    )}
                    {verifyPhoneNumberCondition ? (
                      <small className='text-danger font-bold'>
                        {verifyPhoneNumberErrorMessage}
                      </small>
                    ) : null}

                    {/* <div className="positionButton">
                        {' '}
                        {otpButton ? (
                          <button
                            onClick={(e) => getOtpSend(e)}
                            type="button"
                            className="btn btn-sm btn-outline-light btn-outline "
                          >
                            Get Otp
                          </button>
                        ) : null}
                      </div> */}
                  </div>

                  {enterOtp ? (
                    <div className='form-group mb-4'>
                      <input
                        type='password'
                        className='form-control'
                        placeholder='Enter OTP'
                        id='otp'
                        {...register("enterOtp", {
                          required: "This field is required",
                        })}
                        onKeyUp={(e) => {
                          trigger("enterOtp");
                          otpVerify(e);
                        }}
                      />
                      {errors.enterOtp && (
                        <small className='text-danger font-bold'>
                          {errors.enterOtp.message}
                        </small>
                      )}
                      {otpVerificationCondition ? (
                        <small className='text-success font-bold'>
                          {otpSuccessMessage}
                        </small>
                      ) : (
                        <small className='text-danger'>{otpErrorMessage}</small>
                      )}
                      {/* <div className="text-end">
                          <span className="text-end">
                            <Link to="/">Resend OTP</Link>
                          </span>
                        </div> */}
                    </div>
                  ) : null}
                  <div className='row'>
                    <div className='col-auto'>
                      <div className='form-group form-check'>
                        <label className='form-check-label'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            name='remember'
                            {...register("checkboxRemember", {
                              required:
                                "You must accept indian hrms terms before joining.",
                            })}
                            onKeyUp={() => {
                              trigger("checkboxRemember");
                            }}
                          />
                          I agree to Indian HR{" "}
                          <Link to='/termsAndConditions'>
                            terms of service,
                          </Link>{" "}
                          and receive communication via whatsapp, sms, phone
                          calls and emails through third party platform.
                          <br />
                          {errors.checkboxRemember && (
                            <small className='text-danger font-bold'>
                              {errors.checkboxRemember.message}
                            </small>
                          )}
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className='text-center mb-3'>
                    {getValues("yourName") &&
                    getValues("emailAddress") &&
                    getValues("mobileNumber") ? (
                      <button type='submit' className='btn'>
                        Complete Signup
                      </button>
                    ) : (
                      <button type='submit' className='btn' disabled>
                        Complete Signup
                      </button>
                    )}
                  </div>
                </form>
                <hr />
                <div className='login-footer text-center pb-3'>
                  <p className='mb-0'>
                    <small>
                      We're committed to your privacy. Indian HR uses the
                      information you provide to us to contact you about our
                      relevant content, products and services. You may
                      unsubscribe from these communications at any time. For
                      more information, check out our
                      <Link to='/privacy-policy'>Privacy Policy</Link>
                    </small>
                  </p>
                </div>
              </div>

              <div className={show ? "loginform hide" : "loginform"}>
                <form onSubmit={handleSubmit1(onNextSubmit)}>
                  <div className='login-form-header mb-3'>
                    <h5>Organization Information</h5>
                  </div>
                  <div className='form-group mb-4'>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Company Name'
                      name='companyName'
                      id='enter-companyName'
                      {...register1("companyName", {
                        required: "This field is required",
                       pattern: {
                          value: /^[A-Za-z][A-Za-z-\s]+$/,
                          message: "This field allow only alphabets and spaces and Space not accepted at 1st character",
                        },

                        minLength: {
                          value: 3,
                          message: "Please enter min 3 characters ",
                        },
                      })}
                      onKeyUp={() => {
                        trigger1("companyName");
                      }}
                      // onChange={(e) => checkcompanyNameis(e.target.value)}
                    />
                    {errors1.companyName && (
                      <small className='text-danger font-bold'>
                        {errors1.companyName.message}
                      </small>
                    )}
                    {comapnyNameError ? (
                      <small className='text-danger font-bold'>
                        {comapnyNameErrorMessage}
                      </small>
                    ) : null}
                  </div>

                  <div className='form-group mb-4'>
                    <select
                      className='form-control'
                      id='organizationsize'
                      {...register1("organizationSize", {
                        required: "Please select organization size..!",
                      })}
                      onKeyUp={() => {
                        trigger1("organizationSize");
                      }}>
                      <option value=''>Organization Size</option>
                      <option value='1-10'>1-10</option>
                      <option value='11-20'>11-20</option>
                      <option value='21-50'>21-50</option>
                      <option value='51-100'>51-100</option>
                      <option value='101-200'>101-200</option>
                      <option value='201-500'>201-500</option>
                      <option value='500+'>500+</option>
                    </select>
                    {errors1.organizationSize && (
                      <small className='text-danger font-bold'>
                        {errors1.organizationSize.message}
                      </small>
                    )}
                  </div>
                  {/* <div className="form-group mb-4">
                      <select
                        className="form-control"
                        id="yourrole"
                        {...register1('yourRole', {
                          required: 'Please select your role..!',
                        })}
                        onKeyUp={() => {
                          trigger1('yourRole')
                        }}
                      >
                        <option value="">Your Role</option>
                        {roleList.map((role, i) => {
                          return <option value={role.id}>{role.Role_Name}</option>
                        })}

                      </select>
                      {errors.yourRole && (
                        <small className="text-danger">
                          {errors.yourRole.message}
                        </small>
                      )}
                    </div> */}

                  <div className='form-group mb-4'>
                    <input
                      type='password'
                      name='password'
                      className='form-control'
                      placeholder='Enter Password'
                      id='enter-password'
                      {...register1("enterPassword", {
                        required: "This field is required",
                        pattern: {
                          value:
                            /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,16}$/,
                          //  (?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹])at least one special chareacter
                          message:
                            "Password should contain at least one digit & one lower case & one upper case & length will be minimum 8 characters ",
                        },
                      })}
                      onKeyUp={() => {
                        trigger1("enterPassword");
                      }}
                    />
                    {errors1.enterPassword && (
                      <small className='text-danger font-bold'>
                        {errors1.enterPassword.message}
                      </small>
                    )}
                  </div>
                  <div className='text-center mb-3'>
                    <button type='submit' className='btn'>
                      {" "}
                      Submit{" "}
                    </button>
                  </div>
                </form>
                <hr />
                <div className='login-footer text-center pb-3'>
                  <p className='mb-0'>
                    <small>
                      {" "}
                      We're committed to your privacy. Indian HR uses the
                      information you provide to us to contact you about our
                      relevant content, products and services. You may
                      unsubscribe from these communications at any time. For
                      more information, check out our{" "}
                      <Link to='/privacy-policy'>Privacy Policy</Link>
                    </small>
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div
              size='md'
              show={successAlert}
              onHide={() => setSuccessAlert(false)}
              className='text-center col-lg-6  d-flex loginform  '>
              <div className='align-self-center mx-auto'>
                <div closeButton></div>
                <div className='text-center m-3'>
                  <FcOk size='80px' />
                </div>
                <h4 className='text-center'>
                  Your account is successfully created!
                </h4>
                <div>
                  <Link to='/' className='btn btn-primary underline'>
                    Get Started
                  </Link>
                </div>
                <div>
                  <p>We've sent a welcome email to you at</p>
                  <p>{getValues("emailAddress")}</p>
                </div>
                <div className='text-center m-3'></div>
              </div>
            </div>
          )}
          <div className='col-lg-6'>
            <div id='demo' className='carousel slide' data-ride='carousel'>
              <ul className='carousel-indicators'>
                <li
                  data-target='#demo'
                  data-slide-to='0'
                  className='active'></li>
                <li data-target='#demo' data-slide-to='1'></li>
                <li data-target='#demo' data-slide-to='2'></li>
              </ul>
              <div className='carousel-inner'>
                <div className='carousel-item active'>
                  <img src={CarouselImg} alt='Trusted' className='img-fluid' />
                  <p>
                    {" "}
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.{" "}
                  </p>
                </div>
                <div className='carousel-item'>
                  <img
                    src={CarouselImg1}
                    alt='HRMS, Payroll'
                    className='img-fluid'
                  />
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p>
                </div>
                <div className='carousel-item'>
                  <img
                    src={CarouselImg2}
                    alt='HRMS, Payroll'
                    className='img-fluid'
                  />
                  <p>
                    {" "}
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        size='md'
        show={SignUpErorrs}
        onHide={() => setSignUpErorrs(false)}
        className='text-center'>
        <Modal.Header closeButton></Modal.Header>
        <div className='text-center m-3 text-danger'>
          <AiOutlineDelete size='80px' />
        </div>
        <h4 className='text-center'>Error</h4>
        <p>{errorMessagePop}</p>
        <p>{errorMessagePop2}</p>
        <p>{errorMessagePop3}</p>
        <div className='text-center m-3'>
          <button
            className='btn btn-primary'
            onClick={() => setSignUpErorrs(false)}>
            Okay
          </button>
        </div>
      </Modal>
    </div>
  );
}
export default SignUp