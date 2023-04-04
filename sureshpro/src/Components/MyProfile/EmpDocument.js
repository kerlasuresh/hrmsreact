import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FcOk } from "react-icons/fc";
import { BsCloudDownload } from "react-icons/bs";
import { TbFiles } from "react-icons/tb";
import { useParams } from 'react-router-dom';
function EmpDocument() {
  const {
    register,
    handleSubmit,
    reset,
    trigger,
    clearErrors,
    formState: { errors },
    getValues,
    setValue,
  } = useForm();
  const [isEdited, setisEdited] = useState(false);
  const [textDisplay, setTextDisplay] = useState("Add");
  const [editId, setEditId] = useState(null);
  const [loader, setLoader] = useState(false);
  const [filetypeList, setfiletypeList] = useState([]);
  const [filteredAdminstation, setFilteredAdminstation] = useState([]);
  const [PhotoIDList, setPhotoIDList] = useState([]);
  const [DobList, setDobList] = useState([]);
  const [CurrentAddressList, setCurrentAddressList] = useState([]);
  const [PermanentAddress, setPermanentAddress] = useState([]);
  const [show, setShow] = useState(false);
  const [smShow, setSmShow] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [smShowe, setSmShowe] = useState(false);
  const [deleteRowId, setDeleteRowID] = useState(null);
  const [visible, setVisible] = useState(false);
  const [employeeDetails, setEmployeeDetails] = useState({});
  const [selectedIDtypeValue, setselectedIDtypeValue] = useState("0");
  const { id } = useParams();
  const handleDocument = () => {
    setShow(false);
  };

  const handleClose = () => {
    setShow(false);
    setTextDisplay("Add");
    // setisEdited(false);
  };
  const handleClose1 = () => setSmShowe(false);

  const handleShow = () => {
    setShow(true);
    reset();
  };
  const getDocumentTypes = async () => {
    try {
      const response = await axios.get(`/api/directory/document/type/`)
      setfiletypeList(response.data)
    } catch (error) {
      console.log('not found')
    }
  }
  const getDocument = async () => {
    var tempPhotoList = [];
    var tempdobList = [];
    var tempCurrnetList = [];
    var temPermenantList = [];
    try {
      const response = await axios.get(`/api/directory/employee/documents/${id}/`);
      response.data.map((item, i) => {
        if (item.currentAddress) {
          tempCurrnetList.push(item.documentType.value);
        }
        if (item.dateOfBirth) {
          tempdobList.push(item.documentType.value);
        }
        if (item.parmanentAddress) {
          temPermenantList.push(item.documentType.value);
        }
        if (item.photoId) {
          tempPhotoList.push(item.documentType.value);
        }
        return item;
      });
      setDobList(tempdobList);
      setPhotoIDList(tempPhotoList);
      setCurrentAddressList(tempCurrnetList);
      setPermanentAddress(temPermenantList);
      setFilteredAdminstation(response.data);
      setLoader(true);
    } catch (error) {
      console.log("not found");
    }
  };

  const columns = [
    {
      name: <span className='fs-6 fw-bold'>Type</span>,
      selector: (row) => row.documentType.value,
      sortable: true,
    },

    {
      name: <span className='fs-6 fw-bold'>ID</span>,
      selector: (row) => row.documentNumber,
      sortable: true,
    },
    {
      name: <span className='fs-6 fw-bold'>Uploaded By</span>,
      selector: (row) => row.employee.name,
      sortable: true,
    },
    {
      name: <span className='fs-6 fw-bold'>Verification</span>,
      selector: (row) => row.isVerified ? "Verified" : "Not Verified",
      sortable: true,
    },

    {
      name: <span className='fs-6 fw-bold'>Action</span>,
      width:"250px",
      cell: (row) => (
        <div className='text-center'>
          <button className='btn  btn-sm btn-warning ml-2'>
            <a
              href={row.selectFile}
              download>
              <BsCloudDownload />
            </a>
          </button>
          <button
            className='btn  btn-sm btn-primary m-2'
            onClick={() => {
              setEmployeeDetails(row)
              setVisible(true);
            }}>
            <TbFiles />
          </button>
          <button
            className='btn btn-light m-2 bi bi-pencil-square'
            onClick={() => {
              //reset();
              clearErrors();
              setEditId(row.id);
              setTextDisplay("Update");
              handleShow();
              setisEdited(true);
              onloadvalues(row);
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
    getDocumentTypes();
    getDocument();
  }, []);

  const onloadvalues = async (data) => {
    setValue("documentType", data.documentType.id);
    setValue("documentNumber", data.documentNumber);
    setValue("selectFile", data.selectFile);

    setValue("photoId", data.photoId);
    setValue("dateOfBirth", data.dateOfBirth);
    setValue("parmanentAddress", data.parmanentAddress);
    setValue("currentAddress", data.currentAddress);
  };

  const onSubmit = async () => {
    const data = getValues();
    const formData = new FormData();
    formData.append("employee", id);
    formData.append("documentType", data.documentType);
    formData.append("documentNumber", data.documentNumber);

    formData.append("photoId", data.photoId ? data.photoId : false);
    formData.append("dateOfBirth", data.dateOfBirth ? data.dateOfBirth : false);
    formData.append("currentAddress", data.currentAddress ? data.currentAddress : false);
    formData.append("parmanentAddress", data.parmanentAddress ? data.parmanentAddress : false);
    if (data.selectFile) {
      formData.append("selectFile", data.selectFile[0]);
    }
    const config = {
      headers: { 'content-type': 'multipart/form-data' }
    }
    if (!isEdited) {
      try {
        let response = await axios.post("/api/directory/employee/documents/", formData, config);
        if (response.data){
          getDocument();
          setSuccessAlert(true);
          setShow(false);
          setLoader(true);
        }
        
      } catch {
        alert("error");
      }
    } else {
      try {
        let response = await axios.put(`/api/directory/update/employee/documents/${editId}/`, formData, config);
        if (response.data) {
          getDocument();
          setSuccessAlert(true);
          setShow(false);
          setLoader(true);
        }
      } catch (err) {
        alert("error");
      }
    }
  };

  const deleteUser = async () => {
    try {
      await axios.patch(`/api/directory/update/employee/documents/${deleteRowId}/`, {"isDeleted":true});
      setSmShow(true);
      setSmShowe(false);
      getDocument();
    } catch (error) {
      console.log("on submit delete error ", error);
    }
  };

  return (
    <>
      <div className='main container'>
        <div className='row'>
          <div className='row'>
            <div className='col-3 pr-0'>
              <table className='table-headers proof-table w-100'>
                <thead>
                
                </thead>
                <tbody>
                  <tr>
                    <th className='voters-card'>
                      <span className='single-line'>Photo ID</span>
                    </th>
                  </tr>
                  <tr>
                    <th className='voters-card'>
                      <span className='single-line'>Date of Birth</span>
                    </th>
                  </tr>
                  <tr>
                    <th className='voters-card'>
                      <span className='single-line'>Current Address</span>
                    </th>
                  </tr>
                  <tr>
                    <th className='voters-card'>
                      <span className='single-line'>Permanent Address</span>
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='col-9 pl-0 pr-0'>
              <table className='documentsProof'>
                <tbody>
                  <tr>
                    <td width='100%'>
                      {PhotoIDList.map((item) => item + " ")}{" "}
                    </td>
                  </tr>
                  <tr>
                    <td width='100%'>{DobList.map((item) => item + " ")}</td>
                  </tr>
                  <tr>
                    <td width='100%'>
                      {CurrentAddressList.map((item) => item + " ")}
                    </td>
                  </tr>
                  <tr>
                    <td width='100%'>
                      {PermanentAddress.map((item) => item + " ")}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className='row  mt-4'>
          <div className='col-md-6'>
            <p>Uploaded Documents</p>
          </div>
          <div className='col-md-6 text-end'>
            <button
              className='btn btn-sm btn-primary text-center'
              onClick={handleShow}>
              <AiOutlineEdit size={20} className='' />
              Add
            </button>
          </div>
        </div>
        <div className=''>
          {loader ? (
            <DataTable
              columns={columns}
              data={filteredAdminstation}
              pagination
              // fixedHeader
              fixedHeaderScrollHeight='450px'
              fixedHeaderScrollWidth='50px'
              highlightOnHover
              // subHeader
              // subHeaderComponent={
              //   <input
              //     type='text'
              //     className='form-control w-25'
              //     placeholder='Search'
              //     onChange={(e) => setSearch(e.target.value)}
              //   />
              // }
            />
          ) : (
            <div className='text-center'>
              <div className='spinner-border ' role='status'>
                <span className='sr-only'>Loading...</span>
              </div>
            </div>
          )}
        </div>

        <Modal show={show} onHide={handleClose} size='lg'>
          <Modal.Header closeButton>
            <Modal.Title>{textDisplay}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form className='p-3' onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className='mb-3'>
                <Form.Label className='fs-bold'>
                  Select ID Type
                  <span className='text-danger mandatory-field'>*</span>
                </Form.Label>
                <select
                  className='form-control'
                  {...register("documentType", {
                    required: "This Field is Required",
                  })}
                  onKeyUp={() => {
                    trigger("documentType");
                  }}
                  onChange={(e) => { setselectedIDtypeValue(e.target.value)}}>
                  <option value=''>---</option>
                  {filetypeList.map((item, i) => {
                    return <option key={i} value={item.id}>{item.value}</option>;
                  })}
                </select>
                {errors.documentType && (
                  <small className='text-danger'>
                    {errors.documentType.message}
                  </small>
                )}
              </Form.Group>  

              <Form.Group className='mb-3'>
                <Form.Label className='fs-bold'>Enter Id</Form.Label>
                <input
                  className='form-control editover'
                  {...register("documentNumber", {
                    required: "This Field is Required",
                  })}
                  onKeyUp={() => {
                    trigger("documentNumber");
                  }}
                />{" "}
                {errors.documentNumber && (
                  <small className='text-danger'>
                    {errors.documentNumber.message}
                  </small>
                )}
              </Form.Group>

              <Form.Group className='mb-3'>
                {selectedIDtypeValue === "1" ||
                selectedIDtypeValue === "2" ||
                selectedIDtypeValue === "3" ||
                selectedIDtypeValue === "4" ||
                  selectedIDtypeValue === "5" || selectedIDtypeValue === "0" ? (
                  <div>
                    <input
                      type='checkbox'
                      id='photoid'
                        {...register("photoId")}
                    />
                      <label htmlFor='photoid' style={{ marginLeft: "15px" }}>
                      Photo ID
                    </label>
                  </div>
                ) : (
                  ""
                )}
                {selectedIDtypeValue === "1" ||
                selectedIDtypeValue === "2" ||
                selectedIDtypeValue === "3" ||
                selectedIDtypeValue === "4" ||
                  selectedIDtypeValue === "5" || selectedIDtypeValue === "0" ? (
                  <div>
                      <input type='checkbox' id='dob' {...register("dateOfBirth")} />
                      <label htmlFor='dob' style={{ marginLeft: "15px" }}>
                      Date Of Birth
                    </label>
                  </div>
                ) : (
                  ""
                )}
                {(selectedIDtypeValue !== "1" &&
                  selectedIDtypeValue === "9") ||
                selectedIDtypeValue === "6" ||
                selectedIDtypeValue === "7" ||
                selectedIDtypeValue === "8" ||
                selectedIDtypeValue === "2" ||
                selectedIDtypeValue === "3" ||
                selectedIDtypeValue === "4" ||
                  selectedIDtypeValue === "5" || selectedIDtypeValue === "0" ? (
                  <div>
                    <input
                      type='checkbox'
                      id='caddress'
                        {...register("currentAddress")}
                    />
                      <label htmlFor='caddress' style={{ marginLeft: "15px" }}>
                      Current Address
                    </label>
                  </div>
                ) : (
                  ""
                )}
                {(selectedIDtypeValue !== "1" &&
                  selectedIDtypeValue !== "9") ||
                selectedIDtypeValue === "2" ||
                selectedIDtypeValue === "5" ||
                  selectedIDtypeValue === "4" || selectedIDtypeValue === "0" ? (
                  <div>
                    <input
                      type='checkbox'
                      id='paddress'
                        {...register("parmanentAddress")}
                    />
                      <label htmlFor='paddress' style={{ marginLeft: "15px" }}>
                      Permanent Address
                    </label>
                  </div>
                ) : (
                  ""
                )}
              </Form.Group>

              <Form.Group className='mb-3'>
                <input
                  accept='.jpg,.jpeg,.png,.docx,.xlsx,.gif,.pdf'
                  className='form-control'
                  type='file'
                  {...register("selectFile", {
                    required: "This Field is Required",
                  })}
                  onKeyUp={() => {
                    trigger("selectFile");
                  }}
                />
                {errors.selectFile && (
                  <small className='text-danger'>
                    {errors.selectFile.message}
                  </small>
                )}
              </Form.Group>
              <Button
                className='btn btn-primary m-2'
                variant='primary'
                type='reset'
                onClick={handleDocument}>
                Cancel
              </Button>
              <Button
                className='btn btn-primary m-2'
                variant='primary'
                type='submit'>
                {textDisplay}
              </Button>
            </Form>
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
          <p>Are you sure you want to delete this!</p>
          <div className='text-center m-3'>
            {/* <input id="deluser" className="form-control"></input> */}
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
        </Modal>
        <Modal
          size='lg'
          show={visible}
          onHide={() => setVisible(false)}
          className='text-center'>
          <Modal.Header closeButton>
            <h5 className='text-center'>file</h5>
          </Modal.Header>
          <Modal.Body>
            <div className='row'>
              <div className='col-md-12'>
                {/* <p>
                  Employee_doc_114113_603242_80faa152-4204-4991-A43d-5b1d1812ec07.Docx
                </p> */}
              </div>
            </div>
            <div className='row'>
              <div className='col-md-12 '>
                {employeeDetails ? (
                  <button className='btn btn-primary '>
                    <a
                      className='text-white'
                      href={employeeDetails.selectFile}
                      download>
                      Download
                    </a>
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

export default EmpDocument;
