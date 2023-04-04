import React, { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { FcAddImage } from "react-icons/fc";
function OrganizationMaster() {
  const {
    register,
    handleSubmit,
    reset,
    trigger,
    getValues,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm();
  const {
    register: register1,
    handleSubmit: handleSubmit1,
    reset: reset1,
    trigger: trigger1,
    getValues: getValues1,
    formState: { errors:errors1},
    setValue: setValue1,
  } = useForm();
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [registeroffice, setRegisteroffice] = useState({});
  const [successAlert, setSuccessAlert] = useState(false);
  const [overview, setoverview] = useState({});
  const [socialmedaia, setsocialmedaia] = useState({});
  const [socialMediaId, setSocialMediaId] = useState("");
  const [editId, setEditId] = useState(null);
  const [fileUploaderC, setFileUploaderC] = useState(true);
  const [onMouseOverC, setOnMouseOverC] = useState(true);

  const handleClose = () => {
    setShow(false);
    setShow1(false);
  };
  const handleShow = () => setShow(true);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const getDetials = async () => {
    var userinfo = JSON.parse(sessionStorage.getItem("user-info"));
    await axios.get(`/api/company/details/${userinfo.data.id}/`).then((result) => {
      
      setRegisteroffice(result.data);
      if (result.data){
        setFileUploaderC(false);
        setOnMouseOverC(false)
      }
    });
  };
  
  const onloadvalues = async (data) => {
    setValue("Regcomname", data.companyName);
    setValue("brandName", data.brandName);
    setValue("website", data.webSite);
    setValue("domainname", data.domainName);
  };

  const onSubmit = async (data) => {
    var userinfo = JSON.parse(sessionStorage.getItem("user-info"));
    var req = {
      company_id: userinfo.company_id,
      companyName: getValues("Regcomname"),
      brandName: getValues("brandName"),
      webSite: getValues("website"),
      domainName: getValues("domainname"),
    };
    await axios
      .patch(`/api/company/details/${editId}/`, req)
      .then((result) => {
        getDetials();
        setShow(false);
        setSuccessAlert(true);
        reset();
      })
      .catch((err) => {
        console.log("error resp", err);
      });
  };
  const onloadvaluessocial = async (data) => {
    setValue1("linkedIn", data.linkedInPage);
    setValue1("facebook", data.facebookPage);
    setValue1("twitter", data.twitterPage);
  };

  const onSubmitsocial = async (data) => {
    var userinfo = JSON.parse(sessionStorage.getItem("user-info"));
    var req = {
      linked_in_page: getValues1("linkedIn"),
      facebook_page: getValues1("facebook"),
      twitter_page: getValues1("twitter"),
    };
    await axios
      .patch(`/api/company/details/${editId}/`, req)
      .then((result) => {
        getDetials();
        setShow1(false);
        setSuccessAlert(true);
        reset1();
      })
      .catch((err) => {
        console.log("error resp", err);
      });
  };
  const uploadimagetoServer =  async (data, id) =>{
    console.log(data.target.files)
    if (data.target.files[0]){
      const formData = new FormData();
      formData.append("companyImage", data.target.files[0]);
      await axios
        .patch(`/api/company/details/${id}/`, formData)
        .then((result) => {
          getDetials();
          setShow1(false);
          //setSuccessAlert(true);
          //reset1();
        })
        .catch((err) => {
          console.log("error resp", err);
        });
    }
  }
  //=========
  const onFileUploader = ()=>{
     setOnMouseOverC(true)
     setFileUploaderC(false)
  }
  const onFileMouseDown = ()=>{
     //setOnMouseOverC(false)
    setFileUploaderC(true)
  }

  useEffect(() => {
    getDetials();
    
    // getDetialsMedia();
  }, []);
  return (
    <>
      
      <div className='container'>
        
        <div className='row mb-3'>
          <div className="col-md-3">
            <div className="companyLogo" >

              {registeroffice.companyImage ? 
              <img src={registeroffice.companyImage} onMouseOver={()=>onFileUploader()} ></img>
              
                :<div className="border border-success fileUploader text-center "   htmlFor="input-file-upload" >
                <div className="display-4"><FcAddImage/> <p className="text-primary">please upload photo here</p></div>
              <input type="file" onChange={(e) => uploadimagetoServer(e, registeroffice.id)} accept="image/png, image/jpeg" className='fileUpload' id="input-file-upload"/>
               
            </div> }
            
            </div>
            

             {onMouseOverC ? <div className="border border-success fileUploader text-center " style={{ display: fileUploaderC ? 'none' : 'block'  }}  htmlFor="input-file-upload" onMouseOut ={()=>onFileMouseDown()}>
                <div className="display-4"><FcAddImage/> <p className="text-primary">please upload photo here</p></div>
              <input type="file" onChange={(e) => uploadimagetoServer(e, registeroffice.id)} accept="image/png, image/jpeg" className='fileUpload' id="input-file-upload"/>
               
            </div>  : '' } 
          </div>
          <div className="col-md-9">
          <div className='card p-3'>
            <div className='body'>
              <div className='row borbottm'>
                <div className='col-md-6'>
                  <h6>Overview</h6>
                </div>
                <div className='col-md-6 text-end fns-w'>
                  <h6>
                    <AiOutlineEdit
                      onClick={() => {
                        handleShow();
                        setEditId(registeroffice.id);
                        onloadvalues(registeroffice);
                        clearErrors();
                      }}
                    />
                  </h6>
                </div>
              </div>
              <form>
                <div className='row'>
                  <div className='col-md-6 '>
                    <label className='fns-w'>Registered Company Name</label>
                    <p>{registeroffice.companyName}</p>
                  </div>
                  <div className='col-md-6'>
                    <label className='fns-w'>Brand Name</label>
                    <p>{registeroffice.brandName}</p>
                  </div>
                </div>

                <div className='row'>
                  <div className='col-md-6'>
                    <label className='fns-w'>Website</label>
                    <p>{registeroffice.webSite}</p>
                  </div>
                  <div className='col-md-6 '>
                    <label className='fns-w'>Domain Name</label>
                    <p>{registeroffice.domainName} </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
          </div>
        </div>

        <div className='row'>
          <div className='card p-3'>
            <div className='body'>
              <div className='row borbottm'>
                <div className='col-md-6'>
                  <h6>SOCIAL PROFILE</h6>
                </div>
                <div className='col-md-6 text-end fns-w'>
                  <h6>
                    <AiOutlineEdit
                      onClick={() => {
                        handleShow1();
                        setEditId(registeroffice.id);
                        onloadvaluessocial(registeroffice);
                        clearErrors();
                      }}
                    />
                  </h6>
                </div>
              </div>
              <div className='row'>
                <div className='col-md-12 mt-2'>
                  <div className='social-section'>
                    <ul>
                      <li>
                        <a
                          id='s_linkedIn'
                          href={registeroffice.linkedInPage}
                            target="_blank"
                          className='btn-floating btn-small btn-li waves-effect waves-light'>
                          <i className='fa fa-linkedin'> </i>
                        </a>
                      </li>
                      <li>
                        <a
                          id='s_facebook'
                          href={registeroffice.facebookPage}
                            target="_blank"
                          className='btn-floating btn-small btn-fb waves-effect waves-light'>
                          <i className='fa fa-facebook'> </i>
                        </a>
                      </li>
                      <li>
                        <a
                          id='s_twitter'
                          href={registeroffice.twitterPage}
                            target="_blank"
                          className='btn-floating btn-small btn-tw waves-effect waves-light'>
                          <i className='fa fa-twitter'> </i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Overview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='row mb-2'>
              <div className='col-md-6'>
                <label className='m-0'>Registered Company Name</label>
                <input
                  className='form-control  editover'
                  {...register("Regcomname", {
                    required: "This field Is Required",
                      pattern: {
                          value: /^[A-Za-z][A-Za-z-\s]+$/,
                          message: "This field allow only alphabets and spaces and Spaces but not accepted at 1st character",
                        }
                  })}
                  onKeyUp={() => {
                    trigger("Regcomname");
                  }}
                />
                {errors.Regcomname && (
                  <small className='text-danger font-bold'>
                    {errors.Regcomname.message}
                  </small>
                )}
              </div>
              <div className='col-md-6'>
                <label className='m-0'>Brand Name</label>
                <input
                  className='form-control  editover'
                  {...register("brandName", {
                    required: "Brand Name Is Required",
                      pattern: {
                          value: /^[a-zA-Z0-9][a-zA-Z0-9\s]*$/,
                          message: "This field allow only alphanumeric  and spaces but not accepted space at 1st character",
                        }
                  })}
                  onKeyUp={() => {
                    trigger("brandName");
                  }}
                />
                {errors.brandName && (
                  <small className='text-danger font-bold'>
                    {" "}
                    {errors.brandName.message}{" "}
                  </small>
                )}
              </div>
            </div>
            <div className='row'>
              <div className='col-md-6'>
                <label className='m-0'>Website</label>
                <input
                  className='form-control  editover'
                  {...register("website", {
                  pattern: {
                      value: /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?\/?$/,
                      message: "Please enter valid website url", // JS only: <p>error message</p> TS only support string
                  }})}
                  onKeyUp={() => {
                    trigger("website");
                  }}></input>

                {errors.website && (
                  <small className='text-danger font-bold'>
                    {" "}
                    {errors.website.message}
                  </small>
                )}
              </div>
              <div className='col-md-6'>
                <label className='m-0'>Domain Name</label>
                <input
                  className='form-control  editover'
                  {...register("domainname", {
                       pattern: {
                          value: /^[a-zA-Z0-9][a-zA-Z0-9\s]*$/,
                          message: "This field allow only alphanumeric  and spaces but not accepted space at 1st character",
                        }
                  })}
                  onKeyUp={() => {
                    trigger("domainname");
                  }}></input>
                  {errors.domainname && (
                  <small className='text-danger font-bold'>
                    {" "}
                    {errors.domainname.message}
                  </small>
                )}
              </div>
            </div>
            <Modal.Footer>
              <Button variant='secondary' type='reset' onClick={handleClose}>
                {" "}
                Cancel{" "}
              </Button>
              <Button variant='primary' type='submit'>
                {" "}
                Save{" "}
              </Button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
      <Modal show={show1} onHide={handleClose1} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>SOCIAL PROFILE </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit1(onSubmitsocial)}>
            <div className='row'>
              <div className='col-md-1'>
                <a
                  id='s_linkedIn'
                  href={registeroffice.LinkedInPage}
                  className='btn-floating btn-small btn-li waves-effect waves-light'>
                  {" "}
                  <i className='fa fa-linkedin'> </i>{" "}
                </a>
              </div>
              <div className='col-md-7'>
                <div className='md-form'>
                  <input
                    type='text'
                    className='form-control'
                    {...register1("linkedIn",{
                      pattern: {
                        value: /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?\/?$/,
                        message: "Please enter valid linkedin url", // JS only: <p>error message</p> TS only support string
                      }
                    })}
                    onKeyUp={() => {
                      trigger1("linkedIn");
                    }}
                    placeholder='Enter linkedIn url'
                  />
                  {errors1.linkedIn && (
                    <small className='text-danger font-bold'>
                      {" "}
                      {errors1.linkedIn.message}
                    </small>
                  )}
                </div>
              </div>
              <div className='col-md-4'></div>
            </div>
            <div className='row'>
              <div className='col-md-1'>
                <a
                  id='s_facebook'
                  href={registeroffice.FacebookPage}
                  className='btn-floating btn-small btn-fb waves-effect waves-light'>
                  {" "}
                  <i className='fa fa-facebook'> </i>{" "}
                </a>
              </div>
              <div className='col-md-7'>
                <div className='md-form'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Enter facebook url'
                    {...register1("facebook",{
                      pattern: {
                        value: /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?\/?$/,
                        message: "Please enter valid facebook url", // JS only: <p>error message</p> TS only support string
                      }
                    })}
                    onKeyUp={() => {
                      trigger1("facebook");
                    }}
                  />
                  {errors1.facebook && (
                    <small className='text-danger font-bold'>
                      {" "}
                      {errors1.facebook.message}
                    </small>
                  )}
                </div>
              </div>
              <div className='col-md-4'></div>
            </div>
            <div className='row'>
              <div className='col-md-1'>
                <a
                  id='s_twitter'
                  href={registeroffice.TwitterPage}
                  className='btn-floating btn-small btn-tw waves-effect waves-light'>
                  <i className='fa fa-twitter'> </i>
                </a>
              </div>
              <div className='col-md-7'>
                <div className='md-form'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Enter twitter url'
                    {...register1("twitter", {
                      pattern: {
                        value: /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?\/?$/,
                        message: "Please enter valid twitter url", // JS only: <p>error message</p> TS only support string
                      }
                    })}
                    onKeyUp={() => {
                      trigger1("twitter");
                    }}
                  />
                  {errors1.twitter && (
                    <small className='text-danger font-bold'>
                      {" "}
                      {errors1.twitter.message}
                    </small>
                  )}
                </div>
              </div>
              <div className='col-md-4'></div>
            </div>
            <Modal.Footer>
              <Button variant='secondary' type='reset' onClick={handleClose}>
                {" "}
                Cancel{" "}
              </Button>
              <Button variant='primary' type='submit'>
                {" "}
                Save{" "}
              </Button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
      <Modal
        size='md'
        show={successAlert}
        onHide={() => setSuccessAlert(false)}
        className='text-center'>
        <Modal.Header closeButton></Modal.Header>
        <h4 className='text-center'>Update Successfully</h4>
        <div className='text-center m-3'>
          <button
            className='btn btn-primary'
            onClick={() => {
              setSuccessAlert(false);
            }}>
            {" "}
            OK{" "}
          </button>
        </div>
      </Modal>
    </>
  );
}
export default OrganizationMaster;
