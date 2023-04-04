import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { TbEdit } from "react-icons/tb";
import { GrView } from "react-icons/gr";
import { AiOutlineEdit, AiOutlineCaretRight } from "react-icons/ai";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import moment from "moment";

export default function Addquestionnaire() {
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
    const [show, setShow] = useState(false);
    const [userInfo, setUserInfo] = useState(false);
    const [viewQuestions, setViewQuestions] = useState(false);
    const [ShowSuccess, setShowSuccess] = useState(false)
    const [ShowalreadyExit, setShowalreadyExit] = useState(false);
    const [updateText, setUpdateText] = useState("Add")
    const [viewQuestionsList, setViewQuestionsList] = useState({ setNumber: "", questions: [] })
    const [isEdit, setisEdit] = useState(false)
    const [isEditID, setisEditID] = useState(false)
    const [QuestionsList, setQuestionsList] = useState([]);
    const [setNames, setNamesList] = useState([]);
    const [search, setSearch] = useState([" "]);
    const [addquestionsList, setAddquestionsList] = useState([{ "question": "" }])
    const [copyShow, setCopyShow] = useState(false)
    const [copymonthObj, setCopymonthObj] = useState();
    const [ReadOnlyName, setReadOnlyName] = useState();
    const [loader, setLoader] = useState(false);
    //const [viewShow, setViewShow] = useState(false)
    const columns = [
        {
            name: "",
            cell: row => (
                <div className='text-center'>
                    <input type="checkbox" name="copythismonth" onChange={(e) => copythismonthfornext(row)} />
                </div>
            ),
        },
        {
            name: <span className='h6 fw-bold'>S.No</span>,
            selector: row => row.Num,
            sortable: true,
        },
        {
            name: <span className='h6 fw-bold'>Month</span>,
            selector: row => moment(row.date).format("MMMM YYYY"),
            sortable: true,
        },
        {
            name: <span className='h6 fw-bold'>Set Name</span>,
            width: "150px",
            selector: row => row.setname,
            sortable: true,
        },

        {
            name: <span className='h6 fw-bold'>Number of questions</span>,
            selector: row => row.number_of_question,
            sortable: true,
        },
        {
            name: <span className='h6 fw-bold'>Author</span>,
            selector: row => row.author,
            sortable: true,
        },
        {
            name: <span className='h6 fw-bold'>Date</span>,
            selector: row => row.date,
            sortable: true,
        },
        {
            name: <span className='h6 fw-bold text-center mx-auto'>Action</span>,
            width: "200px",
            cell: row => (
                <div className='text-center'>
                    <button
                        className='btn btn-light  text-danger bi bi-trash3'
                        onClick={() => {
                            setViewQuestions(true);
                            onViewQuestions(row);
                        }}
                    >
                        <GrView />
                    </button>
                    <button
                        className='btn btn-light m-2 bi bi-pencil-square'
                        onClick={() => {
                            setisEditID(row.id);
                            oneditQuestions(row.id);
                            onLoadQuestions(row)
                            setisEdit(true);
                            setUpdateText("Update")
                        }}>
                        <TbEdit />
                    </button>
                </div>
            ),
        },
    ];
    useEffect(() => {
        let userinfo = sessionStorage.getItem("user-info");
        if (userinfo) {
            console.log(userinfo);
            setUserInfo(JSON.parse(userinfo));
        }

        getListOfdata();
        getSetnamesList();
    }, []);
    const getSetnamesList = async () => {
        await axios.get(`/setnames_get/`)
            .then(result => {
                console.log("res", result);
                setNamesList(result.data)
            })
            .catch(err => {
                console.log("errors", err);
            });
    }
    const getListOfdata = async () => {
        setLoader(true)
        await axios.get(`/monthlykra_get/`)
            .then(result => {
                console.log("res", result);
                result.data.map((item, i) => {
                    item.Num = i + 1
                })
                setQuestionsList(result.data);
                setLoader(false)
            })
            .catch(err => {
                setLoader(false)
                console.log("errors", err);
            });
    }
    const resetModelCloseQuestionsAll = () => {
        setValue("setNumber", "")
        let newObject = { "question": "" };
        let tempArray = [];
        tempArray.push(newObject);
        setAddquestionsList(tempArray)
    }
    const handleClose = () => { setShow(false); resetModelCloseQuestionsAll() }
    const onClear = () => {
        var newobject = addquestionsList.map((item, i) => {
            item.question = "";
            return item;
        });
        console.log(newobject)
        setAddquestionsList(newobject)
    }
    const handleShow = () => {
        setShow(true);
        resetModelCloseQuestionsAll();
    }
    const areyouwantCopy = () => {
        setCopyShow(false);
    }
    const areyouwantview = () => {
        setViewQuestions(false);
    }
    const oneditQuestions = () => {

    }
    const okquestionsuccess = () => {
        setShowSuccess(false)
        getListOfdata();
        setUpdateText("Add");
        setisEdit(false)
    }
    const okquestionalreadyexit = () => {
        setShowalreadyExit(false)
        getListOfdata();
    }
    const onLoadQuestions = (data) => {
        setShow(true);
        var newDate = moment(data.date).format('MM-DD-YYYY')
        setReadOnlyName(data.setname)
        setValue("setNumber", data.setnumber);
        let newArray = [];
        data.questions.map((item) => {
            let obj = { "question": item }
            newArray.push(obj);
        })
        setAddquestionsList(newArray);
    }
    const onViewQuestions = (data) => {
        setViewQuestionsList(data)
    }
    const AddNewQuestions = () => {
        setAddquestionsList([...addquestionsList, { "question": "" }]);
    }
    const copythismonthfornext = (data) => {
        setCopymonthObj(data)
        setCopyShow(true);
    }
    const sendCopyOptiontoNextMonth = async () => {
        let tempObj = copymonthObj;
        await axios.get(`/monthlykra_copy/${tempObj.id}`)
            .then(result => {
                console.log("res", result);
                areyouwantCopy(false);
                getListOfdata();
            })
            .catch(err => {
                console.log("errors", err);
            });

    }
    const onSubmit = async (data) => {
        let tempArray = [];
        let empID = "";


        if (userInfo) {
            empID = userInfo.id
        }
        addquestionsList.map((item) => { tempArray.push(item.question) })
        let req = {
            setname: data.setNumber,
            questions: tempArray,
            author: empID
        }
        console.log(req)
        if (!isEdit) {
            await axios.post(`/monthlykra_post/`, req)
                .then(result => {
                    console.log("res", result);
                    //setQuestionsList(result.data);
                    if (result.data.msg === "This month of questionnaire is already added") {
                        setShowalreadyExit(true);
                        setShow(false);
                    } else {
                        setShowSuccess(true)
                        setShow(false);
                    }

                })
                .catch(err => {
                    console.log("errors", err);
                });
        } else {
            await axios.put(`/monthlykra_update/${isEditID}/`, req)
                .then(result => {
                    setShowSuccess(true)
                    setShow(false);
                })
                .catch(err => {
                    console.log("errors", err);
                });
        }

    }
    const changeQuestionsList = (event, index) => {
        let newValues = [...addquestionsList];
        newValues[index][event.target.name] = event.target.value;
        setAddquestionsList(newValues);
    }
    const removeQuestionfromList = (number) => {
        let convertArray = addquestionsList;
        convertArray.splice(number, 1)
        setAddquestionsList([...convertArray]);
    }

    return (
        <>
            <button
                className='btn btn-sm btn-primary text-right float-right'
                onClick={handleShow}>
                <AiOutlineEdit size={20} className='' />
                Add
            </button>
            {!loader ?
                <DataTable
                    columns={columns}
                    data={QuestionsList}
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

            <Modal show={show} onHide={handleClose} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>{updateText} Questions</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className='p-3' onSubmit={handleSubmit(onSubmit)}>
                        <div className='row'>
                            <Form.Group className='col-md-9'>
                                <Form.Label className='fs-bold'>
                                    Set Number
                                    <span className='text-danger mandatory-field'>*</span>
                                </Form.Label>
                                {!isEdit ?
                                    <select className="form-control" name="setNumber"
                                        {...register("setNumber", {
                                            required: "Set Number Is Required"

                                        })}
                                        onKeyUp={() => {
                                            trigger("setNumber");
                                        }}
                                    >
                                        <option value="">--Select Set Name ---</option>
                                        {setNames.map((option, i) => {
                                            return (<option value={option.id}>{option.setnames}</option>)
                                        })}


                                    </select>
                                    : <input readOnly value={ReadOnlyName} className="form-control" />}

                                {errors.departmentName && (
                                    <small className='text-danger'>
                                        {errors.departmentName.message}
                                    </small>
                                )}
                            </Form.Group>
                        </div>
                        {addquestionsList.map((question, i) => {
                            return (<><div className='row' key={i}>
                                <div className="col-md-9">
                                    <Form.Label className='fs-bold'>Question {i + 1}</Form.Label>
                                    <textarea
                                        className={`form-control ${errors.description && "invalid"}`}
                                        id='descriptionId'
                                        name={"description" + i}
                                        value={question.question}
                                        required
                                        rows='3'
                                        // {...register(`description${i}`, {
                                        //     required: "Question Is Required",
                                        // })}
                                        // onKeyUp={() => {
                                        //     trigger(`description${i}`);
                                        // }}
                                        onChange={(e) => { changeQuestionsList(e, i); question.question = e.target.value }}
                                    ></textarea>
                                    {
                                        errors.description && (
                                            <small className='text-danger'>
                                                {errors.description.message}
                                            </small>
                                        )
                                    }
                                </div>
                                {i !== 0 ? <div className="col-md-3"><a className="btn btn-danger removeQuestion" onClick={() => removeQuestionfromList(i)} >Remove Question</a> </div> : ""}
                            </div>


                            </>
                            )
                        })}
                        <Form.Group className='mb-3'>
                            <a className="btn btn-primary addQuestionButton" onClick={() => AddNewQuestions()}>Add Question</a>
                        </Form.Group>
                        <Button
                            className='btn btn-primary m-2'
                            variant='primary'
                            type='reset'
                            onClick={onClear}
                        //   onClick={handleClear}
                        >
                            Clear
                        </Button>
                        <Button
                            className='btn btn-primary m-2'
                            variant='primary'
                            type='submit'
                        // onClick={saveData}
                        >
                            {updateText}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <Modal show={copyShow} onHide={areyouwantCopy} size='md' a-labelledby='example-modal-sizes-title-md'
                className='text-center'>
                <Modal.Header closeButton onClick={() => areyouwantCopy(false)}>
                    <Modal.Title>Confirm</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <div className="padding100">
                        <h4>Are you sure you want to Copy this!</h4>
                    </div>
                    <Button variant='secondary' onClick={() => areyouwantCopy(false)}>Cancel</Button> &nbsp; &nbsp;
                    <Button variant='primary' onClick={() => sendCopyOptiontoNextMonth()}>
                        Copy
                    </Button>

                </Modal.Body>

            </Modal>

            <Modal show={viewQuestions} onHide={areyouwantview} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <ul>
                        <li>Set Name: {viewQuestionsList.setname}</li>
                        {viewQuestionsList.questions.map((item, i) => {
                            return <li>Question {i}: {item}</li>
                        })}



                    </ul>
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
                    <h4 className='text-center padding20'>Questions {updateText} Successfully</h4>

                    <Button variant='primary' onClick={() => okquestionsuccess()}>
                        Ok
                    </Button>
                </Modal.Body>

            </Modal>
            <Modal
                size='md'
                show={ShowalreadyExit}
                onHide={() => setShowalreadyExit(false)}
                aria-labelledby='example-modal-sizes-title-md'
                className='text-center'>
                <Modal.Body>
                    <div className="padding100">
                        <AiOutlineCaretRight size={100} className="text-success" />
                    </div>
                    <h5 className='text-center padding20'>Your sets creation quota is full for this month. <br />You can only add two sets in next month !</h5>

                    <Button variant='primary' onClick={() => okquestionalreadyexit()}>
                        Ok
                    </Button>
                </Modal.Body>

            </Modal>
        </>
    )
}