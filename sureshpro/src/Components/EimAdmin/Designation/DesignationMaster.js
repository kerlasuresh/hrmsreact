import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineSearch,
} from "react-icons/ai";
import { GrFormRefresh } from "react-icons/gr";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FcOk } from "react-icons/fc";
function DesignationMaster() {
  const {
    register,
    handleSubmit,
    reset,
    trigger,
    formState: { errors },
    setValue,
  } = useForm();

  const {
    register: register1,
    formState: { errors: errors1 },
    handleSubmit: handleSubmit1,
    getValues: getValues1,
    setValue: setValue1,
    trigger: trigger1,
    reset: reset1,
  } = useForm({ mode: "onBlur" });
  const [errorFromBackend, setErrorFromBackend] = useState("");
  const [isEdited, setisEdited] = useState(false);
  const [textDisplay, setTextDisplay] = useState("Add");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState([" "]);
  const [show, setShow] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [desdignStatus, setDesdignStatus] = useState();
  const [departmentFilters, setDepartmentFilters] = useState();
  const [designationNAme, setDesignationNAme] = useState();
  const [loader, setLoader] = useState(false);
  const [design, setDesign] = useState([]);
  const [departmentActiveList, setDepartmentActiveList] = useState([]);
  const [selectError, setSelectError] = useState(true);
  const [smShowe, setSmShowe] = useState(false);
  const [deleteRowId, setDeleteRowID] = useState(null);
  const [smShow, setSmShow] = useState(false);
  const [duplSuccessAlert, setDuplicateSuccessAlert] = useState(false);
  const [deleteAlertMessage, setDeleteAlertMessage] = useState(false);
  const [dep, setDep] = useState([]);
  const [editId, setEditId] = useState(null);
  const [disable, setDisable] = useState(false);

  const getCountries = async () => {
    var userinfo = sessionStorage.getItem("user-info");
    userinfo = JSON.parse(userinfo);

    try {
      const response = await axios.get(
        `/api/company/designation/${userinfo.data.id}/`
      );
      response.data.map((item, i) => {
        item.Num = i + 1;
      });
      setCountries(response.data);
      setLoader(true);
      setFilteredCountries(response.data);
    } catch (error) {
      setLoader(true);
    }
  };

  const columns = [
    {
      name: <span className='fs-6 fw-bold'>S.No</span>,
      selector: (row) => row.Num,
      sortable: true,
    },
    {
      name: <span className='fs-6  wrdsp '>Designation Name</span>,
      selector: (row) => row.name,
      sortable: true,
    },
    // {
    //   name: <span className='fs-6  wrdsp'>Department Name</span>,
    //   selector: (row) => row.department,
    //   sortable: true,
    // },
    {
      name: <span className='fs-6 '>Employee Count</span>,
      selector: (row) => row.noOfEmployees,
      sortable: true,
    },
    // {
    //   name: <span className='h6 fw-bold'>Status</span>,
    //   selector: row => (
    //     row.status === "Active" ? <button type="button" className="badge badge-success">{row.status}</button> : <button type="button" className="badge badge-warning">{row.status}</button>
    //   ),
    //   sortable: true,

    // }
    {
      name: <span className='fs-6 '>Action</span>,
      cell: (row) => (
        <div className='text-center'>
          <button
            className='btn btn-light m-2 bi bi-pencil-square'
            onClick={() => {
              reset();
              setEditId(row.id);
              handleShow();
              setisEdited(true);
              onloadvalues(row);
              setTextDisplay("Update");
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
    getCountries();
    getGrades();
  }, []);

  // const getDepartmentActive = async () => {
  //   try {
  //     const response = await axios.get("/department_filter_names/");
  //     setDepartmentActiveList(response.data)
  //     //setLoader(true);
  //   } catch (error) {
  //     console.log("not found");
  //   }
  // };
  const onloadvalues = async (data) => {
    setValue("designationName", data.name);
  };

  useEffect(() => {
    // const result = countries.filter((employee) => {
    //   return (
    //     // employee.designation_code.toLowerCase().match(search.toLowerCase()) ||
    //     employee.designation_name.toLowerCase().match(search.toLowerCase()) ||
    //     employee.department.toLowerCase().match(search.toLowerCase())
    //   );
    // });
    // setFilteredCountries(result);
  }, [search]);

  const handleClose = () => setShow(false);
  const handleClose1 = () => setSmShowe(false);
  const handleShow = () => {
    setDisable(false);
    setShow(true);
    reset();

    //addedit();
  };

  // const refreshwithfilters = () => {
  //   setDesignationNAme("");
  //   setDesdignStatus("");
  //   setDepartmentFilters("");
  //   getCountries();
  //   setDesign([]);
  // };
  // const searchwithfilters = async () => {
  //   var res = {
  //     af_desg_id: designationNAme ? designationNAme : "",
  //     af_desg_status: desdignStatus ? desdignStatus : "",
  //     af_desg_dept_id: departmentFilters ? departmentFilters : "",
  //   };
  //   await axios
  //     .post(`/designation_filter/`, res)
  //     .then((result) => {
  //       console.log(result.data);
  //       result.data.map((item, i) => {
  //         item.Num = i + 1
  //       })
  //       setFilteredCountries(result.data);
  //       setLoader(true);
  //     })
  //     .catch((err) => { });
  // };

  // const searchwithfilters1 = async (data) => {
  //   var res = {
  //     af_desg_dept_id: data ? data : "",
  //   };
  //   await axios
  //     .post(`/designation_filter2/`, res)
  //     .then((result) => {
  //       console.log(result.data);
  //       setDesign(result.data);
  //       setLoader(true);
  //     })
  //     .catch((err) => {});
  // };

  const onSubmit = async (data) => {
    setDisable(true);
    var userinfo = JSON.parse(sessionStorage.getItem("user-info"));
    var req = {
      company: userinfo.data.id,
      name: data.designationName,
    };
    if (!isEdited) {
      try {
        var department = await axios.post("/api/company/designation/", req);
        if (department.data) {
          getCountries();
          setShow(false);
          setSuccessAlert(true);
          setDisable(false)
        } else {
          //getOrganization();
          setDuplicateSuccessAlert(true);
          setShow(false);
        }
      } catch(error) {
        if (error.response.data.name) {
          setErrorFromBackend(error.response.data.name[0]);
        }
        setDisable(false);
      }
    } else {
      try {
        var response = await axios.patch(
          `/api/company/update/designation/${editId}/`,
          req
        );

        if (response.data) {
          getCountries();
          setShow(false);
          setSuccessAlert(true);
         setDisable(false)
        } else {
          //getOrganization();
          setDuplicateSuccessAlert(true);
          setShow(false);
        }
      } catch (error) {
        if (error.response.data.name) {
          setErrorFromBackend(error.response.data.name[0]);
        }
        setDisable(false);
      }
    }
  };

  const onClear = () => {
    reset();
  };

  const deleteUser = async () => {
    let id = deleteRowId;
    try {
      var response = await axios.patch(
        `/api/company/update/designation/${id}/`,
        { isDeleted: true }
      );
      if (response.data) {
        setSmShow(true);
        setSmShowe(false);
        getCountries();
      } else {
        setDeleteAlertMessage(true);
        setSmShowe(false);
      }
    } catch (error) {
      setSmShowe(false)
      setDeleteAlertMessage(true)
    }
  };

  /////////////////////////////////////////////////     GRADES //////////////////////////////////////////////

  const [grades, setGrades] = useState(false);
  const [gradess, setGradess] = useState([]);
  const [filteredgrades, setFilteredGrades] = useState([]);
  const [textDisplay1, setTextDisplay1] = useState("Add");
  const [editIdGrades, setEditIdGrades] = useState(null);
  const [isEditgrades, setisEditgrades] = useState(false);
  const [deleteRowId1, setDeleteRowID1] = useState(null);
  const [deletemodel1, setDeletemodel1] = useState(false);

  const [successAlertdirect1, setSuccessAlertdirect1] = useState(false);

  const handleClosedelete1 = () => {
    setDeletemodel1(false);
  };

  const handleClosegrades = () => {
    setGrades(false);
  };

  const handleCloseGrades = () => {
    setGrades(false);
    setTextDisplay1("Add");
    setisEditgrades(false);
  };
  const handleShowGrades = () => {
    setDisable(false);
    setGrades(true);
    reset1();
  };

  const getGrades = async () => {
    var userinfo = sessionStorage.getItem("user-info");
    userinfo = JSON.parse(userinfo);
    try {
      const response = await axios.get(
        `/api/company/grades/${userinfo.data.id}`
      );
      response.data.map((item, i) => {
        return (item = item.Num = i + 1);
      });
      setGradess(response.data);
      setFilteredGrades(response.data);
      //  setLoader(true);
    } catch (error) {
      console.log("not found");
    }
  };

  const columns1 = [
    {
      name: <span className='fs-6 fw-bold'>S.No</span>,
      selector: (row) => row.Num,
      sortable: true,
    },
    {
      name: <span className='fs-6 fw-bold'>Grades</span>,
      selector: (row) => row.grade,
      sortable: true,
    },
    {
      name: <span className='fs-6 fw-bold'>Employee</span>,
      selector: (row) => row.AutditorType,
      sortable: true,
    },
    {
      name: <span className='fs-6 fw-bold'>Action</span>,
      cell: (row) => (
        <div className='text-center'>
          <button
            className='btn btn-light m-2 bi bi-pencil-square'
            onClick={() => {
              //reset();
              // clearErrors();
              setEditIdGrades(row.id);
              setTextDisplay1("Update");
              handleShowGrades();
              setisEditgrades(true);
              onloadgrades(row);
            }}>
            <AiOutlineEdit />
          </button>

          <button
            className='btn btn-light  text-danger bi bi-trash3'
            onClick={() => {
              setDeleteRowID1(row.id);
              setDeletemodel1(true);
            }}>
            <AiOutlineDelete />
          </button>
        </div>
      ),
    },
  ];

  const onloadgrades = async (data) => {
    setValue1("Grade", data.grade);
  };

  const onSubmitGradres = async (data) => {
    var userinfo = sessionStorage.getItem("user-info");
    userinfo = JSON.parse(userinfo);
    const id = editIdGrades;
    var req = {
      company: userinfo.data.id,
      grade: data.Grade,
    };
    if (!isEditgrades) {
      try {
        var department = await axios.post("/api/company/grades/", req);
        getGrades();
        setSuccessAlertdirect1(true);
        setGrades(false);
        setDisable(true);
      } catch {
        alert("error");
        setDisable(false);
      }
    } else {
      try {
        var response = await axios.patch(
          `/api/company/update/grades/${editIdGrades}/`,
          req
        );
        getGrades();
        setSuccessAlertdirect1(true);
        setDisable(true);
        setGrades(false);
      } catch (err) {
        alert("error");
        setDisable(false);
      }
    }
  };

  const deleteUserAuditors = async () => {
    let id = deleteRowId1;
    console.log("on delete id", id);
    try {
      await axios.patch(`/api/company/update/grades/${id}/`, {
        isDeleted: true,
      });
      setDeletemodel1(false);
      setSmShow(true);
      getGrades();
    } catch (error) {
      console.log("on submit delete error ", error);
    }
  };

  return (
    <>
      <div className='container mt-4'>
        <div className='row'>
          <div className='card'>
            <div className='body'>
              <ul className='nav nav-tabs2'>
                <li className='nav-item'>
                  <a
                    className='nav-link show active'
                    data-toggle='tab'
                    href='#Home-new'>
                    Desiganation
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link' data-toggle='tab' href='#Profile-new'>
                    Grades
                  </a>
                </li>
              </ul>
              <div className='tab-content'>
                <div className='tab-pane show active' id='Home-new'>
                  <div className='row'>
                    <div className='col-md-6'>
                      <h6>Desiganation</h6>
                    </div>
                    <div className='col-md-6 text-end'>
                      <button
                        className='btn btn-sm btn-primary text-center'
                        onClick={handleShow}>
                        Add
                      </button>
                    </div>
                  </div>

                  <div>
                    {loader ? (
                      <DataTable
                        columns={columns}
                        data={filteredCountries}
                        pagination
                        fixedHeader
                        scrollX='true'
                        fixedHeaderScrollHeight='450px'
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
                </div>
                <div className='tab-pane ' id='Profile-new'>
                  <div className='row'>
                    <div className='col-md-6'>
                      <h6>Grades</h6>
                    </div>
                    <div className='col-md-6 text-end'>
                      <button
                        className='btn btn-sm btn-primary text-center'
                        onClick={handleShowGrades}>
                        {/* <AiOutlineEdit size={20} className='' /> */}
                        Add
                      </button>
                    </div>
                  </div>
                  <div>
                    <DataTable
                      columns={columns1}
                      data={filteredgrades}
                      // pagination
                      fixedHeader
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ////////////////////////////////////////////////      Grades           ////////////////////////////////////////////////// */}
      <Modal show={grades} onHide={handleCloseGrades}>
        <Modal.Header closeButton>
          <Modal.Title>Grades</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className='p-3' onSubmit={handleSubmit1(onSubmitGradres)}>
            <Form.Group className=''>
              <Form.Label className='fs-bold'>
                Grades
                <span className='text-danger mandatory-field'>*</span>
              </Form.Label>
              <Form.Control
                className={`form-control ${errors1.Grade && "invalid"}`}
                type='text'
                {...register1("Grade", {
                  required: "Grade Is Required",
                  pattern: {
                    value: /^[a-zA-Z0-9_ ]*$/,
                    message: "Please enter valid grade",
                  },
                  maxLength: {
                    value: 20,
                    message: "Minimum 20 Characters Are Allowed",
                  },
                })}
                onKeyUp={() => {
                  trigger1("Grade");
                }}
              />
              {errors1.Grade && (
                <small className='text-danger'>{errors1.Grade.message}</small>
              )}
            </Form.Group>
            <Form.Group className='mb-3'></Form.Group>
            <Button
              className='btn btn-primary m-2'
              variant='primary'
              type='reset'
              onClick={handleClosegrades}
              // onClick={handleClose2}
            >
              Cancel
            </Button>
            <Button
              className='btn btn-primary m-2'
              variant='primary'
              type='submit '
              disabled={disable}>
              {textDisplay}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal
        size='md'
        show={successAlertdirect1}
        onHide={() => setSuccessAlertdirect1(false)}
        className='text-center'>
        <Modal.Header closeButton></Modal.Header>
        <div className='text-center m-3'>
          <FcOk size='80px' />
        </div>
        <h4 className='text-center'>{textDisplay1} Successfully</h4>
        <div className='text-center m-3'>
          <button
            className='btn btn-primary'
            onClick={() => {
              setSuccessAlertdirect1(false);
              setTextDisplay1("Add");
              setisEditgrades(false);
            }}>
            OK
          </button>
        </div>
      </Modal>

      <Modal
        size='md'
        show={deletemodel1}
        onHide={() => setDeletemodel1(false)}
        className='text-center'>
        <Modal.Header closeButton></Modal.Header>
        <div className='text-center m-3 text-danger'>
          <AiOutlineDelete size='80px' />
        </div>
        <h4>Are you sure you want to delete this!</h4>
        <div className='text-center m-3'>
          <button
            className='btn btn-secondary me-3 '
            onClick={handleClosedelete1}>
            Cancel
          </button>
          <button className='btn btn-primary' onClick={deleteUserAuditors}>
            Delete
          </button>
        </div>
      </Modal>

      {/* //////////////////////////////////////////////////////////////     designation //////////////////////////////////// */}

      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>{textDisplay}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className='p-3' onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className=''>
              <Form.Label className='fs-bold'>
                Desiganation Name
                <span className='text-danger mandatory-field'>*</span>
              </Form.Label>
              <Form.Control
                className={`form-control ${
                  errors.designationName && "invalid"
                }`}
                type='text'
                {...register("designationName", {
                  required: "Designation Name Is Required",
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
                  trigger("designationName");
                }}
              />
              {errors.designationName && (
                <small className='text-danger'>
                  {errors.designationName.message}
                </small>
              )}
            </Form.Group>
            <Form.Group className='mb-3'></Form.Group>
            <div className=''>
              <small className="text-danger">
                {errorFromBackend}
              </small>

            </div>
            <Button
              className='btn btn-primary m-2'
              variant='primary'
              type='reset'
              onClick={onClear}
              // onClick={handleClose2}
            >
              Clear
            </Button>
            <Button
              className='btn btn-primary m-2'
              variant='primary'
              type='submit' disabled={disable} >
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
        show={duplSuccessAlert}
        onHide={() => setDuplicateSuccessAlert(false)}
        className='text-center'>
        <Modal.Header closeButton></Modal.Header>
        <div className='text-center m-3'>
          <FcOk size='80px' />
        </div>
        <h4 className='text-center'>Designation Name Already existed</h4>
        <div className='text-center m-3'>
          <button
            className='btn btn-primary'
            onClick={() => {
              setDuplicateSuccessAlert(false);
            }}>
            OK
          </button>
        </div>
      </Modal>

      <Modal
        size='md'
        show={deleteAlertMessage}
        onHide={() => setDeleteAlertMessage(false)}
        className='text-center'>
        <Modal.Header closeButton></Modal.Header>
        <div className='text-center m-3'>
          <AiOutlineDelete size='80px' />
        </div>
        <h4 className='text-center'>
          Could Not Be Deleted Because It's Related To Other Module
        </h4>
        <div className='text-center m-3'>
          <button
            className='btn btn-primary'
            onClick={() => {
              setDeleteAlertMessage(false);
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
          <button className='btn btn-secondary me-3' onClick={handleClose1}>
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
          <button className='btn btn-primary' onClick={() => setSmShow(false)}>
            Okay
          </button>
        </div>
      </Modal>
    </>
  );
}

export default DesignationMaster;
