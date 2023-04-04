import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Logo from '../../images/img/logo.png'
import Slider1 from '../../images/img/1.png'
import Slider2 from '../../images/img/2.png'
import Slider3 from '../../images/img/3.png'
function ResetPassword() {
  const [mailOtp, setMailOtp] = useState(false)
  const [mailButtonValue, setMailButtonValue] = useState('Verify Account')
  const [verifyMailPhoneCondition, setVerifyMailPhoneCondition] = useState(
    false,
  )
  const [ verifyMailPhoneErrorMessage,setVerifyMailPhoneErrorMessage] = useState('')
  const [otpVerificationCondition, setOtpVerificationCondition] = useState(
    false,
  )
  const [otpErrorMessage, setOtpErrorMessage] = useState('')
  const [otpErrorMessage2, setOtpErrorMessage2] = useState('')
  const [verifyButton, setVerifyButton] = useState(true)
  //----
  const [mailVerificationC, setMailVerificationC] = useState(false)
  const [resetPasswordData, setResetPasswordData] = useState('')
    const [validationText, setValidationText] = useState('')
  useEffect(() => {
    if (sessionStorage.getItem('user-data')) {
      navigate('/reset')
    }
  }, [])
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    clearErrors,
    getValues,
  } = useForm()
  document.title = 'HRMS | Reset Password'
  const onSubmit = async (data) => {
    const emailOrPhone = data.email
    let otpNumber = data.enterOtp
    let otpVerifyStatus
    let mailRegexx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]{2,}\.+[A-Z]{2,}$/i
    var req = {}
    if (emailOrPhone.match(mailRegexx)) {
      req = { email: emailOrPhone, otp: otpNumber }
    } else {
      req = { phone: emailOrPhone, otp: otpNumber }
    }
    await axios
      .post('/api/user/validate_emailphoneotp/', req)
      .then((result) => {
        otpVerifyStatus = result.data.status
        if (otpVerifyStatus === true) {
          localStorage.setItem('tokenuid', JSON.stringify(result.data))
          localStorage.setItem('name', JSON.stringify(result.data))
          navigate('/newpassword/')
        } else {
          if (otpVerifyStatus === false) {
            setOtpVerificationCondition(true)
            setOtpErrorMessage('otp incorrect')
          }
        }
      })
      .catch((err) => {
        console.log('errors', err)
      })
  }
  const getMailOtp = async () => {
    let emailOrPhone = getValues('email')
    console.log('data', emailOrPhone)

    // if (!emailOrPhone) {
    //   setVerifyMailPhoneCondition(true)
      
    //   setVerifyMailPhoneErrorMessage('This Field Is Required')
    // }
    let mailRegex = /^\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    let mailPhoneVerify
    let mailRegexx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]{2,}\.+[A-Z]{2,}$/i
    let identifiedPhone
    let identifiedMail
    if (emailOrPhone.match(mailRegex)) {
      if (emailOrPhone.match(mailRegexx)) {
        identifiedMail = emailOrPhone
        console.log(identifiedMail)
      } else {
        identifiedPhone = emailOrPhone
        console.log(identifiedPhone)
      }
    }
    if (identifiedMail) {
      
      await axios
        .post('/api/user/send-reset-password-email/', { email: identifiedMail })
        .then((resp) => {
          console.log('mail submit', resp.data)
          setValidationText(resp.data.message)
          setMailVerificationC(true)
          localStorage.setItem('resetInfo', JSON.stringify(resp.data))
         
          // if (resp.data.token){
          //   setOtpErrorMessage2(resp.data.message);
          // }

          // mailPhoneVerify = resp.data.token;
          // if (mailPhoneVerify === false) {
          //   setVerifyMailPhoneCondition(true)
          //   setVerifyMailPhoneErrorMessage('this mail id not existed try registered mail ')
          // } else {
          //   setMailOtp(true);
          //   setVerifyButton(false);
          //   setVerifyMailPhoneCondition(false)
          //   setVerifyMailPhoneErrorMessage('')
          //   setMailButtonValue("Continue");
          // }
        })
        .catch((err) => {
          var errorResponse = err.response
          setValidationText(errorResponse.data.message)
          setMailVerificationC(true)
        })
    }
    if (identifiedPhone) {
      await axios
        .post('/api/user/send-reset-password-email/', {
          phone: identifiedPhone,
        })
        .then((resp) => {
           console.log('phone submit', resp.data)
           setValidationText(resp.data.message)
           setMailVerificationC(true)
          sessionStorage.setItem('tokenuid', JSON.stringify(resp.data.token))
          sessionStorage.setItem('name', JSON.stringify(resp.data.uid))
         
          // mailPhoneVerify = resp.data.status;
          // if (mailPhoneVerify === false) {
          //   setVerifyMailPhoneCondition(true)
          //   setVerifyMailPhoneErrorMessage('this phone number not existed try registered phone number')
          // } else {
          //   setMailOtp(true);
          //   setVerifyButton(false);
          //   setVerifyMailPhoneCondition(false)
          //   setVerifyMailPhoneErrorMessage(resp.data.detail)
          //   setMailButtonValue("Continue");
          // }
        })
        .catch((err) => {
          
          var errorResponse = err.response
          setValidationText(errorResponse.data.message)
          setMailVerificationC(true)
        })
    }
  }

  useEffect(() => {
    clearErrors()
  }, [])
  return (
    <>
      <div className='mainlogin'>
        <div className='container'>
          <div className='text-center'>
            <div className='topbar pt-4'>
              <a href='#'>
                <img src={Logo} alt='Logo' loading='lazy' />
              </a>
            </div>
          </div>
          <div className='row py-5'>
            <div className='col-lg-6'>
              <div className='loginform'>
                <form action='#' onSubmit={handleSubmit(onSubmit)}>
                  <div className='login-form-header mb-3'>
                    <h5>Reset Password</h5>
                  </div>
                  <div className='form-group mb-4'>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Enter Email ID/Mobile Number'
                      id='emailandphone'
                      {...register("email", {
                        required: "This field is required",
                        pattern: {
                          value:
                            /^\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                          message: "Please enter a valid Email ID or Phone no.",
                        },
                      })}
                      onKeyUp={() => {
                        trigger("email");
                        setValidationText("");
                        //setVerifyMailPhoneErrorMessage('')
                      }}
                    />
                    {errors.email && (
                      <small className='text-danger font-bold'>
                        {errors.email.message}
                      </small>
                    )}

                    {verifyMailPhoneCondition ? (
                      <small className='text-danger font-bold'>
                        {verifyMailPhoneErrorMessage}
                      </small>
                    ) : null}

                    {mailVerificationC ? (
                      <small className='text-success font-bold'>{validationText}</small>
                    ) : null}
                  </div>
                  {/* {mailOtp ? (
                    <div className='form-group mb-4'>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Enter OTP"


                        {...register("enterOtp", {
                          required: "This field is required",

                        })}

                        onKeyUp={(e) => {
                          trigger("enterOtp");


                        }}
                      />
                      {errors.enterOtp && (
                        <small className='text-danger '>
                          {errors.enterOtp.message}
                        </small>
                      )}
                      {otpVerificationCondition ? <small className='text-danger' >
                        {otpErrorMessage}
                      </small> : null}
                    </div>
                  ) : null} */}
                  {/* <div className='text-center mt-5 mb-3'>
                    {verifyButton ? <div className='btn' onClick={() => getMailOtp()}>  {mailButtonValue} </div> : <button type='submit' className='btn'> {mailButtonValue}
                    </button>}
                  </div> */}
                  <div className='text-success font-bold'>{otpErrorMessage2}</div>
                  <div className='text-center mt-5 mb-3'>
                    <div
                      className='btn'
                      onClick={() => getMailOtp()}
                      type='submit'>
                      {" "}
                      {mailButtonValue}{" "}
                    </div>
                  </div>
                  <div className='text-center'>
                    <Link to='/' className='underline'>
                      Back to Home
                    </Link>
                  </div>
                </form>
                <hr />
                <div className='login-footer text-center pb-3'>
                  <p className='mb-0'>
                    <small>
                      &copy; Indian. All rights reserved. <br />
                      
                      <Link to='privacy-policy'>Privacy Policy</Link>
                    </small>
                  </p>
                </div>
              </div>
            </div>
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
                    <img src={Slider1} alt='Trusted' className='img-fluid' />
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry.
                    </p>
                  </div>
                  <div className='carousel-item'>
                    <img
                      src={Slider2}
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
                      src={Slider3}
                      alt='HRMS, Payroll'
                      className='img-fluid'
                    />
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResetPassword
