import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import { AiOutlineCaretRight } from "react-icons/ai";
import moment from "moment";
export default function NotificationDate() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        setValue,
    } = useForm();
    const [show, setShow] = useState(false);
    const [showError, setShowError] = useState(false);
    const [popupText, setPopupText] = useState("Notification Dates Updated Successfully");
    const [minDate, setMinDate] = useState(moment(new Date()).format("YYYY-MM-DD"))
    const okemployeesuccess = () => {
        setShow(false)
    }
    const getNotificationList = async () => {
        await axios.get(`/notification_get/`)
            .then(result => {
                setValue("notification_start_date", moment(result.data[0].notification_start_date).format("YYYY-MM-DD"))
                setValue("notification_end_date", moment(result.data[0].notification_end_date).format("YYYY-MM-DD"))
                setValue("reporting_manager_start_date", moment(result.data[0].reporting_manager_start_date).format("YYYY-MM-DD"))
                setValue("reporting_manager_end_date", moment(result.data[0].reporting_manager_end_date).format("YYYY-MM-DD"))
                setValue("employees_kra_deadline_date", moment(result.data[0].employees_kra_deadline_date).format("YYYY-MM-DD"))
            })
            .catch(err => {
                console.log("errors", err);
            });
    }
    useEffect(() => {
        getNotificationList();
    }, [])
    const submitForm = async (data) => {
        if ((data.notification_end_date < data.notification_start_date) || (data.notification_end_date === data.notification_start_date)) {
            setPopupText("Notification start date should be less than end date!")
            setShowError(true)
        }
        else if ((data.reporting_manager_end_date < data.reporting_manager_start_date) || (data.reporting_manager_end_date === data.reporting_manager_start_date)) {
            setPopupText("Reporting Manager Notification start date should be less than end date!")
            setShowError(true)
        } else {
            await axios.post(`/notification_post/`, data)
                .then(result => {
                    console.log("res", result);
                    setShow(true)
                })
                .catch(err => {
                    console.log("errors", err);
                });
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit(submitForm)} className=" mt-4">
                <div className="row">
                    <div className="col-md-2">
                        Notification:
                    </div>

                    <div className="col-md-5">
                        <div className="form-group row">
                            <label htmlFor="inputEmail3" className="col-sm-3 col-form-label">Start Day *</label>
                            <div className="col-sm-9">
                                <input type="date" {...register("notification_start_date")} min={minDate} className="form-control" id="inputEmail3" placeholder="date" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5">
                        <div className="form-group row">
                            <label htmlFor="inputEmail3" className="col-sm-3 col-form-label">End Day *</label>
                            <div className="col-sm-9">
                                <input type="date"  {...register("notification_end_date")} min={minDate} className="form-control" id="inputEmail3" placeholder="date" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2">
                        Reporting Manager:
                    </div>
                    <div className="col-md-5">
                        <div className="form-group row">
                            <label htmlFor="inputEmail3" className="col-sm-3 col-form-label">Start Day *</label>
                            <div className="col-sm-9">
                                <input type="date"  {...register("reporting_manager_start_date")} min={minDate} className="form-control" id="inputEmail3" placeholder="date" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5">
                        <div className="form-group row">
                            <label htmlFor="inputEmail3" className="col-sm-3 col-form-label">End Day *</label>
                            <div className="col-sm-9">
                                <input type="date" {...register("reporting_manager_end_date")} min={minDate} className="form-control" id="inputEmail3" placeholder="date" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        Employees KRA Deadline Date *:
                    </div>
                    <div className="col-md-4">
                        <div className="form-group row">
                            <input type="date" {...register("employees_kra_deadline_date")} min={minDate} className="form-control" id="inputEmail3" placeholder="date" />
                        </div>
                    </div>

                </div>
                <div className="row">
                    <div className="col-md-12 text-center">
                        <button type="submit" className="btn btn-primary" >Save & Update</button>
                    </div>
                </div>
            </form>
            <Modal
                size='md'
                show={show}
                onHide={() => setShow(false)}
                aria-labelledby='example-modal-sizes-title-md'
                className='text-center'>
                <Modal.Body>
                    <div className="padding100">
                        <AiOutlineCaretRight size={100} className="text-success" />
                    </div>
                    <h4 className='text-center padding20'>Notification Dates Updated Successfully</h4>

                    <Button variant='primary' onClick={() => okemployeesuccess()}>
                        Ok
                    </Button>
                </Modal.Body>

            </Modal>
            <Modal
                size='md'
                show={showError}
                onHide={() => setShowError(false)}
                aria-labelledby='example-modal-sizes-title-md'
                className='text-center'>
                <Modal.Body>
                    <h4 className='text-center padding20'>{popupText}</h4>

                    <Button variant='primary' onClick={() => setShowError(false)}>
                        Ok
                    </Button>
                </Modal.Body>

            </Modal>
        </>
    )
}