import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useForm } from "react-hook-form";
import {AiOutlineEdit, AiOutlineDelete, AiOutlineCloudDownload} from "react-icons/ai";
import DataTable from "react-data-table-component";
import { TbFiles } from "react-icons/tb";
import { FcOk } from "react-icons/fc";
import * as moment from "moment";
import {  useParams } from 'react-router-dom';
function DocumentWork() {
  const [AddWorkPopUp, setAddWorkPopUp] = useState(false);
  const [WorkData, setWorkData] = useState([]);
  const [editId, setEditId] = useState(); // edit id of update
  const [deleteRowId, setDeleteRowID] = useState(null); // edit id of delete
  const [visible, setVisible] = useState(false); // pop-up
  const [successPopUp, setSuccessPopUp] = useState(false); // all pop_ups
  const [addDocument, setAddDocument] = useState("");  // document names
  const [addDocumentPopUpText, setAddDocumentPopUpText] = useState(""); // text of pop-ups
  const [isEdited, setIsEdited] = useState(false); // condition for submit or edit
  const [deleteCondition, setDeleteCondition] = useState(false); // condition for w pop-up
  const [workPicDetails, setWorkPicDetails] = useState({});
  const [workPicName, setWorkPicName] = useState('');
  const { id } = useParams();
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
const [disable, setDisable] = useState(false);
  const columns = [

    {
      name: <span className='fs-6 fw-bold'>S.No</span>,
      selector: (row) => row.Num,
      sortable: true,
    },

    {
      name: <span className='fs-6 fw-bold'>Name</span>,
      selector: (row) => row.documentTitle,
      sortable: true,
    },
    {
      name: <span className='fs-6 fw-bold'>Uploaded By</span>,
      selector: (row) => row.employee.name,
      sortable: true,
    },
    {
      name: <span className='fs-6 fw-bold h3'>Uploaded On</span>,
      selector: (row) => row.uploaded_on1,
      sortable: true,
    },
    {
      name: <span className='fs-6 fw-bold'>Actions</span>,
      cell: (row) => (
        <div className='text-center d-flex'>
          <button
            className='btn btn-light m-2 bi bi-pencil-square' ><a
              href={`${row.selectFile}`}
              download
              target='_blank' rel="noreferrer">
              <AiOutlineCloudDownload className="text-success" />
            </a>   </button>
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
              setAddWorkPopUp(true);
              clearErrors();
              setAddDocument('Edit Document')
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

  //================== add click ==========================// 
  const AddWorkPop_up = () => {
    setIsEdited(true);
    setAddDocument('Add Document')
    reset();
    clearErrors();
    setAddWorkPopUp(true);
  };
  //===================================//

  const certificateFileName = (data) => {
    //console.log('onload value in edit ', data)
    var certificateFileName = data.selectFile.split("/").pop();
  
    setWorkPicDetails(data);
    setWorkPicName(certificateFileName)
  }
  //=====================================//
  // ======== getting the data table ======= //
  const getWorkData = async () => {
    var uploaded_on_display_date;
    try {
      const response = await axios.get(`/api/directory/employee/work/${id}/`);
      response.data.map((item, i) => {
        item.Num = i + 1;
        return item
      });
      setWorkData(response.data);
      
      console.log('dataaaa', response.data);
      response.data.map(function (element) {
        element.uploaded_on1 = moment(element.uploaded_on).format('MMM Do YYYY, h:mm a');
        return element;
      });
      // uploaded_on = response.data.uploaded_on;
      // uploaded_on_display_date = moment(uploaded_on).format('MMM Do YYYY, h:mm a');
      console.log('date dataaaa', uploaded_on_display_date);
    } catch (error) {
      console.log("not found");
    }
  };
  // ======== submit  & Update Form ======= //

  const submitForm = async () => {
    setDisable(true)
    const data = getValues();
    const formData = new FormData();
    formData.append("employee", id);
    formData.append("documentDescription", data.workDescription);
    formData.append("documentTitle", data.workTitle);
    formData.append("selectFile", data.certificateFile[0]);

    if (isEdited) {
      const config = {
      headers: { 'content-type': 'multipart/form-data' }
    }
      await axios
        .post(`/api/directory/employee/work/`, formData,config)
        .then((result) => {
          console.log("post res data", result);
          setAddWorkPopUp(false);
          setDeleteCondition(false);
          setSuccessPopUp(true);
          setAddDocumentPopUpText('Added')
          getWorkData();
          setDisable(false)
        })
        .catch((err) => {
          console.log("error resp", err);
          setDisable(false)
        });
    } else {
      await axios
        .patch(`/api/directory/update/employee/work/${editId}/`, formData)
        .then((result) => {
          console.log("update res data", result);
          setAddWorkPopUp(false);
          setDeleteCondition(false);
          setSuccessPopUp(true);
          setAddDocumentPopUpText('Updated')
          getWorkData();
          setDisable(false)
        })
        .catch((err) => {
          console.log("error resp", err);
          setDisable(false)
        });
    }
  };

  //========= use effect errors remove on page load =====//
  useEffect(() => {
    clearErrors();
    getWorkData();
  }, []);

  //==============  click on edit onloadvalues ====================//
  const onloadvalues = (data) => {
    console.log('on load values ', data)
    setValue("workTitle", data.documentTitle);
    setValue("workDescription", data.documentDescription);

  };
  //==========================//
  const handleClose = () => setSuccessPopUp(false);

  //=================== delete user =================//
  const deleteUser = async () => {
    let id = deleteRowId;
    console.log("on delete id", id);
    try {
      await axios.patch(`/api/directory/update/employee/work/${deleteRowId}/`, { "isDeleted": true })
      setSuccessPopUp(false);
      setDeleteCondition(false);
      setAddDocumentPopUpText('Deleted ');
      setSuccessPopUp(true);
      getWorkData();
    } catch (error) {
      console.log("on submit delete error ", error);
    }
  };
  //==========================================================//

  return (
    <div className="container ">
      <div><DataTable
        columns={columns}
        data={WorkData}
        pagination
        fixedHeader
        fixedHeaderScrollHeight='450px'
        highlightOnHover
        subHeader
      />
      </div>
      <div><button type='button' className="btn btn-primary" onClick={() => AddWorkPop_up()}> Add </button>  </div>
      <Modal
        size='md'
        show={AddWorkPopUp}
        onHide={() => setAddWorkPopUp(false)}
        className='text-center'>
        <Modal.Header closeButton> {addDocument}  </Modal.Header>
        <div className='text-center m-3'>
          <form
            onSubmit={handleSubmit(submitForm)}
          >
            <div >
              <div className=''>
                <div className="mb-3"> <input
                  className='form-control'
                  placeholder="Enter Document Title"
                  type='text'
                  {...register("workTitle", {
                    required: "This Field Is Required..!",
                    pattern: {
                      // value: /^\d+$/,
                      // message: "Please enter only numbers",

                    },
                  })} onKeyUp={() => {
                    trigger("workTitle");
                  }}
                />
                  <p className="text-start">{errors.workTitle && (
                    <span className='text-danger '>
                      {errors.workTitle.message}
                    </span>
                  )}</p> </div>
                <div className="mb-3"> <input
                  className='form-control'
                  placeholder="Enter Document Description"
                  type='text'
                  {...register("workDescription", {
                    required: "This Field Is Required..!",
                    pattern: {
                      // value: /^\d+$/,
                      // message: "Please enter only numbers",

                    },
                  })} onKeyUp={() => {
                    trigger("workDescription");
                  }}
                />
                  <p className="text-start">{errors.workDescription && (
                    <span className='text-danger '>
                      {errors.workDescription.message}
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
                onClick={() => setAddWorkPopUp(false)}>
                Cancel
              </div>
              <button
                className='btn btn-primary' type='submit'
              //   onClick={() => setAddWorkPopUp(false)}
              disabled={disable}
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
            <h5 className='text-center'>{workPicName} </h5>
          </Modal.Header>
          <Modal.Body>
            <div className='row'>
              <div className='col-md-12'>
                <p>
                  There was some problem fetching the document, please &nbsp; &nbsp;
                  <a

                    href={`${workPicDetails.selectFile}`}
                      target='_blank'
                    rel="noreferrer"
                  >
                    Click Here
                  </a>
                  &nbsp; &nbsp;  to download it directly
                </p>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-12'>
                <div>
                  <a
                    className='btn btn-primary'
                    href={`${workPicDetails.selectFile}`}
                    download
                    target='_blank' rel="noreferrer">
                    Download
                  </a>
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
export default DocumentWork;
