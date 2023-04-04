import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {
  AiOutlineClockCircle,
  AiTwotoneMail,
  AiFillMobile,
  AiFillExclamationCircle,
  AiOutlineUpload,
  AiOutlineDownload,
  AiFillPlusCircle,
} from "react-icons/ai";
import Header from "../Dashboard/Header";
// import EmployeeInnerNav from "./EmployeeInnerNav";
import { useForm } from "react-hook-form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import $ from "jquery";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import moment from "moment";
import LeaveInnerNav from "./InnerNav/LeaveInnerNav";

const LeaveManageBalance = () => {
  document.title = "HRMS | Directory";
  const {
    register,
    unregister,
    handleSubmit,
    trigger,
    getValues,
    setValue,
    formState: { errors, isValid },
  } = useForm({ mode: "all" });
  const navigate = useNavigate();
  const [directoryList, setDirectoryList] = useState([]);

  const [search, setSearch] = useState([" "]);
  const [selectedEmployees, setselectedEmployees] = useState(0);
  const [showlist, setShowlist] = useState(false);
  const [ExportHoleData, setExportHoleData] = useState(false);
  const [importHoleData, setimportHoleData] = useState(false);
  const [employeeType, setEmployeeType] = useState(true);
  const [subDepartment, setSubDepartment] = useState(true);
  const [hideDirector, setHideDirector] = React.useState(true);
  const [loader, setLoader] = useState(false);
  const [errorToselectFile, setErrorToselectFile] = useState("");

  const columns = [
    {
      name: <span className='h6 fw-bold'>ID</span>,
      width: "75px",
      selector: (row) => row.number,
      sortable: true,
    },

    {
      name: <span className='h6 fw-bold'>Employee Name</span>,
      width: "150px",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: <span className='fs-6 fw-bold'>Department</span>,
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: <span className='fs-6 fw-bold'>Location</span>,
      selector: (row) => row.name,
      sortable: true,
    },
    employeeType
      ? {
          name: <span className='h6 fw-bold'>Maternity Leave</span>,
          selector: (row) => row.name,
          sortable: true,
        }
      : {
          omit: hideDirector,
        },
    subDepartment
      ? {
          name: <span className='h6 fw-bold'>Peternity Leave</span>,
          selector: (row) => row.name,
          sortable: true,
        }
      : {
          omit: hideDirector,
        },
  ];
  const getUsersList = async () => {
    var userinfo = JSON.parse(sessionStorage.getItem("user-info"));
    try {
      const response = await axios.get(
        `/api/company/designation/${userinfo.data.id}/`
      );
      response.data.map((item, i) => {
        item.Num = i + 1;
      });
      console.log(response.data);
      console.log(typeof response.data);
      setDirectoryList(response.data);
      setLoader(true);
    } catch (error) {
      console.log("not found");
    }
  };

  const showAllcolums = () => {
    setShowlist(!showlist);
  };

  const getEmployeeType = (value) => {
    setEmployeeType(value);
    setHideDirector(!hideDirector);
  };
  const getSubDepartment = (value) => {
    setSubDepartment(value);
    setHideDirector(!hideDirector);
  };

  const ExportHoleDatapopup = () => {
    setExportHoleData(true);
    setHideDirector(!hideDirector);
  };
  const importholeDatapopup = () => {
    setValue("employee_file", "");
    setimportHoleData(true);
    setHideDirector(!hideDirector);
  };

  useEffect(() => {
    getUsersList();
  }, []);

  return (
    <div className='container-fluid'>
      <LeaveInnerNav />

      <div className='container'>
          <div className=''>
          <div className='row'>
            <div className='col-md-12 mt-4'>
              <div className='tableexportInfo'>
                <div className='optioninfo'>
                  <div className='selectedemployeenumbers'>
                    <div className='numbershow'>{selectedEmployees}</div>
                  </div>

                  <div
                    className='importEmployee'
                    onClick={() => importholeDatapopup()}>
                    <div className='bulkedit'>
                      <span>
                        <AiOutlineDownload />
                      </span>
                    </div>
                    <div className='textInfo'>Import</div>
                  </div>
                  <div
                    className='exportEmployee'
                    onClick={() => ExportHoleDatapopup()}>
                    <div className='bulkedit'>
                      <span>
                        <AiOutlineUpload />
                      </span>
                    </div>
                    <div className='textInfo'>Export</div>
                  </div>
                </div>
                <div className=''>
                  <div
                    className={
                      showlist
                        ? "columnsShowtohide active"
                        : "columnsShowtohide"
                    }>
                    <ul className='pop-up-check-items m-0 p-0'>
                      <li>
                        <fieldset className='form-group'>
                          <input
                            className='filled-in col-selector'
                            {...register("type")}
                            onChange={(e) => getEmployeeType(e.target.checked)}
                            id='colSelectorCheckbox9'
                            type='checkbox'
                          />
                          <label
                            className='ft-14'
                            htmlFor='colSelectorCheckbox9'>
                            Maternity Leave
                          </label>
                        </fieldset>
                      </li>
                      <li>
                        <fieldset className='form-group'>
                          <input
                            className='filled-in col-selector'
                            {...register("sub_department")}
                            onChange={(e) => getSubDepartment(e.target.checked)}
                            id='colSelectorCheckbox10'
                            type='checkbox'
                          />
                          <label
                            className='ft-14'
                            htmlFor='colSelectorCheckbox10'>
                            paternity Leave
                          </label>
                        </fieldset>
                      </li>
                    </ul>
                  </div>
                  {loader ? (
                    <DataTable
                      columns={columns}
                      data={directoryList}
                      pagination
                      fixedHeader
                      fixedHeaderScrollHeight='450px'
                      highlightOnHover
                      subHeader
                      subHeaderComponent={
                        <input
                          type='text'
                          className='form-control w-25'
                          placeholder='Search'
                          onChange={(e) => setSearch(e.target.value)}
                        />
                      }
                    />
                  ) : (
                    <div className='text-center'>
                      <div className='spinner-border ' role='status'>
                        <span className='sr-only'>Loading...</span>
                      </div>
                    </div>
                  )}

                  <div className='selectColums'>
                    <div className='bulkedit'>
                      <span onClick={() => showAllcolums()}>
                        {" "}
                        <AiFillPlusCircle />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        size='md'
        show={ExportHoleData}
        onHide={() => setExportHoleData(false)}
        aria-labelledby='example-modal-sizes-title-md'>
        <Modal.Header closeButton> Export</Modal.Header>
        <Modal.Body>
          <form>
            <input type='radio' id='Current' className='me-2' />
            <label for='Current'> Current balance</label>
            <br />
            <input type='radio' id='balance' className='me-2' />
            <label for='balance'> Year end balance - 2022</label>
            <br />
          </form>
          <button className='btn btn-primary'>Export</button>
        </Modal.Body>
      </Modal>

      <Modal
        size='md'
        show={importHoleData}
        onHide={() => setimportHoleData(false)}
        aria-labelledby='example-modal-sizes-title-md'>
        <Modal.Body>
          <div className='row'>
            <div className='col-md-12'>
              <div className='SelectFileType'>
                <input
                  type='file'
                  {...register("employee_file", {
                    required: "Please select  employee_file..!",
                  })}
                  accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
                />
              </div>

              <br />
              <div className='select'>
                <small className='text-danger'>{errorToselectFile}</small>
              </div>
              <br />

              <div className=''>
                <a
                  href='http://38.143.106.215:82/media/download/bulk_upload_template_pranathi.xlsx'
                  target='_blank'>
                  Download Sample import file
                </a>
                <form>
                  <input type='checkbox' id='Update' className='me-2' />
                  <label for='Update'> Update Applied Leaves</label>
                  <br />
                  <input type='checkbox' id='Leaves' className='me-2' />
                  <label for='Leaves'> Update Accrued Leaves</label>
                  <br />
                </form>
                <button className='btn btn-primary'>Download Here</button>
              </div>
            </div>
          </div>
          <br />
          {/* <Button variant='primary' onClick={() => setimportHoleData(false)}>
            Cancel
          </Button>
          &nbsp;
          <Button variant='primary' onClick={() => importEmployeeFiles()}>
            Import File
          </Button> */}
        </Modal.Body>
      </Modal>

      {/* <Modal
        size='md'
        show={resendActivation}
        onHide={() => setresendActivation(false)}
        aria-labelledby='example-modal-sizes-title-md'
        className='text-center'>
        <Modal.Header closeButton> Please Confirm Your Action</Modal.Header>
        <Modal.Body>
          <div className='row'>
            <div className='col-md-12'>
              <div className='select'>
                This action will send the mobile/email verification link to
                employees who have unverified credentials. htmlFor data security
                reasons, please ensure that the credentials are correct. Are you
                sure you want to continue?
              </div>
            </div>
          </div>
          <br />
          <br />
        
        </Modal.Body>
      </Modal> */}
      </div>
    
  );
};
export default LeaveManageBalance;
