import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useForm } from "react-hook-form";
import { AiOutlineEdit, AiOutlineDelete, AiOutlineCloudDownload } from "react-icons/ai";
import DataTable from "react-data-table-component";
import { TbFiles } from "react-icons/tb";
import { FcOk } from "react-icons/fc";
import {  useParams } from 'react-router-dom';

function Certifications() {
  const [AddCertificationsPopUp, setAddCertificationsPopUp] = useState(false);
  const [certificationsData, setCertificationsData] = useState([]);
  const [editId, setEditId] = useState(); // edit id of update
  const [deleteRowId, setDeleteRowID] = useState(null); // edit id of delete
  const [visible, setVisible] = useState(false); // pop-up
  const [successPopUp, setSuccessPopUp] = useState(false); // all pop_ups
  const [addDocument, setAddDocument] = useState("");  // document names
  const [addDocumentPopUpText, setAddDocumentPopUpText] = useState(""); // text of pop-ups
  const [isEdited, setIsEdited] = useState(false); // condition for submit or edit
  const [deleteCondition, setDeleteCondition] = useState(false); // condition for w pop-up
  const [certificationPicDetails, setCertificationPicDetails] = useState({});
  const [certificationPicName, setCertificationPicName] = useState('');
  const { id } = useParams();
  const [courseDropDown, setCourseDropDown] = useState([]);
  const [disable, setDisable] = useState(false);
  const {
    register,
    getValues,
    handleSubmit,
    clearErrors,
    setValue,
    reset,
    trigger,
    formState: { errors },
  } = useForm();


  const columns = [
    {
      name: <span className='fs-6 fw-bold'>S.No</span>,
      selector: (row) => row.Num,
      sortable: true,
    },

    {
      name: <span className='fs-6 fw-bold'>Course Title</span>,
      selector: (row) => row.certificationTitle,
      sortable: true,
    },
    {
      name: <span className='fs-6 fw-bold'>Uploaded By</span>,
      selector: (row) => row.employee.name,
      sortable: true,
    },
    {
      name: <span className='fs-6 fw-bold h3'>Type</span>,
      selector: (row) => row.courseType.value,
      sortable: true,
    },
    {
      name: <span className='fs-6 fw-bold h3'>Verification</span>,
      selector: (row) => (row.isVerified === true) ? 'verified' : 'Not Verified' ,
      sortable: true,
    },
    {
      name: <span className='fs-6 fw-bold'>Actions</span>,
      cell: (row) => (
        <div className='text-center d-flex'>
          {row.selectFile ?
            <button
              className='btn btn-light m-2 bi bi-pencil-square' ><a
                href={`${row.selectFile}`}
                download
                target='_blank' rel="noreferrer">
                <AiOutlineCloudDownload className="text-success" />
              </a>   </button>
            : ""}
          <div>
            <button
              className='btn btn-light m-2 bi bi-pencil-square'
              onClick={() => {
                setVisible(true);
                certificateFileName(row);
              }} >
              <TbFiles />  </button>
          </div>
          <button
            className='btn btn-light m-2 bi bi-pencil-square'
            onClick={() => {
              onloadvalues(row);
              setEditId(row.id);
              setIsEdited(false);
              setAddCertificationsPopUp(true);
              clearErrors();
              setAddDocument('Edit Document');
              setDisable(false)
            }}

          >
            <AiOutlineEdit />
          </button>

          <button
            className='btn btn-light  text-danger bi bi-trash3'

            onClick={() => {
              setDeleteRowID(row.id);

              setSuccessPopUp(true);
              setDeleteCondition(true);

            }}
          >
            <AiOutlineDelete />
          </button>
        </div>
      ),
    },
  ];
//----------------------course type dropdown------------------//
 const getFamilyDropDown = async () => {
    await axios.get(`/api/directory/certification/type/`).then((result) => {
      setCourseDropDown(result.data);
    });
  }; 
  //================== add click ==========================// 
  const AddCertificationsPop_up = () => {
    setIsEdited(true);
    setAddDocument('Add Document')
    reset();
    clearErrors();
    setAddCertificationsPopUp(true);
  };
  //===================================//

  const certificateFileName = (data) => {
    var certificateFileName = data.selectFile.split("/").pop();
    // certificateFileName;
    //console.log('d',certificateFileName)
    setCertificationPicDetails(data)
    setCertificationPicName(certificateFileName)
  }
  //=====================================//
  // ======== getting the data table ======= //
  const getCertificationsData = async () => {
    try {
      const response = await axios.get(`/api/directory/employee/certification/${id}/`);
      response.data.map((item, i) => {
        item.Num = i + 1;
        return item;
      });
      
      setCertificationsData(response.data);

      //setCertificationPicDetails(response.data[0]);
    } catch (error) {
      console.log("not found");
    }
  };

  //------------- get employee details----------------//
   
  // ======== submit  & Update Form ======= //

  const submitForm = async () => {
     setDisable(true)
    //var userInfo = JSON.parse(sessionStorage.getItem("user-info"));
    const data = getValues();
    const formData = new FormData();
    formData.append("employee", id);
    formData.append("courseType", data.selectCourseType);
    formData.append("certificationTitle", data.certificateTitle);
    formData.append("selectFile", data.certificateFile[0]);
    const config = {
      headers: { 'content-type': 'multipart/form-data' }
    }

    if (isEdited) {
      await axios
        .post("/api/directory/employee/certification/", formData,config)
        .then((result) => {
          setAddCertificationsPopUp(false);
          setDeleteCondition(false);
          setSuccessPopUp(true);
          setAddDocumentPopUpText('Added')
          getCertificationsData();
          setDisable(false)
        })
        .catch((err) => {
          console.log("error resp", err);
          setDisable(false)
        });
    } else {
      await axios
        .patch(`/api/directory/update/employee/certification/${editId}/`, formData)
        .then((result) => {
          setAddCertificationsPopUp(false);
          setDeleteCondition(false);
          setSuccessPopUp(true);
          setAddDocumentPopUpText('Updated')
          getCertificationsData();
          setDisable(false);
        })
        .catch((err) => {
          console.log("error resp", err);
          setDisable(false);
        });
    }
  };

  //========= use effect errors remove on page load =====//
  useEffect(() => {
    clearErrors();
    getCertificationsData();
    getFamilyDropDown();
   
  }, []);

  //==============  click on edit onloadvalues ====================//
  const onloadvalues = (data) => {
    let courseTypeValue = data.courseType;
    setValue("selectCourseType", courseTypeValue.id);
    setValue("certificateTitle", data.certificationTitle);

  };
  //==========================//
  const handleClose = () => setSuccessPopUp(false);

  //=================== delete user =================//
  const deleteUser = async () => {
    let id = deleteRowId;
    try {
      await axios.patch(
        `/api/directory/update/employee/certification/${id}/`, { "isDeleted": true } );
      setSuccessPopUp(false);
      setDeleteCondition(false);
      setAddDocumentPopUpText('Deleted ');
      setSuccessPopUp(true);
      getCertificationsData();
    } catch (error) {
      console.log("on submit delete error ", error);
    }
  };
  //==========================================================//

  return (
    <div className="container ">
      <div><DataTable
        columns={columns}
        data={certificationsData}
        pagination
        fixedHeader
        fixedHeaderScrollHeight='450px'
        highlightOnHover
        subHeader
      />
      </div>
      <div><button type='button' className="btn btn-primary" onClick={() => AddCertificationsPop_up()}> Add </button>  </div>
      <Modal
        size='md'
        show={AddCertificationsPopUp}
        onHide={() => setAddCertificationsPopUp(false)}
        className='text-center'>
        <Modal.Header closeButton> {addDocument}  </Modal.Header>
        <div className='text-center m-3'>
          <form
            onSubmit={handleSubmit(submitForm)}
          >
            <div >
              <div className=''>
                <div className='form-group'>
                  <p className='form-label text-start'>Select Course Type<span className='text-danger mandatory-field'>*</span></p>
                  <select
                    name='selectCourseType'
                    className='form-control'
                    {...register("selectCourseType", {
                      required: "Please Select Course Type",
                    })}>
                    <option value=''> Select Course Type</option>
                    {courseDropDown.map((cType, i) => {
                            return (
                              <option key={i} value={cType.id}>
                                {cType.value}
                              </option>
                            );
                          })}
                  </select>
                </div>

                <p className="text-start">{errors.selectCourseType && (
                  <span className='text-danger'>
                    {errors.selectCourseType.message}
                  </span>
                )}</p>
                <div className="mb-3"> <input
                  className='form-control'
                  placeholder="Enter Certifications Title"
                  type='text'
                  {...register("certificateTitle", {
                    required: "This Field Is Required..!",
                    pattern: {
                      // value: /^\d+$/,
                      // message: "Please enter only numbers",

                    },
                  })} onKeyUp={() => {
                    trigger("certificateTitle");
                  }}
                />
                  <p className="text-start">{errors.certificateTitle && (
                    <span className='text-danger '>
                      {errors.certificateTitle.message}
                    </span>
                  )}</p> </div>
              </div>

              <div className="mb-3">
                <input className="form-control" type="file" id="formFile" accept='.png,.jpg,.pdf,.gif, .doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                  {...register("certificateFile", {
                    required: "This Field Is Required..!",
                    pattern: {
                      // value: /^\d+$/,
                      // message: "Please enter only numbers",
                    },
                  })} onKeyUp={() => {
                    trigger("certificateFile");
                  }} />  <p className="text-start">{errors.certificateFile && (
                    <span className='text-danger'>
                      {errors.certificateFile.message}
                    </span>
                  )} </p>
              </div>

            </div>

            <div className='text-center m-3'>
              <div
                className='btn btn-primary m-3'
                onClick={() => setAddCertificationsPopUp(false)}>
                Cancel
              </div>
              <button
                className='btn btn-primary' type='submit'
                disabled={disable}
              //   onClick={() => setAddCertificationsPopUp(false)}
              >
                Save
              </button>
            </div> </form>
        </div>
      </Modal>
      <div>
        <Modal
          size='lg'
          show={visible}
          onHide={() => setVisible(false)}
          className='text-center'>
          <Modal.Header closeButton>
            <h5 className='text-center'>{certificationPicName} </h5>
          </Modal.Header>
          <Modal.Body>
            <div className='row'>
              <div className='col-md-12'>
                <p>
                  There was some problem fetching the document, please &nbsp; &nbsp;
                  {certificationPicDetails.selectFile ?
                    <a

                      href={certificationPicDetails.selectFile}
                      download
                        target='_blank'
                      rel="noreferrer"
                    >
                      Click Here
                    </a> : ""}
                  &nbsp; &nbsp;  to download it directly
                </p>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-12'>
                <div  >
                  {certificationPicDetails.selectFile ?
                    <a
                      className='btn btn-primary '
                     href={certificationPicDetails.selectFile}
                      download
                      target='_blank' rel="noreferrer">
                      Download
                    </a> : ""}
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
      <div>

      </div>


      <Modal
        size='md'
        show={successPopUp}
        onHide={() => setSuccessPopUp(false)}
        className='text-center'>
        <Modal.Header closeButton></Modal.Header>
        <div className='text-center m-3'>
          {deleteCondition ? <div>
            <div className='text-center m-3'>
              <AiOutlineDelete size='80px' className="text-danger" />
            </div>
            <h4 className="text-danger">Are you sure you want to delete this!</h4>
            <div className='text-center m-3'>
              {/* <input id="deluser" className="form-control"></input> */}
              <button className='btn btn-primary me-3 '
                onClick={handleClose}
              >
                Cancel
              </button>
              <button className='btn btn-primary'
                onClick={deleteUser}
              >
                Delete
              </button></div>
          </div> : <div>
            <FcOk size='80px' />
            <h4 className='text-center'> Successfully {addDocumentPopUpText} </h4>
            <div className='text-center m-3'>
              <button className='btn btn-primary' onClick={() => {
                setSuccessPopUp(false);

              }}>
                Okay
              </button>
            </div>
          </div>}

        </div>

      </Modal>
    </div>

  );
}
export default Certifications;
