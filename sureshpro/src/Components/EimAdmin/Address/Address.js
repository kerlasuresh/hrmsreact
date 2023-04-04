import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { FcOk } from "react-icons/fc";
import Button from "react-bootstrap/Button";
import DepartmentInnerNav from "../InnerNav/DepartmentInnerNav";
import { AiOutlineEdit, AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import AddressForm from './addressForm'
function Address() {
  document.title = "HRMS | Address";
  const columns = [
    {
      name: <span className='fs-6 fw-bold'>Address Tittle</span>,
      selector: (row) => row.addressTitle,
      sortable: true,
    },

    {
      name: <span className='fs-6 fw-bold'>Address Line 1</span>,
      selector: (row) => row.addressLine1,
      sortable: true,
    },

    {
      name: <span className='fs-6 fw-bold'>Address Line 2</span>,
      selector: (row) => row.addressLine2,
      sortable: true,
    },
    {
      name: <span className='fs-6 fw-bold'>City</span>,
      selector: (row) => row.city,
      sortable: true,
    },

    {
      name: <span className='fs-6 fw-bold'>State</span>,
      selector: (row) => row.state,
      sortable: true,
    },

    {
      name: <span className='fs-6 fw-bold'>Country</span>,
      selector: (row) => row.country,
      sortable: true,
    },
    {
      name: <span className='fs-6 fw-bold'>Pincode</span>,
      selector: (row) => row.pincode,
      sortable: true,
    },

    {
      name: <span className='fs-6 fw-bold'>Action</span>,
      cell: (row) => (
        <div className='text-center'>
          <button
            className='btn btn-light m-2 bi bi-pencil-square'
            onClick={() => {
              setEditIdCUS(row.id);
              setTextDisplay("Update");
              handleShow();
              setisEditedCUS(true);
              setCustomAddress(row);

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
  const [show, setShow] = useState(false);
  const [registeroffice, setRegisteroffice] = useState({});

  const [CustomAddress, setCustomAddress] = useState({});
  const [filteredAdminstation, setfilteredAdminstation] = useState([]);
  const [loader, setLoader] = useState(false);
  const [textDisplay, setTextDisplay] = useState("Add");
  const [isEditedCUS, setisEditedCUS] = useState(false);
  const [editIdCUS, setEditIdCUS] = useState(null);
  const [smShow, setSmShow] = useState(false);
  const [smShowe, setSmShowe] = useState(false);
  const [deleteRowId, setDeleteRowID] = useState(null);
  const [editId, setEditId] = useState(null);
  const handleClose = () => { setShow(false); setTextDisplay("Add"); setisEditedCUS(false); };
  const handleShow = () => { setShow(true); setCustomAddress(); };
  const handleClose1 = () => setSmShowe(false);
  const [corposhow, setCorposhow] = useState(false);
  const [corporate, setCorporate] = useState({});
  const [editIdCor, setEditIdCor] = useState(null);
  const handleCorporateClose = () => setCorposhow(false);
  const handleCorporateShow = () => setCorposhow(true);
  const [rigistershow, setRigistershow] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const handleRegisterClose = () => setRigistershow(false);
  const handleRigisterShow = () => setRigistershow(true);
  ///////////////////////////////////////////////////////////////////    Registation          ////////////////////////////////////////////////////////////////////////////////////////
  const getRegistation = async () => {
    var userinfo = JSON.parse(sessionStorage.getItem("user-info"));
    await axios.get(`/api/company/details/${userinfo.data.id}/`).then((result) => {
      setRegisteroffice(result.data);
    });
  };
  const getAddress = async () => {
    setLoader(true);
    var userinfo = JSON.parse(sessionStorage.getItem("user-info"));
    var req = { "company_id": userinfo.company_id }
    try {
      await axios.get(`/api/company/custom/address/${userinfo.data.id}/`).then((result) => {
        setLoader(false);
        if (result.data.length == 0) {
          setfilteredAdminstation([])
        } else {
          setfilteredAdminstation(result.data)

        }
        //setfilteredAdminstation(result.data)
      });
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    getRegistation();
    getAddress();
  }, []);
  const onSubmit = async (data) => {
    var req = {
      registeredAdressLine1: data.AddressL1,
      registeredAdressLine2: data.AddressL2,
      registeredCity: data.City,
      registeredState: data.State,
      registeredCountry: data.Country,
      registeredPincode: data.Pincode
    }

    await axios.patch(`/api/company/details/${editId}/`, req).then((result) => {
      getRegistation();
      setRigistershow(false);
      setSuccessAlert(true);
      setTextDisplay('Update')
    })
      .catch((err) => {
        console.log("error resp", err);
      });
  };
  /////////////////////////////////////////////////////////////////////////         CORPORATE OFFICE       /////////////////////
  const onSubmitCorporate = async (data) => {
    var req = {
      corporateAdressLine1: data.AddressL1,
      corporateAdressLine2: data.AddressL2,
      corporateCity: data.City,
      corporateState: data.State,
      corporateCountry: data.Country,
      corporatePincode: data.Pincode,
    }
    await axios.patch(`/api/company/details/${editIdCor}/`, req).then((result) => {
      getRegistation();
      setCorposhow(false);
      setSuccessAlert(true);
      setTextDisplay('Update')
    })
      .catch((err) => {
        console.log("error resp", err);
      });
  };
  /////////////////////////////////////////////    CuSTOM API           ////////////////////////////////////////////////////
  const onSubmitCustom = async (data) => {
    var userinfo = sessionStorage.getItem("user-info");
    userinfo = JSON.parse(userinfo);
    var req = {
      addressTitle: data.AddressTittle,
      addressLine1: data.AddressL1,
      addressLine2: data.AddressL2,
      city: data.City,
      state: data.State,
      country: data.Country,
      pincode: data.Pincode,
      company: userinfo.data.id
    };
    if (!isEditedCUS) {
      try {
        await axios.post("/api/company/custom/address/", req);
        setSuccessAlert(true);
        setShow(false);
        setLoader(true);
        setTextDisplay('Added')
        getAddress();
      } catch {
        alert("error");
      }
    } else {
      try {
        await axios.patch(`/api/company/update/custom/address/${editIdCUS}/`, req);
        setSuccessAlert(true);
        setShow(false);
        setLoader(true);
        setTextDisplay('Update')
        getAddress();
      } catch (err) {
        alert("error");
      }
    }
  };
  const deleteUser = async () => {
    try {
      await axios.patch(`/api/company/update/custom/address/${deleteRowId}/`,{isDeleted:true});
      setSmShow(true);
      setSmShowe(false);
      getAddress();
    } catch (error) {
      console.log("on submit delete error ", error);
    }
  };
  return (
    <>
      <div className='container-fluid'>
        <DepartmentInnerNav />
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <div className='card mt-4 mb-4'>
                <div className='card-header'>
                  <div className='row'>
                    <div className='col-md-6'>
                      <h6>REGISTERED OFFICE</h6>
                    </div>
                    <div className='col-md-6'>
                      <div className='text-right'>
                        <AiOutlineEdit
                          onClick={() => {
                            handleRigisterShow();
                            setEditId(registeroffice.id);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='card-body'>
                  <p>
                    <b>{registeroffice.companyName}</b>
                  </p>
                  <p>{registeroffice.registeredAdressLine1}</p>
                  <p>{registeroffice.registeredAdressLine2}</p>
                  <p>{registeroffice.registeredCity}</p>
                  {registeroffice.registeredState ||
                    registeroffice.registeredCountry ||
                    registeroffice.registeredPincode ? (
                    <p>
                      {registeroffice.registeredState},
                      {registeroffice.registeredCountry},
                      {registeroffice.registeredPincode}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className='card mt-4 mb-4'>
                <div className='card-header'>
                  <div className='row'>
                    <div className='col-md-6'>
                      <h6>CORPORATE OFFICE</h6>
                    </div>
                    <div className='col-md-6'>
                      <div className='text-right'>
                        <AiOutlineEdit
                          onClick={() => {
                            handleCorporateShow();
                            setEditIdCor(registeroffice.id);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='card-body'>
                  <p>
                    <b>{registeroffice.companyName}</b>
                  </p>
                  <p>{registeroffice.corporateAdressLine1}</p>
                  <p>{registeroffice.corporateAdressLine2}</p>
                  <p>{registeroffice.corporateCity}</p>
                  {registeroffice.corporateState ||
                    registeroffice.corporateCountry ||
                    registeroffice.corporatePincode ? (
                    <p>
                      {registeroffice.corporateState},{" "}
                      {registeroffice.corporateCountry},
                      {registeroffice.corporatePincode}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className='card mt-4 mb-4'>
                <div className='card-header'>
                  <div className='row'>
                    <div className='col-md-6'>
                      <h6>CUSTOM ADDRESS TITLE</h6>
                    </div>
                    <div className='col-md-6'>
                      <div className='text-right'>
                        <div>
                          <AiOutlinePlusCircle onClick={handleShow} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='card-body'>
                  {!loader ? (
                    <DataTable
                      columns={columns}
                      data={filteredAdminstation}
                      pagination
                      fixedHeaderScrollHeight='450px'
                      fixedHeaderScrollWidth='50px'
                      highlightOnHover
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
            </div>
          </div>
        </div>
      </div>
      {/* ///////////////////////////////////////////// MODEL REGISTERED OFFICE ////////////////////////////////// */}

      <Modal show={rigistershow} onHide={handleRegisterClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>REGISTERED OFFICEE</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddressForm
            onSubmitCustom={(data) => onSubmit(data)}
            onloadvaluesid={registeroffice.id}
            onloadvalues={registeroffice}
            handleClose={handleRegisterClose}
            type={"Register"}
          />
        </Modal.Body>
      </Modal>
      {/* ////////////////////////////////////////////// model  CORPORATE OFFICE     ///////////////////////////////////// */}
      <Modal show={corposhow} onHide={handleCorporateClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>CORPORATE OFFICE</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddressForm
            onSubmitCustom={(data) => onSubmitCorporate(data)}
            onloadvaluesid={registeroffice.id}
            onloadvalues={registeroffice}
            handleClose={handleCorporateClose}
            type={"Corporate"}
          />
        </Modal.Body>
      </Modal>
      {/* //////////////////////////////////model popup  CUSTOM ADDRESS TITLE ///////////////////////////// */}
      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>{textDisplay}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddressForm
            onSubmitCustom={(data) => onSubmitCustom(data)}
            onloadvaluesid={CustomAddress ? CustomAddress.id : ""}
            onloadvalues={CustomAddress}
            handleClose={handleClose}
            type={"custom"}
          />
        </Modal.Body>
      </Modal>
      <Modal
        size='md'
        show={successAlert}
        onHide={() => setSuccessAlert(false)}
        className='text-center'>
        <Modal.Header closeButton></Modal.Header>
        <div className='text-center m-3'>
          {" "}
          <FcOk size='80px' />{" "}
        </div>
        <h4 className='text-center'>{textDisplay} Successfully</h4>
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
      <Modal
        size='md'
        show={smShowe}
        onHide={() => setSmShowe(false)}
        className='text-center'>
        <Modal.Header closeButton></Modal.Header>
        <div className='text-center m-3 text-danger'>
          {" "}
          <AiOutlineDelete size='80px' />{" "}
        </div>
        <h4>Are you sure you want to delete this!</h4>
        <div className='text-center m-3'>
          <button className='btn btn-secondary me-3 ' onClick={handleClose1}>
            {" "}
            Cancel
          </button>
          <button className='btn btn-primary' onClick={deleteUser}>
            {" "}
            Delete{" "}
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
          {" "}
          <AiOutlineDelete size='80px' />{" "}
        </div>
        <h4 className='text-center'>Deleted Successfully</h4>
        <div className='text-center m-3'>
          <button className='btn btn-primary' onClick={() => setSmShow(false)}>
            {" "}
            Okay{" "}
          </button>
        </div>
      </Modal>
    </>
  );
}
export default Address;