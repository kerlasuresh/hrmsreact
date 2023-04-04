import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { BsCloudDownload } from "react-icons/bs";
import { TbFiles } from "react-icons/tb";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FcOk } from "react-icons/fc";
import DepartmentInnerNav from "../InnerNav/DepartmentInnerNav";
import { GrFormAttachment } from "react-icons/gr";
function Policiess() {
  document.title = "HRMS | Policiess";
  const { register, handleSubmit, reset, trigger, clearErrors, formState: { errors }, setValue, getValues } = useForm()
  const [isEdited, setisEdited] = useState(false);
  const [textDisplay, setTextDisplay] = useState("Add");
  const [PoliciesfilesErrorMessage, setPoliciesfilesErrorMessage] = useState();
  const [editId, setEditId] = useState(null);
  const [loader, setLoader] = useState(false);
  const [HaveImage, setHaveImage] = useState(false);
  const [search, setSearch] = useState([" "]);
  const [filteredAdminstation, setFilteredAdminstation] = useState([]);
  const [organization, setOrganization] = useState([]);
  const [show, setShow] = useState(false);
  const [smShow, setSmShow] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [smShowe, setSmShowe] = useState(false);
  const [deleteRowId, setDeleteRowID] = useState(null);
  const [visible, setVisible] = useState(false);
  const [employeeDetails, setEmployeeDetails] = useState({});
    const [disable, setDisable] = useState(false);
  const handleClose = () => {
    setShow(false);
    setTextDisplay("Add");
    setisEdited(false);
  };
  const handleClosepolice = () => {
    setShow(false);
  };
  const handleClose1 = () => setSmShowe(false);
  const handleShow = () => {
    setShow(true);
    setDisable(false)
    reset();
    setHaveImage(false)
  };
  const onloadvalues = async (data) => {
    setValue("title", data.policyTitle);
    setValue("description", data.policyDescription);
    if (data.filePath) {
      setHaveImage(true)
    }


    //setValue("Policiesfiles", data.filePath);
  };

  const getOrganization = async () => {
    var userinfo = JSON.parse(sessionStorage.getItem("user-info"));
    try {
      const response = await axios.get(`/api/company/policies/${userinfo.data.id}/`);
      response.data.map((item, i) => {
        item.Num = i + 1;
      });
      setOrganization(response.data);
      setFilteredAdminstation(response.data);
      setEmployeeDetails(response.data[0]);
      setLoader(true);
    } catch (error) {
      console.log("not found");
    }
  };

  const columns = [
    {
      name: <span className='fs-6 fw-bold'>S.No</span>,
      selector: (row) => row.Num,
      sortable: true,
    },
    {
      name: <span className='fs-6 fw-bold'>Title</span>,
      selector: (row) => row.policyTitle,
      sortable: true,
    },
    {
      name: <span className='fs-6 fw-bold'>Discription</span>,
      selector: (row) => row.policyDescription,
      sortable: true,
    },
    {
      name: <span className='fs-6 fw-bold'>Action</span>,
      cell: (row) => (
        <div className='text-center'>
          {employeeDetails ? (
            <a
              href={row.filePath}
              download>
              <button className='btn  btn-sm btn-warning ml-2'>
                <BsCloudDownload />
              </button>
            </a>
          ) : (
            ""
          )}
          <button
            className='btn  btn-sm btn-primary m-2'
            onClick={() => {
              setVisible(true);
            }}>
            <TbFiles />
          </button>

          <button
            className='btn btn-sm btn-primary'
            onClick={() => {
              clearErrors();
              setEditId(row.id);
              setTextDisplay("Update");
              handleShow();
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
    getOrganization();
  }, []);

  useEffect(() => {
    const result = organization.filter((employee) => {
      return employee.department_name1
        .toLowerCase()
        .match(search.toLowerCase());
    });
    setFilteredAdminstation(result);
  }, [search]);

  const importFileInstructions = () => {
    // setshowInstruction(true);
  };

  const AppendDataOnedit = async () => {
    setDisable(true)
    var userinfo = sessionStorage.getItem("user-info");
    userinfo = JSON.parse(userinfo);
    const data = getValues();
    const formData = new FormData();
    formData.append("company", userinfo.data.id);
    formData.append("policy_title", data.title);
    formData.append("policy_description", data.description);
    if (data.Policiesfiles[0]) {
      formData.append("file_path", data.Policiesfiles[0]);
    } else {
      //formData.append("file_path", data.Policiesfiles);
      setPoliciesfilesErrorMessage("")
      //formData.append("file_path", null);
       setDisable(false)
    }
  
    if (!isEdited) {
      if (data.Policiesfiles[0]) {
        try {
          var department = await axios.post("/api/company/policies/", formData);
          getOrganization();
          setSuccessAlert(true);
          setShow(false);
          setLoader(true);
          
        } catch {
          alert("error");
           setDisable(false)
        }
      }

    } else {
      try {
        var response = await axios.patch(`/api/company/update/policies/${editId}/`, formData);
        getOrganization();
        setSuccessAlert(true);
        setShow(false);
       
      } catch (err) {
        alert("error");
        setDisable(false)
      }
    }
  };
  const deleteUser = async () => {
    try {
      await axios.patch(`/api/company/update/policies/${deleteRowId}/`,{isDeleted:true});
      setSmShow(true);
      setSmShowe(false);
      getOrganization();
    } catch (error) {
      console.log("on submit delete error ", error);
    }
  };

  return (
    <>
      <div className='container-fluid'>
        <DepartmentInnerNav />
      </div>
      <div className='main container'>
        <div className='row'>
          <div className='col-md-12 text-end' style={{ marginTop: 10 }}>
            <button className='btn btn-sm btn-primary text-center' onClick={handleShow}> <AiOutlineEdit size={20} className='' /> Add </button>
          </div>
        </div>
        <div>
          {loader ? (
            <DataTable
              columns={columns}
              data={filteredAdminstation}
              pagination
              fixedHeader
              fixedHeaderScrollHeight='450px'
              fixedHeaderScrollWidth='50px'
              highlightOnHover
              subHeader
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
            <Form className='p-3' onSubmit={handleSubmit(AppendDataOnedit)}>
              <Form.Group className='mb-3'>
                <Form.Label className='fs-bold'>
                  Title
                  <span className='text-danger mandatory-field'>*</span>
                </Form.Label>
                <Form.Control className={`form-control ${errors.title && "invalid"}`}
                  type='text'
                  id='departmentId'
                  {...register("title", {
                    required: "Title Is Required",
                    pattern: {
                      value: /^[a-zA-Z ]*$/,
                      message: "Only Alphabets Are Allowed",
                    },
                    maxLength: {
                      value: 20,
                      message: "Minimum 20 Characters Are Allowed",
                    },
                  })}
                  onKeyUp={() => {
                    trigger("title");
                  }}
                />
                {errors.title && (
                  <small className='text-danger'>{errors.title.message}</small>
                )}
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label className='fs-bold'>Description</Form.Label>
                <input className={`form-control ${errors.description && "invalid"}`}
                  {...register("description", {
                    required: "Description Is Required",
                  })}
                  onKeyUp={() => {
                    trigger("description");
                  }}
                />
                {errors.description && (
                  <small className='text-danger'>
                    {errors.description.message}
                  </small>
                )}
              </Form.Group>

              <Form.Group className='mb-3'>
                {/* <Form.Label className='fs-bold'>Description</Form.Label> */}
                <input className='form-control' type='file'
                  {...register("Policiesfiles")}
                  onKeyUp={() => {
                    trigger("Policiesfiles");
                  }}
                  onChange={() => setPoliciesfilesErrorMessage("")}
                />

                <small className='text-danger'>
                  {PoliciesfilesErrorMessage}
                </small>

                {HaveImage ?
                  <div className="">
                    <GrFormAttachment size={80} />
                  </div> : ""}
              </Form.Group>
              <Button className='btn btn-primary m-2' variant='primary' type='reset' onClick={handleClosepolice}> Cancel </Button>
              <Button className='btn btn-primary m-2' variant='primary' type='submit' disabled={disable}> {textDisplay} </Button>
            </Form>
          </Modal.Body>
        </Modal>
        <Modal size='md' show={successAlert} onHide={() => setSuccessAlert(false)} className='text-center'>
          <Modal.Header closeButton></Modal.Header>
          <div className='text-center m-3'> <FcOk size='80px' /> </div>
          <h4 className='text-center'>{textDisplay} Successfully</h4>
          <div className='text-center m-3'>
            <button className='btn btn-primary' onClick={() => { setSuccessAlert(false); setTextDisplay("Add"); setisEdited(false); }}>  OK </button>
          </div>
        </Modal>

        <Modal size='md' show={smShowe} onHide={() => setSmShowe(false)} className='text-center'>
          <Modal.Header closeButton></Modal.Header>
          <div className='text-center m-3 text-danger'>  <AiOutlineDelete size='80px' /> </div>
          <h4>Are you sure you want to delete this!</h4>
          <div className='text-center m-3'>
            <button className='btn btn-secondary me-3 ' onClick={handleClose1}>Cancel</button>
            <button className='btn btn-primary' onClick={deleteUser}>Delete</button>
          </div>
        </Modal>
        <Modal size='md' show={smShow} onHide={() => setSmShow(false)} className='text-center'>
          <Modal.Header closeButton></Modal.Header>
          <div className='text-center m-3 text-danger'> <AiOutlineDelete size='80px' /> </div>
          <h4 className='text-center'>Deleted Successfully</h4>
          <div className='text-center m-3'>
            <button className='btn btn-primary' onClick={() => setSmShow(false)}> Okay </button>
          </div>
        </Modal>
        {/* /////////////////////////////////////////////////// */}
        <Modal size='lg' show={visible} onHide={() => setVisible(false)} className='text-center'>
          <Modal.Header closeButton> <h5 className='text-center'>Policies Download</h5> </Modal.Header>
          <Modal.Body>
            <div className='row'>
              <div className='col-md-12'>
                {employeeDetails ? (
                  <p>  There was some problem fetching the document, please <a href={employeeDetails.file_path} onClick={() => importFileInstructions()}> Click Here </a> to download it directly</p>
                ) : ("")}
              </div>
            </div>
            <div className='row'>
              <div className='col-md-12'>
                {employeeDetails ? (<button className='btn btn-primary'> <a href={employeeDetails.file_path} download> Download </a> </button>) : ("")}
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

export default Policiess;
