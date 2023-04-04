import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

import { AiOutlineEdit } from "react-icons/ai";
// import { Link } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
// import { AiOutlineDelete } from "react-icons/ai";

import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LeaveInnerNav from "../InnerNav/LeaveInnerNav";

const LeaveManagelogs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => alert(JSON.stringify(data));
  const [date, setDate] = useState();
  const [datet, setDatet] = useState();

  const [search, setSearch] = useState([" "]);
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setFormValues({});
  };
  const [smShow, setSmShow] = useState(false);

  const getCountries = async () => {
    try {
      const response = await axios.get("https://restcountries.com/v2/all");
      setCountries(response.data);
      setFilteredCountries(response.data);
    } catch (error) {
      console.log("not found");
    }
  };

  const columns = [
    {
      name: <span className='h6 fw-bold'>S.No</span>,
      selector: (row) => row.callingCodes,
      sortable: true,
    },
    {
      name: <span className='h6 fw-bold'>Employee Name</span>,
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: <span className='h6 fw-bold'>Department</span>,
      selector: (row) => row.alpha2Code,
      sortable: true,
    },

    {
      name: <span className='h6 fw-bold'>Type</span>,
      selector: (row) => row.capital,
      sortable: true,
    },
    {
      name: <span className='h6 fw-bold'>Start Date</span>,
      selector: (row) => row.subregion,
      sortable: true,
    },
    {
      name: <span className='h6 fw-bold'>End Date</span>,
      selector: (row) => row.population,
      sortable: true,
    },
    {
      name: <span className='h6 fw-bold'>Status</span>,
      selector: (row) => row.capital,
      sortable: true,
    },

    {
      name: <span className='h6 fw-bold'>Action</span>,
      cell: (row) => (
        <div className='text-center'>
          <button
            className='btn btn-light m-2 bi bi-pencil-square'
            onClick={handleShow}>
            <AiOutlineEdit />
          </button>

          <button
            className='btn btn-light  text-danger bi bi-trash3'
            onClick={() => setSmShow(true)}>
            <AiFillDelete />
          </button>
        </div>
      ),
    },
  ];
  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    const result = countries.filter((country) => {
      return country.name.toLowerCase().match(search.toLowerCase());
    });
    setFilteredCountries(result);
  }, [search]);
  const [formValues, setFormValues] = useState();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const deleteRow = () => {
    console.log(countries.size);
    countries.slice(0, 1);
    setCountries(countries);
    setSmShow(false);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);

  const onClear = () => {
    setFormValues();
  };

  return (
    <>
      <div className="container-fluid">
        <LeaveInnerNav />
        <div className='container'>
          <DataTable
            columns={columns}
            data={filteredCountries}
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
        </div>
      </div>
      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton className='center'>
          <Modal.Title className='text-center'>Logs</Modal.Title>
        </Modal.Header>
        <Form className='p-4' onSubmit={handleSubmit(onSubmit)}>
          <div className='row'>
            <div className='col-md-12'>
              <label>Employee Name</label>
              <input
                type=''
                className='form-control'
                name='employee'
                {...register("employee", {
                  required: "Employee is required",
                })}></input>
            </div>
            <div>
              {errors.employee && (
                <span className='text-danger'>{errors.employee.message}</span>
              )}
            </div>
          </div>

          <div class='row mb-3'>
            <div class='col-md-12'>
              <div class='form-group'>
                <label for='address_id'>
                  Department<span class='asterisk'></span>
                </label>
                <select
                  name='department'
                  className='form-control'
                  {...register("department", {
                    required: "Department is required",
                  })}>
                  <option value=''>--Select Department Type -- </option>
                  <option value='Developer'>Developer</option>
                  <option value='Degital'>Degital</option>
                  <option value='Sales'>Sales </option>
                  <option value='Support'>Support</option>
                  <option value='HR'>HR</option>
                </select>
              </div>
            </div>
            <div>
              {errors.department && (
                <span className='text-danger'>{errors.department.message}</span>
              )}
            </div>
          </div>

          <div class='row mb-3'>
            <div class='col-md-12'>
              <div class='form-group'>
                <label for='address_id'>
                  Type<span class='asterisk'></span>
                </label>
                <select
                  name='type'
                  className='form-control'
                  {...register("type", { required: "Type is required" })}>
                  <option value=''>--Select Leave Type -- </option>
                  <option value='Paid'>Paid Leave</option>
                  <option value='Planned'>Planned Leave </option>
                  <option value='Maternity'>Maternity Leave</option>
                  <option value='Regular'>Regular leaves</option>
                  <option value='VACATION'>VACATION TYPE </option>
                </select>
              </div>
            </div>
            <div>
              {errors.type && (
                <span className='text-danger'>{errors.type.message}</span>
              )}
            </div>
          </div>

          <div class='row mb-3'>
            <div class='col-md-12'>
              <label for='address_id'>
                Start Date<span class='asterisk'></span>
              </label>
              <DatePicker
                className='form-control'
                name='start'
                selected={date}
                onChange={(date) => setDate(date)}
              />
            </div>
            <div>
              {errors.start && (
                <span className='text-danger'>{errors.start.message}</span>
              )}
            </div>
          </div>

          <div class='row mb-3'>
            <div class='col-md-12'>
              <label for='address_id'>
                End Date<span class='asterisk'></span>
              </label>
              <DatePicker
                className='form-control'
                selected={datet}
                onChange={(datet) => setDatet(datet)}
              />
            </div>
          </div>

          <div class='row mb-3'>
            <div class='col-md-12'>
              <div class='form-group'>
                <label for='branch_id'>
                  Status<span class='asterisk'></span>
                </label>
                <select
                  class='form-control '
                  name='status'
                  {...register("status", { required: "Status is  required" })}>
                  <option value=''>--Select Status --</option>
                  <option value='active'>Active</option>
                  <option value='InACTIVE'>In Active</option>
                </select>
              </div>
            </div>
            <div>
              {errors.status && (
                <span className='text-danger'>{errors.status.message}</span>
              )}
            </div>
          </div>

          <div className='row'>
            <div class='col-12'>
              <button
                type='reset'
                value='clear'
                class='btn btn-secondary '
                onClick={onClear}>
                Clear
              </button>
              <button type='submit' className='btn btn-primary m-2'>
                Update
              </button>
            </div>
          </div>
        </Form>
      </Modal>

      <Modal
        size='md'
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby='example-modal-sizes-title-md'
        className='text-center'>
        <Modal.Header closeButton></Modal.Header>
        <h4 className='text-center'>Are you sure you want to delete this!</h4>
        <Modal.Footer>
          <Button variant='secondary'>Cancel</Button>
          <Button variant='primary' onClick={deleteRow}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default LeaveManagelogs;
