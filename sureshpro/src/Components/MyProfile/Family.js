import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { useForm } from "react-hook-form";
import Modal from "react-bootstrap/Modal";
import { FcOk } from "react-icons/fc";
import Button from "react-bootstrap/Button";
import {  useParams } from 'react-router-dom';
import moment from 'moment'
import {
  AiOutlineEdit,
  AiOutlineDelete,
} from "react-icons/ai";

function MyProfileFamily({ employeeID }) {
  const {
    register,
    handleSubmit,
    reset,
    trigger,
    clearErrors,
    formState: { errors },
    setValue,
  } = useForm();


  const {
    register: register1,
    formState: { errors: errors1 },
    handleSubmit: handleSubmit1,
    setValue: setValue1,
    trigger: trigger1,
    clearErrors: clearErrors1,
    reset: reset1,
  } = useForm({ mode: "onBlur" });


  const [show, setShow] = useState(false);
  const [showemergency, setShowemergency] = useState(false);

  const [editId, setEditId] = useState(null);
  const [textDisplay, setTextDisplay] = useState("Add");
  const [textDisplayEM, setTextDisplayEM] = useState("Add");

  const [isEdited, setisEdited] = useState(false);
  const [deleteRowId, setDeleteRowID] = useState(null);
  const [smShowe, setSmShowe] = useState(false);
 // const [loader, setLoader] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [smShow, setSmShow] = useState(false);
  const [editIdEMP, setEditIdEMP] = useState(null);
  const [isEditedEMP, setisEditedEMP] = useState(false);
  const [successAlert1, setSuccessAlert1] = useState(false);
  const [smShowe1, setSmShowe1] = useState(false);
  const [smShow1, setSmShow1] = useState(false);
  const [deleteRowIdEMP, setDeleteRowIDEMP] = useState(null);
  const [disable, setDisable] = useState(false);

  //----family drop down------//
  // const onButtonEnable = ()=>{
  //   setDisable(false);
  //   alert(disable)
  // }
  const [familyDropDown, setFamilyDropDown] = useState([]);
   //const [family, setFamily] = useState([]);
  const [filteredFamily, setFilteredFamily] = useState([]);
  const { id } = useParams()
  //-----------family dropdown & emergency fn-------//
 const getFamilyDropDown = async () => {
    await axios.get("/api/directory/relationship/type/").then((result) => {
      setFamilyDropDown(result.data);
    });
  }; 
  //-----family get------//
   const getFamily = async () => {
    await axios.get(`/api/directory/employee/family/${id}/`).then((result) => {
     // setFamily(result.data);
      setFilteredFamily(result.data);
    });
  }; 
  
  const onSubmited = async (data) => {
    setDisable(true)
    let dobValue = moment(data.dob).format("DD-MM-YYYY"); 
    var req = {  "employee": id, "name": data.name,  "relationship":data.relationship, "dateOfBirth":dobValue,  "dependent": data.Dependant}
    if (!isEdited) {
      try {
        let response = await axios.post(  "/api/directory/employee/family/", req );
        if (response.data){
          getFamily();
          setSuccessAlert(true);
          setShow(false);
          setDisable(false)
        }
         
      } catch {
        alert("error");
        setDisable(false)
      }
    } else {
      try {
        let response = await axios.patch(`/api/directory/update/employee/family/${editId}/`, req);
        if (response.data) {
          getFamily();
          setSuccessAlert(true);
          setShow(false);
          //setLoader(true);
          setDisable(false)
        }
      } catch (err) {
        alert("error");
        setDisable(false)
      }
    }
  };

  const onloadvalues = async (data) => {
    let relationValue = data.relationship
    setValue("name", data.name);
    setValue("relationship", relationValue.id);
    setValue("dob", data.dateOfBirth);
    setValue("Dependant", data.dependent);
  };
  //-------------Emergency section-----------------------//
   // const [emergencyContactData, setEmergencyContactData] = useState([]);
    const [filteredEmergencyContactData, setFilteredEmergencyContactData] = useState([])
  
  const getEmergency = async () => {
    await axios.get(`/api/directory/emargency/contact/${id}/`).then((result) => {
      
      setFilteredEmergencyContactData(result.data);

    });
  }; 
  //--------------
  const onSubmitedEmp = async (data) => {
     setDisable(true)
    var req = { "employee": id, "name": data.ename,  "relationship": data.erelationship, "phoneNumber": data.phonenumber, };
    if (!isEditedEMP) {
      try {
        let response = await axios.post( "/api/directory/emargency/contact/", req);
        if (response.data){
          getEmergency();
          setSuccessAlert1(true);
          setShowemergency(false);
          // setLoader(true);
          setDisable(false)
        }
      } catch {
        alert("error");
         setDisable(false)
      }
    } else {
      try {
        let response = await axios.patch( `/api/directory/update/emargency/contact/family/${editIdEMP}/`, req);
        if (response.data) {
          getEmergency();
          setSuccessAlert1(true);
          setShowemergency(false);
          // setLoader(true);
          setDisable(false)
        }
      } catch (err) {
        alert("error");
         setDisable(false)
      }
    }
  };
  const onloadvaluesemp = async (data) => {
    setValue1("ename", data.name);
    setValue1("erelationship", data.relationship.id);
    setValue1("phonenumber", data.phoneNumber);

  };
  //--------------------
  
  const handleFamily = () => {
    setShow(false);
    setShowemergency(false);
  }

  const handlefamilyClose = () => {
    setShow(false);
    setTextDisplay("Add");
  };

  const handleClose1 = () => setSmShowe(false);
  const handleClose2 = () => setSmShowe1(false);


  const handlefamilyShow = () => {
    setShow(true);
    reset();
  };

  const handleemergencyClose = () => {
    setShowemergency(false);
    setTextDisplayEM("Add")
  };

  const handleemergencyShow = () => {
    reset1()
    setShowemergency(true);
    setValue1("ename", "");
    setValue1("erelationship", "");
    setValue1("phonenumber", "");
  };

 

  const columns = [
    // {
    //   name: <span className='fs-6 fw-bold'>S.No</span>,
    //   selector: (row) => row.Num,
    //   sortable: true,
    // },

    {
      name: <span className='fs-6 fw-bold'>Name </span>,
      selector: (row) => row.name,
      sortable: true,
      
    },
    {
      name: <span className='fs-6 fw-bold'>RelationShip </span>,
      selector: (row) => row.relationship.value,
      sortable: true,
    
    },
    {
      name: <span className='fs-6 fw-bold'>Date of Birth</span>,
      selector: (row) => row.dateOfBirth,
      sortable: true,
      
    },
    {
      name: <span className='fs-6 fw-bold'>Dependant</span>,
      selector: (row) =>
        row.dependent ? (
          <input type='checkbox' defaultChecked checked='checked' />
        ) : (
          ""
        ),
      sortable: true,

    },

    {
      name: <span className='fs-6 fw-bold'>Action</span>,
      cell: (row) => (
        <div className='text-center'>
          <button
            className='btn btn-light m-2 bi bi-pencil-square'
            onClick={() => {
              clearErrors();
              setEditId(row.id);
              setTextDisplay("Update");
              handlefamilyShow();
              setisEdited(true);
              onloadvalues(row);
              setDisable(false)
            }}>
            <AiOutlineEdit />
          </button>

          <button
            className='btn btn-light  text-danger bi bi-trash3'
            onClick={() => {
              setDeleteRowID(row.id);
              setSmShowe(true);
            }}>
            <AiOutlineDelete />
          </button>
        </div>
      ),
    },
  ];
  useEffect(() => {
    getFamily();
    getEmergency();
    getFamilyDropDown();
  }, []);

  const deleteUser = async () => {
    let id = deleteRowId;
    try {
      await axios.patch(
        `/api/directory/update/employee/family/${id}/`,{"isDeleted": true}
      );
      setSmShow(true);
      setSmShowe(false);
      getFamily();
    } catch (error) {
      console.log("on submit delete error ", error);
    }
  };
  //----------------------- -------  EMERGENCY API  ---------------------------------//
  
  const columns1 = [
    
    {
      name: <span className='fs-6 fw-bold'>Name </span>,
      selector: (row) => row.name,
      sortable: true,
     
    },
    {
      name: <span className='fs-6 fw-bold'>RelationShip </span>,
      selector: (row) => row.relationship.value,
      sortable: true,
     
    },
    {
      name: <span className='fs-6 fw-bold'>Phone Number</span>,
      selector: (row) => row.phoneNumber,
      sortable: true,
      
    },

    {
      name: <span className='fs-6 fw-bold'>Action</span>,
      cell: (row) => (
        <div className='text-center'>
          <button
            className='btn btn-light m-2 bi bi-pencil-square'
            onClick={() => {
              clearErrors1();
              setEditIdEMP(row.id);
              setTextDisplayEM("Update");
              handleemergencyShow();
              setisEditedEMP(true);
              onloadvaluesemp(row);
               setDisable(false)
            }}>
            <AiOutlineEdit />
          </button>

          <button
            className='btn btn-light  text-danger bi bi-trash3'
            onClick={() => {
              setDeleteRowIDEMP(row.id);
              setSmShowe1(true);
            }}>
            <AiOutlineDelete />
          </button>
        </div>
      ),
    },
  ];

  const deleteUserEMP = async () => {
    let id = deleteRowIdEMP;
    try {
      await axios.patch(
          `/api/directory/update/emargency/contact/family/${id}/`,{"isDeleted": true}
      );
      setSmShow1(true);
      setSmShowe1(false);
      getEmergency();
    } catch (error) {
      console.log("on submit delete error ", error);
    }
  };

  return (
    <>

            <div className='card mt-2'>
              <div className='body '>
                <div className='row p-3' >
                  <div className='col-md-6'>
                    <h6>FAMILY MEMBERS</h6>
                  </div>
                  <div className='col-md-6 text-end'>
                    <Button variant='primary' onClick={handlefamilyShow}>
                      Add
                    </Button>
                  </div>
                </div>

                <DataTable
                  columns={columns}
                  data={filteredFamily}
                  pagination
                  fixedHeaderScrollHeight='450px'
                  fixedHeaderScrollWidth='50px'
                  highlightOnHover
                />
              </div>
            </div>


        <Modal show={show} onHide={handlefamilyClose} size='lg'>
          <Modal.Header closeButton>
            <Modal.Title>{textDisplay}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit(onSubmited)}>
              <div className='row mb-2'>
                <div className='col-md-6'>
                  <label className='form-label'>Name</label>
                  <input
                    className='form-control'
                    {...register("name", {
                      required: "This Field is Required",
                      pattern: {
                        value: /^[a-zA-Z_ ]*$/,
                        message: "Please enter valid Name", 
                      },
                    })}
                    onKeyUp={() => {
                      trigger("name");
                    }}
                  />
                  {errors.name && (
                    <small className='text-danger'>{errors.name.message}</small>
                  )}
                </div>
                <div className='col-md-6'>
                  <label className='form-label'>RelationShip</label>
                  <select
                    class='form-control editover'
                    {...register("relationship", {
                      required: "This Field is Required",
                    })}
                    onKeyUp={() => {
                      trigger("relationship");
                    }}>
                    <option value=''>Select RelationShip Type</option>
                   
                        {familyDropDown.map((fType, i) => {
                            return (
                              <option value={fType.id}>
                                {fType.value}
                              </option>
                            );
                          })}
                  </select>
                  {errors.relationship && (
                    <small className='text-danger'>
                      {errors.relationship.message}
                    </small>
                  )}
                </div>
              </div>

              <div className='row mb-2'>
                <div className='col-md-6'>  
                  <label className='form-label'>Date Of Birth</label>
                  <input
                    type='date'
                  max={moment(new Date()).format("YYYY-MM-DD")}
                    className='form-control'
                    {...register("dob", {
                      required: "This Field is Required",
                    })}
                    onKeyUp={() => {
                      trigger("dob");
                    }}
                  />
                  {errors.dob && (
                    <small className='text-danger'>{errors.dob.message}</small>
                  )}
                </div>

                <div className='col-md-6'>
                  <label className='form-label'>Dependant</label>
                  <div>
                    <input
                      type='checkbox'
                      style={{ width: "40px", height: "30px" }}
                      {...register("Dependant", {})}
                      onKeyUp={() => {
                        trigger("Dependant");
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-md-12 text-end'>
                  <button
                    className='btn btn-secondary me-2'
                    type='reset'
                    onClick={handleFamily}>
                    Cancel
                  </button>
                  <button className='btn btn-primary' type='submit' disabled={disable} >
                    {textDisplay}
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
          <h4 className='text-center'>{textDisplay} Successfully</h4>
          <div className='text-center m-3'>
            <button
              className='btn btn-primary'
              onClick={() => {
                setSuccessAlert(false);
                setTextDisplay("Add");
                setisEdited(false);
              }}>
              OK
            </button>
          </div>
        </Modal>

        <Modal
          size='md'
          show={smShowe}
          onHide={() => setSmShowe(false)}
          className='text-center'>
          <Modal.Header closeButton></Modal.Header>
          <div className='text-center m-3 text-danger'>
            <AiOutlineDelete size='80px' />
          </div>
          <h4>Are you sure you want to delete this!</h4>
          <div className='text-center m-3'>
          
            <button className='btn btn-secondary me-3 ' onClick={handleClose1}>
              Cancel
            </button>
            <button className='btn btn-primary' onClick={deleteUser}>
              Delete
            </button>
          </div>
        </Modal>

        <Modal
          size='md'
          show={smShow}
          onHide={() => setSmShow(false)}
          className='text-center'>
          <Modal.Header closeButton></Modal.Header>
          <div className='text-center m-3 text-danger'>
            <AiOutlineDelete size='80px' />
          </div>
          <h4 className='text-center'>Deleted Successfully</h4>
          <div className='text-center m-3'>
            <button
              className='btn btn-primary'
              onClick={() => setSmShow(false)}>
              Okay
            </button>
          </div>
        </Modal><br/>
      {/* ///////////////////////////////////////////     EMERGENCY CONTACT  //////////////////////////// */}

            <div className='card'>
              <div className='body'>
                <div className='row  p-3'>
                  <div className='col-md-6'>
                    <h6>EMERGENCY CONTACT</h6>
                  </div>
                  <div className='col-md-6 text-end'>
                    <Button variant='primary' onClick={handleemergencyShow}>
                      Add
                    </Button>
                  </div>
                </div>

                <DataTable
                  columns={columns1}
                  data={filteredEmergencyContactData}
                  paginationonSubmitsocial
                  fixedHeaderScrollHeight='450px'
                  fixedHeaderScrollWidth='50px'
                  highlightOnHover
             
                />
              </div>
            </div>


        <Modal show={showemergency} onHide={handleemergencyClose} size='lg'>
          <Modal.Header closeButton>
            <Modal.Title> {textDisplayEM}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit1(onSubmitedEmp)}>
              <div className='row mb-2'>
                <div className='col-md-6'>
                  <label className='form-label'>Name</label>
                  <input
                    className='form-control'
                    {...register1("ename", {
                      required: "This Field is Required",
                      pattern: {
                        value: /^[a-zA-Z_ ]*$/,
                        message: "Please enter valid Name", 
                      },
                    })}
                    onKeyUp={() => {
                      trigger1("ename");
                    }}
                  />
                  {errors1.ename && (
                    <small className='text-danger'>
                      {errors1.ename.message}
                    </small>
                  )}
                </div>
                <div className='col-md-6'>
                  <label className='form-label'>RelationShip</label>
                  <select
                    class='form-control editover'
                    {...register1("erelationship", {
                      required: "This Field is Required",
                    })}
                    onKeyUp={() => {
                      trigger1("erelationship");
                    }}>
                 <option value=''>Select RelationShip Type</option>
                        {familyDropDown.map((fType, i) => {
                            return (
                              <option key={i} value={fType.id}>
                                {fType.value}
                              </option>
                            );
                          })}
                  </select>
                  {errors1.erelationship && (
                    <small className='text-danger'>
                      {errors1.erelationship.message}
                    </small>
                  )}
                </div>
              </div>

              <div className='row mb-2'>
                <div className='col-md-6'>
                  <label className='form-label'>Phone Number</label>
                  <input
                    type='text'
                    className='form-control'
                    {...register1("phonenumber", {
                      required: "This Field is Required",
                      pattern: {
                        value: /^[0-9]+$/,
                        message:
                          "Please enter 10 digit alternate mobile number", 
                      },
                      minLength: {
                        value: 10,
                        message:
                          "Please enter 10 to 15 digit alternate mobile number ", 
                      },
                      maxLength: {
                        value: 15,
                        message:
                          "Please enter 10 to 15 digit alternate mobile number  ",  
                      },
                    })}
                    onKeyUp={() => {
                      trigger1("phonenumber");
                    }}
                  />
                  {errors1.phonenumber && (
                    <small className='text-danger'>
                      {errors1.phonenumber.message}
                    </small>
                  )}
                </div>
              </div>
              <Modal.Footer>
                <Button variant='secondary' type='reset' onClick={handleFamily}>
                  Cancel
                </Button>
                <Button
                  variant='primary'
                  type='submit'
             disabled={disable}
           
                >
                  {textDisplayEM}
                </Button>
              </Modal.Footer>
            </form>
          </Modal.Body>
        </Modal>

        <Modal
          size='md'
          show={successAlert1}
          onHide={() => setSuccessAlert1(false)}
          className='text-center'>
          <Modal.Header closeButton></Modal.Header>
          <div className='text-center m-3'>
            <FcOk size='80px' />
          </div>
          <h4 className='text-center'>{textDisplayEM} Successfully</h4>
          <div className='text-center m-3'>
            <button
              className='btn btn-primary'
              onClick={() => {
                setSuccessAlert1(false);
                setTextDisplayEM("Add");
                setisEditedEMP(false);
              }}>
              OK
            </button>
          </div>
        </Modal>

        <Modal
          size='md'
          show={smShowe1}
          onHide={() => setSmShowe1(false)}
          className='text-center'>
          <Modal.Header closeButton></Modal.Header>
          <div className='text-center m-3 text-danger'>
            <AiOutlineDelete size='80px' />
          </div>
          <h4>Are you sure you want to delete this!</h4>
          <div className='text-center m-3'>
            {/* <input id="deluser" className="form-control"></input> */}
            <button className='btn btn-secondary me-3 ' onClick={handleClose2}>
              Cancel
            </button>
            <button className='btn btn-primary' onClick={deleteUserEMP}>
              Delete
            </button>
          </div>
        </Modal>

        <Modal
          size='md'
          show={smShow1}
          onHide={() => setSmShow1(false)}
          className='text-center'>
          <Modal.Header closeButton></Modal.Header>
          <div className='text-center m-3 text-danger'>
            <AiOutlineDelete size='80px' />
          </div>
          <h4 className='text-center'>Deleted Successfully</h4>
          <div className='text-center m-3'>
            <button
              className='btn btn-primary'
              onClick={() => setSmShow1(false)}>
              Okay
            </button>
          </div>
        </Modal>
    </>
  );
}

export default MyProfileFamily;
