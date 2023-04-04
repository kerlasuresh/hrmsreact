import React, { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import DataTable from "react-data-table-component";
import * as moment from "moment";
import { FcOk } from "react-icons/fc";
import Modal from "react-bootstrap/Modal";
import { FcHighPriority } from "react-icons/fc";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const SendQuestionnaireForm = (props) => {
  const [departmentNames, setDepartmentNames] = useState([]);
  const [filteredSendQ, setFilteredSendQ] = useState([]);
  const [responseData, setResponseData] = useState([]);
  const [employeesMailIds, setEmployeesMailIds] = useState([]);
  const [sendMailResponseData, setSendMailResponseData] = useState({});
  const [toggledClearRows, setToggleClearRows] = React.useState(false);
  const [sendedWarningPopUp, setSendedWarningPopUp] = useState(false);
  const [successfullyShowPopUp, setSuccessfullyShowPopUp] = useState(false);
  const [alertPopUp, setAlertPopUp] = useState(false);
  const [checkBoxAlert, setCheckBoxAlert] = useState(false);
  const [employeeKRAsetValue, setEmployeeKRAsetValue] = useState("");
  const [employeeDepartValue, setEmployeeDepartValue] = useState("");
  const [loader, setLoader] = useState(false);
  const [value, setValue] = React.useState(0);
  //const navigate = useNavigate();
  var req = {
    Official_Email: employeesMailIds,
    setnumber: employeeKRAsetValue,
  };
  const handleChangee = () => {
    props.handleChangee();
    setSuccessfullyShowPopUp(false);
  };
  const columns = [
    {
      name: <span className='fs-6 fw-bold h3'>All</span>,
      selector: (row) => "",
      sortable: true,
      width: "100px",
      style: {
        fontSize: "16px",
      },
    },
    {
      name: <span className='fs-6 fw-bold text-center h3'>S.No</span>,
      selector: (row) => row.Num,
      sortable: true,
      width: "100px",
      textAlign: "center",
      style: {
        fontSize: "16px",
      },
    },

    {
      name: <span className='fs-6 fw-bold h3'>Employee Name</span>,
      selector: (row) => row.First_Name,
      sortable: true,
      width: "300px",
      style: {
        fontSize: "16px",
      },
    },

    {
      name: <span className='fs-6 fw-bold h3'>Employee E-mail</span>,
      selector: (row) => row.Official_Email,
      sortable: true,
      width: "300px",
      style: {
        fontSize: "16px",
      },
    },
  ];

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };

  //--------------------- posting a depart id  -----------------//
  const handleDepartNames = async (event) => {
    let departValue = event.target.value;
    setEmployeeDepartValue(departValue);
    setLoader(true);
    await axios
      .post("/monthlykra_tosendlist/", {
        department: event.target.value,
        set_number: employeeKRAsetValue,
      })
      .then((resp) => {
        resp.data.map((item, i) => {
          item.Num = i + 1;
        });
        setResponseData(resp.data);
        setLoader(false);
      })
      .catch((err) => {
        console.log("error resp", err);
        setLoader(false);
      });
  };
  //--------------------- getting a data -----------------//
  const getSendQuestionary = async () => {
    try {
      const response = await axios.get("/monthlykra_getsetnumbers/");
      response.data.map((item, i) => {
        item.Num = i + 1;
      });
      setFilteredSendQ(response.data);
      console.log("get api filteredSendQ ", response.data);
    } catch (error) {
      console.log("not found");
    }
  };

  //------------------------ getting department data --------------------//
  const getDepartment = async () => {
    try {
      const departmentResponse = await axios.get("/get_department/");
      setDepartmentNames(departmentResponse.data);
      setLoader(false);
    } catch (error) {
      console.log("not found");
    }
  };

  //------------------------ drop down submit --------------------//

  useEffect(() => {
    getSendQuestionary();
  }, []);

  //------------------------ check box store values --------------------//

  const handleChangeCheckBox = ({ selectedRows }) => {
    let tempArray = [];
    selectedRows.map((item) => {
      tempArray.push(item.Official_Email);
    });
    setEmployeesMailIds(tempArray);
  };

  //------------------------ check box submit like sending mails-------------------- //

  const SendQuestionnaireFormData = async () => {
    await axios
      .post("/monthlykra_sendmail/", req)
      .then((resp) => {
        setSendMailResponseData(resp);
        setSuccessfullyShowPopUp(true);
        setSendedWarningPopUp(false);
        onClearValues();
        setLoader(false);
      })
      .catch((err) => {
        console.log("error resp", err);
      });
    //setFormData(data);
  };

  const checkBoxHandleChange = () => {
    console.log("values of both ", employeeDepartValue, employeeKRAsetValue);
    if (employeeDepartValue === "" || employeeKRAsetValue === "") {
      setAlertPopUp(true);
    } else {
      if (req.Official_Email.length === 0) {
        setCheckBoxAlert(true);
      } else {
        setSendedWarningPopUp(true);
      }
    }
  };
  //------------------------ check box send --------------------//

  const onClearValues = () => {
    handleClearRows();
    setEmployeeKRAsetValue("");
    setEmployeeDepartValue("");
    console.log("clearvalues", employeeDepartValue, employeeKRAsetValue);
  };

  // const handleRefreshData = () => {
  //   setSuccessfullyShowPopUp(false);
  //   handleDepartNames();
  //   //props.handleChange();
  // };

  const onchangeFilterValues = (event) => {
    setDepartmentNames([]);
    setEmployeeDepartValue("");
    let setNumbers = event.target.value;
    setEmployeeKRAsetValue(setNumbers);
    getDepartment();
  };
  const handleClearRows = () => {
    setToggleClearRows(!toggledClearRows);
  };
  return (
    <div>
      <div className=' container '>
        <div className='row d-flex justify-content-center '>
          <div className='col-md-4'>
            <select
              className='mdb-select md-form form-control'
              searchable='Search here..'
              value={employeeKRAsetValue}
              onChange={(e) => {
                onchangeFilterValues(e);
              }}>
              <option value=''>-- Select Set --</option>
              {filteredSendQ.map((option) => (
                <option key={option.setnumber} value={option.setnumber}>
                  {option.setname +
                    " - " +
                    moment(option.date).format("MMMM-YYYY")}
                </option>
              ))}
            </select>
          </div>
          <div className='col-md-4'>
            <select
              className='mdb-select md-form form-control'
              value={employeeDepartValue}
              onChange={(e) => handleDepartNames(e)}
            // onChange={(e) => setAdvanceFilterDepartment(e.target.value)}
            >
              <option value=''>-- Select Department --</option>
              {departmentNames.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.department_name1}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div>
        {!loader ? (
          <DataTable
            columns={columns}
            data={responseData}
            pagination
            fixedHeader
            fixedHeaderScrollHeight='450px'
            highlightOnHover
            subHeader
            selectableRows
            onSelectedRowsChange={handleChangeCheckBox}
            clearSelectedRows={toggledClearRows}
          />
        ) : (
          <div className='text-center'>
            <div className='spinner-border ' role='status'>
              <span className='sr-only'>Loading...</span>
            </div>
          </div>
        )}
      </div>
      <div className='container '>
        <div className='row '>
          <div className='col-md-4'>
            <button
              type='submit'
              className='btn btn-primary'
              onClick={checkBoxHandleChange}>
              Send
            </button>
            &nbsp; &nbsp;
            <button
              type='submit'
              className='btn btn-primary bg-secondary'
              onClick={onClearValues}>
              Clear
            </button>
          </div>
        </div>
      </div>
      <Modal
        size='md'
        show={sendedWarningPopUp}
        onHide={() => setSendedWarningPopUp(false)}
        className='text-center'>
        <Modal.Header closeButton></Modal.Header>
        <div className='text-center m-3 text-danger'>
          <FcHighPriority size='80px' />
        </div>
        <h4 className='text-center'>Are you sure you want to send these..!</h4>
        <div className='text-center m-3'>
          <Button
            className='btn btn-primary m-1'
            onClick={() => setSendedWarningPopUp(false)}>
            Cancel
          </Button>
          <button
            className='btn btn-primary m-1'
            onClick={SendQuestionnaireFormData}>
            Send
          </button>
        </div>
      </Modal>
      <Modal
        size='md'
        show={successfullyShowPopUp}
        onHide={() => setSuccessfullyShowPopUp(false)}
        className='text-center'>
        <Modal.Header closeButton></Modal.Header>
        <div className='text-center m-3 text-danger'>
          <FcOk size='80px' />
        </div>
        <h4 className='text-center'>Sended Successfully</h4>
        <div className='text-center m-3'>
          <button
            className='btn btn-primary'
            // onClick={() => openInNewTab(<SendQuestionnaire />)}
            value={value}
            onClick={handleChangee}>
            Okay
          </button>
        </div>
      </Modal>
      <Modal
        size='md'
        show={alertPopUp}
        onHide={() => setAlertPopUp(false)}
        className='text-center'>
        <Modal.Header closeButton></Modal.Header>
        <div className='text-center m-3 text-danger'>
          <FcHighPriority size='80px' />
        </div>
        <h4 className='text-center'>
          Please Select Question Set and Department
        </h4>
        <div className='text-center m-3'>
          <button
            className='btn btn-primary'
            onClick={() => setAlertPopUp(false)}>
            Okay
          </button>
        </div>
      </Modal>
      <Modal
        size='md'
        show={checkBoxAlert}
        onHide={() => setCheckBoxAlert(false)}
        className='text-center'>
        <Modal.Header closeButton></Modal.Header>
        <div className='text-center m-3 text-danger'>
          <FcHighPriority size='80px' />
        </div>
        <h4 className='text-center'>Please Select Atlest One Record To Send</h4>
        <div className='text-center m-3'>
          <button
            className='btn btn-primary'
            onClick={() => setCheckBoxAlert(false)}>
            Okay
          </button>
        </div>
      </Modal>
    </div>
  );
};
export default SendQuestionnaireForm;
