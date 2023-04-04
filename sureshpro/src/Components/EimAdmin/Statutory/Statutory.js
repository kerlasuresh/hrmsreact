import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import Modal from 'react-bootstrap/Modal'
import { FcOk } from 'react-icons/fc'
import DataTable from 'react-data-table-component'
import { AiOutlineEdit, AiOutlineDelete, AiOutlinePlusCircle } from 'react-icons/ai'
import DepartmentInnerNav from '../InnerNav/DepartmentInnerNav'
import Statutory11 from './Statutory1'
function Statutory() {
  document.title = "HRMS | Statutory";
  const [popUpBankinfo, setPopUpBankinfo] = useState(false)
  const [showAddinfo, setshowAddinfo] = useState(false)
  const [bankData, setBankData] = useState([])
  const [ifscResponseData, setIfscResponseData] = useState({})
  const [isEdited, setIsEdited] = useState(false)
  const [editId, setEditId] = useState(null)
  const [deletePopUp, setDeletePopUp] = useState(false)
  const [ifscDataPopUp, setIfscDataPopUp] = useState(false)
  const [deleteRowId, setDeleteRowID] = useState(null)
  const [deletedPopUp, setDeletedPopUp] = useState(false)
  const [succesEditPopUp, setSuccesEditPopUp] = useState(false)
  const [succesPopUp, setSuccesPopUp] = useState(false)
  const [disable, setDisable] = useState(false);
  const [companysecury, setCompanysecury] = useState([])
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
    clearErrors,
    getValues,
    setValue,
  } = useForm()

  const bankDetailsPopUp = () => {
    reset()
    setshowAddinfo(false)
    setPopUpBankinfo(true)
  }

  let addFormFields = () => {
    setshowAddinfo(true)
  }

  let removeFormFields = (i) => {
    setshowAddinfo(false)
    clearErrors()
    reset()
  }


  const getCompanySecury = async () => {
    var message = await axios.get("/api/company/bankaccount/type/").then((result) => {
      setCompanysecury(result.data);
    });
  };

  const onSubmit = async (data) => {
    setDisable(true)
    console.log('bank account data ', data)
    var userinfo = JSON.parse(sessionStorage.getItem('user-info'))
    var req = {
      company: userinfo.data.id,
      account_title: data.AccountTitle,
      // Account_Holder_Name: data.BankName,
      bank_name: data.BankName,
      account_number: data.AccountNumber,
      branch_name: data.BranchName,
      city: data.City,
      ifsc_code: data.IFSC,
      account_type: data.AccountType,
    };
    
    if (!isEdited) {
      await axios
        .post("/api/company/bank/", req)
        .then((result) => {
          removeFormFields();
          getBankData();
          setSuccesPopUp(true);
           setDisable(false)
        })
        .catch((err) => {
          console.log("errors", err);
          setDisable(false)
        });
    } else {
      await axios
        .patch(`/api/company/update/bank/${editId}/`, req)
        .then((result) => {
          console.log(result);
          removeFormFields();
          getBankData();
          setSuccesEditPopUp(true);
          setDisable(false)
        })
        .catch((err) => {
          console.log("errors", err);
          setDisable(false)
        });
    }
  }
  //===============================//

  const getBankData = async () => {
    var userinfo = JSON.parse(sessionStorage.getItem('user-info'))
    // let req = {
    //   company_id: userinfo.company_id,
    // }
    try {
      const bankData = await axios.get(`/api/company/bank/${userinfo.data.id}/`);
      let responseData = bankData.data
      console.log("responseData",responseData)
      responseData.map((item, i) => {
        item.Num = i + 1
      })
      setBankData(responseData)
    } catch (error) {
      console.log('not found')
    }
  }

  //======================================//
  const handleClose = () => {
    setDeletePopUp(false)
  }

  //=======================//
  const deleteBankAccount = async () => {
   
    //console.log('on delete id', id)
    try {
      await axios.patch(`/api/company/update/bank/${deleteRowId}/`,{isDeleted:true})

      setDeletePopUp(false)
      getBankData()
      setDeletedPopUp(true)
    } catch (error) {
      console.log('on submit delete error ', error)
    }
  }
  //====================================//

  const ifscSubmit = async () => {
    var userinfo = sessionStorage.getItem('user-info')
    userinfo = JSON.parse(userinfo)
    let ifscValue = getValues('IFSCSearch')
    // let req = {
    //   ifsccode: ifscValue,
    // }
    try {
      const bankData = await axios.get(`https://bank-apis.justinclicks.com/API/V1/IFSC/${ifscValue}/`);
      let responseData = bankData.data
      console.log('search data', responseData)

      setIfscResponseData(responseData)
      setIfscDataPopUp(true)
      setPopUpBankinfo(false)
    } catch (error) {
      console.log('not found')
    }
  }
  //=======================//

  const columns = [
    {
      name: <span className='fs-6 fw-bold'>S.No</span>,
      selector: (row) => row.Num,
      sortable: true,
    },

    {
      name: <span className='fs-6 fw-bold'>Account Title</span>,
      selector: (row) => row.accountTitle,
      sortable: true,
    },
    // {
    //   name: <span className='fs-6 fw-bold'>Account Holder Name</span>,
    //   selector: (row) => row.Account_Holder_Name,
    //   sortable: true,
    // },
    {
      name: <span className='fs-6 fw-bold h3'>Bank Name</span>,
      selector: (row) => row.bankName,
      sortable: true,
    },
    {
      name: <span className='fs-6 fw-bold h3'>Account Number</span>,
      selector: (row) => row.accountNumber,
      sortable: true,
    },
    {
      name: <span className='fs-6 fw-bold h3'>Branch Name</span>,
      selector: (row) => row.branchName,
      sortable: true,
    },
    {
      name: <span className='fs-6 fw-bold h3'>City</span>,
      selector: (row) => row.city,
      sortable: true,
    },
    {
      name: <span className='fs-6 fw-bold h3'>IFSC code</span>,
      selector: (row) => row.ifscCode,
      sortable: true,
    },
    {
      name: <span className='fs-6 fw-bold h3'>Account Type</span>,
      selector: (row) => row.accountType.value,
      sortable: true,
    },
    {
      name: <span className='fs-6 fw-bold'>Action</span>,
      cell: (row) => (
        <div className='text-center'>
          <div
            className='btn btn-light m-2 bi bi-pencil-square'
            onClick={() => {
              setshowAddinfo(true);
              onloadvalues(row);
              setIsEdited(true);
              setEditId(row.id);
              setDisable(false)
            }}>
            <AiOutlineEdit />
          </div>

          <div
            className='btn btn-light  text-danger bi bi-trash3'
            onClick={() => {
              setDeleteRowID(row.id);
              setDeletePopUp(true);
            }}>
            <AiOutlineDelete />
          </div>
        </div>
      ),
    },
  ];

  //==================================//
  const onloadvalues = (data) => {
    console.log('on load values ', data)
    setValue('AccountTitle', data.accountTitle)
    setValue('BankName', data.bankName)
    setValue('AccountNumber', data.accountNumber)
    setValue('BranchName', data.branchName)
    setValue('City', data.city)
    setValue('IFSC', data.ifscCode)
    setValue('AccountType', data.accountType ? data.accountType.id : '')
  }

  //=============================//
  const SelectBankData = () => {
    setshowAddinfo(true)

    setIfscDataPopUp(false)
    setValue('AccountTitle')
    setValue('BankName', ifscResponseData.BANK)
    setValue('AccountNumber')
    setValue('BranchName', ifscResponseData.BRANCH)
    setValue('City', ifscResponseData.DISTRICT)
    setValue('IFSC', ifscResponseData.IFSC)
    setValue('AccountType')
  }
  //=============================//
  useEffect(() => {
    getBankData()
    clearErrors()
    getCompanySecury();
    reset()
  }, [])
  //=================================// style={{ marginTop: 70 }}
  return (
    <>
      <div className='container-fluid'>
        <DepartmentInnerNav />
      </div>
      <div className='container'>
        <div className='mt-4'>
          <Statutory11 />
        </div>
        <div className='m-3'></div>{" "}
        <div className='card  '>
          <DataTable
            columns={columns}
            data={bankData}
            pagination
            fixedHeader
            fixedHeaderScrollHeight='450px'
            highlightOnHover
            subHeader
          />
        </div>
        <div className='m-3'></div>{" "}
        <div className='card p-3'>
          <div className='div-section row '>
            <div className='col-md-6'>
              <h6>Bank Account Info</h6>
            </div>
            {!showAddinfo ? (
              <div className='col-md-6 text-end'>
                <div onClick={() => addFormFields()}>
                  <AiOutlinePlusCircle />
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div>
          {showAddinfo ? (
            <div className='card p-3'>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className='m-2'>
                  <input
                    className='form-control'
                    placeholder='Account Title...'
                    {...register("AccountTitle", {
                      required: "This field is required",
                    })}
                    onKeyUp={() => {
                      trigger("AccountTitle");
                    }}
                  />
                  {errors.AccountTitle && (
                    <small className='text-danger '>
                      {errors.AccountTitle.message}
                    </small>
                  )}
                </div>
                <div className='m-2'>
                  <div
                    for='exampleDataList'
                    className='btn btn-primary'
                    type='div'
                    onClick={bankDetailsPopUp}>
                    Find My Branch
                  </div>
                </div>
                <div className='row m-2 '>
                  <div className='col-md-4'>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Bank Name'
                      {...register("BankName", {
                        required: "This field is required",
                      })}
                      onKeyUp={() => {
                        trigger("BankName");
                      }}
                    />
                    {errors.BankName && (
                      <small className='text-danger '>
                        {errors.BankName.message}
                      </small>
                    )}
                  </div>
                  <div className='col-md-4'>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='City'
                      {...register("City", {
                        required: "This field is required",
                      })}
                      onKeyUp={() => {
                        trigger("City");
                      }}
                    />
                    {errors.City && (
                      <small className='text-danger '>
                        {errors.City.message}
                      </small>
                    )}
                  </div>
                  <div className='col-md-4'>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Branch Name'
                      {...register("BranchName", {
                        required: "This field is required",
                      })}
                      onKeyUp={() => {
                        trigger("BranchName");
                      }}
                    />
                    {errors.BranchName && (
                      <small className='text-danger '>
                        {errors.BranchName.message}
                      </small>
                    )}
                  </div>
                </div>
                <div className='row m-2 '>
                  <div className='col-md-4'>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='IFSC Code'
                      {...register("IFSC", {
                        required: "This field is required",
                        pattern: {
                          value: /^[A-Za-z]{4}[0-9]{6,7}$/,
                          message: "Please enter a valid IFSC Code",
                        },
                      })}
                      onKeyUp={() => {
                        trigger("IFSC");
                      }}
                    />
                    {errors.IFSC && (
                      <small className='text-danger '>
                        {errors.IFSC.message}
                      </small>
                    )}
                  </div>
                  <div className='col-md-4'>
                    <select
                      className='form-select'
                      {...register("AccountType", {
                        required: "Please select Account Type..!",
                      })}
                      onKeyUp={() => {
                        trigger("AccountType");
                      }}>
                        <option value=''>Select Account Type</option>
                      {companysecury.map((entityType, i) => {
                        return (
                          <option value={entityType.id}>
                            {entityType.value}
                          </option>
                        );
                      })}
                      {/* <option value=''>Account Type</option>
                      <option value='Current Account'>Current Account</option>
                      <option value='Fixed Deposit'>Fixed Deposit</option>
                      <option value='Savings'>Savings</option> */}
                    </select>
                    {errors.AccountType && (
                      <small className='text-danger'>
                        {errors.AccountType.message}
                      </small>
                    )}
                  </div>
                  <div className='col-md-4'>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Account Number'
                      {...register("AccountNumber", {
                        required: "This field is required",
                        pattern: {
                          value: /^\d{9,18}$/,
                          message: "Please enter a valid Account Number",
                        },
                      })}
                      onKeyUp={(e) => {
                        trigger("AccountNumber");
                      }}
                    />
                    {errors.AccountNumber && (
                      <small className='text-danger '>
                        {errors.AccountNumber.message}
                      </small>
                    )}
                  </div>
                </div>
                <div>
                  <div
                    type='div'
                    className='btn btn-primary  m-2'
                    onClick={() => removeFormFields()}>
                    Cancel
                  </div>
                  <button
                    className='btn btn-primary'
                    type='submit'
                    disabled={disable}
                  //   onClick={() => setAddWorkPopUp(false)}
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          ) : (
            ""
          )}
        </div>
        {/*  */}
        <Modal
          size='lg'
          show={popUpBankinfo}
          onHide={() => setPopUpBankinfo(false)}
          className='text-center'>
          <Modal.Header closeButton> Find Branch</Modal.Header>
          {/* <form action='#' > */}
          <div className='container'>
            <div className='row col-md-12 m-2'>
              <input
                type='text'
                className='form-control'
                placeholder='IFSC Code'
                {...register("IFSCSearch")}
                onKeyUp={(e) => {
                  trigger("IFSCSearch");
                }}
              />{" "}
              {errors.IFSCSearch && (
                <small className='text-danger '>
                  {errors.IFSCSearch.message}
                </small>
              )}{" "}
              <p></p>
              <div
                for='exampleDataList'
                className='btn btn-primary col-md-3 '
                onClick={() => ifscSubmit()}>
                Search
              </div>
            </div>

            <div className='text-center m-3'>Or</div>
            <hr className='m-3 text-danger' />
            <div className='row  m-2'>
              <div className='col-md-6'>
                <select className='form-select'>
                  <option selected>Select Bank</option>
                  <option value=''>''</option>
                </select>
              </div>
              <div className='col-md-6'>
                <select className='form-select'>
                  <option selected>Select state</option>
                  <option value=''>''</option>
                </select>
              </div>
            </div>
            <div className='row  m-2'>
              <div className='col-md-6'>
                <select className='form-select'>
                  <option selected>Select City</option>
                  <option value=''>''</option>
                </select>
              </div>
              <div className='col-md-6'>
                <select className='form-select'>
                  <option selected>Select Branch</option>
                  <option value=''>''</option>
                </select>
              </div>
            </div>
            <div className='d-flex justify-content-end m-2'>
              <div className='btn btn-primary'>Search</div>
            </div>
          </div>
          {/* </form> */}
        </Modal>
        <Modal
          size='md'
          show={deletePopUp}
          onHide={() => setDeletePopUp(false)}
          className='text-center'>
          <Modal.Header closeButton></Modal.Header>
          <div className='text-center m-3 text-danger'>
            <AiOutlineDelete size='80px' />
          </div>
          <h4>Are you sure you want to delete this!</h4>
          <div className='text-center m-3'>
            {/* <input id="deluser" className="form-control"></input> */}
            <div className='btn btn-primary me-3 ' onClick={handleClose}>
              Cancel
            </div>
            <div className='btn btn-primary' onClick={deleteBankAccount}>
              Delete
            </div>
          </div>
        </Modal>
        <Modal
          size='md'
          show={ifscDataPopUp}
          onHide={() => setIfscDataPopUp(false)}
          className='text-center'>
          <Modal.Header closeButton> Find Branch </Modal.Header>
          <div>
            <table className='table'>
              <tbody>
                <tr>
                  <th scope='row'>IFSC Code</th>
                  <td>{ifscResponseData.IFSC}</td>
                </tr>
                <tr>
                  <th scope='row'>MICR Code</th>
                  <td>{ifscResponseData.MICR}</td>
                </tr>
                <tr>
                  <th scope='row'>Bank</th>
                  <td>{ifscResponseData.BANK}</td>
                </tr>
                <tr>
                  <th scope='row'>Address</th>
                  <td>{ifscResponseData.ADDRESS}</td>
                </tr>
                <tr>
                  <th scope='row'>District</th>
                  <td>{ifscResponseData.DISTRICT}</td>
                </tr>
                <tr>
                  <th scope='row'>State</th>
                  <td>{ifscResponseData.STATE}</td>
                </tr>
                <tr>
                  <th scope='row'>Phone Number</th>
                  <td>{ifscResponseData.CONTACT}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='d-flex justify-content-end m-3'>
            <div className='btn btn-primary' onClick={SelectBankData}>
              SELECT BANK
            </div>
          </div>
        </Modal>
      </div>
      <div>
        <Modal
          size='md'
          show={deletedPopUp}
          onHide={() => setDeletedPopUp(false)}
          className='text-center'>
          <Modal.Header closeButton></Modal.Header>
          <div className='text-center m-3'>
            <FcOk size='80px' />
          </div>
          <h4 className='text-center'>BankAccount Deleted Successfully</h4>
          <div className='text-center m-3'>
            <button
              className='btn btn-primary'
              onClick={() => {
                setDeletedPopUp(false);
              }}>
              OK
            </button>
          </div>
        </Modal>
        <Modal
          size='md'
          show={succesPopUp}
          onHide={() => setSuccesPopUp(false)}
          className='text-center'>
          <Modal.Header closeButton></Modal.Header>
          <div className='text-center m-3'>
            <FcOk size='80px' />
          </div>
          <h4 className='text-center'> BankAccount Added Successfully</h4>
          <div className='text-center m-3'>
            <button
              className='btn btn-primary'
              onClick={() => {
                setSuccesPopUp(false);
              }}>
              OK
            </button>
          </div>
        </Modal>
        <Modal
          size='md'
          show={succesEditPopUp}
          onHide={() => setSuccesEditPopUp(false)}
          className='text-center'>
          <Modal.Header closeButton></Modal.Header>
          <div className='text-center m-3'>
            <FcOk size='80px' />
          </div>
          <h4 className='text-center'>BankAccount Edited Successfully</h4>
          <div className='text-center m-3'>
            <button
              className='btn btn-primary'
              onClick={() => {
                setSuccesEditPopUp(false);
              }}>
              OK
            </button>
          </div>
        </Modal>
      </div>
    </>
  );
}

export default Statutory
