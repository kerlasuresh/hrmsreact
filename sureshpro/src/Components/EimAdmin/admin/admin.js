import React, { useEffect, useState } from "react";
import axios from "axios";
import DepartmentInnerNav from "../InnerNav/DepartmentInnerNav";
import { useForm } from "react-hook-form";
import { AiOutlineClose } from 'react-icons/ai'
import Modal from "react-bootstrap/Modal";
import { FcOk } from "react-icons/fc";
const Admin = () => {
  document.title = "HRMS | Admin";
  const [AdminRoles, setAdminRoles] = useState([]);
  const [removeRoleEmployeeset, setremoveRoleEmployeeset] = useState({});
  const [userRole, setUserRole] = useState("");
  const [confirmRemoveRole, setconfirmRemoveRole] = useState(false);
  const [employee, setemployee] = useState([]);
  const [userId,setuserId]= useState ()
  const {
    register,
    getValues,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors, isValid },
  } = useForm({ mode: "all" });
  const getAdminRoles = async () => {
    var userinfo = JSON.parse(sessionStorage.getItem("user-info"));
    await axios.get(`/api/user/company/roles/${userinfo.data.id}`).then((resp) => {
        setAdminRoles(resp.data);
      })
      .catch((err) => {
        console.log("error resp", err);
      });
  };
  const setIsnext = () => {
    setUserRole("");
  };
  const AddCEO = (roletype, id) => {
    setValue('roleID', id);
    // setValue('employee', "");
    setUserRole(roletype);
  };
  useEffect(() => {
    getAdminRoles();
    getEmplyee();
  }, []);

  const onSubmit = async (data) => {
    const id = getValues('roleID');
    var req = {
      employee: getValues('employee')
    };
    await axios
      .patch(`/api/user/roles/${id}/`, req)
      .then((result) => {
        if (result.data){
          setUserRole("");
          getAdminRoles();
        }
      })
      .catch((err) => {
        console.log("error resp", err);
      });
  };

  const getEmplyee = async () => {
    var userinfo = JSON.parse(sessionStorage.getItem("user-info"));
    try {
      const response = await axios.get(
        `/api/directory/get/employee/${userinfo.data.id}/`
      );
      setemployee(response.data);
    } catch (error) {
      console.log("not found");
    }
  };
  const removeRoleEmployee = async () => {
    var req = {
      employee: removeRoleEmployeeset.employeeID,
      deleteRole:true,
    };
    if (removeRoleEmployeeset.employeeID && removeRoleEmployeeset.roleid){
      await axios
      .patch(`/api/user/roles/${removeRoleEmployeeset.roleid}/`, req)
      .then((result) => {
        if (result.data) {
          setconfirmRemoveRole(false)
          setUserRole("");
          getAdminRoles();
        }
      })
      .catch((err) => {
        console.log("error resp", err);
      });
    }
  }
  return (
    <>
      <div className='container-fluid'>
        <DepartmentInnerNav />
        <div className='container'>
          <div className='row'>
            <div className='col-md-12 mt-4'>
              {AdminRoles.map((role, i) => {
                return (
                  <div className='card mb-4' key={i}>
                    <h5 className='card-header'>{role.name}</h5>
                    <div className='card-body'>
                      <p className='card-text'>{role.description}</p>

                      <div className="employesList">
                      {role.employees.map((employee,i)=>{
                        return (<p className="employeRole" key={i}>{employee.firstName} <span className="removeEmployeeRole" onClick={() => { setremoveRoleEmployeeset({ "roleid": role.id, "employeeID":employee.id}); setconfirmRemoveRole(true)}}><AiOutlineClose /></span></p>)
                      })}
                      </div>
                      <button
                        className='btn btn-primary'
                        onClick={() => AddCEO(role.name, role.id)}>
                        Add
                      </button>

                      <br />
                      <br />
                      {userRole === role.name ? (
                        <>
                          {/* <from onSubmit={handleSubmit(onSubmit)}> */}
                            <div className='form-group'>
                              <label htmlFor='exampleInputEmail1'>
                                Employee
                              </label>
                              <select
                              
                                className='form-control'
                                   {...register("employee")}
                              >
                                <option value=''>-- Select employee --</option>
                                {employee.map((item, i) => {
                                  return (
                                    <option value={item.id} key={i}>
                                      {item.name}
                                    </option>
                                  );
                                })}
                              </select>
                              <input type="hidden" {...register("roleID")} value={role.id} className="hide" />
                              {/* <label htmlFor="exampleInputEmail1">Find Name</label>
                                                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Find Name" /> */}
                              {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                            </div>

                            <div className='col-md-12'>
                              <div className='text-right'>
                                <button
                                  className='btn btn-light'
                                  onClick={() => setIsnext(false)}>
                                  Back
                                </button>{" "}
                                &nbsp;
                                <button
                                  type='submit'
                                className='btn btn-primary' onClick={() => onSubmit()}>
                                  Save 
                                </button>
                              </div>
                            </div>
                          {/* </from> */}
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Modal
        size='md'
        show={confirmRemoveRole}
        onHide={() => setconfirmRemoveRole(false)}
        className='text-center'>
        <Modal.Header closeButton>Delete Confirmation</Modal.Header>
        <h4 className='text-center'>Are you sure you want to remove Admin access for this user?</h4>
        <div className='text-center m-3'>
          <button className='btn btn-primary me-3' onClick={() => { setconfirmRemoveRole(false); }}> Cancel </button>
          <button className='btn btn-primary' onClick={() => { removeRoleEmployee(); }}> OK</button>
        </div>
      </Modal>
    </>
  );
};

export default Admin;
