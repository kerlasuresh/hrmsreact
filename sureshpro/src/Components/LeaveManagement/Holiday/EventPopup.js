import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form'
import axios from 'axios'
import moment from 'moment'
import Form from "react-bootstrap/Form";
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { FcOk } from 'react-icons/fc'
const EventsPopup = ({ getHolidays, handleClose, onLoadValues }) => {
    const { register, handleSubmit, reset, setValue, getValues, formState: { errors } } = useForm({ mode: "all" })
    const [eventTitleError, seteventTitleError] = useState("")
    const [eventstartError, seteventstartError] = useState("")
    const [eventendError, seteventendError] = useState("")
    const [eventDescError, seteventDescError] = useState("")
    const [departments, setdepartments] = useState([])
    const [sendto, setsendto] = React.useState([]);
    const [eventeditID, seteventeditID] = useState("")
    const [textDisplay, setTextDisplay] = useState('UpDate')
    const [successAlert, setSuccessAlert] = useState(false)
    const [selectedOptionDept, setselectedOptionDept] = useState("company");
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };
    const getDepartments = async () => {
        var userinfo = JSON.parse(sessionStorage.getItem('user-info'));
        try {
            const response = await axios.get(`/api/company/department/${userinfo.data.id}/`)
            setdepartments(response.data)
        } catch (error) {
            console.log('not found')
        }
    }
    const onloadValuesEvent = (data) => {
        seteventeditID(data.id)
        setValue('eventTitle', data.title)
        setValue('start_date_time', moment(data.startTime).format("YYYY-MM-DD HH:mm"))
        setValue('end_date_time', moment(data.endTime).format("YYYY-MM-DD HH:mm"))
        setValue('eventDescription', data.description)
        if(data.department){
          setsendto([data.department])
          setselectedOptionDept('department')
        }else{
          setselectedOptionDept('company')
        }

    }
    const errorstoNull = () => {
        seteventTitleError("")
        seteventstartError("")
        seteventendError("")
        seteventDescError("")
    }
    const onHandleSubmit = async (data) => {
        errorstoNull()
        if (!getValues('eventTitle')) {
            seteventTitleError("Please enter event title")
        }
        if (!getValues('start_date_time')) {
            seteventstartError("Please select event start date")
        }
        if (!getValues('end_date_time')) {
            seteventendError("Please select event end date")
        }
        if (!getValues('eventDescription')) {
            seteventDescError("Please enter event description")
        }

        var userinfo = JSON.parse(sessionStorage.getItem('user-info'));
        var req = {
            "company": userinfo.data.id,
            "eventTitle": getValues('eventTitle'),
            "startDate": moment(getValues('start_date_time')).format("DD-MM-YYYY"),
            "startTime": moment(getValues('start_date_time')).format("HH:mm"),
            "endDate": moment(getValues('end_date_time')).format("DD-MM-YYYY"),
            "endTime": moment(getValues('end_date_time')).format("HH:mm"),
            "eventDescription": getValues('eventDescription'),
        }

        if (getValues('eventDescription') && getValues('end_date_time') && getValues('start_date_time') && getValues('eventTitle')) {
            if (eventeditID === "") {
                if (sendto.length !== 0) {
                    req.department = sendto
                }
                try {
                    let response = await axios.post(`/api/calendor/event/`, req)
                    if (response.data.status === 201) {
                        getHolidays();
                        setSuccessAlert(true);
                        setTextDisplay("Add");
                    } else {
                    }
                } catch (error) {

                }
            } else {
                if (sendto.length !== 0) {
                    req.department = sendto[0]
                }
                try {
                    let response = await axios.patch(`/api/calendor/update/event/${eventeditID}/`, req)
                    if (response.data) {
                        getHolidays();
                        setSuccessAlert(true);
                        setTextDisplay("Update");
                    } else {
                    }
                } catch (error) {

                }
            }
        }

    }
    const handleChangeMultiple = (event) => {
        const {target: { value }} = event;
        setsendto(typeof value === 'string' ? value.split(',') : value);
        setValue('sendto', sendto)
    };
    useEffect(() => {
        getDepartments();
        setValue("CompanyRadio", "company")
        if(onLoadValues){
            onloadValuesEvent(onLoadValues)
        }else{
            setValue('eventTitle', "")
            setValue('start_date_time', "")
            setValue('end_date_time', "")
            setValue('eventDescription', "")
        }
    }, [])
    return (
        <>
            <form onSubmit={handleSubmit(onHandleSubmit)}>
                <div className='form-group'>
                    <label> EVENT TITLE </label>

                    <input
                        className="form-control"
                        type="text"
                        placeholder="Add Event Title"
                        {...register("eventTitle", {
                            required: "Leave is required"
                        })}
                    />
                    <p className='text-danger'>{eventTitleError}</p>
                </div>
                <div className='form-group'>
                    <input type='radio' value="company" checked={selectedOptionDept === 'company'} name="company" id='comapnyID' onChange={(e) => { setselectedOptionDept(e.target.value); }} />  <label className='label' htmlFor="comapnyID" > Visible to all </label><br />
                    <input type='radio' value="department" checked={selectedOptionDept === 'department'} name="company" id='departmentID' onChange={(e) => { setselectedOptionDept(e.target.value); }} />  <label className='label' htmlFor="departmentID"> Limited Visibility</label>
                </div>
                {selectedOptionDept === "department" ?
                    <Form.Group className=''>
                        <Form.Label className='fs-bold'>
                            Department
                            <span className='text-danger mandatory-field'>*</span>
                        </Form.Label>
                        <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            className='form-control'
                            multiple
                            value={sendto}
                            {...register("sendto", {
                                required: "This field is required.",
                            })}
                            onChange={handleChangeMultiple}
                            input={<OutlinedInput label="Name" />}
                            MenuProps={MenuProps}
                        >
                            {departments.map((id) => (
                                <MenuItem key={id.id} value={id.id}>
                                    {id.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </Form.Group>
                    : ""}
                <div className='form-group'>
                    <label>Start Date</label>
                    <input type="datetime-local" label="Publish Date and Time" variant="outlined" size="small" sx={{ width: 300 }} className="form-control" min={new Date().toISOString().slice(0, -8)}
                        {...register('start_date_time', {
                            required: 'Start Date Is Required',
                        })}
                    />
                    <p className='text-danger'>{eventstartError}</p>
                </div>
                <div className='form-group'>
                    <label>End Date</label>
                    <input type="datetime-local" label="End Date" variant="outlined" size="small" sx={{ width: 300 }} className="form-control" min={new Date().toISOString().slice(0, -8)}
                        {...register('end_date_time', {
                            required: 'End Date Is Required',
                        })}
                    />
                    <p className='text-danger'>{eventendError}</p>
                </div>
                <div className='form-group'>
                    <label>Event Description</label>

                    <textarea
                        className="form-control"
                        placeholder="Event Description"
                        rows={4}
                        {...register("eventDescription", {
                            required: "Event Description is required"
                        })}
                    />
                    <p className='text-danger'>{eventDescError}</p>
                </div>
                <Button
                    variant="secondary"
                    type="reset"
                    onClick={handleClose}
                >
                    Close
                </Button>
                <Button
                    type="button"
                    variant="primary"
                    value="submit"
                    aria-label="Close"
                    onClick={() => onHandleSubmit()}
                >
                    Save
                </Button>
            </form>
            <Modal size="md" show={successAlert} onHide={() => setSuccessAlert(false)} className="text-center" >
                <Modal.Header closeButton></Modal.Header>
                <div className="text-center m-3"> <FcOk size="80px" /> </div>
                <h4 className="text-center">  {textDisplay} Successfully  </h4>
                <div className="text-center m-3">
                    <button className="btn btn-primary" onClick={() => { setSuccessAlert(false); handleClose();}} >  OK  </button>
                </div>
            </Modal>
        </>
    )

}

export default EventsPopup;