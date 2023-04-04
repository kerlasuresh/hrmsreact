import React, { useState } from "react";
import { useForm } from 'react-hook-form'
import axios from 'axios'
import moment from 'moment'
import { AiOutlineEdit, AiOutlineDelete, AiOutlinePlusSquare, AiOutlineClose, AiOutlineLine } from 'react-icons/ai'
import { BiSave } from 'react-icons/bi'
import Modal from 'react-bootstrap/Modal'
import { FcOk } from 'react-icons/fc'
const HolidaysPopup = ({ Holidays, getHolidays }) => {
    const { register, handleSubmit, reset, setValue, getValues, formState: { errors } } = useForm({ mode: "all" })
    const [formValues, setFormValues] = useState([])
    const [holidayCondition, setHolidayCondition] = useState(false)
    const [onRowEdit, setOnRowEdit] = useState(false);
    const [onEditId, setOnEditId] = useState('');
    const [formNameError, setFormNameError] = useState('');
    const [formDateError, setFormDateError] = useState('');
    const [isEdited, setisEdited] = useState(false)
    const [onDeleteId, setOnDeleteId] = useState(null)
    const [smShowe, setSmShowe] = useState(false)
    const [textDisplay, setTextDisplay] = useState('UpDate')
    const [successAlert, setSuccessAlert] = useState(false)
    const handleClose1 = () => setSmShowe(false)
    let handleChange = (i, e) => {
        let newFormValues = [...formValues] // setting a values
        newFormValues[i][e.target.name] = e.target.value
        setFormValues(newFormValues)
        console.log('handlechange values', newFormValues, i)
    }
    let addFormFields = () => {
        setFormNameError('')
        setFormDateError('')
        setHolidayCondition(true);
        setFormValues([...formValues, { name: '', date: '', isOptional: false, isDeleted: false }])
    }

    let removeFormFields = (i) => {
        console.log('delete id', i)
        let newFormValues = [...formValues]
        newFormValues.splice(i, 1)
        setFormValues(newFormValues)
    }
    const onLoadValues = async (element, data) => {
        setOnEditId(element.id)
        setValue('holidayName', element.holidayName)
        setValue('holidayDate', element.holidayDate)
        setValue('checkBox', element.holidayType)
    }
    const onSubmits = async (data) => {
        setFormNameError('')
        setFormDateError("")
        var userinfo = JSON.parse(sessionStorage.getItem('user-info'))
        if (!isEdited) {
            if (formValues[data].name === '') {
                setFormNameError("this field is required!")
                return false
            }
            if (formValues[data].date === '') {
                setFormDateError("this field is required!")
                return false
            }
            let formData = formValues[data];
            const modifiedDate = moment(formData.date).format('DD-MM-YYYY')
            var req = {
                company: userinfo.data.id,
                holidayName: formData.name,
                holidayDate: modifiedDate,
                description: null,
                holidayType: formData.isOptional,
            }
            try {
                var holiDayList = await axios.post('/api/calendor/holiday/', req)
                if (holiDayList.data) {
                    setHolidayCondition(false)
                    setFormValues([])
                    getHolidays()
                    setSuccessAlert(true)
                    setTextDisplay('Add')
                    console.log(holiDayList.data)
                } else {
                }
            } catch (error) {

            }
        } else {
            const modifiedDate = moment(getValues("holidayDate")).format('DD-MM-YYYY')
            var req1 = {
                company: userinfo.data.id,
                holidayName: getValues("holidayName"),
                holidayDate: modifiedDate,
                description: null,
                holidayType: getValues("checkBox"),
            }
            try {
                var response = await axios.patch(`/api/calendor/update/holiday/${onEditId}/`, req1)
                if (response.data) {
                    setSmShowe(false)
                    setOnRowEdit(false)
                    setSuccessAlert(true)
                    getHolidays()
                    setTextDisplay('Update')
                } else {
                }
            } catch (error) {

            }
        }
    }
    const onDelete = async () => {
        try {
            var response = await axios.patch(`/api/calendor/update/holiday/${onDeleteId}/`, { "isDeleted": true })
            if (response.data) {
                setSuccessAlert(true)
                setTextDisplay('Deleted')
                getHolidays()
            }
        } catch (error) {

        }
    }
    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <table className="table">
                        <thead>
                            <tr>
                                <td>Full Name</td>
                                <td>Date</td>
                                <td>Is Optional</td>
                                <td></td>
                            </tr>
                        </thead>

                        <tbody>
                            {Holidays.map((element, index) => (
                                <tr key={index}>
                                    <td>{element.holidayName}</td>
                                    <td>{element.holidayDate}</td>
                                    <td>
                                        {element.holidayType === true ? (
                                            <input className="form-check-input" type="checkbox" checked readOnly  />
                                        ) : (
                                            <input  className="form-check-input"  type="checkbox"  disabled />
                                        )}
                                    </td>
                                    <td>
                                        <div>
                                            <button type="submit"  className="btn " onClick={() => { setisEdited(true); setOnRowEdit(true); onLoadValues(element, index) }}  >
                                                <AiOutlineEdit />
                                            </button>
                                            <button  type="button" className="btn text-danger " onClick={() => { setOnDeleteId(element.id);  setSmShowe(true) }} >
                                                <AiOutlineClose />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {onRowEdit && <tr>
                                <td>
                                    <input className={`form-control ${errors.description && 'invalid'}`} type="text" {...register('holidayName')} />
                                </td>
                                <td>
                                    <input  className={`form-control ${errors.description && 'invalid' }`} type="date" {...register('holidayDate')} />
                                </td>
                                <td>
                                    <input  className="form-check-input"  type="checkbox" {...register('checkBox')} />
                                </td>
                                <td>
                                    <div>
                                        <button  type="submit"  className="btn " onClick={() => {  onSubmits() }} > <BiSave className='text-success' /> </button>
                                        <button type="button" className="btn text-danger " onClick={() => setOnRowEdit(false)} > <AiOutlineLine /> </button>
                                    </div>
                                </td>
                            </tr>}

                            {holidayCondition && <>

                                {formValues.map((element, index) => (
                                    <tr>
                                        <td>
                                            <input className={`form-control ${errors.description && 'invalid' }`} type="text" name={'name'} value={element.name}
                                                onChange={(e) => {
                                                    handleChange(index, e)
                                                    element.name = e.target.value
                                                }}
                                            />
                                            <p className='text-danger'>{formNameError}</p>
                                        </td>
                                        <td>
                                            <input className={`form-control ${errors.description && 'invalid' }`} type="date" name={'date'} value={element.date}
                                                onChange={(e) => {
                                                    handleChange(index, e)
                                                    element.date = e.target.value
                                                }}
                                            />
                                            <p className='text-danger'>{formDateError}</p>
                                        </td>
                                        <td>
                                            <input className="form-check-input" type="checkbox"  name='isOptional' value={element.isOptional}
                                                onChange={(e) => {
                                                    handleChange(index, e)
                                                    element.isOptional = e.target.checked
                                                }}
                                            />
                                        </td>
                                        <td>
                                            <div>
                                                <button type="submit" className="btn " onClick={() => { onSubmits(index) }}> <BiSave className='text-success' /></button>
                                                <button type="button" className="btn text-danger " onClick={() => removeFormFields(index)} > <AiOutlineLine /> </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </>}
                        </tbody>
                    </table>

                    <div className="text-start ml-2 p-2">
                        <button type="button"  className="btn btn-outline-success"  onClick={() => addFormFields()} > <AiOutlinePlusSquare /> Add </button>
                    </div>
                </div>
            </div>
            <Modal size="md" show={smShowe} onHide={() => setSmShowe(false)} className="text-center" >
                <Modal.Header closeButton></Modal.Header>
                <div className="text-center m-3 text-danger"> <AiOutlineDelete size="80px" /> </div>
                <h4>Are you sure you want to delete this!</h4>
                <div className="text-center m-3">
                    <button className="btn btn-secondary me-3 " onClick={handleClose1}> Cancel </button>
                    <button className="btn btn-primary" onClick={onDelete} >  Delete  </button>
                </div>
            </Modal>
            <Modal size="md" show={successAlert} onHide={() => setSuccessAlert(false)} className="text-center" >
                <Modal.Header closeButton></Modal.Header>
                <div className="text-center m-3"> <FcOk size="80px" /> </div>
                <h4 className="text-center">  {textDisplay} Successfully  </h4>
                <div className="text-center m-3">
                    <button className="btn btn-primary" onClick={() => { setSuccessAlert(false); setisEdited(false); setSmShowe(false) }} >  OK  </button>
                </div>
            </Modal>
        </>
    )
}

export default HolidaysPopup;