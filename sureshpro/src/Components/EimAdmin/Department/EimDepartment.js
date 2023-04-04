import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { AiOutlineEdit, AiOutlineDelete, AiOutlinePlusSquare } from 'react-icons/ai'
import { useForm } from 'react-hook-form'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import { FcOk } from 'react-icons/fc'

function EimDepartment() {
    const [disable, setDisable] = useState(false);
  const [errorFromBackend, setErrorFromBackend] = useState("");
  const [errorFromBackend2, setErrorFromBackend2] = useState("");
  const columns = [
    {
      name: <span className="fs-6 fw-bold">S.No</span>,
      selector: (row) => row.Num,
      sortable: true,
    },

    {
      name: <span className="fs-6 fw-bold">Department</span>,
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: <span className="fs-6 fw-bold"> Sub Department</span>,
      selector: (row) => (
        row.subDepartments.map((sub, i) => {
          if (i + 1 === row.subDepartments.length) {
            return sub.name
          } else {
            return sub.name + ", "
          }
          
        })
      ),
      sortable: true,
    },
    {
      name: <span className="fs-6 fw-bold">Employee Count</span>,
      selector: (row) => row.noOfEmployees,
      sortable: true,
    },

    {
      name: <span className="fs-6 fw-bold">Action</span>,
      cell: (row) => (
        <div className="text-center">
          <button
            className="btn btn-light m-2 bi bi-pencil-square"
            onClick={() => {
              setShow(true)
              clearErrors()
              setEditId(row.id)
              setisEdited(true)
              onloadvalues(row)
              setTextDisplay("Update");
             setDisable(false)
            }}
          >
            <AiOutlineEdit />
          </button>

           <button
            className="btn btn-light  text-danger bi bi-trash3"
            onClick={() => {
              setDeleteRowID(row.id)
              setSmShowe(true)
            }}
          >
            <AiOutlineDelete />
          </button> 
        </div>
      ),
    },
  ]
  const { register, handleSubmit, reset, trigger, clearErrors, formState: { errors }, setValue } = useForm()
  const [isEdited, setisEdited] = useState(false)
  const [textDisplay, setTextDisplay] = useState('Add')
  const [editId, setEditId] = useState(null)
  const [loader, setLoader] = useState(false)
  const [search, setSearch] = useState([' '])
  const [filteredAdminstation, setFilteredAdminstation] = useState([])
  const [organization, setOrganization] = useState([])
  const [show, setShow] = useState(false)
  const [smShow, setSmShow] = useState(false)
  const [successAlert, setSuccessAlert] = useState(false)
  const [smShowe, setSmShowe] = useState(false)
  const [deleteRowId, setDeleteRowID] = useState(null)
  const [deleteAlertMessage, setDeleteAlertMessage] = useState(false);

  const handleClose = () => {
    setShow(false)
    setisEdited(false)
  }
  const handleClose1 = () => setSmShowe(false)
  const handleShow = () => {
    setValue('sub_department', '')
    setFormValues([{ name: '', isDeleted: false }])
    reset()
    setShow(true)
    clearErrors()
  }
  const onloadvalues = async (data) => {
    setValue('departmentName', data.name)
    setFormValues(data.subDepartments)
  }

  const getOrganization = async () => {
    
    var userinfo = JSON.parse(sessionStorage.getItem('user-info'));
    var req = { company_id: userinfo.company_id }
    try {
      const response = await axios.get(`/api/company/department/${userinfo.data.id}/`)
      response.data.map((item, i) => {
        item.Num = i + 1
        return item;
      })
      setOrganization(response.data)
      setFilteredAdminstation(response.data)
      setLoader(true)
    } catch (error) {
      console.log('not found');
     
    }
  }

  useEffect(() => {
    getOrganization()
  }, [])

  useEffect(() => {
    // const result = organization.filter((employee) => {
    //   return (
    //     employee.department_name1.toLowerCase().match(search.toLowerCase()) ||
    //     employee.sub_department
    //       .join(',')
    //       .toLowerCase()
    //       .match(search.toLowerCase())
    //   )
    // })
    // setFilteredAdminstation(result)
  }, [search])

  const onSubmit = async (data) => {
    setErrorFromBackend("");
    setErrorFromBackend2("");
    setDisable(true);
    var userinfo = JSON.parse(sessionStorage.getItem('user-info'));
    var subdepatt = []
    formValues.map((item, i) => {
      if (item.name){
        subdepatt.push(item)
      }
      return item;
    })
    var req = {
      name: data.departmentName,
      subDepartments: subdepatt,
      company: userinfo.data.id
    }
    if (!isEdited) {
      try {
        var department = await axios.post('/api/company/department/', req)
        if (department.data) {
          setDisable(true);
          getOrganization()
          setTextDisplay('Added')
          setSuccessAlert(true)
          setShow(false);
           setDisable(false);
         
        } else {
          
          setShow(false)
          setLoader(true);
           
        }
      } catch(error) {
        if (error.response.data.name){
          setErrorFromBackend(error.response.data.name[0]);
        }
        if (error.response.data.data.error){
          setErrorFromBackend2(error.response.data.data.error);
        }
        
        setDisable(false);
      }
    } else {
      try {
        var response = await axios.put(`/api/company/update/department/${editId}/`, req)
        if (response.data) {
          getOrganization()
          setTextDisplay('Updated')
          setSuccessAlert(true)
          setShow(false)
          setLoader(true);
         setDisable(false)
        } else {
          setShow(false)
          setLoader(true)
        }
      } catch (error) {
        if (error.response.data.name) {
          setErrorFromBackend(error.response.data.name[0]);
        }
        if (error.response.data.data.error) {
          setErrorFromBackend2(error.response.data.data.error);
        }
        setDisable(false);
      }
    }
  }

  const onClear = () => {
    setShow(false)
    reset()

    // setFormValues([{ name: '' }])
  }
  const deleteUser = async () => {
    let id = deleteRowId
    console.log('on delete id', id)
    try {
      var response = await axios.patch(`/api/company/update/department/${deleteRowId}/`, {"isDeleted": true})
      if (response.data) {
        setSmShow(true)
        setSmShowe(false)
        getOrganization()
      } else {
        setDeleteAlertMessage(true)
        setSmShowe(false)
      }
    } catch (error) {
      setSmShowe(false)
      setDeleteAlertMessage(true)
      console.log('on submit delete error ', error)
    }
  }
  //////////////////////////sub department //////////////

  const [formValues, setFormValues] = useState([{ name: '' }])
  let handleChange = (i, e) => {
    let newFormValues = [...formValues]
    newFormValues[i][e.target.name] = e.target.value
    setFormValues(newFormValues)
  }
  let addFormFields = () => {
    setFormValues([...formValues, { name: '', isDeleted:false }])
  }

  let removeFormFields = (i) => {
    let newFormValues = [...formValues]

    newFormValues.map((item, id)=>{
      if (id === i){
        item.isDeleted = true;
      }
      return item;
    })
    //newFormValues.splice(i, 1)
    setFormValues(newFormValues)
    console.log(formValues)
  }

  return (
    <div className="main container">
      <button
        className="btn btn-sm btn-primary text-right float-right"
        onClick={() => { handleShow(); setTextDisplay("Add");setDisable(false) }}
      >
        <AiOutlineEdit size={20} className="" />
        Add
      </button>
      <div>
        {loader ? (
          <DataTable
            columns={columns}
            data={filteredAdminstation}
            pagination
            fixedHeader
            fixedHeaderScrollHeight="450px"
            fixedHeaderScrollWidth="50px"
            highlightOnHover
            // subHeader
            // subHeaderComponent={
            //   <input
            //     type="text"
            //     className="form-control w-25"
            //     placeholder="Search"
            //     onChange={(e) => setSearch(e.target.value)}
            //   />
            // }
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
          <Modal.Title>{textDisplay}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="p-3" onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <Form.Label className="fs-bold">
                Department Name
                <span className="text-danger mandatory-field">*</span>
              </Form.Label>
              <Form.Control
                className={`form-control ${errors.departmentName && 'invalid'}`}
                type="text"
                id="departmentId"
                {...register('departmentName', {
                  required: 'Department Name Is Required',
                  pattern: {
                    value: /^[a-zA-Z ]*$/,
                    message: 'Only Alphabets Are Allowed',
                  },
                  maxLength: {
                    value: 20,
                    message: 'Minimum 20 Characters Are Allowed',
                  },
                })}
                onKeyUp={() => {
                  trigger('departmentName')
                }}
              />
              {errors.departmentName && (
                <small className="text-danger">
                  {errors.departmentName.message}
                </small>
              )}
            </Form.Group>

            {/* <form onSubmit={handleSubmit}> */}
            <label>Sub Department</label>
            
            {formValues.map((element, index) => (
              element.isDeleted === false ?
              <div className=" mb-2" key={index}>
                <div className="row">
                  <div className="col-md-8">
                    <input
                      className={`form-control ${errors.description && 'invalid'
                        }`}
                      type="text"
                      name={'name'}
                      value={element.name}
                      onChange={(e) => {
                        handleChange(index, e)
                        element.name = e.target.value
                      }}
                    />
                  </div>

                  {index ? (
                    <div className="col-md-3">
                      <button
                        type="button"
                        className="btn btn-danger remove"
                        onClick={() => removeFormFields(index)}
                      >
                        Remove
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>

              : ""
            ))}
            <div className=''>
              <small className="text-danger">
                {errorFromBackend}
              </small>
              <br/>
              <small className="text-danger">
                {errorFromBackend2}
              </small>
              
            </div>
            <div className="button-section">
              <button className="btn btn-primary" type="button" onClick={() => addFormFields()} > <AiOutlinePlusSquare /> </button>
            </div>
            <Form.Group className="mb-3"></Form.Group>
            <Button className="btn btn-primary m-2" variant="primary" type="reset" onClick={onClear} > Cancel</Button>
            <Button className="btn btn-primary m-2" variant="primary" type="submit" disabled={disable} > {textDisplay} </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal size="md" show={successAlert} onHide={() => setSuccessAlert(false)} className="text-center" >
        <Modal.Header closeButton></Modal.Header>
        <div className="text-center m-3"> <FcOk size="80px" /> </div>
        <h4 className="text-center">  {textDisplay} Successfully  </h4>
        <div className="text-center m-3">
          <button className="btn btn-primary" onClick={() => { setSuccessAlert(false); setisEdited(false); }} >  OK  </button>
        </div>
      </Modal>
      <Modal size="md" show={deleteAlertMessage} onHide={() => setDeleteAlertMessage(false)} className="text-center" >
        <Modal.Header closeButton></Modal.Header>
        <div className="text-center m-3"> <AiOutlineDelete size="80px" /></div>
        <h4 className="text-center"> Could Not Be Deleted Because It's Related To Other Module </h4>
        <div className="text-center m-3">
          <button className="btn btn-primary" onClick={() => { setDeleteAlertMessage(false) }}  > OK </button>
        </div>
      </Modal>
      <Modal size="md" show={smShowe} onHide={() => setSmShowe(false)} className="text-center" >
        <Modal.Header closeButton></Modal.Header>
        <div className="text-center m-3 text-danger"> <AiOutlineDelete size="80px" /> </div>
        <h4>Are you sure you want to delete this!</h4>
        <div className="text-center m-3">
          <button className="btn btn-secondary me-3 " onClick={handleClose1}> Cancel </button>
          <button className="btn btn-primary" onClick={deleteUser}>  Delete  </button>
        </div>
      </Modal>
      <Modal size="md" show={smShow} onHide={() => setSmShow(false)} className="text-center" >
        <Modal.Header closeButton></Modal.Header>
        <div className="text-center m-3 text-danger"> <AiOutlineDelete size="80px" />  </div>
        <h4 className="text-center">Deleted Successfully</h4>
        <div className="text-center m-3">
          <button className="btn btn-primary" onClick={() => setSmShow(false)}>  Okay </button>
        </div>
      </Modal>
    </div>
  )
}

export default EimDepartment
