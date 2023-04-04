import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { AiOutlineEdit } from 'react-icons/ai'
import Modal from 'react-bootstrap/Modal'
import axios from 'axios'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { FcOk } from 'react-icons/fc'
const MyProfilePersonal = ({ employeeID }) => {
  const {
    register,
    reset,
    trigger,
    formState: { errors },
    getValues,
    setValue,
  } = useForm()
  const [personalDetailsOnedit, setPersonalDetailsOnedit] = useState(false)
  const [personalDetailsMaritalCondition, setPersonalDetailsMaritalCondition] = useState('')
  const [editAddress, setEditAddress] = useState(true)
  const [editAddressClick, setEditAddressClick] = useState(true)
  const [socialMediaPopUp, setSocialMediaPopUp] = useState(false)
  const [onloadData, setonloadData] = useState({})
  const [addressGetData, setAddressGetData] = useState([])
  const [successAlert1, setSuccessAlert1] = useState(false) //pop-upss
  const [checkBoxValue, setCheckBoxValue] = useState('')
  const [salaryInfo, setSalaryInfo] = useState(true) //
  const [salaryInfoBtnClick, setSalaryInfoBtnClick] = useState(true)
  const [salaryInfoData, setSalaryInfoData] = useState({})
  const [bankaccountTypes, setbankaccountTypes] = useState([])

  const [ifscResponseData, setIfscResponseData] = useState({})
  const [ifscDataPopUp, setIfscDataPopUp] = useState(false)

  const [show, setShow] = useState(false)
    const [MaxDateOfBith, setMaxDateOfBith] = useState()

  const handleShow = () =>{
    setShow(true) 
    reset()  
  } 

  //--------
  const getEmployeeDetails = async () => {
    await axios
      .get(`/api/directory/get_update/employee/${employeeID}/`)
      .then((result) => {
        setonloadData(result.data)
       
        setPersonalDetailsMaritalCondition(result.data.maritalStatus)
        if (result.data.addressDetails) {
          setAddressGetData(result.data.addressDetails)
        }
        if (result.data.salaryInfo) {
          setSalaryInfoData(result.data.salaryInfo)
        }
      })
      .catch((err) => {
        console.log('errors', err)
      })
  }
  const handleMaritalStatus = async (event) => {
    onloadData.maritalStatus = event.target.value
    setPersonalDetailsMaritalCondition(event.target.value)
  }

  const onCancel = () => {
    setEditAddress(!editAddress)
    setEditAddressClick(!editAddressClick)
  }

  const getEditAddress = (onloadData) => {
    setEditAddress(!editAddress)
    setEditAddressClick(!editAddressClick)

    setValue('addressLine', onloadData.currentAddressLine1)
    setValue('addressLine2', onloadData.currentAddressLine2)
    setValue('Country', onloadData.currentCountry)
    setValue('State', onloadData.currentState)
    setValue('City', onloadData.currentCity)
    setValue('Pincode', onloadData.currentPincode)
    setValue('HouseType', onloadData.currentHouseType)
    setValue('currentCity', onloadData.currentStayingSince)
    setValue('Staying', onloadData.livingInCurrentCitySince)
    setValue('addressLineP', onloadData.permanentAddressLine1)
    setValue('addressLine2P', onloadData.permanentAddressLine2)
    setValue('CountryP', onloadData.permanentCountry)
    setValue('StateP', onloadData.permanentState)
    setValue('CityP', onloadData.permanentCity)
    setValue('PincodeP', onloadData.permanentPincode)
    setValue(
      'permanentSameAsCurrentAddress',
      onloadData.permanentSameAsCurrentAddress,
    )
  }
  const handleSocialMediaPopUp = () => {
    setSocialMediaPopUp(true)
  }
  const handleClose = () => {
    setSocialMediaPopUp(false)
    setShow(false);
  }
  const personalDetailsEdit = (onloadData) => {
    setValue('Alternate_Mobile_Number', onloadData.alternatePhone)
    setValue('Personal_Email', onloadData.personalEmail)
    setValue('Official_Email', onloadData.officialEmail)
    // if (onloadData.spoues_name) {
    //   setValue('spoues_name', onloadData.spoues_name)
    // } else {
    //   setValue('spoues_name', 'test')
    // }
    setValue('Mobile_No', onloadData.phone)

    //setValue('married_date', onloadData.married_date)
    // if (onloadData.spouse_birthday === 'undefined') {
    //   setValue('spouse_birthday', moment(new Date()).format('YYYY-MM-DD'))
    // } else {
    //   setValue('spouse_birthday', onloadData.spouse_birthday)
    // }

    // if (onloadData.married_date === 'undefined') {
    //   setValue('married_date', moment(new Date()).format('YYYY-MM-DD'))
    // } else {
    //   setValue('married_date', onloadData.married_date)
    // }
    setValue('First_Name', onloadData.firstName)
    setValue('Middle_Name', onloadData.middleName)
    setValue('Last_Name', onloadData.lastName)

    setValue('Date_of_Birth', onloadData.dateOfBirth)
    setValue('Gender', onloadData.gender)
    setValue('bloodGroup', onloadData.bloodGroup)
    setValue('marritalStatus', onloadData.maritalStatus)
    setValue('married_date', onloadData.anniversaryDate)
    setPersonalDetailsOnedit(true)
  }
  const personalDetailscancel = () => {
    setPersonalDetailsOnedit(false)
  }
  const onUpdateSocialSubmit = async () => {
    var req = {
      linkedinProfile: getValues('linkedinProfile'),
      twitterProfile: getValues('twitterProfile'),
      facebookProfile: getValues('facebookProfile'),
    }
    await axios
      .patch(`/api/directory/get_update/employee/${employeeID}/`, req)
      .then((result) => {
        setSocialMediaPopUp(false)
        getEmployeeDetails()
      })
      .catch((err) => {
        console.log('errors', err)
      })
  }
  const savePersonalDetails = async () => {
    let dob = getValues('Date_of_Birth')
    let marriageAnniversary = getValues('married_date')
    let formateMarriageAnniversary = moment(marriageAnniversary).format(
      'DD-MM-YYYY',
    )
    var req = {
      alternatePhone: getValues('Alternate_Mobile_Number'),
      gender: getValues('Gender'),
      dateOfBirth: dob,
      lastName: getValues('Last_Name'),
      middleName: getValues('Middle_Name'),
      firstName: getValues('First_Name'),
      bloodGroup: getValues('bloodGroup'),
      //maritalStatus: getValues('spouse_birthday'),
      maritalStatus: getValues('marritalStatus'),
      phone: getValues('Mobile_No'),
      //spoues_name: getValues('spoues_name'),
      officialEmail: getValues('Official_Email'),
      personalEmail: getValues('Personal_Email'),
    }
    if (marriageAnniversary) {
      req.anniversaryDate = formateMarriageAnniversary
    }
    if (dob){
            req.dateOfBirth = moment(dob).format('DD-MM-YYYY')
        }

    await axios
      .patch(`/api/directory/get_update/employee/${employeeID}/`, req)
      .then((result) => {
        personalDetailscancel()
        getEmployeeDetails()
      })
      .catch((err) => {
        console.log('errors', err)
      })
  }
  //--------------- get address ---------------//

  // const getAddress = async () => {
  //   await axios
  //     .patch(`/api/directory/get_update/employee/${employeeID}/`)
  //     .then((result) => {
  //       setAddressGetData(result.data.addressDetails)
  //       console.log('data of address', result.data.addressDetails)
  //     })
  //     .catch((err) => {
  //       console.log('errors', err)
  //     })
  // }

  //---------//
  const PermanentAddressChange = (data) => {
    setCheckBoxValue(data)
    //alert(data)
    let addressLine = getValues('addressLine')
    let addressLine2 = getValues('addressLine2')
    let Country = getValues('Country')
    let State = getValues('State')
    let City = getValues('City')
    let Pincode = getValues('Pincode')
    //====

    // let pAddressLine =  getValues('addressLineP');
    // let pAddressLine2 = getValues('addressLine2P');
    // let pCountry = getValues('CountryP');
    // let pState = getValues('StateP');
    // let pCity = getValues('CityP');
    // let pPincode = getValues('PincodeP');

    if (data === true) {
      setValue('addressLineP', addressLine)
      setValue('addressLine2P', addressLine2)
      setValue('CountryP', Country)
      setValue('StateP', State)
      setValue('CityP', City)
      setValue('PincodeP', Pincode)
    } else {
      setValue('addressLineP', '')
      setValue('addressLine2P', '')
      setValue('CountryP', '')
      setValue('StateP', '')
      setValue('CityP', '')
      setValue('PincodeP', '')
    }
  }

  //----

  const onEditAddress = async () => {
    let currentLiving = getValues('currentCity')
    let currentStay = getValues('Staying')
    let cLValue = moment(currentLiving).format('DD-MM-YYYY')
    let cSValue = moment(currentStay).format('DD-MM-YYYY')

    var req = {
      addressDetails: {
        currentAddressLine1: getValues('addressLine'),
        currentAddressLine2: getValues('addressLine2'),
        currentCountry: getValues('Country'),
        currentState: getValues('State'),
        currentCity: getValues('City'),
        currentPincode: getValues('Pincode'),
        currentHouseType: getValues('HouseType'),
        currentStayingSince: cSValue,
        livingInCurrentCitySince: cLValue,
        permanentAddressLine1: getValues('addressLineP'),
        permanentAddressLine2: getValues('addressLine2P'),
        permanentCountry: getValues('CountryP'),
        permanentState: getValues('StateP'),
        permanentCity: getValues('CityP'),
        permanentPincode: getValues('PincodeP'),
        permanentSameAsCurrentAddress: checkBoxValue,
      },
    }
    await axios
      .patch(`/api/directory/get_update/employee/${employeeID}/`, req)
      .then((result) => {
        console.log('update get data', result)
        getEmployeeDetails()

        setSuccessAlert1(true)
        //setAddressGetData(result.data.address);
      })
      .catch((err) => {
        console.log('errors', err)
      })
  }
  //---------------------- salary details--------------------------//
  const saveSalaryData = async (data) => {
       


    var req = {
      salaryDetails: {
        accountHolderName: getValues('account_holder_name'),
        accountNumber: getValues('account_number'),
        accountType: getValues('account_type'),
        bankName: getValues('bank_name'),
        branchName: getValues('branch_name'),
        city: getValues('city'),
        //createdAt: getValues('HouseType'),
        //createdBy: cSValue,
        ctc:getValues('ctc'),
        //employee: getValues('addressLineP'),
        //id: getValues('addressLine2P'),
        ifscCode: getValues('ifsc_code'),
        //salary: getValues('StateP'),
        //updatedAt: getValues('CityP'),
        //updatedBy: getValues('PincodeP'),
        
      },
    }
    console.log('salaryInfo',req)
    await axios
      .patch(`/api/directory/get_update/employee/${employeeID}/`, req)
      .then((result) => {
        console.log('update get data', result)
        getEmployeeDetails()

        setSalaryInfo(!salaryInfo)
    setSalaryInfoBtnClick(!salaryInfoBtnClick)
      })
      .catch((err) => {
        console.log('errors', err)
      })
  }

  //-----

  const salaryInfoOnClick = () => {
    // setValue("resignationDate", resignationInfo.resignationDate)
    // setValue("resignationStatus", resignationInfo.resignationStatus)
    // setValue("terminationDate", resignationInfo.terminationDate)
    // setValue("noticePeriod", resignationInfo.noticePeriod)
    setSalaryInfo(!salaryInfo)
    setSalaryInfoBtnClick(!salaryInfoBtnClick)
  }

  //-------
  const getBankaccounttype = async () => {
    try {
      const response = await axios.get(`/api/company/bankaccount/type/`)
      setbankaccountTypes(response.data)
    } catch (error) {
      console.log('not found')
    }
  }
  //------------

  const ifscSubmit = async () => {
    let ifscValue = getValues('IFSCSearch')
    try {
      const bankData = await axios.get(
        `https://bank-apis.justinclicks.com/API/V1/IFSC/${ifscValue}/`,
      )
      let responseData = bankData.data
      console.log('search data', responseData)

      setIfscResponseData(responseData)
      setIfscDataPopUp(true)
      handleClose(false)
    } catch (error) {
      console.log('not found')
    }
  }
  const SelectBankData = () => {
    //setshowAddinfo(true)

    setIfscDataPopUp(false)
    setValue('AccountTitle')
    setValue('bank_name', ifscResponseData.BANK)
    setValue('AccountNumber')
    setValue('branch_name', ifscResponseData.BRANCH)
    setValue('city', ifscResponseData.DISTRICT)
    setValue('ifsc_code', ifscResponseData.IFSC)
    setValue('AccountType')
  }

  //----------------
  

  useEffect(() => {
     var newDate = new Date();
        var substact = moment(newDate).subtract(18, 'years').format("YYYY-MM-DD");
        setMaxDateOfBith(substact)
    getEmployeeDetails()
     getBankaccounttype();
  }, [])
  return (
    <>
      <div className="borderwithline mt-3">
        <strong>Personal Details</strong>
        {!personalDetailsOnedit ? (
          <div
            className="editButtonOnright"
            onClick={() => personalDetailsEdit(onloadData)}
          >
            {' '}
            <AiOutlineEdit />{' '}
          </div>
        ) : (
          ''
        )}
      </div>
      <div className="row borderwithshadow" style={{ margin: 0 }}>
        <div className="col-md-3 marginbottom15">
          <div className="">
            <strong> Name</strong>

            {/* <span class="align-text-top text-danger ml-1 fw-bolder">*</span> */}
          </div>
          {personalDetailsOnedit ? (
            <div>
              <input
                className="form-control"
                type="text"
                maxLength={20}
                {...register('First_Name', {
                  required: 'Please enter first name',
                  pattern: {
                    value: /^[a-zA-Z\s]+$/,
                    message: 'Please enter valid first name',
                  },
                })}
                onKeyUp={() => {
                  trigger('First_Name')
                }}
              />
              <p className="text-start">
                {errors.First_Name && (
                  <span className="text-danger ">
                    {errors.First_Name.message}
                  </span>
                )}
              </p>
            </div>
          ) : (
            <div className="">
              {onloadData.firstName} {onloadData.lastName}
            </div>
          )}
        </div>
        {personalDetailsOnedit ? (
          <>
            <div className="col-md-3 marginbottom15">
              <div className="">
                <strong>Middle Name </strong>
              </div>
              <div>
                <input
                  className="form-control"
                  type="text"
                  maxLength={20}
                  {...register('Middle_Name', {
                    pattern: {
                      value: /^[a-zA-Z_ ]+$/,
                      message: 'Please enter valid last name', // JS only: <p>error message</p> TS only support string
                    },
                  })}
                />
              </div>
            </div>
            <div className="col-md-3 marginbottom15">
              <div className="">
                <strong>Last Name</strong>{' '}
              </div>
              <div>
                <input
                  className="form-control "
                  type="text"
                  maxLength={20}
                  {...register('Last_Name', {
                    required: 'Please enter last name',
                    pattern: {
                      value: /^[a-zA-Z_ ]+$/,
                      message: 'Please enter valid last name', // JS only: <p>error message</p> TS only support string
                    },
                  })}
                />
              </div>
            </div>
          </>
        ) : (
          ''
        )}
        <div className="col-md-3 marginbottom15">
          <div className="">
            <strong>Date of Birth</strong>
          </div>

          {personalDetailsOnedit ? (
            <div>
              <input
                className="form-control"
                type="date"
                max={MaxDateOfBith}
                //max={moment(new Date()).format("YYYY-MM-DD")}
                {...register('Date_of_Birth', {
                  required: 'Please select date of birth',
                })}
              />
            </div>
          ) : (
            <div className="">{onloadData.dateOfBirth}</div>
          )}
        </div>
        <div className="col-md-3 marginbottom15">
          <div className="">
            <strong>Gender</strong>
          </div>
          {personalDetailsOnedit ? (
            <div>
              <select
                name="Gender"
                className="form-control"
                {...register('Gender', {
                  required: 'Please select gender',
                })}
              >
                <option value="">-- Select Gender --</option>
                <option value="MALE">MALE</option>
                <option value="FEMALE">FEMALE</option>
                <option value="TRANSGENDER">TRANSGENDER</option>
                <option value="UNDEFINED">UNDEFINED</option>
              </select>
            </div>
          ) : (
            <div className="">{onloadData.gender}</div>
          )}
        </div>
        <div className="col-md-3 marginbottom15">
          <div className="">
            <strong>Blood Group</strong>
          </div>
          {personalDetailsOnedit ? (
            <div>
              <select
                name="Blood Group"
                className="form-control"
                {...register('bloodGroup', {
                  required: 'Please select gender',
                })}
              >
                <option value="">-- Select Blood Group --</option>
                <option value="O">O+</option>
                <option value="O">O-</option>
                <option value="A">A-</option>
                <option value="A+">A+</option>
                <option value="B">B</option>
                <option value="B+">B+</option>
                <option value="AB">AB</option>
                <option value="AB+">AB+</option>
              </select>
            </div>
          ) : (
            <div className="">{onloadData.bloodGroup}</div>
          )}
        </div>

        <div className="col-md-3 marginbottom15">
          <div className="">
            <strong> Marital Status</strong>
          </div>

          {personalDetailsOnedit ? (
            <div>
              <select
                className="form-control"
                {...register('marritalStatus')}
                onChange={(e) => handleMaritalStatus(e)}
              >
                <option value=""> -- Select Marital Status -- </option>
                <option value="Married">Married</option>
                <option value="Single">Single</option>
              </select>
            </div>
          ) : (
            <div className="">{onloadData.maritalStatus}</div>
          )}
        </div>

        {personalDetailsMaritalCondition === 'Married' ||
        onloadData.maritalStatus === 'Married' ? (
          <>
            <div className="col-md-3 marginbottom15">
              <div className="">
                <strong> Marriage Anniversary</strong>
              </div>
              {personalDetailsOnedit ? (
                <div>
                  <input
                    className="form-control"
                    type="date"
                      max={moment(new Date()).format("YYYY-MM-DD")}
                    {...register('married_date')}
                  />
                </div>
              ) : (
                <div className="">{onloadData.anniversaryDate}</div>
              )}
            </div>
            {/* <div className="col-md-3 marginbottom15">
                          <div className="">
                            <strong>Spouse Name</strong>
                          </div>
                          {personalDetailsOnedit ? (
                            <div>
                              <input
                                className="form-control"
                                maxLength={20}
                                type="text"
                                {...register('spoues_name', {
                                  pattern: {
                                    value: /^[a-zA-Z_ ]+$/,
                                    message: 'Only Alphabets allowed', // JS only: <p>error message</p> TS only support string
                                  },
                                })}
                              />
                            </div>
                          ) : (
                            <div className="">
                              {onloadData.spoues_name}
                            </div>
                          )}
                        </div>
                        <div className="col-md-3 marginbottom15">
                          <div className="">
                            <strong>Spouse Birth Day</strong>
                          </div>
                          {personalDetailsOnedit ? (
                            <div>
                              <input
                                className="form-control"
                                type="date"
                                {...register('spouse_birthday')}
                              />
                            </div>
                          ) : (
                            <div className="">
                              {onloadData.spouse_birthday}
                            </div>
                          )}
                        </div> */}
          </>
        ) : (
          ''
        )}
        <div className="col-md-3 marginbottom15">
          <div className="">
            <strong>Official Email ID</strong>
          </div>
          {personalDetailsOnedit ? (
            <div>
              <input
                className="form-control"
                type="text"
                {...register('Official_Email', {
                  required: 'Please enter Official Email',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]{2,}\.+[A-Z]{2,}$/i,
                    message: 'Please enter valid Official Email', // JS only: <p>error message</p> TS only support string
                  },
                })}
              />
            </div>
          ) : (
            <div className="">{onloadData.officialEmail}</div>
          )}
        </div>
        <div className="col-md-3 marginbottom15">
          <div className="">
            <strong>Personal Email ID</strong>
          </div>
          {personalDetailsOnedit ? (
            <div>
              <input
                className="form-control"
                type="text"
                {...register('Personal_Email', {
                  required: 'Please enter personal email',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]{2,}\.+[A-Z]{2,}$/i,
                    message: 'Please enter valid personal email', // JS only: <p>error message</p> TS only support string
                  },
                })}
              />
            </div>
          ) : (
            <div className="">{onloadData.personalEmail}</div>
          )}
        </div>
        <div className="col-md-3 marginbottom15">
          <div className="">
            <strong>Phone Number</strong>
          </div>
          {personalDetailsOnedit ? (
            <div>
              <input
                className="form-control"
                type="number"
                maxLength={15}
                {...register('Mobile_No',   {
                        required: "This field is required",
                        pattern: {
                          value:
                            /^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/,
                          message: "Please enter a valid mobile number.",
                        },
                        minLength: {
                          value: 10,
                          message: "Please enter min 10 numbers ",
                        },
                        maxLength: {
                          value: 15,
                          message: "Please enter max 15 numbers ",
                        },
                      })}
               onKeyUp={(e) => {
                        trigger("Mobile_No");
                      }}
                    />

                    {errors.Mobile_No && (
                      <small className='text-danger font-bold'>
                        {errors.Mobile_No.message}
                      </small>
                    )}
            </div>
          ) : (
            <div className="">{onloadData.phone}</div>
          )}
        </div>
        <div className="col-md-3 marginbottom15">
          <div className="">
            <strong>Alternate Phone Number</strong>
          </div>
          {personalDetailsOnedit ? (
            <div>
              <input
                className="form-control"
                type="number"
                maxLength={15}
                {...register('Alternate_Mobile_Number',    {
                        required: "This field is required",
                        pattern: {
                          value:
                            /^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/,
                          message: "Please enter a valid mobile number.",
                        },
                        minLength: {
                          value: 10,
                          message: "Please enter min 10 numbers ",
                        },
                        maxLength: {
                          value: 15,
                          message: "Please enter max 15 numbers ",
                        },
                      })}
               onKeyUp={(e) => {
                        trigger("Alternate_Mobile_Number");
                      }}
                    />

                    {errors.Alternate_Mobile_Number && (
                      <small className='text-danger font-bold'>
                        {errors.Alternate_Mobile_Number.message}
                      </small>
                    )}
            </div>
          ) : (
            <div className="">{onloadData.alternatePhone}</div>
          )}
        </div>
        {personalDetailsOnedit ? (
          <div className="col-md-12">
            <div className="text-end">
              <button
                className="btn btn-warning"
                onClick={() => personalDetailscancel(onloadData)}
              >
                Cancel
              </button>{' '}
              &nbsp;
              <button
                className="btn btn-primary"
                onClick={() => savePersonalDetails()}
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
      <div style={{ margin: 50 }}></div>

      <div className="row" style={{ margin: 0 }}>
        <div className="borderwithline">
          <strong>ADDRESSES</strong>
          {editAddressClick ? (
            <div
              className="editButtonOnright"
              onClick={() => {
                getEditAddress(addressGetData)
              }}
            >
              <AiOutlineEdit />
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
      {editAddress ? (
        <div className="row borderwithshadow" style={{ margin: 0 }}>
          <div className="col-md-6 marginbottom15">
            <div className="">
              <strong> Current Address</strong>
            </div>
            <div className="">
              <p>
                {addressGetData === 'null'
                  ? ''
                  : addressGetData.currentAddressLine1}{' '}
              </p>
              <p>
                {addressGetData === 'null'
                  ? ''
                  : addressGetData.currentAddressLine2}{' '}
              </p>

              <p>
                <p>
                  {addressGetData === 'null' ? '' : addressGetData.currentCity} ,{' '}
                  {addressGetData === 'null' ? '' : addressGetData.currentState}{' '}
                </p>
                {addressGetData === 'null' ? '' : addressGetData.currentCountry}-{' '}
                {addressGetData === 'null' ? '' : addressGetData.currentPincode}
              </p>
            </div>
            <br />
            <div>
              <strong>House Type</strong>
              <p>
                {addressGetData === 'null'
                  ? ''
                  : addressGetData.currentHouseType}{' '}
              </p>
            </div>

            <div>
              <strong>Staying at Current Residence Since</strong>
              <p>
                {addressGetData === 'null'
                  ? ''
                  : addressGetData.currentStayingSince}{' '}
              </p>
            </div>

            <br />
            <div>
              <strong>Living in Current City Since</strong>
              <p>
                {addressGetData === 'null'
                  ? ''
                  : addressGetData.livingInCurrentCitySince}{' '}
              </p>
            </div>
          </div>
          <div className="col-md-6 marginbottom15">
            <div className="">
              <strong> Permanent Address</strong>
            </div>
            <div className="">
              <p>
                {addressGetData === 'null'
                  ? ''
                  : addressGetData.permanentAddressLine1}{' '}
              </p>
              <p>
                {addressGetData === 'null'
                  ? ''
                  : addressGetData.permanentAddressLine2}{' '}
              </p>

              <p>
                <p>
                  {addressGetData === 'null' ? '' : addressGetData.permanentCity}{' '}
                  ,{' '}
                  {addressGetData === 'null'
                    ? ''
                    : addressGetData.permanentState}{' '}
                </p>
                {addressGetData === 'null'
                  ? ''
                  : addressGetData.permanentCountry}
                -{' '}
                {addressGetData === 'null'
                  ? ''
                  : addressGetData.permanentPincode}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="row borderwithshadow">
          
          <div className="col-md-6">
            <br />
            <h5> Current Address</h5>

            <div className="marginbottom15">
              <strong className="form-label mt-3">AddressLine 1</strong>
              <input
                className="form-control "
                type="text"
                {...register('addressLine', {
                  required: 'Please enter address',
                })}
              />
              {errors.addressLine && (
                <small className="text-danger">
                  {errors.addressLine.message}
                </small>
              )}
            </div>
            <div className="marginbottom15">
              <strong className="form-label"> AddressLine 2</strong>
              <input
                className="form-control "
                type="text"
                {...register('addressLine2', {
                  required: 'Please enter address',
                })}
              />
              {errors.addressLine2 && (
                <small className="text-danger">
                  {errors.addressLine2.message}
                </small>
              )}
            </div>
            <div className="row marginbottom15">
              <div className="col-md-6 mt-1">
                <strong className="form-label"> Country</strong>
                <input
                  className="form-control "
                  type="text"
                  {...register('Country', {
                    required: 'Please enter Country',
                  })}
                />
                {errors.Country && (
                  <small className="text-danger">
                    {errors.Country.message}
                  </small>
                )}
              </div>
              <div className="col-md-6 mt-1">
                <strong className="form-label"> State</strong>
                <input
                  className="form-control "
                  type="text"
                  {...register('State', {
                    required: 'Please enter State',
                  })}
                />
                {errors.State && (
                  <small className="text-danger">{errors.State.message}</small>
                )}
              </div>
            </div>
            <div className="row marginbottom15">
              <div className="col-md-6 mt-1">
                <strong className="form-label"> City</strong>
                <input
                  className="form-control "
                  type="text"
                  {...register('City', {
                    required: 'Please enter City',
                  })}
                />
                {errors.City && (
                  <small className="text-danger">{errors.City.message}</small>
                )}
              </div>
              <div className="col-md-6 ">
                <strong className="form-label"> Pincode</strong>
                <input
                  className="form-control "
                  type="text"
                  maxLength={6}
                  {...register('Pincode', {
                    required: 'Please enter Pincode',
                  })}
                />
                {errors.Pincode && (
                  <small className="text-danger">
                    {errors.Pincode.message}
                  </small>
                )}
              </div>
            </div>
            <div className="row marginbottom15">
              <div className="col-md-6">
                <strong className=" mt-3 form-label">HouseType </strong>
                <select
                  name="HouseType"
                  className="form-control "
                  {...register('HouseType', {
                    required: 'Please select HouseType',
                  })}
                >
                  <option value="">-- Select HouseType --</option>
                  <option value="Owned by Self/Spouse">
                    Owned by Self/Spouse
                  </option>
                  <option value="Owned by Parent/Sibling">
                    Owned by Parent/Sibling
                  </option>
                  <option value="Rented - with Family">
                    Rented - with Family
                  </option>
                  <option value="Rented - with Friends">
                    Rented - with Friends
                  </option>
                  <option value="Rented - Staying Alone">
                    Rented - Staying Alone
                  </option>
                  <option value="Paying Guest"> Paying Guest</option>
                  <option value="Hostel"> Hostel</option>
                  <option value="Company Provided"> Company Provided</option>
                  <option value="Other"> Other</option>
                </select>
                {errors.HouseType && (
                  <small className="text-danger">
                    {errors.HouseType.message}
                  </small>
                )}
              </div>
              <div className="col-md-6 ">
                <strong className="form-label"> Staying Since</strong>
                <div>
                  <input
                    className="form-control"
                    type="date"
                    max={moment(new Date()).format("YYYY-MM-DD")}
                    {...register('Staying', {
                      required: 'This field is required',
                    })}
                  />
                  {errors.Staying && (
                    <small className="text-danger">
                      {errors.Staying.message}
                    </small>
                  )}
                </div>
              </div>
            </div>
            <div className="marginbottom15">
              <strong className="form-label mt-3">
                Living in Current City Since
              </strong>
              <div>
                <input
                  className="form-control"
                  type="date"
                  max={moment(new Date()).format("YYYY-MM-DD")}
                  {...register('currentCity', {
                    required: 'This field is required',
                  })}
                />
                {errors.currentCity && (
                  <small className="text-danger">
                    {errors.currentCity.message}
                  </small>
                )}
              </div>
            </div>
            <div className=" marginbottom15 form-check">
              <input
                type="checkbox"
                name="checkBoxValue"
                id="exampleCheck1q"
                {...register('permanentSameAsCurrentAddress')}
                onChange={(e) => PermanentAddressChange(e.target.checked)}
              />
              <label for="exampleCheck1q">
                Permanent address is the same as current address
              </label>
            </div>
          </div>
          <div className="col-md-6">
            <br />
            <h5> Permanent Address </h5>
            <div className="marginbottom15">
              <strong className="form-label"> AddressLine 1</strong>
              <input
                className="form-control "
                type="text"
                {...register('addressLineP', {
                  required: 'Please enter address',
                })}
              />
              {errors.addressLineP && (
                <small className="text-danger">
                  {errors.addressLineP.message}
                </small>
              )}
            </div>
            <div className="marginbottom15">
              <strong className="form-label"> AddressLine 2</strong>
              <input
                className="form-control "
                type="text"
                {...register('addressLine2P', {
                  required: 'Please enter address',
                })}
              />
              {errors.addressLine2P && (
                <small className="text-danger">
                  {errors.addressLine2P.message}
                </small>
              )}
            </div>
            <div className="row marginbottom15">
              <div className="col-md-6 mt-1">
                <strong className="form-label"> Country</strong>
                <input
                  className="form-control "
                  type="text"
                  {...register('CountryP', {
                    required: 'Please enter Country',
                  })}
                />
                {errors.CountryP && (
                  <small className="text-danger">
                    {errors.CountryP.message}
                  </small>
                )}
              </div>
              <div className="col-md-6 mt-1">
                <strong className="form-label"> State</strong>
                <input
                  className="form-control "
                  type="text"
                  {...register('StateP', {
                    required: 'Please enter State',
                  })}
                />
                {errors.StateP && (
                  <small className="text-danger">{errors.StateP.message}</small>
                )}
              </div>
            </div>
            <div className="row marginbottom15">
              <div className="col-md-6 mt-1">
                <strong className="form-label"> City</strong>
                <input
                  className="form-control "
                  type="text"
                  {...register('CityP', {
                    required: 'Please enter City',
                  })}
                />
                {errors.CityP && (
                  <small className="text-danger">{errors.CityP.message}</small>
                )}
              </div>
              <div className="col-md-6 mt-1">
                <strong className="form-label"> Pincode</strong>
                <input
                  className="form-control "
                  type="text"
                  maxLength={6}
                  {...register('PincodeP', {
                    required: 'Please enter Pincode',
                  })}
                />
                {errors.PincodeP && (
                  <small className="text-danger">
                    {errors.PincodeP.message}
                  </small>
                )}
              </div>
            </div>
          </div>

          {!editAddress ? (
            <div className="col-md-12">
              <br />
              <div className="text-end">
                <button
                  className="btn btn-warning m-2"
                  onClick={() => {
                    onCancel()
                  }}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary m-1"
                  onClick={() => onEditAddress()}
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
      )}
      <br />
      {/*  */}
      <div className="row" style={{ margin: 0 }}>
        <div className="borderwithline">
          <strong>SALARY INFO</strong>
          {salaryInfo ? (
            <div
              className="editButtonOnright"
              onClick={() => salaryInfoOnClick()}
            >
              Edit
            </div>
          ) : (
            ''
          )}
        </div>
      </div>

      {salaryInfoBtnClick ? (
        <div className="row borderwithshadow" style={{ margin: 0 }}>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="exampleInputEmail1 fw-bold">CTC</label>
              <p>{salaryInfoData.ctc}</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Account Holder's Name</label>
              <p>{salaryInfoData.accountHolderName}</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Bank Name</label>
              <p>{salaryInfoData.bankName}</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">City</label>
             <p>{salaryInfoData.city}</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">IFSC Code</label>
              <p>{salaryInfoData.ifscCode}</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Account Number</label>
               <p>{salaryInfoData.accountNumber}</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">account_type</label>
              <p>{salaryInfoData.accountType}</p>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="row borderwithshadow">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">CTC</label>
                <input
                  type="number"
                  {...register('ctc')}
                  className="form-control"
                  id="exampleInputEmail1"
                 
                  placeholder="Enter CTC"
                />
                
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">
                  Account Holder's Name
                </label>
                <input
                  type="text"
                  {...register('account_holder_name')}
                  className="form-control"
                  id="exampleInputEmail1"
                 
                  placeholder="Enter Account Holder's Name"
                />
               
              </div>
            </div>
            <div className="col-md-12">
              <button
                className="btn btn-primary"
                type="button"
                onClick={handleShow}
              >
                Find my Branch
              </button>
            </div>
            <div className="col-md-12">
              <br />
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Bank Name</label>
                <input
                  type="text"
                  {...register('bank_name')}
                  className="form-control"
                  id="exampleInputEmail1"
                  
                  placeholder="Enter Bank Name"
                />
              
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">City</label>
                <input
                  type="text"
                  {...register('city')}
                  className="form-control"
                  id="exampleInputEmail1"
                  
                  placeholder="Enter City"
                />
              
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Branch Name</label>
                <input
                  type="text"
                  {...register('branch_name')}
                  className="form-control"
                  id="exampleInputEmail1"
                 
                  placeholder="Enter Branch Name"
                />
             
              </div>
            </div>

            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">IFSC Code</label>
                <input
                  type="text"
                  {...register('ifsc_code')}
                  className="form-control"
                  id="exampleInputEmail1"
                 
                  placeholder="Enter IFSC Code"
                />
           
              </div>
            </div>
            <div className='col-md-4'>
                                    <div className='form-group'>
                                        <label htmlFor='exampleInputEmail1'>Account Number</label>
                                        <input
                                            type='text'
                                            {...register("account_number")}
                                            className='form-control'
                                            id='exampleInputEmail1'
                                            aria-describedby='emailHelp'
                                            placeholder='Enter Account Number'
                                        />
                                       
                                    </div>
                                </div>
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">account_type</label>
                <select
                  name="account_type"
                  className="form-control"
                  {...register('account_type')}
                >
                  <option value="">-- Select Account Type --</option>
                  {bankaccountTypes.map((item, m) => {
                    return (
                      <option value={item.id} key={m}>
                        {item.value}
                      </option>
                    )
                  })}
                </select>
             
              </div>
            </div>

            <div className="text-end">
              <button
                className="btn btn-warning m-1"
                onClick={() => salaryInfoOnClick()}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary m-1"
                onClick={() => saveSalaryData()}
                type='submit'
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <br />

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Find My Branch</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {' '}
          <div className="container">
            <div className="row col-md-12 m-2">
              <input
                type="text"
                className="form-control"
                placeholder="IFSC Code"
                {...register('IFSCSearch')}
                onKeyUp={(e) => {
                  trigger('IFSCSearch')
                }}
              />{' '}
              {errors.IFSCSearch && (
                <small className="text-danger ">
                  {errors.IFSCSearch.message}
                </small>
              )}{' '}
              <p></p>
              <div
                for="exampleDataList"
                className="btn btn-primary col-md-3 "
                onClick={() => ifscSubmit()}
              >
                Search
              </div>
            </div>

            <div className="text-center m-3">Or</div>
            <hr className="m-3 text-danger" />
            <div className="row  m-2">
              <div className="col-md-6">
                <select className="form-select">
                  <option selected>Select Bank</option>
                  <option value="">''</option>
                </select>
              </div>
              <div className="col-md-6">
                <select className="form-select">
                  <option selected>Select state</option>
                  <option value="">''</option>
                </select>
              </div>
            </div>
            <div className="row  m-2">
              <div className="col-md-6">
                <select className="form-select">
                  <option selected>Select City</option>
                  <option value="">''</option>
                </select>
              </div>
              <div className="col-md-6">
                <select className="form-select">
                  <option selected>Select Branch</option>
                  <option value="">''</option>
                </select>
              </div>
            </div>
            <div className="d-flex justify-content-end m-2">
              <div className="btn btn-primary">Submit</div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        size="md"
        show={ifscDataPopUp}
        onHide={() => setIfscDataPopUp(false)}
        className="text-center"
      >
        <Modal.Header closeButton> Find Branch </Modal.Header>
        <div>
          <table className="table">
            <tbody>
              <tr>
                <th scope="row">IFSC Code</th>
                <td>{ifscResponseData.IFSC}</td>
              </tr>
              <tr>
                <th scope="row">MICR Code</th>
                <td>{ifscResponseData.MICR}</td>
              </tr>
              <tr>
                <th scope="row">Bank</th>
                <td>{ifscResponseData.BANK}</td>
              </tr>
              <tr>
                <th scope="row">Address</th>
                <td>{ifscResponseData.ADDRESS}</td>
              </tr>
              <tr>
                <th scope="row">District</th>
                <td>{ifscResponseData.DISTRICT}</td>
              </tr>
              <tr>
                <th scope="row">State</th>
                <td>{ifscResponseData.STATE}</td>
              </tr>
              <tr>
                <th scope="row">Phone Number</th>
                <td>{ifscResponseData.CONTACT}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-end m-3">
          <div className="btn btn-primary" onClick={SelectBankData}>
            SELECT BANK
          </div>
        </div>
      </Modal>

      {/*  */}
      <div>
        <div className="row " style={{ margin: 0 }}>
          <div className="m-3"></div>{' '}
          <div className="card p-3">
            <div className="body">
              <div className="row borbottm">
                <div className="col-md-6">
                  <h6>SOCIAL PROFILE</h6>
                </div>
                <div className="col-md-6 text-end fns-w">
                  <div
                    onClick={() => {
                      handleSocialMediaPopUp()
                    }}
                  >
                    <AiOutlineEdit />
                  </div>
                </div>
              </div>
              <div className="row" style={{ margin: 0 }}>
                <div className="col-md-12 mt-2">
                  <div className="social-section">
                    <ul>
                      <li>
                        <a
                          className="btn-floating btn-small btn-li waves-effect waves-light"
                          href={onloadData.linkedinProfile}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="fa fa-linkedin"> </i>
                        </a>
                      </li>
                      <li>
                        <a
                          className="btn-floating btn-small btn-li waves-effect waves-light"
                          href={onloadData.facebookProfile}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="fa fa-facebook"> </i>{' '}
                        </a>{' '}
                      </li>
                      <li>
                        <a
                          className="btn-floating btn-small btn-li waves-effect waves-light"
                          href={onloadData.twitterProfile}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="fa fa-twitter"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div></div>
      <Modal
        size="md"
        show={socialMediaPopUp}
        onHide={() => setSocialMediaPopUp(false)}
        className="text-center"
      >
        <Modal.Header closeButton></Modal.Header>
        <div>
          <div
          // onSubmit={handleSubmit(onUpdateSocialSubmit)}
          >
            <div className="row">
              <div className="col-md-1">
                <Link className="btn-floating btn-small btn-li waves-effect waves-light">
                  <i className="fa fa-linkedin"> </i>{' '}
                </Link>
              </div>
              <div className="col-md-10">
                <div className="md-form">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter URL"
                    {...register('linkedinProfile', {})}
                    onKeyUp={(e) => {
                      trigger('linkedinProfile')
                    }}
                  />
                </div>
              </div>
              <div className="col-md-4"></div>
            </div>
            <div className="row">
              <div className="col-md-1">
                <Link className="btn-floating btn-small btn-li waves-effect waves-light">
                  <i className="fa fa-facebook"> </i>
                </Link>
              </div>
              <div className="md-form col-md-10">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter URL"
                  {...register('facebookProfile', {})}
                  onKeyUp={(e) => {
                    trigger('facebookProfile')
                  }}
                />
              </div>
              <div className="col-md-4"></div>
            </div>
            <div className="row">
              <div className="col-md-1">
                <Link className="btn-floating btn-small btn-li waves-effect waves-light">
                  <i className="fa fa-twitter"> </i>
                </Link>
              </div>
              <div className="md-form col-md-10">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter URL"
                  {...register('twitterProfile', {})}
                  onKeyUp={(e) => {
                    trigger('twitterProfile')
                  }}
                />
              </div>
              <div className="text-center m-3">
                <button
                  className="btn btn-secondary me-3 "
                  onClick={handleClose}
                >
                  Cancel
                </button>
                <div
                  className="btn btn-primary me-3 "
                  onClick={onUpdateSocialSubmit}
                >
                  Save
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        size="md"
        show={successAlert1}
        onHide={() => setSuccessAlert1(false)}
        className="text-center"
      >
        <Modal.Header closeButton></Modal.Header>
        <div className="text-center m-3">
          <FcOk size="80px" />
        </div>
        <h4 className="text-center"> Update Successfully</h4>
        <div className="text-center m-3">
          <button
            className="btn btn-primary"
            onClick={() => {
              setSuccessAlert1(false)

              onCancel()
            }}
          >
            OK
          </button>
        </div>
      </Modal>
    </>
  )
}

export default MyProfilePersonal
