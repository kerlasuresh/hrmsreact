import React from 'react'
import ParticularEmpDocuments from '../MyProfile/ParticularEmpDocuments'
import EmployeeInnerNav from './EmployeeInnerNav'
import { useParams } from 'react-router-dom'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import PropTypes from 'prop-types'
import MyProfileFamily from '../MyProfile/Family';
import MyProfileEducation from '../MyProfile/Education';
import MyProfilePersonal from '../MyProfile/Personal';
import MyProfileWork from '../MyProfile/Work';
import MyProfileTeam from '../MyProfile/ReportingManager';
import MyProfileFileManager from '../MyProfile/FileManager';
function TabPanel(props) {
  const { children, value, index, ...other } = props
  return (
    <div role="tabpanel" hidden={value !== index}  id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other} >
      {value === index && (
        <Box> 
         {children}
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

function a11yProps(index) {
  return { id: `simple-tab-${index}`, 'aria-controls': `simple-tabpanel-${index}`}
}
function ViewEmployee() {
  document.title = "HRMS | View Employee";
  const [value, setValues] = React.useState(0)
  const { id } = useParams()
  const handleChange = (event, newValue) => {
    setValues(newValue)
  }
  return (
    <>
      <div className="container-fluid">
        <EmployeeInnerNav />
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="NewViewInfo">
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                  >
                    <Tab label="Personal" {...a11yProps(0)} />
                    <Tab label="Work" {...a11yProps(1)} />
                    <Tab label="Team" {...a11yProps(2)} />
                    <Tab label="Education" {...a11yProps(3)} />
                    <Tab label="Family" {...a11yProps(4)} />
                    <Tab label="Documents" {...a11yProps(5)} />
                    <Tab label="Work Week" {...a11yProps(6)} />
                    <Tab label="Attendance" {...a11yProps(7)} />
                    <Tab label="Leave" {...a11yProps(8)} />
                    <Tab label="Payroll" {...a11yProps(9)} />
                    <Tab label="File Manager" {...a11yProps(10)} />
                  </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                  <MyProfilePersonal employeeID={id} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <MyProfileWork employeeID={id} />
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <MyProfileTeam employeeID={id} />
                  
                </TabPanel>
                <TabPanel value={value} index={3}>
                  <MyProfileEducation employeeID={id} />
                </TabPanel>
                <TabPanel value={value} index={4}>
                  <MyProfileFamily employeeID={id} />
                </TabPanel>
                <TabPanel value={value} index={5}>
                  <ParticularEmpDocuments />
                </TabPanel>
                <TabPanel value={value} index={6}>
                  <div className="">
                    <div className="card p-3 mt-4">
                      <h3 className="fw-bold"> Saturday Sunday Off </h3> <br />
                      <div>
                        <div className="fw-normal fw-bold ">Description</div>
                        <div>
                          This is a 5 days Work Week rule with Weekly off set as
                          Saturday and Sunday.
                        </div>
                      </div>
                      <div>
                        <div className="fw-normal fw-bold">Effective Date</div>
                        <div>01 Jan, 2023</div>
                      </div>
                      <hr />
                      <div className="d-flex bd-highlight  ">
                        <p className="fw-normal fw-bold me-auto">
                          Rule Settings1
                        </p>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckChecked"
                            
                          />
                          <label
                            className="form-check-label"
                            for="flexCheckChecked"
                          >
                            Half Day
                          </label>
                        </div>
                      </div>
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

                         <tr>
                          <td><span></span>1</td>
                          <td><span className="green"></span></td>
                          <td><span className="green"></span></td>
                          <td><span className="green"></span></td>
                          <td><span className="green"></span> </td>
                          <td><span className="red"></span></td>
                          <td><span className="red"></span></td>
                        </tr>
                       <tr>
                          <td><span></span>2</td>
                          <td><span className="green"></span></td>
                          <td><span className="green"></span></td>
                          <td><span className="green"></span></td>
                          <td><span className="green"></span> </td>
                          <td><span className="red"></span></td>
                          <td><span className="red"></span></td>
                        </tr>
                         <tr>
                          <td><span></span>3</td>
                          <td><span className="green"></span></td>
                          <td><span className="green"></span></td>
                          <td><span className="green"></span></td>
                          <td><span className="green"></span> </td>
                          <td><span className="red"></span></td>
                          <td><span className="red"></span></td>
                        </tr>
                         <tr>
                          <td><span></span>4</td>
                          <td><span className="green"></span></td>
                          <td><span className="green"></span></td>
                          <td><span className="green"></span></td>
                          <td><span className="green"></span> </td>
                          <td><span className="red"></span></td>
                          <td><span className="red"></span></td>
                        </tr>
                       <tr>
                          <td><span></span>5</td>
                          <td><span className="green"></span></td>
                          <td><span className="green"></span></td>
                          <td><span className="green"></span></td>
                          <td><span className="green"></span> </td>
                          <td><span className="red"></span></td>
                          <td><span className="red"></span></td>
                        </tr>
                      </table>
                      <ul className="color-container">
                        <li>
                          <div className="color-indicator full"></div>Working
                          Day
                        </li>
                        <li>
                          <div className="color-indicator off"></div>Weekly Off
                        </li>
                        <li>
                          <div className="color-indicator half"></div> Half Day
                        </li>
                      </ul>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel value={value} index={7}>
                  Attendance
                </TabPanel>
                <TabPanel value={value} index={8}>
                  Leave
                </TabPanel>
                <TabPanel value={value} index={9}>
                  Payroll
                </TabPanel>
                <TabPanel value={value} index={10}>
                  <MyProfileFileManager employeeID={id} />
                </TabPanel>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ViewEmployee
