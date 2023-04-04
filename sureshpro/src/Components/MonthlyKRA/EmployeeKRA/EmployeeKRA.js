import React, { useState, useEffect } from "react";
import InnerNavKRA from "./../InnerNavKRA";
import Header from "../../Dashboard/Header";
import DataTable from "react-data-table-component";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import moment from "moment";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { AiOutlineCaretRight } from "react-icons/ai";
export default function EmployeeKRA() {
    const {
        register,
        handleSubmit,
        reset,
        trigger,
        clearErrors,
        formState: { errors },
        getValues,
        setValue,
    } = useForm();
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [modelText, setModelText] = useState("Asnwers saved Successfully")
    const [ShowSuccess, setShowSuccess] = useState(false)
    const [submited, setSubmited] = useState(false);
    const [questionsList, setQuestionsList] = useState([])
    const [onlyquestionsList, setonlyQuestionsList] = useState([])
    const [onlyanswersList, setonlyanswersList] = useState([])
    const [setNameForQuestion, setSetNameForQuestion] = useState();
    const [selectedDate, setSelectedDate] = useState();
    const { id } = useParams();
    const [employeeKRAList, setEmployeeKRAList] = useState();
    const [search, setSearch] = useState([" "]);
    const [loader, setLoader] = useState(false);
    const columns = [
        {
            name: <span className='h6 fw-bold'>S.No</span>,
            selector: row => row.Num,
            sortable: true,
        },
        {
            name: <span className='h6 fw-bold'>Month</span>,
            selector: row => moment(row.month_year).format("MMMM YYYY"),
            sortable: true,
        },
        {
            name: <span className='h6 fw-bold'>Date</span>,
            width: "150px",
            selector: row => row.month_year,
            sortable: true,
        },

        {
            name: <span className='h6 fw-bold'>Employee Action</span>,
            width: "150px",
            selector: row => (
                row.employee_action === "SUBMITTED" ? <button type="button" onClick={() => employeeActionViewToanser(row.id)} className="badge badge-success disabled">{row.employee_action}</button> : <button type="button" onClick={() => employeeActionViewToanser(row.id)} className="badge badge-warning">{row.employee_action}</button>
            ),
            sortable: true,
        },
        {
            name: <span className='h6 fw-bold'>Appraisal Status</span>,
            selector: row => row.appraisal_status,
            sortable: true,
        },
        {
            name: <span className='h6 fw-bold'>Score</span>,
            selector: row => row.score,
            sortable: true,
        },
        {
            name: <span className='h6 fw-bold'>Acknowledgement Received on</span>,
            selector: row => row.acknowledgement_received_on,
            sortable: true,
        },

        {
            name: <span className='h6 fw-bold'>Management Review</span>,
            selector: row => row.comment,
            sortable: true,
        },
        {
            name: <span className='h6 fw-bold'>Reason</span>,
            selector: row => row.reason,
            sortable: true,
        }
    ];
    const getListOfdata = async (id) => {
        var req = {
            "sendquestionnaire_id": id,
        }
        await axios.post(`/monthlykra_getanswers/`, req)
            .then(result => {
                console.log("res", result);
                if (result.data.candidate_status === "SUBMITTED") {
                    setSubmited(true);
                }
                setSetNameForQuestion(result.data.set_name);
                setSelectedDate(result.data.date)
                var questionList = [];
                result.data.questions_answers.map((item, i) => {
                    var newObj = {
                        "question": item.question,
                        "answers": item.answer
                    }
                    questionList.push(newObj)
                })
                console.log(questionList)
                setQuestionsList(questionList);
            })
            .catch(err => {
                console.log("errors", err);
            });
    }
    const okquestionsuccess = () => {
        setShowSuccess(false)
        navigate(`/employeekra/`);
        getNotificationList();
    }

    const employeeActionViewToanser = (id) => {
        navigate(`/employeekra/${id}`);
        getListOfdata(id);
        setShow(true)
        setSubmited(false);
    }
    const handleClose = () => {
        setShow(false)
        setSubmited(false);
    }

    const getNotificationList = async () => {
        setLoader(true)
        var userInfo = sessionStorage.getItem('user-info');
        userInfo = JSON.parse(userInfo);
        var req = {
            "emp_code": userInfo.emp_id
        }
        await axios.post(`/employee_monthlykralist/`, req)
            .then(result => {
                console.log(result.data);
                result.data.map((item, i) => {
                    item.Num = i + 1;
                })
                setEmployeeKRAList(result.data)
                setLoader(false)
            })
            .catch(err => {
                setLoader(false)
                console.log("errors", err);
            });
    }
    const onsaveEmployeeAnswers = async () => {
        var newArray = [];
        questionsList.map((item, i) => {
            newArray.push(item.answers)
        })
        var req = {
            "sendquestionnaire_id": id,
            "answers": newArray
        }
        await axios.post(`/monthlykra_saveanswers/`, req)
            .then(result => {

                setShowSuccess(true)
                setShow(false)
                console.log(result.data);
            })
            .catch(err => {
                console.log("errors", err);
            });
    }
    const onSubmit = async () => {
        var newArray = [];
        questionsList.map((item, i) => {
            newArray.push(item.answers)
        })
        var req = {
            "sendquestionnaire_id": id,
            "answers": newArray
        }
        await axios.post(`/monthlykra_submitanswers/`, req)
            .then(result => {
                setModelText("Asnwers submited Successfully")
                setShowSuccess(true)
                setShow(false)
                console.log(result.data);
            })
            .catch(err => {
                console.log("errors", err);
            });
    }
    const changeQuestionsList = (event, index) => {
        let newValues = [...questionsList];
        newValues[index][event.target.name] = event.target.value;
        setQuestionsList(newValues);
    }
    useEffect(() => {
        if (id) {
            //getEmployeeKRAExam()
            setShow(true);
            getListOfdata(id);
        }
        getNotificationList();
    }, [])
    document.title = "HRMS | Employee KRA";
    return (
        <>
            <div className='container-fluid'>
                <InnerNavKRA />
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12  mt-4'>
                            {!loader ?
                                <DataTable
                                    columns={columns}
                                    data={employeeKRAList}
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
                                            onChange={e => setSearch(e.target.value)}
                                        />
                                    }
                                /> : <div className="text-center"><div className="spinner-border " role="status">
                                    <span className="sr-only">Loading...</span>
                                </div></div>}
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={show} onHide={handleClose} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>VITEL GLOBAL MONTHLY APPRAISAL- {moment(selectedDate).format("MMMM-YYYY")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='p-3' >
                        <div className='row'>
                            <Form.Group className='col-md-9'>
                                <Form.Label className='fs-bold'>
                                    Set Number
                                    <span className='text-danger mandatory-field'>*</span>
                                </Form.Label>
                                {setNameForQuestion}
                                {errors.departmentName && (
                                    <small className='text-danger'>
                                        {errors.departmentName.message}
                                    </small>
                                )}
                            </Form.Group>
                        </div>
                        {questionsList.map((question, i) => {
                            return (<><div className='row' key={i}>
                                <div className="col-md-9">
                                    <Form.Label className='fs-bold'>{question.question}</Form.Label>
                                    <textarea
                                        className={`form-control ${errors.description && "invalid"}`}
                                        id='descriptionId'
                                        name={"answers" + i}
                                        value={question.answers}
                                        readOnly={submited ? true : false}
                                        rows='3'
                                        // {...register("description", {
                                        //     required: "Description Name Is Required",
                                        // })}
                                        // onKeyUp={() => {
                                        //     trigger("description");
                                        // }}
                                        onChange={(e) => { changeQuestionsList(e, i); question.answers = e.target.value }}
                                    ></textarea>
                                    {
                                        errors.description && (
                                            <small className='text-danger'>
                                                {errors.description.message}
                                            </small>
                                        )
                                    }
                                </div>

                            </div>


                            </>
                            )
                        })}
                        {!submited ? <>
                            <Button
                                className='btn btn-primary m-2'
                                variant='primary'
                                type='submit'
                                onClick={() => onsaveEmployeeAnswers()}
                            >
                                Save
                            </Button>
                            <Button
                                className='btn btn-primary m-2'
                                variant='primary'
                                type='submit'
                                onClick={() => onSubmit()}
                            >
                                Submit
                            </Button>
                        </>
                            : ""}
                    </div>
                </Modal.Body>
            </Modal>
            <Modal
                size='md'
                show={ShowSuccess}
                onHide={() => setShowSuccess(false)}
                aria-labelledby='example-modal-sizes-title-md'
                className='text-center'>
                <Modal.Body>
                    <div className="padding100">
                        <AiOutlineCaretRight size={100} className="text-success" />
                    </div>
                    <h4 className='text-center padding20'>{modelText}</h4>

                    <Button variant='primary' onClick={() => okquestionsuccess()}>
                        Ok
                    </Button>
                </Modal.Body>

            </Modal>
        </>
    );
}
