import React ,{useState}from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../../images/img/logo.png";
import Slider1 from "../../images/img/1.png";
import Slider2 from "../../images/img/2.png";
import Slider3 from "../../images/img/3.png";
import { useParams } from 'react-router-dom'
const NewPassword = () => {
  const { uid, usertoken } = useParams()
  const [ verifyMessage,setVerifyMessage] = useState('')
  const [ verificationMsgC,setVerificationMsgC] = useState(false)
  const navigate = useNavigate()
  var userName = JSON.parse(sessionStorage.getItem("name"));
  const { register, handleSubmit, formState: { errors }, trigger, getValues } = useForm();
  document.title = "HRMS | Reset Password";
  //const query = new URLSearchParams(window.location.href);
  


  const onSubmit = async (data) => {
    let url = new URL(window.location.href);
    let params = new URLSearchParams(url.search.slice(1));
    let obj = {};
    for (let pair of params.entries()) {
      obj[pair[0]] = pair[1]    //push keys/values to object
    }
    var req =  {
      "password":data.enterPassword,
      "email":obj.email,
      "token":obj.token
    }
    await axios.post('/api/user/update/password/', req).then((result) => {

      console.log(result.data.message);
      setVerificationMsgC(true)
      setVerifyMessage(result.data.message)
      alert(result.data.message)
      if (result.data.message === "Password Changed Successfully") {
        navigate('/')
      }
    })
      .catch((err) => {
        console.log("errors", err);
        var errorResponse = err.response
          setVerifyMessage(errorResponse.data.message)
        setVerificationMsgC(true)
     
      });
  };
  return (
    <>
      <div className="mainlogin">
        <div className="container">
          <div className="text-center">
            <div className="topbar pt-4">
              <a href='#'>
                <img src={Logo} alt='Logo' loading='lazy' />
              </a>
            </div>
          </div>
          <div className="row py-5">
            <div className="col-lg-6">
              <div className="loginform">
                <form action="#" onSubmit={handleSubmit(onSubmit)}>
                  <div className="login-form-header mb-3">
                    <h5>Hey  Set New Password</h5>
                  </div>
                  <div className="form-group mb-4">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter Password"
                      id="enter-password"
                      {...register("enterPassword", {
                        required: "This field is required",
                        pattern: {
                          value: /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,16}$/,
                          //  (?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹])at least one special chareacter  
                          message: "Password should contain at least one digit & one lower case & one upper case & length will be minimum 8 characters ",
                        },

                      })}
                      onKeyUp={() => {
                        trigger("enterPassword");
                      }}
                    />
                    {errors.enterPassword && (
                      <small className='text-danger font-bold '>
                        {errors.enterPassword.message}
                      </small>
                    )}
                    
                    {verificationMsgC ? (
                      <small className="text-success font-bold">
                        {verifyMessage}
                      </small>
                    ) : null}
                  </div>
                  <div className="text-center mt-5 mb-3"><button type="submit" className="btn">Set Password</button></div>
                  <div className="text-center"><Link to='/' className='underline'>
                    Back to Home
                  </Link></div>
                </form>
                <hr />
                <div className="login-footer text-center pb-3">
                  <p className="mb-0"><small>&copy; Indian. All rights reserved. <br /><a href="#">Privacy Policy</a></small></p>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div id='demo' className='carousel slide' data-ride='carousel'>
                <ul className='carousel-indicators'>
                  <li data-target='#demo' data-slide-to='0' className='active'></li>
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
                    <img src={Slider2} alt='HRMS, Payroll' className='img-fluid' />
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry.
                    </p>
                  </div>
                  <div className='carousel-item'>
                    <img src={Slider3} alt='HRMS, Payroll' className='img-fluid' />
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

export default NewPassword;
