import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from "axios";
import { AiOutlineDelete } from 'react-icons/ai';
const MyProfileTeam = ({ employeeID }) => {
    const { register, formState: { errors }, getValues, setValue, } = useForm();
    const [addReportingManager, setAddReportingManager] = useState(false)
    const [errorsTodisplay, seterrorsTodisplay] = useState("")
    const [addReportingManagerList, setAddReportingManagerList] = useState([]);
    const [managerTypes, setManagerTypes] = useState([]);
    const [CompanyEmployess, setCompanyEmployess] = useState([]);
    const [reportingManagerList, setreportingManagerList] = useState([{ manager: {}, managerType: {} }]);
    const getManagerTypes = async (num) => {
        try {
            const response = await axios.get(`/api/directory/manager/type/`)
            if (response.data){
                if (num === 1){
                    response.data.map((managertyp, i)=>{
                        if (managertyp.id !== 1) {
                            setManagerTypes([managertyp])
                        }
                        return managertyp;
                    })
                }
                if (num === 2) {
                    setManagerTypes(response.data)
                }
            }
            
        } catch (error) {
            console.log('not found')
        }
    }
    const getReportingManagers = async () => {
        try {
            const response = await axios.get(`/api/directory/employee/manager/${employeeID}`)
            
            if (response.data.length !== 0){
                response.data.map((item, i) => {
                    if (item.managerType.id === 1) {
                        getManagerTypes(1);
                    }
                    return item;
                })
            }else{
                getManagerTypes(2);
            }
            setreportingManagerList(response.data)
            
        } catch (error) {
            getManagerTypes(2);
            console.log('not found')
        }
    }
    const getCompanyEmployess = async () => {
        var userinfo = JSON.parse(sessionStorage.getItem('user-info'));
        try {
            const response = await axios.get(`/api/directory/get/employee/${userinfo.data.id}/`)
            setCompanyEmployess(response.data)
        } catch (error) {
            console.log('not found')
        }
    }
    const saveReportingManager = async () => {
        seterrorsTodisplay("")
        var req = {
            managerType: getValues('managerType'),
            manager: getValues('manager'),
            employee: employeeID
        }
        if (getValues('managerType') && getValues('manager')){
            try {
                const response = await axios.post(`/api/directory/employee/manager/`, req)
                setAddReportingManager(false)
                getReportingManagers(response.data)
                setAddReportingManagerList([])
                setValue("manager", "")
                setValue("managerType", "")

            } catch (error) {
                if (error.response.data.data.error){
                    seterrorsTodisplay(error.response.data.data.error)
                }
                
                console.log('not found')
            }
        }else{
            seterrorsTodisplay("Please select manager and manager type")
        }
    }
    const getReportingManagerCancel = () => {
        setAddReportingManager(!addReportingManager)
        setAddReportingManagerList([])
    }
    const handleAdd = () => {
        setAddReportingManager(true)
        setAddReportingManagerList([...addReportingManagerList, { name: '' }])
    }
    const removeReportingManager = (id) => {
        let newReportingManagers = [...addReportingManagerList]
        newReportingManagers.splice(id, 1)
        setAddReportingManagerList(newReportingManagers)
    }
    const deleteManagerFromhere = async (id) =>{
        try {
            const response = await axios.patch(`/api/directory/update/employee/manager/${id}/`, { "isDeleted": true })
            setAddReportingManager(false)
            getReportingManagers(response.data)
            setAddReportingManagerList([])
            setValue("manager", "")
            setValue("managerType", "")

        } catch (error) {
            if (error.response.data.data.error) {
                seterrorsTodisplay(error.response.data.data.error)
            }

            console.log('not found')
        }
    }
    useEffect(() => {
        //getManagerTypes();
        getCompanyEmployess();
        getReportingManagers();
    }, [])
    return (
        <>
            <div className="borderwithline mt-3">
                <strong>REPORTING MANAGER</strong>
            </div>
            <div className="row borderwithshadow" style={{ margin: 0 }}>
                <table className="table">
                    <thead className="gray">
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Type</th>
                            <th scope="col">Department</th>
                            <th scope="col">Designation</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="table table-striped">
                        {reportingManagerList.map((manager,i)=>{
                            return (
                                <tr key={i}>
                                    <td>{manager.manager.name}</td>
                                    <td>{manager.managerType.value}</td>
                                    <td>{manager.manager.department}</td>
                                    <td>{manager.manager.designation}</td>
                                    <td><div onClick={() => deleteManagerFromhere(manager.id)}><AiOutlineDelete /></div></td>
                                </tr>
                            )
                        })}
                        
                    </tbody>
                </table>
                {addReportingManager ? (
                    <div>
                        <div>
                            {addReportingManagerList.map((element, id) => (
                                <div key={element}>
                                    <div className="p-2 flex-grow-1 bd-highlight">
                                        <div className="row">
                                            <div className="col-md-4 marginbottom15">
                                                <select
                                                    name="manager"
                                                    className="form-control "
                                                    {...register('manager', {
                                                        required: 'this field required',
                                                    })}
                                                >
                                                    <option value="">
                                                        -- Select Manager  --
                                                    </option>
                                                    {CompanyEmployess.map((employee, i)=>{
                                                        
                                                        if (id !== employee.id) {
                                                            return <option key={i} value={employee.id}>{employee.name}</option>
                                                        }else{
                                                            return null;
                                                        }
                                                    })}
                                                </select>
                                                {errors.manager && (
                                                    <small className="text-danger">
                                                        {errors.manager.message}
                                                    </small>
                                                )}
                                            </div>
                                            <div className="col-md-4 marginbottom15">
                                                <select
                                                    name="HouseType"
                                                    className="form-control "
                                                    {...register('managerType', {
                                                        required: 'this field required',
                                                    })}
                                                >
                                                    <option value="">-- Type --</option>
                                                    {managerTypes.map((types, i) => {
                                                        return (<option key={i} value={types.id}>{types.value}</option>)
                                                    })}
                                                </select>
                                                {errors.selectEmployee && (
                                                    <small className="text-danger">
                                                        {errors.selectEmployee.message}
                                                    </small>
                                                )}
                                            </div>

                                            <div className="col-md-2 "></div>
                                            
                                            <div className="col-md-2 m-auto">
                                                
                                                <button
                                                    className="btn btn-danger "
                                                    onClick={() => {
                                                        removeReportingManager(id)
                                                    }}
                                                >
                                                    remove
                                                </button>
                                            </div>
                                            <div className="text-danger">
                                                {errorsTodisplay}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="text-right m-3 ">
                            <button
                                className="btn btn-primary me-3 "
                                onClick={() => getReportingManagerCancel()}
                            >
                                Cancel
                            </button>
                            <button className="btn btn-primary me-3 " onClick={()=>saveReportingManager()}>
                                Save
                            </button>
                        </div>
                    </div>
                ) : (
                    ''
                )}
                <div className="row mt-1" style={{ margin: 0 }}>
                    <div className="">
                        <button
                            className="btn btn-primary"
                            onClick={() => handleAdd()}
                        >
                            ADD
                        </button>
                    </div>
                </div>
            </div>
            <br />
            {/*  */}
            <div className="row" style={{ margin: 0 }}>
                <div className="borderwithline">
                    <strong>DIRECT REPORTS</strong>
                </div>
            </div>
            <div className="row borderwithshadow" style={{ margin: 0 }}>
                <table className="table">
                    <thead className="gray">
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Department</th>
                            <th scope="col">Designation</th>
                        </tr>
                    </thead>
                    <tbody className="table table-striped">
                        <tr>
                            <td >-</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}
export default MyProfileTeam;