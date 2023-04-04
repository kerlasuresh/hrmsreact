import React, { useEffect, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { Link, NavLink } from 'react-router-dom'
import axios from "axios";
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { FcAddImage } from 'react-icons/fc';
const EmployeeInnerNav = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const location = useLocation();
  const [clockIn, setClockIn] = useState(true)
  const [clockOut, setClockOut] = useState(false)
  const [EmployeeImage, setEmployeeImage] = useState("")
  const webClockIn = () => {
    setClockIn(false)
    setClockOut(true)
  }
  const webClockOut = () => {
    setClockOut(false)
    setClockIn(true)
  }
  const getEmployeeDetails = async () => {
    await axios
      .get(`/api/directory/get_update/employee/${id}/`)
      .then((result) => {
        if (result.data.employeeImage){
          setEmployeeImage(result.data.employeeImage)
        }
      })
      .catch((err) => {
        console.log('errors', err)
      })
  }
  const uploadimagetoServer = async (data) => {
    if (data.target.files[0]){
      const formData = new FormData();
      formData.append("employeeImage", data.target.files[0]);
   
    
   
    await axios
      .patch(`/api/directory/get_update/employee/${id}/`, formData)
      .then((result) => {
        getEmployeeDetails()
      })
      .catch((err) => {
        console.log('errors', err)
      })
    }
  }
  useEffect(()=>{
    getEmployeeDetails();
  }, [])
  return (
    <>
      <div className='row' style={{ background: "#0b0b45" }}>
        <div className='navbar navbar-expand-lg'>
          <div className='container'>
            <div className='row' style={{width:"100%"}}>
              <div className='col-md-8'>
                <h4 className='text-white'>Employee Details</h4>
                <div className='collapse navbar-collapse' id='navbarNav'>
                  <ul className='navbar-nav'>
                    {/* <li className="nav-item">
                      <NavLink className="nav-link text-white" to="/addemp" activeclassname="active">
                        Add Employee
                      </NavLink>
                    </li> */}
                    <li className='nav-item' >
                      <NavLink
                        className='nav-link text-white'
                        to='/directory'>
                        Directory
                      </NavLink>
                    </li>
                    {/* <li className='nav-item' >
                      <NavLink
                        className='nav-link text-white'
                        to='/importemployee' activeclassname="active">
                        Import Employee Data
                      </NavLink>
                    </li>
                    <li className='nav-item'>
                      <NavLink className='nav-link text-white' to='/education' activeclassname="active">
                        Education
                      </NavLink>
                    </li>
                    <li className='nav-item' disabled>
                      <NavLink className='nav-link text-white' to='/family' activeclassname="active">
                        Family
                      </NavLink>
                    </li>
                    
                    <li className='nav-item' disabled>
                      <NavLink className='nav-link text-white' to='/documents' activeclassname="active">
                        Documents
                      </NavLink>
                    </li>
                    <li className='nav-item' disabled>
                      <NavLink className='nav-link text-white' to='/workweek' activeclassname="active">
                        Work Week
                      </NavLink>
                    </li> */}
                    {/* <li className='nav-item' disabled>
                      <Link className='nav-link text-white' to='/empdocument'>
                        Document
                      </Link>
                    </li> */}
                  </ul>
                </div>
              </div>
              {!id ? 
              <div className='col-md-4 text-end'>
                <div className='addEmployeeButton'>
                  <NavLink className="nav-link text-white" to="/addemp" activeclassname="active">
                  <div className="addButtonshow"><AiOutlinePlus /></div>
                  <div className='AddEmployeeText'>Add Employee</div>
                  </NavLink>
                </div>
              </div>: 
              <div className='col-md-4 text-end employeeimage'>
                  {EmployeeImage ? 
                  <div className='empBackground'><img src={EmployeeImage} className='employeeProfileImg' />
                      <div className="border border-success fileUploader text-center " htmlFor="input-file-upload" >
                        <div className="display-4"><FcAddImage /> </div>
                        <input type="file" onChange={(e) => uploadimagetoServer(e)} accept="image/png, image/jpeg" className='fileUpload' id="input-file-upload" />

                      </div>
                  </div> :

                  <div className="border border-success fileUploader text-center " htmlFor="input-file-upload" >
                    <div className="display-4"><FcAddImage /> </div>
                    <input type="file" onChange={(e) => uploadimagetoServer(e)} accept="image/png, image/jpeg" className='fileUpload' id="input-file-upload" />
                  </div>
                  }

                  
              </div>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default EmployeeInnerNav
