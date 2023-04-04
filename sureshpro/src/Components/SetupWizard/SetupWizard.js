// import logo from "./logo.svg";
// import "./App.css";
import React from "react";
// import { Button } from "bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import SettingsNav from "./../Settings/innerNav";
function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Please Confirm Your Action
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          This action will send an activation email/message to your employees.
          Are you sure you want to continue?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Yes</Button>
        <Button onClick={props.onHide}>No</Button>
      </Modal.Footer>
    </Modal>
  );
}

function SetupWizard() {
  const [modalShow, setModalShow] = React.useState(false);
  const [showEmployees, setShowEmployees] = React.useState(false);
  const [showLeave, setShowLeave] = React.useState(false);
  const onHandleEmployee = () => {
    setShowEmployees(true);
    setShowLeave(false);
  };

  const onHandleLeave = () => {
    setShowLeave(true);
    setShowEmployees(false);
  };

  return (
    <div>
      <div className="container-fluid">
        <SettingsNav />
      </div>
      <div className='container mt-4'>
        {/* <h2></h2> */}
        <div className='card mb-3'>
          <h4 className='text-center p-1'>Getting started with HRMS</h4>
        </div>
        <div className='card mb-3 p-3'>
          <h5>Welcome, Sai</h5>
          <span className=''>
            Hey There! Welcome to HRMS. This Setup Wizard will get you started
            using HRMS. Please bear in mind that HRMS has a host of advanced
            features and settings that you will discover with continued use.
            Let's get going!
          </span>
        </div>
        <div className='card mb-3'>
          <div className='card-header' onClick={onHandleEmployee}>
            <h5 className=''>Add of Employees</h5>
            <span>
              Let's add Employees! Start by updating the size of the company and
              the actual employee count. You can choose between adding employees
              individually or uploading the details in bulk.
            </span>
          </div>

          {showEmployees ? <AddEmployee /> : null}
        </div>
        <div className='card'>
          <div className='card-header' onClick={onHandleLeave}>
            <h5>Set Leave Rules</h5>
            <span>
              Create and define your leave rules. These rules will be applied to
              all employees from the effective date of the leave cycle or DOJ
              whichever is later.
            </span>
          </div>
          {showLeave ? <LeaveRules /> : null}
        </div>
        <div className='p-3 text-center'>
          <Button
            className=''
            variant='primary'
            onClick={() => setModalShow(true)}>
            Invite Employees
          </Button>
          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        </div>
      </div>
    </div>
  );
}

