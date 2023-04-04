import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import Modal from "react-bootstrap/Modal";
import { FcOk } from "react-icons/fc";
import Button from "react-bootstrap/Button";
import moment from 'moment'
import university from "../../images/university.svg"
const MyProfileEducation = ({employeeID}) => {
  const { register, handleSubmit, trigger, formState: { errors }, setValue, reset,getValues } = useForm();
  const [educationData, setEducationData] = useState([]);
  const [educationDataEditID, setEducationDataEditID] = useState(null);
  const [qualificationTypeDropDown, setQualificationTypeDropDown] = useState([]);
  const [courseTypeDropDown, setCourseTypeDropDown] = useState([])
  const [isEdited, setisEdited] = useState(false);
  const [showEducation, setShowEducation] = useState(false);
  const [smShowe, setSmShowe] = useState(false);
  // const [loader, setLoader] = useState(false);
  const [textDisplay, setTextDisplay] = useState("Add");
  const [deleteRowId, setDeleteRowID] = useState(null);
  const [successAlert, setSuccessAlert] = useState(false);
  const getEducationalDetailsData = async () => {
    try{  
      await axios.get(`/api/directory/employee/education/${employeeID}/`).then((result) => {
        if (result.data) {
          setEducationData(result.data);
        }
      }).catch((err) => {
        console.log('errors', err)
      })
    }catch (error) {

    }
    
  }
  const getQualificationType = async () => {
    await axios.get("/api/directory/qualification/type/").then((result) => {
      if (result.data){
        setQualificationTypeDropDown(result.data);
      }
      
    });
  };
  const getCourseType = async () => {
    await axios.get("/api/directory/course/type/").then((result) => {
      if (result.data){
        setCourseTypeDropDown(result.data);
      }
      
    });
  };
  const handleEducationClose = () => {
    setTextDisplay("Add");
    setShowEducation(false);
    setisEdited(false);
  };
  const handleClose1 = () => setSmShowe(false);
  useEffect(() => {
    getEducationalDetailsData();
    getQualificationType();
    getCourseType();
  }, []);

  const onEducationEdit = (data) => {
    setTextDisplay("Update")
    setShowEducation(true);
    setEducationDataEditID(data.id)
    setisEdited(true);
    let qType = data.qualification.id
    let cType = data.courseType.id
    setValue('courseName', data.courseName)
    setValue('collegename', data.collegeName)
    setValue('stream', data.stream)
    setValue('courseType', cType)
    setValue('coursestartdate', data.courseStartDate)
    setValue('courseenddate', data.courseEndDate)
    setValue('universityname', data.universityName);
    setValue('qualificationType', qType)

  }
  const onSubmited = async (data) => {
    var req = {
      "courseName": getValues('courseName'),
      "courseStartDate": getValues('coursestartdate') ? moment(getValues('coursestartdate')).format("DD-MM-YYYY") : "",
      "courseEndDate": getValues('courseenddate') ? moment(getValues('courseenddate')).format("DD-MM-YYYY") : "",
      "collegeName": getValues('collegename'),
      "universityName": getValues('universityname'),
      "employee": employeeID,
      "qualification": getValues('qualificationType'),
      "courseType": getValues('courseType'),
      "stream": getValues('stream')
    }
    if (!isEdited) {
      await axios.post(`/api/directory/employee/education/`, req).then((result) => {
          getEducationalDetailsData();
          setSuccessAlert(true);
          setShowEducation(false);
        })
        .catch((err) => {console.log('errors', err)})
    } else {
      await axios.patch(`/api/directory/update/employee/education/${educationDataEditID}/`, req).then((result) => {
        setTextDisplay("Update")
          getEducationalDetailsData();
          setSuccessAlert(true);
          setShowEducation(false);
        })
        .catch((err) => {
          console.log('errors', err)
        })
    }
  };
  const deleteUser = async () => {
    try {
      await axios.patch(`/api/directory/update/employee/education/${deleteRowId}/`,{"isDeleted": true});
      setTextDisplay("Deleted")
      setSmShowe(false);
      getEducationalDetailsData();
    } catch (error) {
      console.log("on submit delete error ", error);
    }
  };

  const onClickDelete = async (id)=>{
    setSmShowe(true)
    setDeleteRowID(id)
  }
  return (
    <>
      <div className="card mt-2">
        <div className="row">
        <div className="col-md-8">
          <div className="p-3"><b>EDUCATIONAL INFO </b></div>
        </div>
        <div className="col-md-4 text-end">
          <div className="" onClick={() => { setShowEducation(true); setTextDisplay("Add"); setisEdited(false); reset()}}  >
            <button className="btn btn-primary"> ADD </button>
          </div>
        </div>
        </div>
      </div>
      {educationData.map((eData, id) => {
        return (
          <div key={id}>
            <div className="borderwithline">
              <strong> {eData.qualification.value}</strong>
              <div className="editButtonOnright">
                <span className="pe-autos" onClick={() => onEducationEdit(eData)}><AiOutlineEdit /></span> &nbsp;&nbsp;
                <span className="pe-autos" onClick={()=>onClickDelete(eData.id)} ><AiOutlineDelete /></span>
              </div>
            </div>
            <div className="row  pb-3">
              <div className="col-md-3">
                <div>
                  <div className="p-3 border bg-light">
                    <div className="img-fluid"><img src={university} style={{ maxWidth: "inherit" }} alt="" /></div>
                  </div>
                </div>
              </div>
              <div className="col-md-9">
                <div className="h5">{eData.collegeName}</div>
                <div>{eData.courseName}</div>
                <div>{eData.stream}</div>
                <div>{eData.courseType.value}</div>
                <div>{moment(eData.courseStartDate).format('YYYY')} - {moment(eData.courseEndDate).format('YYYY')}</div>
                <div>{eData.universityName}</div>
              </div>
            </div>
          </div>
        )})} 
        
      <Modal show={showEducation} onHide={handleEducationClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>{textDisplay}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmited)}>
            <div className='row'>
              <div className='col-md-6'>
                <label className='fns-w'>Qualification Type</label>
                <select
                  class='form-control editover'
                  {...register("qualificationType", {
                    required: "This Field is Required",
                  })}
                  onKeyUp={() => {
                    trigger("qualificationType");
                  }}>
                  <option value=''>Qualification Type</option>
                    {qualificationTypeDropDown.map((qType, i) => {
                      return ( <option value={qType.id}> {qType.value} </option> );
                    })}
                </select>
                {errors.qualificationType && (
                  <small className='text-danger'>
                    {errors.qualificationType.message}
                  </small>
                )}
              </div>
              <div className='col-md-6'>
                <label>Course Name</label>
                <input className='form-control'
                  {...register("courseName", {
                    required: "This Field is Required",
                  })}
                  onKeyUp={() => {
                    trigger("courseName");
                  }}
                />
                {errors.courseName && (
                  <small className='text-danger'>
                    {errors.courseName.message}
                  </small>
                )}
              </div>
            </div>
            <div className='row'>
              <div className='col-md-6'>
                <label className='fns-w'>Course Type</label>
                <select
                  class='form-control editover'
                  {...register("courseType", {
                    required: "This Field is Required",
                  })}
                  onKeyUp={() => {
                    trigger("courseType");
                  }}>
                  <option value=''>Course Type</option>
                    {courseTypeDropDown.map((cType, i) => {
                      return (
                        <option value={cType.id}>
                          {cType.value}
                        </option>
                      );
                    })}
                </select>
                {errors.courseType && (
                  <small className='text-danger'>
                    {errors.courseType.message}
                  </small>
                )}
              </div>
              <div className='col-md-6'>
                <label>Stream</label>
                <input
                  className='form-control'
                  {...register("stream", {
                    required: "This Field is Required",
                  })}
                  onKeyUp={() => {
                    trigger("stream");
                  }}
                />
                {errors.stream && (
                  <small className='text-danger'>{errors.stream.message}</small>
                )}
              </div>
            </div>
            <div className='row'>
              <div className='col-md-6'>
                <label>Course Start Date</label>
                <input
                  type='date'
                  className='form-control'
                  {...register("coursestartdate", {
                    required: "This Field is Required",
                  })}
                  onKeyUp={() => {
                    trigger("coursestartdate");
                  }}
                />
                {errors.coursestartdate && (
                  <small className='text-danger'>
                    {errors.coursestartdate.message}
                  </small>
                )}
              </div>
              <div className='col-md-6'>
                <label>Course End Date</label>
                <input
                  type='date'
                  className='form-control'
                  {...register("courseenddate", {
                    required: "This Field is Required",
                  })}
                  onKeyUp={() => {
                    trigger("courseenddate");
                  }}
                />
                {errors.courseenddate && (
                  <small className='text-danger'>
                    {errors.courseenddate.message}
                  </small>
                )}
              </div>
            </div>
            <div className='row'>
              <div className='col-md-6'>
                <label>College Name</label>
                <input
                  className='form-control'
                  {...register("collegename", {
                    required: "This Field is Required",
                  })}
                  onKeyUp={() => {
                    trigger("collegename");
                  }}
                />
                {errors.collegename && (
                  <small className='text-danger'>
                    {errors.collegename.message}
                  </small>
                )}
              </div>
              <div className='col-md-6'>
                <label>University Name</label>
                <input
                  className='form-control'
                  {...register("universityname", {
                    required: "This Field is Required",
                  })}
                  onKeyUp={() => {
                    trigger("universityname");
                  }}
                />
                {errors.universityname && (
                  <small className='text-danger'>
                    {errors.universityname.message}
                  </small>
                )}
              </div>
            </div>

            <Modal.Footer>
              <Button variant='secondary' onClick={()=>setShowEducation(false)}> Cancel </Button>
              <button className='btn btn-primary' type='submit' > {textDisplay} </button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>

      <Modal size='md' show={successAlert} onHide={() => setSuccessAlert(false)} className='text-center'>
        <Modal.Header closeButton></Modal.Header>
        <div className='text-center m-3'> <FcOk size='80px' /> </div>
        <h4 className='text-center'>{textDisplay} Successfully</h4>
        <div className='text-center m-3'>
          <button className='btn btn-primary'  onClick={() => {  setSuccessAlert(false);  setTextDisplay("Add"); setisEdited(false); }}>  OK </button>
        </div>
      </Modal>

      <Modal size='md' show={smShowe} onHide={() => setSmShowe(false)}  className='text-center'>
        <Modal.Header closeButton></Modal.Header>
        <div className='text-center m-3 text-danger'> <AiOutlineDelete size='80px' />  </div>
        <h4>Are you sure you want to delete this!</h4>
        <div className='text-center m-3'>
          <button className='btn btn-secondary me-3 ' onClick={handleClose1}>Cancel </button>
          <button className='btn btn-primary' onClick={deleteUser}>  Delete </button>
        </div>
      </Modal>
    </>
  );
}

export default MyProfileEducation;
