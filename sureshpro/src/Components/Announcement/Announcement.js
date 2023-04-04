import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import { BiPaperPlane } from 'react-icons/bi'
import 'react-multiple-select-dropdown-lite/dist/index.css'
import { ImEye } from 'react-icons/im'
import { useForm } from 'react-hook-form'
import { FcOk } from 'react-icons/fc'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import * as moment from 'moment'
import DepartmentInnerNav from '../EimAdmin/InnerNav/DepartmentInnerNav'
const Announcement = () => {
  document.title = "HRMS | Announcement";
  const [loader, setLoader] = useState(false)
  const [show, setShow] = useState(false)
  const [textDisplay, settextDisplay] = useState("Published")
  const [successAlert, setSuccessAlert] = useState(false)
  const [visible, setVisible] = useState(false)
  const [smShow, setSmShow] = useState(false)
  const [Delete, setDelete] = useState(false)
  const [responseDataOfAnnouncement, setResponseDataOfAnnouncement] = useState([])
  const [departmentNames, setDepartmentNames] = useState([])
  const [search, setSearch] = useState([' ']) // for search purpose
  const [filteredCountries, setFilteredCountries] = useState([])
  const [startDate, setStartDate] = useState()
  const [deleteRowId, setDeleteRowID] = useState(null) // end date value
  const [editId, setEditId] = useState(null)
  const [formData, setFormData] = useState({})
  const [visibleRow, SetVisibleRow] = useState({}) // variable for visible(clicked on eye symbol)
  const [selectStartDateError, setSelectStartDateError] = useState()
  const { register, handleSubmit, reset, trigger, clearErrors, formState: { errors }, setValue } = useForm()

  //-----------------------handle time add method and errors-------------------//
  const handleTime = (event) => {
    const value = event.target.value
    if (value.length == 0 || value == undefined || value == '') {
      setSelectStartDateError(true)
    }
    if (event.target.value !== 0) {
      setSelectStartDateError(false)
    }
    setStartDate(event.target.value)
    setValue('publish_start_date_time', event.target.value)
  }
  const handleClose = () => setShow(false)
  const handleShow = () => {
    reset()
    clearErrors()
    setEditId(null)
    setShow(true)
  }
  //--------------------- getting a data -----------------//
  const getAnnoucements = async () => {
    let userInfo = JSON.parse(sessionStorage.getItem('user-info'))
    var req = { company_id: userInfo.company_id }
    try {
      const response = await axios.post("/companyannoucement_get/", req);
      response.data.map((item, i) => {
        item.Num = i + 1
      })
      setResponseDataOfAnnouncement(response.data)
      setFilteredCountries(response.data)
      setLoader(true)
    } catch (error) {
      setLoader(true);
    }
  }

  //------------------------ getting department data --------------------//
  const getDepartment = async () => {
    var userinfo = JSON.parse(sessionStorage.getItem('user-info'))
    var req = { company_id: userinfo.company_id }
    try {
      const departmentResponse = await axios.post('/get_department/', req)
      setDepartmentNames(departmentResponse.data)
    } catch (error) {
      console.log('not found')
    }
  }
  const columns = [
    {
      name: <span className="fs-6 fw-bold text-center h3">S.No</span>,
      selector: (row) => row.Num,
      sortable: true,
      width: '80px',
      textAlign: 'center',
      style: {
        fontSize: '16px',
      },
    },
    {
      name: <span className="fs-6 fw-bold h3">Title</span>,
      selector: (row) => row.title,
      sortable: true,
      width: '100px',
      style: {
        fontSize: '16px',
      },
    },
    {
      name: <span className="fs-6 fw-bold h3">Publish Start Date & Time</span>,
      selector: (row) => row.publish_start_date_time,
      sortable: true,
      width: '180px',
      style: {
        fontSize: '16px',
      },
    },

    {
      name: <span className="fs-6 fw-bold h3">Publish End Date & Time</span>,
      selector: (row) => row.publish_end_date_time,
      sortable: true,
      width: '180px',
      style: {
        fontSize: '16px',
      },
    },
    {
      name: <span className="fs-6 fw-bold h3">Visible To</span>,
      // selector: (row) => row.department,
      selector: (row) => row.department.join(', '),
      sortable: true,
      width: '180px',
      style: {
        fontSize: '16px',
      },
    },
    {
      name: <span className="fs-6 fw-bold h3">Announcement Date</span>,
      selector: (row) => row.created_on,
      sortable: true,
      width: '180px',
      style: {
        fontSize: '16px',
      },
    },
    // {
    //   name: <span className="fs-6 fw-bold h3">Posted By</span>,
    //   selector: (row) => row.posted_by,
    //   sortable: true,
    //   width: '200px',
    //   style: {
    //     fontSize: '16px',
    //   },
    // },

    {
      name: <span className="h6 fw-bold h3">Action</span>,
      cell: (row) => (
        <div className="text-center">
          <button
            className="btn btn-light m-2 bi bi-pencil-square"
            onClick={() => {
              setVisible(true)
              SetVisibleRow(row)
            }}
          >
            <ImEye />
          </button>
          <button className="btn btn-light m-2 bi bi-pencil-square" onClick={() => { setShow(true); setEditId(row.id); onloadValuesList(row); }} >
            <AiOutlineEdit />
          </button>

          <button className="btn btn-light  text-danger bi bi-trash" onClick={() => { setDeleteRowID(row.id); setSmShow(true); }} >
            <AiOutlineDelete />
          </button>
        </div>
      ),
      width: '200px',
    },
  ]

  useEffect(() => {
    getDepartment();
    getAnnoucements();
  }, [])
  const onloadValuesList = async (data) => {
    setValue('title', data.title)
    setValue('description', data.description)
    await axios
      .get(`/companyannoucement_update/${data.id}/`)
      .then((result) => {
        let departmentNames = result.data.department.join(",");
        setValue("department", departmentNames);
        setValue("description", result.data.description);
        setValue("publish_end_date_time", result.data.publish_end_date_time);
        setValue(
          "publish_start_date_time",
          result.data.publish_start_date_time
        );
        setValue("ticker", result.data.checkbox);
      })
      .catch((err) => {
        console.log("errors", err);
      });
  }
  useEffect(() => {
    const result = responseDataOfAnnouncement.filter((employee) => {
      return (
        employee.title.toLowerCase().match(search.toLowerCase()) ||
        employee.created_on.toLowerCase().match(search.toLowerCase()) ||
        employee.department.join(',').toLowerCase().match(search.toLowerCase()) ||
        employee.publish_end_date_time.toLowerCase().match(search.toLowerCase()) ||
        employee.publish_start_date_time.toLowerCase().match(search.toLowerCase())
      )
    })
    setFilteredCountries(result)
  }, [search])

  //------------------------------on submit announcement post--------------------//
  const onSubmit = async (data) => {
    const depart = data.department
    let newArray = []
    if (depart[0] == 'all') {
      departmentNames.map((item, i) => {
        newArray.push(item.id)
      })
    } else {
      if (typeof data.department === 'string') {
        newArray = data.department.split(',')
      } else {
        newArray = data.department
      }
    }
    var startDateAndTime = moment(data.publish_start_date_time).format('YYYY-MM-DD HH:mm')
    var endDateAndTime = moment(data.publish_end_date_time).format('YYYY-MM-DD HH:mm')
    var userinfo = JSON.parse(sessionStorage.getItem('user-info'))

    var req = {
      department: newArray,
      Company: userinfo.company_id,
      title: data.title,
      description: data.description,
      publish_start_date_time: startDateAndTime,
      publish_end_date_time: endDateAndTime,
      company_id: userinfo.company_id,
      checkbox: data.ticker,
    };

    if (editId == null) {
      await axios
        .post("/companyannoucement_post/", req)
        .then((resp) => {
          getAnnoucements();
          setSuccessAlert(true);
          setShow(false);
          reset();
        })
        .catch((err) => {
          console.log("error resp", err);
        });
    } else {
      await axios
        .put(`/companyannoucement_update/${editId}/`, req)
        .then((resp) => {
          getAnnoucements();
          setSuccessAlert(true);
          setShow(false);
          settextDisplay("updated");
          reset();
        })
        .catch((err) => {
          console.log("error resp", err);
        });
    }
    setFormData(data)
  }

  const onClear = () => {
    reset()
    setValue('publish_start_date_time', '')
  }
  const deleteHandler = async () => {
    let id = deleteRowId
    await axios
      .delete(`/companyannoucement_delete/${id}/`)
      .then((resp) => {
        setDelete(true);
        getAnnoucements();
        setSmShow(false);
      })
      .catch((error) => {
        console.log("on submit delete error ", error);
      });
  }
  return (
    <>
      <div className="container-fluid">
        <DepartmentInnerNav />
        <div className="container mt-4">
          <div className="text-right">
            <button className="btn btn-sm btn-primary text-center" onClick={() => { handleShow(); settextDisplay("Published") }}>
              <BiPaperPlane size={20} className="" /> Publish Announcement
            </button>
          </div>
        </div>
        <div className="container">
          {loader ? (
            <DataTable
              columns={columns}
              data={filteredCountries}
              pagination
              fixedHeader
              fixedHeaderScrollHeight="450px"
              highlightOnHover
              subHeader
              subHeaderComponent={<input type="text" className="form-control w-25" placeholder="Search" onChange={(e) => setSearch(e.target.value)} />}
            />
          ) : (
            <div className="text-center">
              <div className="spinner-border " role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          )}
        </div>
        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Publish Announcement </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form className="container" onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="col-md-6 my-3">
                  <label className="mb-3">
                    Department Name
                    <span className="text-danger mandatory-fields"></span>
                  </label>
                  <select className="form-select" multiple aria-label="multiple select example" size="small" name="department" {...register('department')} onKeyUp={() => { trigger('department') }}>
                    <option value={'all'}>all</option>
                    {departmentNames.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.department_name1}
                      </option>
                    ))}
                  </select>
                  <>
                    {errors.department && (
                      <small className="text-danger">
                        {errors.department.message}
                      </small>
                    )}
                  </>
                </div>
                <div className="col-md-6 my-3">
                  <label for="inputEmail4" className="mb-3">
                    Title
                    <span className="text-danger mandatory-fields">*</span>
                  </label>
                  <input type="text" name="title" className="form-control" style={{ height: '45px' }}
                    {...register('title', {
                      required: 'Title Is Required',
                      pattern: {
                        value: /^[a-zA-Z\s]*$/,
                        message: 'Only Alphabets And Space Are Allowed',
                      },
                      maxLength: {
                        value: 200,
                        message: 'Maximum 200 Characters Are Allowed',
                      },
                    })}
                    onKeyUp={() => {
                      trigger('title')
                    }}
                  />
                  {errors.title && (
                    <small className="text-danger">
                      {errors.title.message}
                    </small>
                  )}
                </div>
                <div className="col-md-12">
                  <Form.Group className="mb-3  ">
                    <Form.Label className="fs-bold">Description</Form.Label>
                    <Form.Control className={`form-control ${errors.description && 'invalid'}`} as="textarea" rows="3" type="text" name="description"
                      {...register('description', {
                        maxLength: { value: 250, message: 'Maximum 250 Characters Are Allowed' },
                      })}
                      onKeyUp={() => {
                        trigger('description')
                      }}
                    />
                    {errors.description && (
                      <small className="text-danger">
                        {errors.description.message}
                      </small>
                    )}
                  </Form.Group>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 my-3">
                  <label className="form-label"> Publish Start Date and Time <span className="text-danger mandatory-fields">*</span> </label>
                  <input type="datetime-local" label="Publish Date and Time" variant="outlined" size="small" sx={{ width: 300 }} className="form-control" min={new Date().toISOString().slice(0, -8)}
                    {...register('publish_start_date_time', {
                      required: 'Publish Start Date Is Required',
                    })}
                    onKeyUp={(e) => {
                      trigger('publish_start_date_time')
                    }}
                    onChange={(e) => {
                      handleTime(e)
                      trigger('publish_start_date_time')
                    }}
                  />
                  {selectStartDateError ? (
                    <>
                      {errors.publish_start_date_time && (
                        <small className="text-danger">
                          {errors.publish_start_date_time.message}
                        </small>
                      )}
                    </>
                  ) : null}
                </div>
                <div className="col-md-6 my-3">
                  <label className="form-label"> Publish End Date and Time <span className="text-danger mandatory-fields">*</span> </label>
                  <input type="datetime-local" label="Publish  Date and Time" variant="outlined" size="small" sx={{ width: 300 }} min={startDate} name="publish_end_date_time" className="form-control"
                    {...register('publish_end_date_time', {
                      required: 'Publish End Date Is Required',
                    })}
                    onKeyUp={(e) => {
                      trigger('publish_end_date_time')
                    }}
                  />
                  <>
                    {errors.publish_end_date_time && (
                      <small className="text-danger">{errors.publish_end_date_time.message} </small>
                    )}
                  </>
                </div>
              </div>
              <div className="col-md-6 m-1">
                <input className="form-check-input" type="checkbox" id="flexCheckDefault" {...register('ticker')} onKeyUp={() => { trigger('ticker') }} />
                <label className="form-check-label" for="flexCheckDefault">
                  Add To Ticker
                </label>
              </div>
              <Button className="btn btn-primary my-2" variant="primary" type="reset" onClick={onClear} > Clear </Button>
              <Button className="btn btn-primary m-2" variant="primary" type="submit"> Save </Button>
            </Form>
          </Modal.Body>
        </Modal>
        <Modal size="lg" show={visible} onHide={() => setVisible(false)} className="text-center" >
          <Modal.Header closeButton>
            <h5 className="text-center">Publish Announcement</h5>
          </Modal.Header>
          <Modal.Body>
            <div className="row ">
              <div className="col-md-6  ">
                Publish Date & Time:
                <span className="btn btn-outline-success btn-sm mx-1">
                  {visibleRow.publish_start_date_time}
                </span>
              </div>
              <div className="col-md-6  ">
                End Date & Time:
                <span className="btn btn-outline-warning btn-sm mx-1">
                  {visibleRow.publish_end_date_time}
                </span>
              </div>
              <div className=" d-flex justify-content-evenly col-md-12 mt-4 ">
                <div className=""> Title</div>
                <div className="h5"> {visibleRow.title}</div>
              </div>
              <div className=" d-flex justify-content-evenly col-md-12 mt-4 ">
                <div className=""> Description</div>
                <div className="">{visibleRow.description} </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => setVisible(false)}> Close </Button>
          </Modal.Footer>
        </Modal>
        <Modal size="md" show={successAlert} onHide={() => setSuccessAlert(false)} className="text-center" >
          <Modal.Header closeButton></Modal.Header>
          <div className="text-center m-3"> <FcOk size="80px" /> </div>
          <h4 className="text-center">Announcement {textDisplay} Successfully</h4>
          <div className="text-center m-3">
            <button className="btn btn-primary" onClick={() => setSuccessAlert(false)} > OK </button>
          </div>
        </Modal>

        <Modal size="md" show={smShow} onHide={() => setSmShow(false)} className="text-center" >
          <Modal.Header closeButton></Modal.Header>
          <div className="text-center m-3 text-danger"> <AiOutlineDelete size="80px" /> </div>
          <h4 className="text-center"> Are you sure you want to delete this..! </h4>
          <div className="text-center m-3">
            <Button className="btn btn-primary m-1" onClick={() => setSmShow(false)} >Cancel</Button>
            <button className="btn btn-primary m-1" onClick={deleteHandler}> Delete </button>
          </div>
        </Modal>
        <Modal size="md" show={Delete} onHide={() => setDelete(false)} className="text-center" >
          <Modal.Header closeButton></Modal.Header>
          <div className="text-center m-3 text-danger"> <AiOutlineDelete size="80px" /> </div>
          <h4 className="text-center">Deleted Successfully</h4>
          <div className="text-center m-3">
            <button className="btn btn-primary" onClick={() => setDelete(false)} > Okay </button>
          </div>
        </Modal>
      </div>
    </>
  )
}
export default Announcement