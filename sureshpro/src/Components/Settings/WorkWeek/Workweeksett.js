import React, { useState } from 'react'
import { AiFillDelete, AiOutlineExclamationCircle, AiOutlineEdit } from 'react-icons/ai'
import { IoCopyOutline } from 'react-icons/io5'
import { useForm } from 'react-hook-form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import DataTable from 'react-data-table-component'
import { BsFillBagCheckFill } from 'react-icons/bs'
// import axios from 'axios'
import SettingsNav from '../innerNav'
function Workweeksett() {
  const {register } = useForm({ mode: 'all' })
  const [ruleDetailsOnedit, setRuleDetailsOnedit] = useState(true)
  const [editButtonClick, setEditButtonClick] = useState(false)
  const [isworkweek, setIsworkweek] = useState(false)
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [addNewRuleCondition, setAddNewRuleCondition] = useState(false)
  const [addNewRuleList, setAddNewRuleList] = useState([])
  const [addWeekTableCondition, setAddWeekTableCondition] = useState(false)
  const filteredAdminstation = [];
  const [showAssign, setShowAssign] = useState(false)
  const handleCloseAssign = () => setShowAssign(false)
  const handleShowAssign = () => setShowAssign(true)
  const [WorkweekList, setWorkweekList] = useState([
    { monday: 1,  Tuesday: 1, Wedday: 1, thusday: 1, Friday: 1, satDay: 1, sunDay: 1},
    { monday: 1, Tuesday: 1, Wedday: 1, thusday: 1, Friday: 1, satDay: 1, sunDay: 1 },
    { monday: 1, Tuesday: 1, Wedday: 1, thusday: 1, Friday: 1, satDay: 1, sunDay: 1 },
    { monday: 1, Tuesday: 1, Wedday: 1, thusday: 1, Friday: 1, satDay: 1, sunDay: 1 },
    { monday: 1, Tuesday: 1, Wedday: 1, thusday: 1, Friday: 1, satDay: 1, sunDay: 1 }
  ])
  const WorkWeekUI = ({ name, description, isEdit, isDefauilt, rulesList, workWeekID }) => {
    return (
      <div className="col-md-9">
        <div className="card borderbb">
          <div className="row p-3">
            <div className="col-md-6">
              <h3> {name} </h3>
              <span>Overview</span>
            </div>
            <div className="col-md-6 text-end">
              {!isDefauilt ?
                <button className="btn btn-primary" onClick={handleShow}>
                  Set as Company Default
                </button> : ""}
            </div>
          </div>
          <hr className="opcity" />
          <div className="row"></div>

          <div className="row p-3">
            {isEdit ? (<div className="col-md-8">
              <div>
                <h6>Rule Name</h6>
                <input
                  className="form-control"
                  type="text"
                  maxLength={20}
                  {...register('First_Name', {
                    required: 'Please enter first name',
                    pattern: {
                      value: /^[a-zA-Z_ ]*$/,
                      message: 'Please enter valid first name', // JS only: <p>error message</p> TS only support string
                    },
                  })}
                />
              </div>
              <div>
                <h6>Description</h6>
                <input
                  className="form-control"
                  type="text"
                  maxLength={20}
                  {...register('First_Name', {
                    required: 'Please enter first name',
                    pattern: {
                      value: /^[a-zA-Z_ ]*$/,
                      message: 'Please enter valid first name', // JS only: <p>error message</p> TS only support string
                    },
                  })}
                />
              </div>
              <div className="row mt-2">
                <div className="col-md-12 text-end">
                  <div className="">
                    <button
                      className="btn btn-warning me-1"
                      onClick={() => personalDetailscancel(workWeekID)}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn btn-primary"
                    // onClick={() => savePersonalDetails()}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
            ) :
              <>
                <div className="col-md-8"><div>
                  <h6>Rule Name</h6>
                  <p> {name} </p>
                  <h6>Description</h6>
                  <p> {description} </p>
                </div></div>
                <div className="col-md-4">
                  <div className="editButtonOnright" onClick={() => personalDetailsEdit(workWeekID)}   ><AiOutlineEdit /></div>
                </div>
              </>
            }
          </div>
          <hr className="opcity" />
          <div className="row p-2">
            <div className="col-md-6  ">
              <p className="fw-normal fw-bold me-auto">Rule Settings</p>
            </div>
            <div className="col-md-6">
              {ruleDetailsOnedit ? (
                <div
                  className="editButtonOnright"
                  onClick={() => ruleDetailsEdit()}
                >
                  <AiOutlineEdit />
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
          <div className="row p-3">
            <div className="col-md-12">
              <div>
                <div className="form-check text-end">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckChecked"
                    onChange={(e) => preonboardingChange(e.target.checked)}
                    data-toggle="toggle"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckChecked"
                  >
                    Half Day
                  </label>
                </div>

                {ruleDetailsOnedit ? (
                  <table className="table workweek ">
                    <tr>
                      <th>Week</th>
                      <th>Mon</th>
                      <th>Tue</th>
                      <th>Wed</th>
                      <th>Thu</th>
                      <th>Fri</th>
                      <th>Sat</th>
                      <th>Sun</th>
                    </tr>
                    {rulesList.map((workWeek, i) => {
                      return (
                        <tr key={i}>
                          <td>
                            <span></span>
                            {i + 1}
                          </td>
                          <td
                            onClick={() =>
                              setworkWeeklists(i, 'monday', workWeek.monday + 1)
                            }
                          >
                            {workWeek.monday === 1 ? (
                              <span className="green"></span>
                            ) : workWeek.monday === 2 ? (
                              <span className="red"></span>
                            ) : (
                              <span className="yellow"></span>
                            )}
                          </td>
                          <td
                            onClick={() =>
                              setworkWeeklists(
                                i,
                                'thusday',
                                workWeek.thusday + 1,
                              )
                            }
                          >
                            {workWeek.thusday === 1 ? (
                              <span className="green"></span>
                            ) : workWeek.thusday === 2 ? (
                              <span className="red"></span>
                            ) : (
                              <span className="yellow"></span>
                            )}
                          </td>
                          <td
                            onClick={() =>
                              setworkWeeklists(i, 'Wedday', workWeek.Wedday + 1)
                            }
                          >
                            {workWeek.Wedday === 1 ? (
                              <span className="green"></span>
                            ) : workWeek.Wedday === 2 ? (
                              <span className="red"></span>
                            ) : (
                              <span className="yellow"></span>
                            )}
                          </td>
                          <td
                            onClick={() =>
                              setworkWeeklists(
                                i,
                                'Tuesday',
                                workWeek.Tuesday + 1,
                              )
                            }
                          >
                            {workWeek.Tuesday === 1 ? (
                              <span className="green"></span>
                            ) : workWeek.Tuesday === 2 ? (
                              <span className="red"></span>
                            ) : (
                              <span className="yellow"></span>
                            )}
                          </td>
                          <td
                            onClick={() =>
                              setworkWeeklists(i, 'Friday', workWeek.Friday + 1)
                            }
                          >
                            {workWeek.Friday === 1 ? (
                              <span className="green"></span>
                            ) : workWeek.Friday === 2 ? (
                              <span className="red"></span>
                            ) : (
                              <span className="yellow"></span>
                            )}
                          </td>
                          <td
                            onClick={() =>
                              setworkWeeklists(i, 'satDay', workWeek.satDay + 1)
                            }
                          >
                            {workWeek.satDay === 1 ? (
                              <span className="green"></span>
                            ) : workWeek.satDay === 2 ? (
                              <span className="red"></span>
                            ) : (
                              <span className="yellow"></span>
                            )}
                          </td>
                          <td
                            onClick={() =>
                              setworkWeeklists(i, 'sunDay', workWeek.sunDay + 1)
                            }
                          >
                            {workWeek.sunDay === 1 ? (
                              <span className="green"></span>
                            ) : workWeek.sunDay === 2 ? (
                              <span className="red"></span>
                            ) : (
                              <span className="yellow"></span>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                  </table>
                ) : (
                  ''
                )}

                <ul className="color-container">
                  <li>
                    <div className="color-indicator full"></div>
                    Working Day
                  </li>
                  <li>
                    <div className="color-indicator off"></div>
                    Weekly Off
                  </li>
                  {isworkweek ? (
                    <li>
                      <div className="color-indicator half"></div>
                      Half Day
                    </li>
                  ) : (
                    ''
                  )}
                </ul>
              </div>
              {editButtonClick ? (
                <div className="row mt-2">
                  <div className="col-md-12 text-end">
                    <div className="">
                      <button
                        className="btn btn-warning me-1"
                        onClick={() => ruleDetailsEdit()}
                      >
                        Cancel
                      </button>
                      <button
                        className="btn btn-primary"
                      // onClick={() => savePersonalDetails()}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  
  const onWorkweekListClick = (element, id) => {
    var newListCommon = addNewRuleList.map((rulelist, i) => {
      rulelist.currentShow = false;
      if (id === i) {
        rulelist.currentShow = true;
      }
      return rulelist
    })
    setAddNewRuleList(newListCommon);
  }
  const personalDetailsEdit = (id) => {
    var newRuleLisrsd = addNewRuleList.map((ruleList, i) => {
      if (id === i) {
        ruleList.isEdit = true;
      }
      return ruleList;
    })
    setAddNewRuleList([...newRuleLisrsd]);
  }
  const personalDetailscancel = (id) => {
    var newRuleLisrsd = addNewRuleList.map((ruleList, i) => {
      if (id === i) {
        ruleList.isEdit = false;
      }
      return ruleList;
    })
    setAddNewRuleList([...newRuleLisrsd]);
  }

  const ruleDetailsEdit = () => {
    setRuleDetailsOnedit(ruleDetailsOnedit)
    setEditButtonClick(!editButtonClick)
  }

  const preonboardingChange = (data) => {
    if(editButtonClick === false){
      return false
    }

    setIsworkweek(data)
    var newWorkWeek = WorkweekList
    if (!data) {
      newWorkWeek.map((item, i) => {
        if (item.monday === 3) {
          item.monday = 1
        }
        if (item.Tuesday === 3) {
          item.Tuesday = 1
        }
        if (item.Wedday === 3) {
          item.Wedday = 1
        }
        if (item.thusday === 3) {
          item.thusday = 1
        }
        if (item.Friday === 3) {
          item.Friday = 1
        }
        if (item.satDay === 3) {
          item.satDay = 1
        }
        if (item.sunDay === 3) {
          item.sunDay = 1
        }
        return item
      })
      setworkWeeklists([...newWorkWeek])
    }
  }
  ////////////////////////////////////////////     ASSIGN WORK WEEK                     ////////////////////////////////////////////////////////////////////////////////
  const columns = [
    {
      name: (
        <input
          type="checkbox"
          //  onChange={(e) => selectAllCheckbox(e.target.checked)}
          className="inputcheckbox selectAll"
        />
      ),
      selector: (row, index) => (
        <input
          type="checkbox"
          data-id={index + 1}
          //  onChange={(e) => individualCheckbox(e.target.checked)}
          className="inputcheckbox individualcheckbox"
        />
      ),
      sortable: true,
      style: {
        width: '30px',
      },
    },
    {
      name: <span className="fs-6 fw-bold">ID</span>,
      selector: (row) => row.qualification_type,
      sortable: true,
    },

    {
      name: <span className="fs-6 fw-bold">Emp Name </span>,
      selector: (row) => row.qualification_type,
      sortable: true,
    },
    {
      name: <span className="fs-6 fw-bold">Department </span>,
      selector: (row) => row.course_name,
      sortable: true,
    },
    {
      name: <span className="fs-6 fw-bold">Location</span>,
      selector: (row) => row.course_type,
      sortable: true,
    },
    {
      name: <span className="fs-6 fw-bold">type</span>,
      selector: (row) => row.stream,
      sortable: true,
    },

    {
      name: <span className="fs-6 fw-bold">Rule Apply </span>,
      selector: (row) => row.college_name,
      sortable: true,
    },

    //  {
    //    name: <span className='fs-6 fw-bold'>Action</span>,
    //    cell: (row) => (
    //      <div className='text-center'>
    //        <button
    //          className='btn btn-light m-2 bi bi-pencil-square'
    //          onClick={() => {
    //            //  //reset();
    //            //  clearErrors();
    //            //  setEditId(row.id);
    //            //  setTextDisplay("Update");
    //            //  handleEducationShow();
    //            //  setisEdited(true);
    //            //  onloadvalues(row);
    //          }}>
    //          <AiOutlineEdit />
    //        </button>

    //        <button
    //          className='btn btn-light  text-danger bi bi-trash3'
    //          onClick={() => {
    //            //  setDeleteRowID(row.id);
    //            //  setSmShowe(true);
    //          }}>
    //          <AiOutlineDelete />
    //        </button>
    //      </div>
    //    ),
    //  },
  ]
  const setworkWeeklists = (id, name, value) => {
    var newWorkWeek = WorkweekList

    if (name === 'monday') {
      if (isworkweek) {
        if (value === 4) {
          newWorkWeek[id].monday = 1
        } else {
          newWorkWeek[id].monday = value
        }
      } else {
        if (value === 3) {
          newWorkWeek[id].monday = 1
        } else {
          newWorkWeek[id].monday = value
        }
      }
    }
    if (name === 'Tuesday') {
      if (isworkweek) {
        if (value === 4) {
          newWorkWeek[id].Tuesday = 1
        } else {
          newWorkWeek[id].Tuesday = value
        }
      } else {
        if (value === 3) {
          newWorkWeek[id].Tuesday = 1
        } else {
          newWorkWeek[id].Tuesday = value
        }
      }
    }
    if (name === 'Wedday') {
      if (isworkweek) {
        if (value === 4) {
          newWorkWeek[id].Wedday = 1
        } else {
          newWorkWeek[id].Wedday = value
        }
      } else {
        if (value === 3) {
          newWorkWeek[id].Wedday = 1
        } else {
          newWorkWeek[id].Wedday = value
        }
      }
    }
    if (name === 'thusday') {
      if (isworkweek) {
        if (value === 4) {
          newWorkWeek[id].thusday = 1
        } else {
          newWorkWeek[id].thusday = value
        }
      } else {
        if (value === 3) {
          newWorkWeek[id].thusday = 1
        } else {
          newWorkWeek[id].thusday = value
        }
      }
    }
    if (name === 'Friday') {
      if (isworkweek) {
        if (value === 4) {
          newWorkWeek[id].Friday = 1
        } else {
          newWorkWeek[id].Friday = value
        }
      } else {
        if (value === 3) {
          newWorkWeek[id].Friday = 1
        } else {
          newWorkWeek[id].Friday = value
        }
      }
    }

    if (name === 'satDay') {
      if (isworkweek) {
        if (value === 4) {
          newWorkWeek[id].satDay = 1
        } else {
          newWorkWeek[id].satDay = value
        }
      } else {
        if (value === 3) {
          newWorkWeek[id].satDay = 1
        } else {
          newWorkWeek[id].satDay = value
        }
      }
    }
    if (name === 'sunDay') {
      if (isworkweek) {
        if (value === 4) {
          newWorkWeek[id].sunDay = 1
        } else {
          newWorkWeek[id].sunDay = value
        }
      } else {
        if (value === 3) {
          newWorkWeek[id].sunDay = 1
        } else {
          newWorkWeek[id].sunDay = value
        }
      }
    }

    setWorkweekList([...newWorkWeek])
  }

  // create new rule functionality
  const createNewRule = (value) => {
    setAddNewRuleCondition(true)
    setAddWeekTableCondition(true)
    addNewRuleList.map((list, i) => {
      return list.currentShow = false;
    })
    setAddNewRuleList([...addNewRuleList, { name: 'Custom Rule', description: "This is a 5 days Work Week rule with Weekly off set as Saturday and Sunday.", isDefauilt: false, isHalfDay: false, isEdit: false, AllRuleList: WorkweekList, currentShow: true }])
    console.log(addNewRuleList);
  }
  // removeing rule
  const removeNewRuleList = (id) => {
    let newAllRules = [...addNewRuleList]

    newAllRules.splice(id, 1)

    console.log(newAllRules)
    var newAllRules12 = newAllRules.length;
    var neTaskList = newAllRules.map((rule, i) => {
      if (i + 1 === newAllRules12) {
        rule.currentShow = true;
      }
      return rule;
    })
    console.log(neTaskList)
    setAddNewRuleList(neTaskList)
    //setAddWeekTableCondition(!addWeekTableCondition)
  }
  //copy rule
  const copyNewRule = (data) => {
    addNewRuleList.map((list, i) => {
      return list.currentShow = false;
    })
    setAddNewRuleList([...addNewRuleList, { name: data.name + "_1", description: data.description, isDefauilt: data.isDefauilt, isHalfDay: data.isHalfDay, isEdit: data.isEdit, AllRuleList: data.AllRuleList, currentShow: true }])
  }
  return (
    <>
      <div className="container-fluid">
        <SettingsNav />
      </div>
      <div className="container">
        <div>
          <div>
            <ul className="nav nav-tabs2 borderb">
              <li className="nav-item">
                <a
                  className="nav-link show active"
                  data-toggle="tab"
                  href="#Home-new"
                >
                  Create Work Week
                </a>
              </li>
              <li className="nav-item borderr">
                <a className="nav-link" data-toggle="tab" href="#Profile-new">
                  Assign Work Week
                </a>
              </li>
            </ul>

            <div className="tab-content">
              <div className="tab-pane show active" id="Home-new">
                <div className="row">
                  <div className="col-md-3">
                    <ul className="workWeekstyle">
                      {/* <li className="card p-3 mb-3 borderl">
                        <div className="row">
                          <div className="col-md-8">
                            <label className="title-head">Sunday Off</label>
                            <label className="title-head">No Employees</label>
                          </div>
                          <div className="col-md-4 align-self-center">
                            <IoCopyOutline /> <AiFillDelete />
                          </div>
                        </div>
                      </li> */}
                      {addNewRuleCondition ? (
                        <div>
                          {addNewRuleList.map((element, id) => (
                            <div
                              key={id}

                            >
                              <button
                                className={element.currentShow ? "card p-3 mb-3 borderss" : "card p-3 mb-3 borderl"}

                              >
                                <div className="row">
                                  <div className="col-md-8" onClick={() => onWorkweekListClick(element, id)}>
                                    <label className="title-head" >
                                      {element.name}  {id + 1}
                                    </label>
                                    <label className="title-head">
                                      No Employees
                                    </label>
                                  </div>
                                  <div className="col-md-4 align-self-center">
                                    <IoCopyOutline
                                      onClick={() => copyNewRule(element)}
                                    />
                                    <AiFillDelete
                                      onClick={() => {
                                        removeNewRuleList(id)
                                      }}
                                    />
                                  </div>
                                </div>
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        ''
                      )}
                    </ul>
                    <div className="row">
                      <div className="col-md-12 workWeekSelect">
                        <button
                          className="btn"
                          onClick={() => createNewRule()}
                        >
                          Create New Rule
                        </button>
                      </div>
                    </div>
                  </div>
                  {addWeekTableCondition ?
                    addNewRuleList.map((newRule, i) => {
                      return (

                        newRule.currentShow ? <WorkWeekUI key={i} name={newRule.name + (i + 1)} description={newRule.description} isEdit={newRule.isEdit} isDefauilt={newRule.isDefauilt} isHalfDay={newRule.isHalfDay} rulesList={newRule.AllRuleList} workWeekID={i} /> : ""
                      )
                    })
                    : ''}
                </div>
              </div>

              <div className="tab-pane " id="Profile-new">
                <div className="row">
                  <div className="col-md-12">
                    <div className="d-flex">
                      <button
                        className="btn btn-primary me-3"
                        onClick={handleShowAssign}
                      >
                        <BsFillBagCheckFill />
                      </button>
                      <div
                        className="align-self-center"
                        onClick={handleShowAssign}
                      >
                        Assign Bulk
                      </div>
                    </div>
                    <DataTable
                      columns={columns}
                      // data={list}
                      data={filteredAdminstation}
                      pagination
                      fixedHeader
                      fixedHeaderScrollHeight="450px"
                      fixedHeaderScrollWidth="50px"
                      highlightOnHover
                      subHeader
                      subHeaderComponent={
                        <input
                          type="text"
                          className="form-control w-25"
                          placeholder="Search"
                        // onChange={(e) => setSearch(e.target.value)}
                        />
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Your Action</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This action will set this workweek rule as a default rule for the
          entire company. Are you sure?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary">Yes</Button>
        </Modal.Footer>
      </Modal>
      {/* ////////////////////////////////////////////////////////////////////////////////////////////              Assign  work week ///////////////////////////// */}
      <Modal show={showAssign} onHide={handleCloseAssign} centered>
        {/* <Modal.Header closeButton>
          <Modal.Title>Confirm Your Action</Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
          <div className="text-center ">
            <AiOutlineExclamationCircle className="fns mb-3" />
            <h5>Info</h5> <p>Select at least One Employee</p>
          </div>
        </Modal.Body>
        <div className="text-center p-3">
          <button className="btn btn-primary" onClick={handleCloseAssign}>
            Yes
          </button>
          {/* <Button variant='primary'>Yes</Button> */}
        </div>
      </Modal>
    </>
  )
}

export default Workweeksett
