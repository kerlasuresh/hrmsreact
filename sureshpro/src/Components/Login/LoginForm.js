import React, { useState, useEffect } from "react";
import Logo from "../../images/img/logo.png";
import Slider1 from "../../images/img/1.png";
import Slider2 from "../../images/img/2.png";
import Slider3 from "../../images/img/3.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import QRCode from "react-qr-code";
function LoginForm() {
  document.title = "HRMS | Login";
  const [withOTP, setWithOTP] = useState(false);
  const navigate = useNavigate();
  const [errorMes, setErrorMes] = useState();
  const [loader, setLoader] = useState(true);
  const [errorinvalidOTP, seterrorinvalidOTP] = useState("");
  const [errorinvalidemail, seterrorinvalidemail] = useState("");
  const [qrCodevalue, setQrCodevalue] = useState("");
  const recaptchaRef = React.createRef();
  useEffect(() => {
    if (sessionStorage.getItem("user-info")) {
      navigate("/dashboard");
    }
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    setValue,
    getValues
  } = useForm({});
  function onChange(value) {
    console.log("Captcha value:", value);
  }
  const data = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9";
  const onSubmit = async (data) => {
    const recaptchaValue = recaptchaRef.current.getValue();
    setLoader(false);
    setErrorMes("");
    // data.preventDefault();
    const email = data.email.trim();
    const password = data.password.trim();
    let mailRegexx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]{2,}\.+[A-Z]{2,}$/i;
    var req = {};
    if (email.match(mailRegexx)) {
      req = { email: email, password: password };
    } else {
      req = { phone: email, password: password };
    }
    // let userObj = { email, password };
    if (data.reminder) {
      sessionStorage.setItem("username", data.email);
      sessionStorage.setItem("password", data.password);
      sessionStorage.setItem("remeber", data.reminder);
    }else{
      sessionStorage.removeItem("username");
      sessionStorage.removeItem("password");
      sessionStorage.removeItem("remeber");
    }
    if (recaptchaValue) {
      if (!withOTP){
        await axios.post("/api/user/login/", req).then((result) => {
          setLoader(true);
          sessionStorage.setItem("user-info", JSON.stringify(result.data));
          navigate("/dashboard");
        })
        .catch((err) => {
          setLoader(true);
          if (err.response.data.errors) {
            setErrorMes(err.response.data.errors.message);
            console.log("errors", err.response.data.errors.message);
          } else {
            setErrorMes("User Not exist");
          }
        });
      }
      else{
        if (getValues('otppassword').length === 6) {
          seterrorinvalidOTP("")
          var req = {
            "email": getValues("email")
          }
          await axios
            .post(`/api/user/totp/token/${getValues('otppassword')}/`, req)
            .then((result) => {
              setLoader(true);
              sessionStorage.setItem("user-info", JSON.stringify(result.data));
              navigate("/dashboard");
            })
            .catch((err) => {
              
              if (err.response.data.status === 404) {
                setLoader(true);
                seterrorinvalidOTP(err.response.data.message)
              }
            });
        }else{
          alert("enter Valid OTP")
        }
      }
    } else {
      setLoader(true);
      setErrorMes("Please Select CAPTCHA");
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("username")) {
      setValue("email", sessionStorage.getItem("username"));
    }
    if (sessionStorage.getItem("password")) {
      setValue("password", sessionStorage.getItem("password"));
    }
    if (sessionStorage.getItem("remeber")) {
      setValue("reminder", sessionStorage.getItem("remeber"));
    }
  }, []);
  const loginwithOtpOption = async (data, email) => {
    seterrorinvalidemail("")
    if (data){
      const emails = email.trim();
      let mailRegexx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]{2,}\.+[A-Z]{2,}$/i;
      if (emails.match(mailRegexx)) {
        await axios.get(`/api/user/totp/register?email=${email}`).then((result) => {
          if (result.data) {
            setQrCodevalue(result.data)
            setWithOTP(data);
          }
        }).catch((err) => {
          if (err.response.data.status === 404) {
            seterrorinvalidemail(err.response.data.message);
          }
        });
      }else{
        seterrorinvalidemail("Please enter valid email")
      }
    }else{
      setWithOTP(data);
    }
  };

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
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className='login-form-header mb-3'>
                    <h5>Sign In</h5>
                    <span>
                      Don't have an account? <Link to='/signup'>Sign Up</Link>
                    </span>
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
                      }}
                    />
                    {errors.email && (
                      <small className='text-danger font-bold'>
                        {errors.email.message}
                      </small>
                    )}
                    {errorinvalidemail && (
                      <small className='text-danger font-bold'>{errorinvalidemail}</small>
                    )}
                  </div>
                  {!withOTP ? (
                    <div className='form-group mb-4'>
                      <input
                        type='password'
                        className='form-control'
                        placeholder='Enter Password'
                        id='pwd'
                        {...register("password", {
                          required: "This field is required",
                        })}
                        onKeyUp={() => {
                          trigger("password");
                        }}
                      />
                      {errors.password && (
                        <small className='text-danger font-bold'>
                          {errors.password.message}
                        </small>
                      )}
                    </div>
                  ) : (
                    <>
                      <div className='qrCodeDisplay'>
                        <QRCode value={qrCodevalue} />
                      </div>
                      <div className='form-group mb-4'>
                        <input
                          type='number'
                          className='form-control'
                          placeholder='Enter OTP'
                          id='OTP'
                          {...register("otppassword", {
                            required: " OTP Is Required",
                          })}
                          onKeyUp={() => {
                            trigger("otppassword");
                          }}
                          //onChange={(e)=>otpVerification(e.target.value)}
                        />
                      </div>
                      {errorinvalidOTP && (
                        <small className='text-danger font-bold'>{errorinvalidOTP}</small>
                      )}
                    </>
                  )}
                  <div className='row'>
                    <div className='col-auto'>
                      <div className='form-group form-check'>
                        <label className='form-check-label'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            name='remember'
                            onChange={(e) => {
                              setValue(
                                "reminder",
                                e.target.checked ? true : false
                              );
                            }}
                            {...register("reminder")}
                          />{" "}
                          Remember me
                        </label>
                      </div>
                    </div>
                    <div className='col-auto text-right ml-auto'>
                      <Link to='/reset' className='underline'>
                        Forgot password
                      </Link>
                    </div>
                  </div>
                  <div className='row'>
                    <div>
                      {errorMes ? (
                        <div style={{ color: "red" }}>{errorMes}</div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className='form-group mb-4'>
                    <ReCAPTCHA
                      sitekey='6LdsweIhAAAAALygpi_2lGLVhyEJScocu-nXLOdL'
                      onChange={onChange}
                      ref={recaptchaRef}
                      onExpired={() => {
                        onChange(); // here
                      }}
                    />
                    {/* <img src="img/recaptcha.png" className="w-50" /> */}
                  </div>
                  {loader ? (
                    ""
                  ) : (
                    <div className='text-center'>
                      <div className='spinner-border ' role='status'>
                        <span className='sr-only'>Loading...</span>
                      </div>
                    </div>
                  )}
                  <div className='text-center mt-5 mb-3'>
                    <button type='submit' className='btn'>
                      Sign In
                    </button>
                  </div>
                  {!withOTP ? (
                    <div className='text-center arrowanchor'>
                      <a
                        onClick={() =>
                          loginwithOtpOption(true, getValues("email"))
                        }>
                        Login with TOTP
                      </a>
                    </div>
                  ) : (
                    <div className='text-center arrowanchor'>
                      <a onClick={() => loginwithOtpOption(false)}>
                        Login with Password
                      </a>
                    </div>
                  )}
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
export default LoginForm;
