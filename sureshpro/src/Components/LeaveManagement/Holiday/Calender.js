import format from 'date-fns/format'
import axios from 'axios'
import moment from 'moment'
import getDay from 'date-fns/getDay'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import React, { useEffect, useState } from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'react-datepicker/dist/react-datepicker.css'
import { AiOutlineDelete } from 'react-icons/ai'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { FcOk } from 'react-icons/fc'
import { useForm } from 'react-hook-form'
import LeaveInnerNav from '../InnerNav/LeaveInnerNav'
import HolidaysPopup from './Holiday'
import EventsPopup from './EventPopup'
const locales = {'en-US': require('date-fns/locale/en-US'),}
const localizer = dateFnsLocalizer({format, parse, startOfWeek, getDay, locales})
function Calenders() {
  document.title = "HRMS | Calender";
  const { register, handleSubmit, reset, setValue, getValues, formState: { errors } } = useForm({ mode: "all" })
  const [show, setShow] = useState(false)
  const [totalHolidays, setTotalHolidays] = useState([])
  const [smShoweEventDelete, setsmShoweEventDelete] = useState(false)
  const [holidayPopUp, setHolidayPopUp] = useState(false)
  const [eventDeleteID, seteventDeleteID] = useState(false)
  const [eventeditID, seteventeditID] = useState("")
  const [ textDisplay, setTextDisplay] = useState('UpDate')
  const [successAlert, setSuccessAlert] = useState(false)
  const [showEventsinPopup, setshowEventsinPopup] = useState(false)
  const [showEventsInObject, setshowEventsInObject] = useState({})
  const [allEvents, setAllEvents] = useState([])
  const [importHoleData, setimportHoleData] = useState(false)
  const [errorToselectFile, setErrorToselectFile] = useState('')
  const [bulkUploadPopUp, setBulkUploadPopUp] = useState(false)
  const handleClose = () => { setShow(false);}
  const handleShow = () => { setShow(true); reset(); setTextDisplay("Add"); seteventeditID() }
  const handleHolidayPopUp = () => setHolidayPopUp(true)
  const getHolidays = async () => {
    var userinfo = JSON.parse(sessionStorage.getItem('user-info'))
    try {
      const response = await axios.get(`/api/calendor/holiday/${userinfo.data.id}/`)
      setTotalHolidays(response.data)
      let tempholiday = [];
      response.data.map((holiday, i) => {
        tempholiday.push({
          title: holiday.holidayName,
          allDay: true,
          start: moment(holiday.holidayDate).format("YYYY-MM-DD"),
          end: moment(holiday.holidayDate).format("YYYY-MM-DD"),
          color: holiday.holidayType ? "#764b8e" : "#9775aa",
          type: "Holiday"
        })
        return holiday;
      })
      setAllEvents([...tempholiday])
      getEventsByComapny(tempholiday);
    } catch (error) {
      console.log('not found')
    }
  }
  const getEventsByComapny = async (holidays) => {
    var userinfo = JSON.parse(sessionStorage.getItem('user-info'))
    try {
      const response = await axios.get(`/api/calendor/event/${userinfo.data.id}/`)
      //setTotalHolidays(response.data)
      let tempholiday = [];
      response.data.map((holiday, i) => {
        tempholiday.push({
          title: holiday.eventTitle,
          allDay: true,
          start: moment(holiday.startDate).format("YYYY-MM-DD"),
          end: moment(holiday.endDate).format("YYYY-MM-DD"),
          startTime: moment(holiday.startDate + ' ' + holiday.startTime, 'YYYY-MM-DD HH:mm'),
          endTime: moment(holiday.endDate + ' ' + holiday.endTime, 'YYYY-MM-DD HH:mm'),
          color: "#000000",
          type:"Event",
          department: holiday.department,
          description: holiday.eventDescription,
          id: holiday.id
        })
        return holiday;
      })
      setAllEvents([...holidays, ...tempholiday])
    } catch (error) {
      setAllEvents([...holidays])
      console.log('not found')
    }
  }
  const importholeDatapopup = () => {
    setValue("holiday_file", "")
    setimportHoleData(true)
  }
  const importEmployeeFiles = async () => {
    setErrorToselectFile("")
    var userinfo = JSON.parse(sessionStorage.getItem("user-info"));
    var FilesList = getValues("holiday_file");
    const formData = new FormData();
    if (FilesList[0]){
      formData.append("holiday_file", FilesList[0]);
      formData.append('company', userinfo.data.id);
      const config = {
        headers: { 'content-type': 'multipart/form-data' }
      }
      try {
        const response = await axios.post(`api/calendor/import/holiday/`, formData,config)
        if (response.data) {
          setimportHoleData(false)
          getHolidays()
          setBulkUploadPopUp(true)
        }

      } catch (error) {
        console.log('not found')
      }
    }else{
      setErrorToselectFile("Please Select a file")
    }
  }
  const onDeleteEvent = async () => {
    try {
      var response = await axios.patch(`/api/calendor/update/event/${eventDeleteID}/`, { "isDeleted": true })
      if (response.data) {
        setsmShoweEventDelete(false)
        setSuccessAlert(true)
        setTextDisplay('Deleted')
        getHolidays()
      }
    } catch (error) {

    }
  }
  useEffect(() => {
    getHolidays();
  }, [])
  return (
    <>
      <div className="container-fluid">
        <LeaveInnerNav />
        <div className="row mt-4">
          {/* <InnerHeader />*/}
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="text-end">
                  <Button variant="primary" className="me-3" onClick={handleHolidayPopUp} >  UPLOAD HOLIDAYS </Button>
                  <Button variant="primary" onClick={handleShow}> Add Events </Button>

                  {/*holiday pop-up  */}
                  <Modal size="lg" show={holidayPopUp} onHide={() => setHolidayPopUp(false)}  className="text-center" >
                    <Modal.Header closeButton> <div className='row w-100'>
                      <div className='col-md-6 '> <h4>Upload Holidays</h4></div>
                        <div className='col-md-6 text-end'> <button className='btn btn-primary '   onClick={() => importholeDatapopup()}>Bulk Upload</button></div>
                      </div>
                    </Modal.Header>
                    <Modal.Body>
                      <HolidaysPopup Holidays={totalHolidays} getHolidays={getHolidays} />
                    </Modal.Body>
                  </Modal>

                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>{textDisplay} Event</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <EventsPopup getHolidays={getHolidays} handleClose={handleClose} onLoadValues={eventeditID ? showEventsInObject : ""} />
                    </Modal.Body>
                  </Modal>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 p-3">
                <Calendar
                  localizer={localizer}
                  events={allEvents}
                  startAccessor="start"
                  endAccessor="end"

                  onSelectEvent={(e) => { setshowEventsinPopup(true); seteventDeleteID(""); seteventeditID(""); setshowEventsInObject(e); }}

                  eventPropGetter={event => {
                    const eventData = allEvents.find(ot => ot.title === event.title);
                    const backgroundColor = eventData && eventData.color;

                    return { style: { backgroundColor } };

                  }}
                  style={{ height: 650 }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
         
       
      <Modal size="md" show={smShoweEventDelete} onHide={() => setsmShoweEventDelete(false)} className="text-center" >
        <Modal.Header closeButton></Modal.Header>
        <div className="text-center m-3 text-danger"> <AiOutlineDelete size="80px" /> </div>
        <h4>Are you sure you want to delete this!</h4>
        <div className="text-center m-3">
          <button className="btn btn-secondary me-3 " onClick={()=>smShoweEventDelete()}> Cancel </button>
          <button className="btn btn-primary" onClick={()=>onDeleteEvent()} >  Delete  </button>
        </div>
      </Modal>
      <Modal size='md' show={showEventsinPopup} onHide={() => { setshowEventsinPopup(false); seteventDeleteID(""); seteventeditID(""); }} className='text-center'>
        <Modal.Header closeButton><h4>{showEventsInObject.type === "Holiday" ? "Holiday " : "Event "}</h4></Modal.Header>
        <div className='text-center'>{showEventsInObject.type === "Holiday" ? "Holiday: ": "Event: "} {showEventsInObject.title} </div>
        <div>Start Date: {showEventsInObject.start} </div>
        <div>End Date:  {showEventsInObject.end}</div>
        {showEventsInObject.description ? 
          <div>Description: {showEventsInObject.description}</div>: ""}
        {showEventsInObject.type === "Holiday" ? 
        <div className='text-center m-3'>
            <button className='btn btn-primary' onClick={() => { setshowEventsinPopup(false);}}> OK</button>
          </div> : <div className='text-center m-3'>

            <button className='btn btn-primary' onClick={() => { setShow(true); seteventeditID(showEventsInObject.id); setTextDisplay("Update"); setshowEventsinPopup(false); }}> Edit</button> &nbsp;
            <button className='btn btn-danger' onClick={() => { setsmShoweEventDelete(true); seteventDeleteID(showEventsInObject.id); setshowEventsinPopup(false); }}> Delete</button>
          </div>}
      </Modal>
      <Modal
        size="md"
        show={importHoleData}
        onHide={() => setimportHoleData(false)}
        aria-labelledby="example-modal-sizes-title-md"
      >
        <Modal.Header closeButton> Upload </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-12">
              <div className="SelectFileType text-center">
                <input type="file" {...register('holiday_file', {
                  required: 'Please Upload  holidayFile..!',
                })} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
              </div>
              <br />
              <div className="select"><small className="text-danger">
                {errorToselectFile}
              </small></div>
              <br />
              <div className="text-center">
                <div>If you don't have the format</div>
                <a href="http://38.143.106.215:82/media/download/holidays_bulk_upload_template.xlsx" rel="noreferrer" target="_blank">Download Here</a>
              </div>
            </div>
          </div>
          <br />
          <div className='text-right'>
          <Button variant="danger" onClick={() => setimportHoleData(false)}>
            Cancel
          </Button>
          &nbsp;
          <Button variant="primary" onClick={()=>importEmployeeFiles()}>Upload File</Button>
          </div>
        </Modal.Body>
      </Modal>
      <Modal size='md' show={bulkUploadPopUp} onHide={() => setBulkUploadPopUp(false)} className='text-center'>
        <Modal.Header closeButton>Bulk Upload</Modal.Header>
        <h4 className='text-center'> Successfully Uploaded File</h4>
        <div className='text-center m-3'>
          <button className='btn btn-primary' onClick={() => { setBulkUploadPopUp(false) }}> OK</button>
        </div>
      </Modal>
      <Modal size="md" show={successAlert} onHide={() => setSuccessAlert(false)} className="text-center" >
        <Modal.Header closeButton></Modal.Header>
        <div className="text-center m-3"> <FcOk size="80px" /> </div>
        <h4 className="text-center">  {textDisplay} Successfully  </h4>
        <div className="text-center m-3">
          <button className="btn btn-primary" onClick={() => { setSuccessAlert(false); }} >  OK  </button>
        </div>
      </Modal>
    </>
  )
}

export default Calenders;