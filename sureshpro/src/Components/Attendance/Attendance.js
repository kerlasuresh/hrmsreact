import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import DataTable from "react-data-table-component";
import Header from "../Dashboard/Header";
import AttendanceNav from "./AttendanceNav";
import { AiOutlineSearch, AiOutlineReload } from "react-icons/ai";
import { GlobalContext } from '../../Context/ThemeContext';
function Attendance() {
    const user = useContext(GlobalContext);

    document.title = "HRMS | Attendance";
    const [attendanceList, setAttendanceList] = useState([]);
    const [filterattendanceList, setFilterAttendanceList] = useState([]);
    const [departmentsList, setDepartmentsList] = useState([]);
    const [listEmployes, setListEmployes] = useState([]);
    const [department, setDepartment] = useState("");
    const [employee, setEmployee] = useState("");
    const [search, setSearch] = useState([" "]);
    const [fromDate, setFromDate] = useState();
    const [toDate, setToDate] = useState();
    const [loader, setLoader] = useState(false);
    const columns = [
        {
            name: <span className='fs-6 fw-bold'>S.No</span>,
            selector: (row) => row.Num,

            sortable: true,
        },
        {
            name: <span className='fs-6  wrdsp '>Emp Code</span>,
            selector: (row) => row.emp_code,
            sortable: true,
        },
        {
            name: <span className='fs-6  wrdsp'>Employee</span>,
            selector: (row) => row.employee,
            sortable: true,
        },
        {
            name: <span className='fs-6 '>Work Location</span>,
            selector: (row) => row.work_location,
            sortable: true,
        },
        {
            name: <span className='fs-6 '>Department</span>,
            selector: (row) => row.department,
            sortable: true,
        },
        {
            name: <span className='fs-6 '>Check In Date</span>,
            selector: (row) => row.log_in_date,
            sortable: true,
        },
        {
            name: <span className='fs-6 '>Check Out Date</span>,
            selector: (row) => row.log_in_date,
            sortable: true,
        },
        {
            name: <span className='fs-6 '>Check In Time</span>,
            selector: (row) => row.log_in_time,
            sortable: true,
        },
        {
            name: <span className='fs-6 '>Check Out Time</span>,
            selector: (row) => row.log_out_time,
            sortable: true,
        },
        {
            name: <span className='fs-6 '>Total no of Hours</span>,
            selector: (row) => row.total_hr_spent,
            sortable: true,
        },

        {
            name: <span className='fs-6 '>Status</span>,
            cell: (row) => row.status ? (

                <div className='text-center'>
                    <button type="button" className="btn btn-outline-primary">{row.status}</button>
                </div>
            ) : "",
        },
    ];
    const getAttendanceList = async () => {
        setLoader(false)
        try {
            const response = await axios.get("/api/user/attendance_get/");
            response.data.map((item, i) => {
                item.Num = i + 1;
                return item;
            })
            setAttendanceList(response.data);
            setFilterAttendanceList(response.data);
            setLoader(true)
        } catch (error) { setLoader(true) }
    };
    const getemployeeList = async () => {
        try {
            const response = await axios.get("/api/user/get_allemployeedata/");
            setListEmployes(response.data);
        } catch (error) {
            console.log("not found");
            setListEmployes([]);
        }
    };
    const getdepartments = async () => {
        await axios.get("/get_department/ ")
            .then(result => { setDepartmentsList(result.data) })
            .catch(err => {
                console.log(err)
            });
    };
    useEffect(() => {
        const result = filterattendanceList.filter((attendance) => {
            return (
                attendance.emp_code.toLowerCase().match(search.toLowerCase()) ||
                attendance.employee.toLowerCase().match(search.toLowerCase()) ||
                attendance.status.toLowerCase().match(search.toLowerCase()) ||
                attendance.work_location.toLowerCase().match(search.toLowerCase()) ||
                attendance.department.toLowerCase().match(search.toLowerCase())
            );
        });
        setAttendanceList(result);
    }, [search]);
    useEffect(() => {
        getAttendanceList();
        getdepartments();
        getemployeeList();
        console.log(user);
    }, []);
    const searchwithfilters = async () => {
        let req = {
            "af_department": department,
            "af_emp_code": employee,
            "af_from_date": fromDate ? fromDate : "",
            "af_to_date": toDate ? toDate : ""
        }
        await axios.post("/api/user/attendance_advancedfilter/", req)
            .then(result => {
                result.data.map((item, i) => {
                    item.Num = i + 1;
                    return item;
                });
                setAttendanceList(result.data);
            })
            .catch(err => {
                console.log(err)
            });
    }
    const refreshPageDefalut = () => {
        setDepartment("");
        setEmployee("");
        setFromDate("");
        setToDate("");
        getAttendanceList();
    }
    return (
        <>
            <div className="container-fluid">
                <AttendanceNav />
            </div>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <div className="row mt-4">
                            <div className='col-md-3'>
                                <select className='mdb-select md-form form-control' searchable='Search here..' value={department} onChange={(e) => setDepartment(e.target.value)}>
                                    <option value=''>
                                        Select Department
                                    </option>
                                    {departmentsList.map((item) => {
                                        return <option value={item.id} key={item.id}>{item.department_name1}</option>
                                    })}
                                </select>
                            </div>
                            <div className='col-md-3'>
                                <select className='mdb-select md-form form-control' searchable='Search here..' value={employee} onChange={(e) => setEmployee(e.target.value)}>
                                    <option value='' disabled selected>
                                        Select Employee
                                    </option>
                                    {listEmployes.map((item) => {
                                        return <option value={item.Emp_Id} key={item.id}>{item.First_Name}</option>
                                    })}
                                </select>
                            </div>
                            <div className='col-md-3'>
                                <input type='date' className="form-control" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
                            </div>
                            <div className='col-md-3'>
                                <input type='date' className="form-control" value={toDate} onChange={(e) => setToDate(e.target.value)} />
                            </div>
                            <div className="col-md-4">
                                <button className="btn btn-primary md-form-buttom" onClick={searchwithfilters}><AiOutlineSearch /> Search</button>
                                <button className="btn btn-success md-form-buttom" onClick={refreshPageDefalut}><AiOutlineReload /> Refresh</button>
                            </div>
                        </div>
                        {loader ?
                            <DataTable
                                columns={columns}
                                data={attendanceList}
                                pagination
                                fixedHeader
                                scrollX='true'
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
                            /> : <div className="text-center"><div className="spinner-border " role="status">
                                <span className="sr-only">Loading...</span>
                            </div></div>}
                    </div>
                </div>
            </div>
        </>
    );
}
export default Attendance;