const AddEmployee = () => {
  const [showEmployees, setShowEmployees] = React.useState(false);
  const [showLeave, setShowLeave] = React.useState(false);
  const onHandleEmployeeClose = () => {
    setShowLeave(false);
    setShowEmployees(false);
  };
  return (
    <div className='card-body '>
      <form className='' id='addEmployee'>
        <div>
          <div className='row mb-3'>
            <div className='col-md-6'>
              <div className='form-group custom-input mb-3'>
                <label className='form-label'>Company Size: </label>
                <select
                  className='form-select form-control'
                  aria-label='Default select example'>
                  <option selected>Company Size</option>
                  <option value='1'>10</option>
                  <option value='2'>20</option>
                  <option value='3'>100</option>
                </select>
              </div>
              <div className='form-group'>
                <label className='form-label'>Number of Employees: </label>
                <input type='number' className='form-control' />
              </div>
            </div>
            <div className='col-md-6'>
              <div className='card m-3 text-center bg-light'>
                <h1 className=''>7</h1>
                <span>Employees Added</span>
                <span className='text-danger'>3 More to go</span>
              </div>
            </div>
          </div>
          <div className='row mb-3'>
            <div className='col-md-12 '>
              <Tabs
                defaultActiveKey='individualAdd'
                id='uncontrolled-tab-example'
                className='mb-3'>
                <Tab eventKey='individualAdd' title='Individual Add'>
                  <h5>
                    * Use either Email Address or Mobile Number to add employees
                  </h5>
                  <div className='row'>
                    <div className='col-md-6'>
                      <div className='form-group custom-input mb-3'>
                        <label className='main-label '>Name</label>
                        <input type='text' className='form-control' />
                      </div>
                      <div className='form-group custom-input'>
                        <input
                          type='button'
                          className='btn btn-primary'
                          value='submit'
                        />
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <div className='form-group custom-input mb-3'>
                        <label className='main-label '>
                          Email / Mobile Number
                        </label>
                        <input type='text' className='form-control' />
                      </div>
                      <div className='form-group custom-input'>
                        <button
                          className='addBtn cursor-pointer d-inline btn text-danger'
                          onClick={onHandleEmployeeClose}>
                          Skip for now
                        </button>
                        {/* addBtn cursor-pointer d-inline */}
                      </div>
                    </div>
                  </div>
                </Tab>
                <Tab eventKey='bulkAdd' title='Bulk Add'>
                  <h5>
                    Download the excel template which contains the following
                    sample fields. Fill it up with your employee data and
                    upload. Name, Email ID or Mobile Number
                  </h5>
                  <div className='row'>
                    <div className='col-md-6'>
                      <div className='form-group'>
                        <button className='btn-primary form-control'>
                          Download Excel
                        </button>
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <div className='form-group'>
                        <button className='btn-primary form-control'>
                          Upload Excel
                        </button>
                      </div>
                    </div>
                  </div>
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

const LeaveRules = () => {
  return (
    <div className='card-body'>
      <form>
        <div className='form'>
          <div className='row'>
            <div className='col-md-6 d-flex'>
              <div className='form-check'>
                <input
                  type='radio'
                  className='form-check-input'
                  name='Year'
                  id='Calander Year'
                />
                <label className='form-check-label'>Calander Year</label>
              </div>
              <div className='form-check px-5'>
                <input
                  type='radio'
                  className='form-check-input'
                  name='Year'
                  id='Financial Year'
                  checked
                />
                <label className='form-check-label'>Financial Year</label>
              </div>
            </div>
          </div>
          <div className='row'>
            <table className='table'>
              <thead>
                <tr>
                  <th scope='col'>Leave Name</th>
                  <th scope='col'>Credit Cycle</th>
                  <th scope='col'>Credit Period</th>
                  <th scope='col'>Annual Leave</th>
                  <th scope='col'>Credited Leave</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope='row'>
                    <input type='text' value='Paternity Leave' className='' />
                  </th>
                  <td>
                    <select class='form-select'>
                      <option>Select</option>
                      <option value='1'>Monthly</option>
                      <option value='2' selected>
                        Annual
                      </option>
                      <option value='3'>Monthly</option>
                    </select>
                  </td>
                  <td>
                    <select class='form-select'>
                      <option>Select</option>
                      <option value='1' selected>
                        Start
                      </option>
                      <option value='2'>Stop</option>
                    </select>
                  </td>
                  <td>7</td>
                  <td>7</td>
                </tr>
                <tr>
                  <th scope='row'>
                    <input type='text' value='Earned Leave' className='' />
                  </th>
                  <td>
                    <select class='form-select'>
                      <option>Select</option>
                      <option value='1' selected>
                        Monthly
                      </option>
                      <option value='2'>Annual</option>
                      <option value='3'>Monthly</option>
                    </select>
                  </td>
                  <td>
                    <select class='form-select'>
                      <option>Select</option>
                      <option value='1' selected>
                        Start
                      </option>
                      <option value='2'>Stop</option>
                    </select>
                  </td>
                  <td>24</td>
                  <td>2</td>
                </tr>
                <tr>
                  <th scope='row'>
                    {" "}
                    <input type='text' value='Sick Leave' className='' />
                  </th>
                  <td>
                    <select class='form-select'>
                      <option>Select</option>
                      <option value='1' selected>
                        Monthly
                      </option>
                      <option value='2'>Annual</option>
                      <option value='3'>Monthly</option>
                    </select>
                  </td>
                  <td>
                    <select class='form-select'>
                      <option>Select</option>
                      <option value='1' selected>
                        Start
                      </option>
                      <option value='2'>Stop</option>
                    </select>
                  </td>
                  <td>18</td>
                  <td>1.5</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='text-left'>
            <button type='button' className='btn btn-primary'>
              + Add Another Leave Type
            </button>
          </div>
          <div className='text-right mt-3'>
            <button className='btn btn-success float-end'>
              Save and Proceed
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default SetupWizard;
