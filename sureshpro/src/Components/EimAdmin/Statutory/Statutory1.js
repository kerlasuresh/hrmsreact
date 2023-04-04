import React, { useState, useEffect } from "react";
import moment from "moment/moment";
import DataTable from "react-data-table-component";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import axios from "axios";
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { FcOk } from "react-icons/fc";
import Form from "react-bootstrap/Form";
import { Alert } from "bootstrap";
function Statutory11() {
  const [compyid, setCompyid] = useState(false);
  const [companyidsta, setCompanyidsta] = useState({ entityType: {} });
  const [editId, setEditId] = useState(null);
  const [isEdited, setisEdited] = useState(false);
  const [isEditeddirect, setisEditeddirect] = useState(false);
  const [disable, setDisable] = useState(false);

  const [successAlert, setSuccessAlert] = useState(false);
  const [successAlertdirect, setSuccessAlertdirect] = useState(false);

  const [direct, setDirect] = useState(false);
  const [direction, setDirection] = useState([]);
  const [filteredAdminstation, setFilteredAdminstation] = useState([]);
  const [textDisplay, setTextDisplay] = useState("Add");
  const [deleteRowId, setDeleteRowID] = useState(null);
  const [editIddirect, setEditIddirect] = useState(null);
  const [deletemodel, setDeletemodel] = useState(false);
  const [smShow, setSmShow] = useState(false);

  const [auditor, setAuditor] = useState(false);
  const [isEditauditors, setisEditauditors] = useState(false);
  const [isEditcompany, setisEditcompany] = useState(false);
  const [directionion, setDirectionion] = useState([]);
  const [companytabs, setCompanytabs] = useState([]);
  const [entityTypeList, setEntityTypeList] = useState([]);
  const [auditorscompany, setAuditorscompany] = useState([""]);

  const [filteredAdminstation1, setFilteredAdminstation1] = useState([]);
  const [filteredAdminstation2, setFilteredAdminstation2] = useState([]);
  const [editIddirection, setEditIddirection] = useState(null);
  const [textDisplay1, setTextDisplay1] = useState("Add");
  const [textDisplay2, setTextDisplay2] = useState("Add");
  const [successAlertdirect1, setSuccessAlertdirect1] = useState(false);
  const [successAlertdirect2, setSuccessAlertdirect2] = useState(false);
  const [deletemodel1, setDeletemodel1] = useState(false);
  const [deletemodel2, setDeletemodel2] = useState(false);
  const [deleteRowId1, setDeleteRowID1] = useState(null);
  const [deleteRowId2, setDeleteRowID2] = useState(null);
  const [companyi, setCompanyi] = useState(false);
  const [editIddirectionion, setEditIddirectionion] = useState(null);

  const [smShow1, setSmShow1] = useState(false);
  const [smShow2, setSmShow2] = useState(false);

  const handleStatutory = () => {
    setDirect(false);
    setCompyid(false);
    setCompanyi(false);
    setAuditor(false);
  };

  const handleDirect = () => {
    setTextDisplay("Add");
    setDirect(false);
    setisEditeddirect(false);
  };
  const handleDirectShow = () => {
    setDirect(true);
    //  reset();
  };
  const handleDirectShow2 = () => {
    setDirect(true);
    reset();
  };

  const handleClosedelete = () => {
    setDeletemodel(false);
  };
  const handleClose = () => {
    setCompyid(false);
  };
  const handleShow = () => {
    setCompyid(true);
    reset2();
  };

  {
    /* <AUDITORS></AUDITORS> */
  }

  const handleClosedelete1 = () => {
    setDeletemodel1(false);
  };

  const handleClosedelete2 = () => {
    setDeletemodel2(false);
  };

  const handleAuditors = () => {
    setTextDisplay1("Add");
    setAuditor(false);
    setisEditauditors(false);
  };
  const handleAuditorsShow = () => {
    setAuditor(true);
    // reset();
  };
  const handleAuditorsShow2 = () => {
    setAuditor(true);
    reset();
    setValue3("AName", "");
    setValue3("APhone_Number", "");
    setValue3("type", "");
    setValue3("APersonal_Email", "");
  };

  ////////////////COMPANY ///////////

  const handleCompany = () => {
    setTextDisplay2("Add");
    setCompanyi(false);
    setisEditcompany(false);
  };

  const handleComapnyShow = () => {
    setCompanyi(true);
    // reset();
  };
  const handleComapanyShow3 = () => {
    setCompanyi(true);
    reset();
    setValue4("CName", "");
    setValue4("CPhone_Number", "");
    setValue4("CPersonal_Email", "");
  };

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

  const {
    register: register2,
    formState: { errors: errors2 },
    handleSubmit: handleSubmit2,
    getValues: getValues2,
    setValue: setValue2,
    trigger: trigger2,
    reset: reset2,
  } = useForm({ mode: "onBlur" });

  const {
    register: register3,
    formState: { errors: errors3 },
    handleSubmit: handleSubmit3,
    trigger: trigger3,
    getValues: getValues3,
    setValue: setValue3,
  } = useForm({ mode: "onBlur" });

  const {
    register: register4,
    formState: { errors: errors4 },
    handleSubmit: handleSubmit4,
    getValues: getValues4,
    trigger: trigger4,
    setValue: setValue4,
  } = useForm({ mode: "onBlur" });

  /////////////////////////////////// /* <company id api ></company> */////////////////////////////////

  const getDetials = async () => {
    var userinfo = JSON.parse(sessionStorage.getItem("user-info"));
    var req = { company_id: userinfo.company_id };
    var message = await axios
      .get(`/api/company/statutory/${userinfo.data.id}`)
      .then((result) => {
        if (result.data[0].entityType) {
          setCompanyidsta(result.data[0]);
        } else {
          var newdata = result.data[0];
          newdata.entityType = { "entityType": "" }
          console.log(newdata)
          setCompanyidsta(newdata);
        }

      });
  };
  const getEntityType = async () => {
    var message = await axios.get("/api/company/entity/type/").then((result) => {
      setEntityTypeList(result.data);
    });
  };
  const getEntityTypeByID = async (id) => {
    var message = await axios
      .get(`/api/company/update/statutory/${id}`)
      .then((result) => {
        setValue2("entitytype", result.data.EntityType);
        setValue2("companytan", result.data.TAN);
        setValue2("Incorporation", result.data.DateOfIncorp);
        setValue2("companypan", result.data.PAN);
        setValue2("companycin", result.data.CIN);
        setValue2("companygst", result.data.GST);
      });
  };
  useEffect(() => {
    getEntityType();
    getDetials();
    getStatutory();
    getAuditors();
    getCompany();
    getAuditorscompany();
  }, []);

  const onClear = () => {
    reset();
  };

  const onloadvaluesCompany = async (data) => {
    //getEntityTypeByID(data.id);
    // setValue2("companycinfiles", data.CINImagePath);
    // setValue2("companypanfiles", data.PANImagePath);
    // setValue2("companygstfiles", data.GSTImagePath);
    setValue2("entitytype", data.entityType.id);
    setValue2("companytan", data.tanNumber);
    setValue2("Incorporation", data.dateOfIncorp);
    setValue2("companypan", data.panNumber);
    setValue2("companycin", data.cinNumber);
    setValue2("companygst", data.gstNumber);
  };

  const onSubmited = async () => {
    var userinfo = JSON.parse(sessionStorage.getItem("user-info"));
    const data = getValues2();
    const formData = new FormData();

    let formatedDate = moment(data.Incorporation).format("DD-MM-YYYY");
    formData.append("company", userinfo.data.id);
    formData.append("entityType", data.entitytype);
    formData.append("tanNumber", data.companytan);
    formData.append("dateOfIncorp", formatedDate);
    formData.append("panNumber", data.companypan);
    formData.append("cinNumber", data.companycin);
    formData.append("gstNumber", data.companygst);
    if (data.CINImagePath == "") {
      formData.append("cinImagePath", data.companycinfiles[0]);
    }

    if (data.PANImagePath == "" || data.companypanfiles[0]) {
      formData.append("panImagePath", data.companypanfiles[0]);
    }

    if (data.GSTImagePath == "" || data.companygstfiles[0]) {
      formData.append("gstImagePath", data.companygstfiles[0]);
    }
    await axios
      .put(`/api/company/update/statutory/${editId}/`, formData)
      .then((result) => {
        getDetials();
        setCompyid();
        setSuccessAlert(true);
        reset();
      })
      .catch((err) => {
        console.log("error resp", err);
      });
  };

  ////////////////////////////////////////////// TABS API DIRECT INTIGTARION ////////////////////////////////////////

  const getStatutory = async () => {
    var userinfo = sessionStorage.getItem("user-info");
    userinfo = JSON.parse(userinfo);
    try {
      const response = await axios.get(
        `/api/company/director/${userinfo.data.id}`
      );
      response.data.map((item, i) => {
        item.Num = i + 1;
      });
      setDirection(response.data);
      setFilteredAdminstation(response.data);
      //  setLoader(true);
    } catch (error) {
      console.log("not found");
    }
  };

  const columns = [
    {
      name: <span className='fs-6 fw-bold'>Name</span>,
      selector: (row) => row.directorName,
      sortable: true,
    },
    {
      name: <span className='fs-6 fw-bold'>Email ID</span>,
      selector: (row) => row.directorMailId,
      sortable: true,
      //  width: "100px",
    },
    {
      name: <span className='fs-6 fw-bold'>DIN</span>,
      selector: (row) => row.dinNumber,
      sortable: true,
    },
    {
      name: <span className='fs-6 fw-bold'>Phone Number</span>,
      selector: (row) => row.directorPhone,
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
              clearErrors();
              setEditIddirect(row.id);
              setTextDisplay("Update");
              handleDirectShow();
              setisEditeddirect(true);
              onloaddirect(row);
              setDisable(false)
            }}>
            <AiOutlineEdit />
          </button>

          <button
            className='btn btn-light  text-danger bi bi-trash3'
            onClick={() => {
              setDeleteRowID(row.id);
              setDeletemodel(true);
            }}>
            <AiOutlineDelete />
          </button>
        </div>
      ),
    },
  ];

  const onloaddirect = async (data) => {
    setValue("Name", data.directorName);
    setValue("PersonalEmail", data.directorMailId);
    setValue("DINNumber", data.dinNumber);
    setValue("PhoneNumber", data.directorPhone);
  };

  const directaddedit = async (data) => {
     setDisable(true)
    const id = editIddirect;

    var userinfo = sessionStorage.getItem("user-info");
    userinfo = JSON.parse(userinfo);
    var req = {
      company: userinfo.data.id,
      director_name: data.Name,
      director_mail_id: data.PersonalEmail,
      din_number: data.DINNumber,
      director_phone: data.PhoneNumber,

      // status: data.status ? data.status : "Active",
    };
    if (!isEditeddirect) {
      try {
        var department = await axios.post("/api/company/director/", req);
        getStatutory();
        setSuccessAlertdirect(true);
        setDirect(false);
        // setShow(false);
        // setLoader(true);
        setDisable(false)
      } catch {
        alert("error");
        setDisable(false)
      }
    } else {
      try {
        var response = await axios.put(
          `/api/company/update/director/${editIddirect}/`,
          req
        );
        getStatutory();
        setSuccessAlertdirect(true);
        setDirect(false);
        setDisable(false)
        // setShow(false);
        // setLoader(true);
      } catch (err) {
        alert("error");
         setDisable(false)
      }
    }
  };

  const deleteUser = async () => {
    let id = deleteRowId;
    console.log("on delete id", id);
    try {
      await axios.patch(
        `/api/company/update/director/${id}/`, { isDeleted: true });
      setDeletemodel(false);
      setSmShow(true);
      getStatutory();
    } catch (error) {
      console.log("on submit delete error ", error);
    }
  };

  ///////////////////////////////////////////////////// AUDITORS API TABS //////////////////////////////////////////////////////////////////

  const getAuditors = async () => {
    var userinfo = sessionStorage.getItem("user-info");
    userinfo = JSON.parse(userinfo);
    // const id = userinfo.company_id;
    try {
      const response = await axios.get(
        `/api/company/auditor/${userinfo.data.id}`
      );
      response.data.map((item, i) => {
        item.Num = i + 1;
      });
      setDirectionion(response.data);
      setFilteredAdminstation1(response.data);
      //  setLoader(true);
    } catch (error) {
      console.log("not found");
    }
  };

  const getAuditorscompany = async () => {
    var message = await axios
      .get("/api/company/auditor/type/")
      .then((result) => {
        setAuditorscompany(result.data);
      });
  };

  // const getAuditorscompany = async () => {
  //   try {
  //     const response = await axios.post("/auditortype_get/");

  //   } catch (error) {
  //     console.log("not found");
  //   }
  // };

  const columns1 = [
    {
      name: <span className='fs-6 fw-bold'>Name</span>,
      selector: (row) => row.auditorName,
      sortable: true,
    },
    {
      name: <span className='fs-6 fw-bold'>Email ID</span>,
      selector: (row) => row.auditorEmail,
      sortable: true,
    },
    {
      name: <span className='fs-6 fw-bold'>Type</span>,
      selector: (row) => row.auditorType.value,
      sortable: true,
    },
    {
      name: <span className='fs-6 fw-bold'>Phone Number</span>,
      selector: (row) => row.auditorPhone,
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
              clearErrors();
              setEditIddirection(row.id);
              setTextDisplay1("Update");
              handleAuditorsShow();
              setisEditauditors(true);
              onloadauditors(row);
              setDisable(false)
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

  const onloadauditors = async (data) => {
    setValue3("AName", data.auditorName);
    setValue3("APersonal_Email", data.auditorEmail);
    setValue3("type", data.auditorType ? data.auditorType.id : "");
    setValue3("APhone_Number", data.auditorPhone);
  };

  const auditorsaddedit = async (data) => {
    setDisable(true)
    var userinfo = sessionStorage.getItem("user-info");
    userinfo = JSON.parse(userinfo);
    const id = editIddirection;
    var req = {
      company: userinfo.data.id,
      auditor_name: data.AName,
      auditor_email: data.APersonal_Email,
      auditor_type: data.type,
      auditor_phone: data.APhone_Number,

      // status: data.status ? data.status : "Active",
    };
    if (!isEditauditors) {
      try {
        var department = await axios.post("/api/company/auditor/", req);
        getAuditors();
        getAuditorscompany();
        setSuccessAlertdirect1(true);
        setAuditor(false);
        // setShow(false);
        // setLoader(true);
        setDisable(false)
      } catch {
        alert("error");
        setDisable(false)
      }
    } else {
      try {
        var response = await axios.put(
          `/api/company/update/auditor/${editIddirection}/`,
          req
        );
        getAuditors();
        getAuditorscompany();
        setSuccessAlertdirect1(true);
        setAuditor(false);
        // setShow(false);
        // setLoader(true);
        setDisable(false)
      } catch (err) {
        alert("error");
        setDisable(false)
      }
    }
  };

  const deleteUserAuditors = async () => {
    let id = deleteRowId1;
    console.log("on delete id", id);
    try {
      await axios.patch(
        `/api/company/update/auditor/${id}/`, { isDeleted: true });
      setDeletemodel1(false);
      setSmShow(true);
      getAuditors();
    } catch (error) {
      console.log("on submit delete error ", error);
    }
  };

  //////////////////////////////////////////////COMPANY SECRURITY/////////////////////////////////////////////////////////////////////////

  const getCompany = async () => {
    var userinfo = sessionStorage.getItem("user-info");
    userinfo = JSON.parse(userinfo);

    // const id = userinfo.company_id;

    try {
      const response = await axios.get(
        `/api/company/secretary/${userinfo.data.id}`
      );
      response.data.map((item, i) => {
        item.Num = i + 1;
      });
      setCompanytabs(response.data);
      setFilteredAdminstation2(response.data);
      //  setLoader(true);
    } catch (error) {
      console.log("not found");
    }
  };

  const onloadcompany = async (data) => {
    console.log(data);
    setValue4("CName", data.secretaryName);
    setValue4("CPersonal_Email", data.secretaryEmail);
    setValue4("CPhone_Number", data.secretaryPhone);
  };

  const columns2 = [
    {
      name: <span className='fs-6 fw-bold'>Name</span>,
      selector: (row) => row.secretaryName,
      sortable: true,
    },
    {
      name: <span className='fs-6 fw-bold'>Email ID</span>,
      selector: (row) => row.secretaryEmail,
      sortable: true,
    },
    {
      name: <span className='fs-6 fw-bold'>Phone Number</span>,
      selector: (row) => row.secretaryPhone,
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
              clearErrors();
              setEditIddirectionion(row.id);
              setTextDisplay2("Update");
              handleComapnyShow();
              setisEditcompany(true);
              onloadcompany(row);
              setDisable(false)
            }}>
            <AiOutlineEdit />
          </button>

          <button
            className='btn btn-light  text-danger bi bi-trash3'
            onClick={() => {
              setDeleteRowID2(row.id);
              setDeletemodel2(true);
            }}>
            <AiOutlineDelete />
          </button>
        </div>
      ),
    },
  ];

  const companyaddedit = async (data) => {
    setDisable(true)
    const id = editIddirectionion;

    var userinfo = sessionStorage.getItem("user-info");
    userinfo = JSON.parse(userinfo);
    var req = {
      company: userinfo.data.id,
      secretary_name: data.CName,
      secretary_email: data.CPersonal_Email,

      secretary_phone: data.CPhone_Number,

      // status: data.status ? data.status : "Active",
    };
    if (!isEditcompany) {
      try {
        var department = await axios.post("/api/company/secretary/", req);
        getCompany();
        setSuccessAlertdirect2(true);
        setCompanyi(false);
        // setShow(false);
        // setLoader(true);
        setDisable(false)
      } catch {
        alert("error");
        setDisable(false)
      }
    } else {
      try {
        var response = await axios.put(
          `/api/company/update/secretary/${editIddirectionion}/`,
          req
        );
        getCompany();
        setSuccessAlertdirect2(true);
        setCompanyi(false);
        // setShow(false);
        // setLoader(true);
        setDisable(false)
      } catch (err) {
        alert("error");
         setDisable(false)
      }
    }
  };

  const deleteUserCompany = async () => {
    let id = deleteRowId2;
    console.log("on delete id", id);
    try {
      await axios.patch(`/api/company/update/secretary/${id}/`, { isDeleted: true });
      setDeletemodel2(false);
      setSmShow2(true);
      getCompany();
    } catch (error) {
      console.log("on submit delete error ", error);
    }
  };

  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='card p-3'>
            <div className='body'>
              <div className='row borbottm'>
                <div className='col-md-6'>
                  <h6>COMPANY ID</h6>
                </div>
                <div className='col-md-6 text-end fns-w'>
                  <h6>
                    <AiOutlineEdit
                      onClick={() => {
                        handleShow();
                        setisEdited(true);
                        setEditId(companyidsta.id);
                        onloadvaluesCompany(companyidsta);
                        // clearErrors();
                      }}
                    />
                  </h6>
                </div>
              </div>
              <div className='row mt-2'>
                <div className='col-md-4 '>
                  <label className='fns-w'>Entity Type</label>
                  <p>{companyidsta.entityType.value}</p>
                </div>
                <div className='col-md-4'>
                  <label className='fns-w'>CIN</label>
                  <p>{companyidsta.cinNumber}</p>
                </div>
                <div className='col-md-4'>
                  <label className='fns-w'>Date of Incorporation</label>
                  <p>{companyidsta.dateOfIncorp}</p>
                </div>
              </div>
              <div className='row'>
                <div className='col-md-4 '>
                  <label className='fns-w'>Company PAN</label>
                  <p>{companyidsta.panNumber}</p>
                </div>
                <div className='col-md-4'>
                  <label className='fns-w'>Company TAN</label>
                  <p>{companyidsta.tanNumber}</p>
                </div>
                <div className='col-md-4'>
                  <label className='fns-w'>GST</label>
                  <p>{companyidsta.gstNumber}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <?>   TABS    */}

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
                    Direct
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link' data-toggle='tab' href='#Profile-new'>
                    Auditors
                  </a>
                </li>
                <li className='nav-item'>
                  <a
                    className='nav-link '
                    data-toggle='tab'
                    href='#Contact-new'>
                    Company secretary
                  </a>
                </li>
              </ul>
              <div className='tab-content'>
                <div className='tab-pane show active' id='Home-new'>
                  <div className='row'>
                    <div className='col-md-6'>
                      <h6>DIRECTORS</h6>
                    </div>
                    <div className='col-md-6 text-end'>
                      <button
                        className='btn btn-sm btn-primary text-center'
                        onClick={handleDirectShow2}>
                        Add
                      </button>
                    </div>
                  </div>

                  <DataTable
                    columns={columns}
                    data={filteredAdminstation}
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
                <div className='tab-pane ' id='Profile-new'>
                  <div className='row'>
                    <div className='col-md-6'>
                      <h6>AUDITORS</h6>
                    </div>
                    <div className='col-md-6 text-end'>
                      <button
                        className='btn btn-sm btn-primary text-center'
                        onClick={handleAuditorsShow2}>
                        {/* <AiOutlineEdit size={20} className='' /> */}
                        Add
                      </button>
                    </div>
                  </div>
                  <div>
                    <DataTable
                      columns={columns1}
                      data={filteredAdminstation1}
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
                <div className='tab-pane  ' id='Contact-new'>
                  <div className='row'>
                    <div className='col-md-6'>
                      <h6>COMPANY SECRETARY</h6>
                    </div>
                    <div className='col-md-6 text-end'>
                      <button
                        className='btn btn-sm btn-primary text-center'
                        onClick={handleComapanyShow3}>
                        {/* <AiOutlineEdit size={20} className='' /> */}
                        Add
                      </button>
                    </div>
                  </div>
                  <div>
                    <DataTable
                      columns={columns2}
                      data={filteredAdminstation2}
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

      {/* /////////////////////////////////////// COMPANY SECRITY Tab modal popup //////////////////////////////// */}

      <Modal show={companyi} onHide={handleCompany} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>{textDisplay2}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className=' ' onSubmit={handleSubmit4(companyaddedit)}>
            <div className='row'>
              <div className='col-md-12'>
                <label className='fs-bold form-label'>Name</label>
                <input
                  className='form-control'
                  maxLength={20}
                  {...register4("CName", {
                    required: "This field is required",
                    pattern: {
                      value: /^[a-zA-Z_ ]*$/,
                      message: "Please enter alphabets only", // JS only: <p>error message</p> TS only support string
                    },
                  })}
                  onKeyUp={() => {
                    trigger4("CName");
                  }}
                />
                {errors4.CName && (
                  <span className='text-danger fnsd'>
                    {errors4.CName.message}
                  </span>
                )}
              </div>
              <div className='col-md-12'>
                <label className='fs-bold form-label'>Email ID</label>
                <input
                  className='form-control'
                  {...register4("CPersonal_Email", {
                    required: "This field is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]{2,}\.+[A-Z]{2,}$/i,
                      message: "Please enter valid  email", // JS only: <p>error message</p> TS only support string
                    },
                  })}
                  onKeyUp={() => {
                    trigger4("CPersonal_Email");
                  }}
                />
                {errors4.CPersonal_Email && (
                  <span className='text-danger fnsd'>
                    {errors4.CPersonal_Email.message}
                  </span>
                )}
              </div>

              <div className='col-md-12'>
                <label className='fs-bold form-label'>Phone Number</label>
                <input
                  className='form-control'
                  type='text'
                  // maxLength={15}
                  {...register4("CPhone_Number", {
                    required: "This field is required",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Please enter min 10 digit Phone Number", // JS only: <p>error message</p> TS only support string
                    },
                    minLength: {
                      value: 10,
                      message:
                        "Please enter Minimum 10 numbers", // JS only: <p>error message</p> TS only support string
                    },
                    maxLength: {
                      value: 15,
                      message:
                        "It allow max 15 numbers", // JS only: <p>error message</p> TS only support string
                    },
                  })}
                  onKeyUp={() => {
                    trigger4("CPhone_Number");
                  }}
                />
                {errors4.CPhone_Number && (
                  <span className='text-danger fnsd'>
                    {errors4.CPhone_Number.message}
                  </span>
                )}
              </div>
            </div>
            <Modal.Footer>
              <Button
                variant='secondary'
                type='reset'
                // onClick={handleStatutory}
                onClick={handleStatutory}>
                Cancel
              </Button>
              <Button
                variant='primary'
                type='submit'
              // onClick={() => onSubmitsocial()}
              disabled={disable}
              >
                {textDisplay2}
              </Button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>

      <Modal
        size='md'
        show={successAlertdirect2}
        onHide={() => setSuccessAlertdirect2(false)}
        className='text-center'>
        <Modal.Header closeButton></Modal.Header>
        <div className='text-center m-3'>
          <FcOk size='80px' />
        </div>
        <h4 className='text-center'>{textDisplay2} Successfully</h4>
        <div className='text-center m-3'>
          <button
            className='btn btn-primary'
            onClick={() => {
              setSuccessAlertdirect2(false);
              setTextDisplay2("Add");
              setisEditcompany(false);
            }}>
            OK
          </button>
        </div>
      </Modal>

      <Modal
        size='md'
        show={deletemodel2}
        onHide={() => setDeletemodel2(false)}
        className='text-center'>
        <Modal.Header closeButton></Modal.Header>
        <div className='text-center m-3 text-danger'>
          <AiOutlineDelete size='80px' />
        </div>
        <h4>Are you sure you want to delete this!</h4>
        <div className='text-center m-3'>
          {/* <input id="deluser" className="form-control"></input> */}
          <button
            className='btn btn-secondary me-3 '
            onClick={handleClosedelete2}>
            Cancel
          </button>
          <button className='btn btn-primary' onClick={deleteUserCompany}>
            Delete
          </button>
        </div>
      </Modal>

      <Modal
        size='md'
        show={smShow2}
        onHide={() => setSmShow2(false)}
        className='text-center'>
        <Modal.Header closeButton></Modal.Header>
        <div className='text-center m-3 text-danger'>
          <AiOutlineDelete size='80px' />
        </div>
        <h4 className='text-center'>Deleted Successfully</h4>
        <div className='text-center m-3'>
          <button className='btn btn-primary' onClick={() => setSmShow2(false)}>
            Okay
          </button>
        </div>
      </Modal>

      {/* /////////////////////////////////////// AUDITORS Tab modal popup //////////////////////////////// */}
      <Modal show={auditor} onHide={handleAuditors} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>{textDisplay1}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className=' ' onSubmit={handleSubmit3(auditorsaddedit)}>
            <div className='row'>
              <div className='col-md-12'>
                <label className='fs-bold form-label'>Name</label>
                <input
                  className='form-control'
                  maxLength={20}
                  {...register3("AName", {
                    required: "This field is required",
                    pattern: {
                      value: /^[a-zA-Z_ ]*$/,
                      message: "Please enter alphabets only", // JS only: <p>error message</p> TS only support string
                    },
                  })}
                  onKeyUp={() => {
                    trigger3("AName");
                  }}
                />
                {errors3.AName && (
                  <span className='text-danger fnsd'>
                    {errors3.AName.message}
                  </span>
                )}
              </div>
              <div className='col-md-12'>
                <label className='fs-bold form-label'>Email ID</label>
                <input
                  className='form-control'
                  {...register3("APersonal_Email", {
                    required: "This field is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]{2,}\.+[A-Z]{2,}$/i,
                      message: "Please enter valid  email", // JS only: <p>error message</p> TS only support string
                    },
                  })}
                  onKeyUp={() => {
                    trigger3("APersonal_Email");
                  }}
                />
                {errors3.APersonal_Email && (
                  <span className='text-danger fnsd'>
                    {errors3.APersonal_Email.message}
                  </span>
                )}
              </div>
              <div className='col-md-12'>
                <label className='fs-bold form-label'>Type</label>

                <select
                  className=' form-control editover'
                  {...register3("type", {
                    required: "This field is required",
                  })}
                  onKeyUp={() => {
                    trigger3("type");
                  }}>
                  <option value="">Select Type</option>
                  {auditorscompany.map((entityType, i) => {
                    return (
                      <option value={entityType.id} key={i}>
                        {entityType.value}
                      </option>
                    );
                  })}
                </select>
                {errors3.type && (
                  <span className='text-danger fnsd'>
                    {errors3.type.message}
                  </span>
                )}
              </div>
              <div className='col-md-12'>
                <label className='fs-bold form-label'>Phone Number</label>
                <input
                  className='form-control'
                  type='text'
                  // maxLength={15}
                  {...register3("APhone_Number", {
                    required: "This field is required",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Please enter 10 digit Phone Number", // JS only: <p>error message</p> TS only support string
                    },
                    minLength: {
                      value: 10,
                      message:
                        "Please enter Minimum 10 and Maximum 15 Phone Number", // JS only: <p>error message</p> TS only support string
                    },
                    maxLength: {
                      value: 15,
                      message:
                        "Please enter Minimum 10 and Maximum 15 Phone Number", // JS only: <p>error message</p> TS only support string
                    },
                  })}
                  onKeyUp={() => {
                    trigger3("APhone_Number");
                  }}
                />
                {errors3.APhone_Number && (
                  <span className='text-danger fnsd'>
                    {errors3.APhone_Number.message}
                  </span>
                )}
              </div>
            </div>
            <Modal.Footer>
              <Button
                variant='secondary'
                type='reset'
                onClick={handleStatutory}>
                Cancel
              </Button>
              <Button
                variant='primary'
                type='submit'
                disabled={disable}
              // onClick={() => onSubmitsocial()}
              >
                {textDisplay1}
              </Button>
            </Modal.Footer>
          </form>
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
              setisEditauditors(false);
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
          <button className='btn btn-primary' onClick={() => setSmShow1(false)}>
            Okay
          </button>
        </div>
      </Modal>

      {/* /////////////////////////////////////// Direct Tab modal popup //////////////////////////////// */}

      <Modal show={direct} onHide={handleDirect} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>{textDisplay}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className=' ' onSubmit={handleSubmit(directaddedit)}>
            <div className='row'>
              <div className='col-md-12'>
                <label className='fs-bold form-label'>Name</label>
                <input
                  className='form-control'
                  maxLength={20}
                  {...register("Name", {
                    required: "This field is required",
                    pattern: {
                      value: /^[a-zA-Z_ ]*$/,
                      message: "Please enter alphabets only", // JS only: <p>error message</p> TS only support string
                    },
                  })}
                  onKeyUp={() => {
                    trigger("Name");
                  }}
                />
                {errors.Name && (
                  <span className='text-danger fnsd'>
                    {errors.Name.message}
                  </span>
                )}
              </div>
              <div className='col-md-12'>
                <label className='fs-bold form-label'>Email ID</label>
                <input
                  className='form-control'
                  {...register("PersonalEmail", {
                    required: "This field is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]{2,}\.+[A-Z]{2,}$/i,
                      message: "Please enter valid  email", // JS only: <p>error message</p> TS only support string
                    },
                  })}
                  onKeyUp={() => {
                    trigger("PersonalEmail");
                  }}
                />
                {errors.PersonalEmail && (
                  <span className='text-danger fnsd'>
                    {errors.PersonalEmail.message}
                  </span>
                )}
              </div>
              <div className='col-md-12'>
                <label className='fs-bold form-label'>DIN</label>
                <input
                  className='form-control'
                  type='text'
                  // maxLength={8}
                  {...register("DINNumber", {
                    required: "This field is required",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Please enter 8 digit DIN Number", // JS only: <p>error message</p> TS only support string
                    },
                    minLength: {
                      value: 8,
                      message: "Please enter min 8 Numbers", // JS only: <p>error message</p> TS only support string
                    },
                    maxLength: {
                      value: 8,
                      message: "It allow max 8 numbers only", // JS only: <p>error message</p> TS only support string
                    },
                  })}
                  onKeyUp={() => {
                    trigger("DINNumber");
                  }}
                />{" "}
                {errors.DINNumber && (
                  <span className='text-danger fnsd'>
                    {errors.DINNumber.message}
                  </span>
                )}
              </div>
              <div className='col-md-12'>
                <label className='fs-bold form-label'>Phone Number</label>
                <input
                  className='form-control'
                  type='text'
                  // maxLength={15}
                  {...register("PhoneNumber", {
                    required: "This field is required",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Please enter 10 digit phone number", // JS only: <p>error message</p> TS only support string
                    },
                    minLength: {
                      value: 10,
                      message:
                        "Please enter Min 10 numbers", // JS only: <p>error message</p> TS only support string
                    },
                    maxLength: {
                      value: 15,
                      message:
                        "It allow max 15 numbers only", // JS only: <p>error message</p> TS only support string
                    },
                  })}
                  onKeyUp={() => {
                    trigger("PhoneNumber");
                  }}
                />
                {errors.PhoneNumber && (
                  <span className='text-danger fnsd'>
                    {errors.PhoneNumber.message}
                  </span>
                )}
              </div>
            </div>
            <Modal.Footer>
              <Button
                variant='secondary'
                type='reset'
                onClick={handleStatutory}>
                Cancel
              </Button>
              <Button
                variant='primary'
                type='submit'
              // onClick={() => onSubmitsocial()}
              disabled={disable}
              >
                {textDisplay}
              </Button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>

      <Modal
        size='md'
        show={successAlertdirect}
        onHide={() => setSuccessAlertdirect(false)}
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
              setSuccessAlertdirect(false);
              setTextDisplay("Add");
              setisEditeddirect(false);
            }}>
            OK
          </button>
        </div>
      </Modal>

      <Modal
        size='md'
        show={deletemodel}
        onHide={() => setDeletemodel(false)}
        className='text-center'>
        <Modal.Header closeButton></Modal.Header>
        <div className='text-center m-3 text-danger'>
          <AiOutlineDelete size='80px' />
        </div>
        <h4>Are you sure you want to delete this!</h4>
        <div className='text-center m-3'>
          {/* <input id="deluser" className="form-control"></input> */}
          <button
            className='btn btn-secondary me-3 '
            onClick={handleClosedelete}>
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

      {/* ///////////////////////////////////////////////////////   <COMPANY ID model popup  ></COMPANY>/////////////////////////////////////////////////////// */}

      <Modal show={compyid} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Company ID</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit2(onSubmited)}>
            <div className='row'>
              <div className='col-md-4 '>
                {isEdited ? (
                  <>
                    <label className='fns-w'>Entity Type</label>
                    <select
                      className=' form-control editover'
                      {...register2("entitytype", {
                        required: "This field is required",
                      })}
                      onKeyUp={() => {
                        trigger2("entitytype");
                      }}>
                      <option value=''>Entity Type</option>
                      {entityTypeList.map((entityType, i) => {
                        return (
                          <option value={entityType.id} key={i}>
                            {entityType.value}
                          </option>
                        );
                      })}
                    </select>
                    {errors2.entitytype && (
                      <small className='text-danger'>
                        {errors2.entitytype.message}
                      </small>
                    )}
                  </>
                ) : (
                  ""
                )}
              </div>
              <div className='col-md-4'>
                <label className='fns-w'>Company TAN</label>
                <input
                  className='form-control editover '
                  type='text'
                  {...register2("companytan", {
                    required: "This field is required",
                    pattern: {
                      value: /^([a-zA-Z]){4}([0-9]){5}([a-zA-Z]){1}?$/,
                      message: "Please enter valid tan number", // JS only: <p>error message</p> TS only support string
                    },
                  })}
                  onKeyUp={() => {
                    trigger2("companytan");
                  }}
                />
                {errors2.companytan && (
                  <small className='text-danger'>
                    {errors2.companytan.message}
                  </small>
                )}
              </div>
              <div className='col-md-4'>
                <label className='fns-w'>Date of Incorporation</label>
                <input
                  className='form-control'
                  type='date'
                  // max={MaxDateOfBith}
                  {...register2("Incorporation", {
                    required: "This filed is required",
                  })}
                  onKeyUp={() => {
                    trigger2("Incorporation");
                  }}
                />
                {errors2.Incorporation && (
                  <small className='text-danger'>
                    {errors2.Incorporation.message}
                  </small>
                )}
              </div>
            </div>
            <div className='row'>
              <div className='col-md-6'>
                <div>
                  <div className='mb-3'>
                    <label className='fs-bold'>Company PAN</label>
                    <input
                      className='form-control editover '
                      type='text'
                      {...register2("companypan", {
                        required: "This filed is required",
                        pattern: {
                          value: /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/,
                          message: "Please enter valid pan card number", // JS only: <p>error message</p> TS only support string

                        },
                      })}
                      onKeyUp={() => {
                        trigger2("companypan");
                      }}
                    />
                    {errors2.companypan && (
                      <small className='text-danger'>
                        {errors2.companypan.message}
                      </small>
                    )}
                  </div>
                </div>
              </div>
              <div className='col-md-6 alignself'>
                <div>
                  <div className='mb-3'>
                    <input
                      className='form-control'
                      type='file'
                      {...register2("companypanfiles", {})}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-6'>
                <div>
                  <div className='mb-3'>
                    <label className='fs-bold'>Company CIN</label>
                    <input
                      className='form-control editover '
                      type='text'
                      {...register2("companycin", {
                        required: "This filed is required",
                        pattern: {
                          value: /^([LUu]{1})([0-9]{5})([A-Za-z]{2})([0-9]{4})([A-Za-z]{3})([0-9]{6})$/,
                          message: "Please enter valid CIN number",
                        },
                      })}
                      onKeyUp={() => {
                        trigger2("companycin");
                      }}
                    />
                    {errors2.companycin && (
                      <small className='text-danger'>
                        {errors2.companycin.message}
                      </small>
                    )}
                  </div>
                </div>
              </div>
              <div className='col-md-6 alignself'>
                <div>
                  <div className='mb-3'>
                    <input
                      className='form-control'
                      type='file'
                      {...register2("companycinfiles", {})}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-6'>
                <div>
                  <div className='mb-3'>
                    <label className='fs-bold'>Company GST</label>
                    <input
                      className='form-control editover '
                      type='text'
                      {...register2("companygst", {
                        required: "This filed is required",
                        pattern: {
                          value: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
                          message: "Please enter valid GST number",
                        },
                      })}
                      onKeyUp={() => {
                        trigger2("companygst");
                      }}
                    />
                    {errors2.companygst && (
                      <small className='text-danger'>
                        {errors2.companygst.message}
                      </small>
                    )}
                  </div>
                </div>
              </div>
              <div className='col-md-6 alignself'>
                <div>
                  <div className='mb-3'>
                    <input
                      className='form-control'
                      type='file'
                      {...register2("companygstfiles", {})}
                    />
                  </div>
                </div>
              </div>
            </div>

            <Modal.Footer>
              <Button
                variant='secondary'
                type='reset'
                onClick={handleStatutory}>
                Cancel
              </Button>
              <Button
                variant='primary'
                type='submit'
              // onClick={() => onSubmitcompany()}
              >
                Save
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
        <div className='text-center m-3'>
          <FcOk size='80px' />
        </div>
        <h4 className='text-center'>Update Successfully</h4>
        <div className='text-center m-3'>
          <button
            className='btn btn-primary'
            onClick={() => {
              setSuccessAlert(false);

              // setisEdited(false);
            }}>
            OK
          </button>
        </div>
      </Modal>
    </>
  );
}

export default Statutory11;
