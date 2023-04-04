import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { AiOutlineEdit } from "react-icons/ai";
import { useForm } from "react-hook-form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { FcOk } from "react-icons/fc";

function All_KRA_List() {
  const {
    register,
    reset,
    trigger,
    formState: { errors },
    getValues,
    setValue,
  } = useForm();
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState([" "]);
  const [editShow, setEditShow] = useState(false);
  const navigate = useNavigate();
  const [responseData, setResponseData] = useState({});
  const [responseDataQuestion, setResponseDataQuestion] = useState([]);
  const [editId, setEditId] = useState(null);
  const [successAlert, setSuccessAlert] = useState(false);
  const [loader, setLoader] = useState(false);
  const getOrganation = async (id) => {
    var userInfo = JSON.parse(sessionStorage.getItem('user-info'));
    var req = {
      reporting_manager_id: userInfo.id.toString() ? userInfo.id.toString() : "",
      admin_or_empty: userInfo.id ? "" : "admin",
    };
    await axios
      .post(`/allkra_formlist/`, req)
      .then((result) => {
        result.data.map((item, i) => {
          item.Num = i + 1;
          return item;
        });
        console.log("res", result);
        setCountries(result.data);
        setFilteredCountries(result.data);
        setLoader(true)
      })
      .catch((err) => {
        console.log("errors", err);
      });
  };

  useEffect(() => {
    getOrganation();
  }, []);

  const employeeActionViewToanser = (id) => {
    navigate(`/allkraformbyEmployee/${id}`);
  };
  const handleEditClose = () => setEditShow(false);

  useEffect(() => {
    const result = countries.filter((employee) => {
      return (
        employee.set_number.toLowerCase().match(search.toLowerCase()) ||
        employee.set_name.toLowerCase().match(search.toLowerCase()) ||
        employee.employee_name.toLowerCase().match(search.toLowerCase()) ||
        employee.employee_code.toLowerCase().match(search.toLowerCase()) ||
        employee.department.toLowerCase().match(search.toLowerCase()) ||
        employee.revoke.toLowerCase().match(search.toLowerCase()) ||
        employee.candidate_status.toLowerCase().match(search.toLowerCase()) ||
        employee.manager_acknowledgement
          .toLowerCase()
          .match(search.toLowerCase()) ||
        employee.score.toLowerCase().match(search.toLowerCase()) ||
        employee.monthly_score_status
          .toLowerCase()
          .match(search.toLowerCase()) ||
        employee.comment.toLowerCase().match(search.toLowerCase()) ||
        employee.reason.toLowerCase().match(search.toLowerCase())
      );
    });
    setFilteredCountries(result);
  }, [search]);

  const myStyle = {
    cursor: "no-drop",
  };

  const columns = [
    {
      name: <span className='fs-6 fw-bold'>S.No</span>,
      // selector: (row) => row.id,
      cell: (row, index) => row.Num,
      sortable: true,
      // width: "20px",
    },

    {
      name: <span className='fs-6 w-100'>Set Number</span>,
      selector: (row) => row.set_number,
      sortable: true,
      width: "140px",
    },
    {
      name: <span className='fs-6 w-100'>Set Name</span>,
      selector: (row) => row.set_name,
      sortable: true,
      width: "130px",
    },
    {
      name: <span className='fs-6 '>Employee Name</span>,
      selector: (row) => (<span>{row.employee_name} <br />  <small>{row.employee_code}</small></span>),
      sortable: true,
      width: "180px",
    },

    {
      name: <span className='fs-6 '>Department</span>,
      selector: (row) => row.department,
      sortable: true,
      width: "150px",
    },
    {
      name: <span className='fs-6 '>Revoke</span>,
      selector: (row) => (
        <button
          onClick={() => {
            krapostrevokeapist(row.id);
          }}
          disabled={row.candidate_status === "NOT SUBMITTED" ? false : true}
          className='badge badge-success'
          style={{ myStyle }}>

          {row.revoke}
        </button>
      ),
      sortable: true,
      width: "150px",
    },
    {
      name: <span className='fs-6  wrdsp'>Candidate Status</span>,
      selector: (row) =>
        row.candidate_status === "NOT SUBMITTED" ? (
          <button type='button' className='badge badge-danger'>
            {row.candidate_status}
          </button>
        ) : (
          <button
            type='button'
            onClick={() => employeeActionViewToanser(row.id)}
            className='badge  badge-success'>
            {row.candidate_status}
          </button>
        ),
      sortable: true,
      width: "200px",
    },
    {
      name: <span className='fs-6 '>Manager Acknowledgement</span>,
      selector: (row) => row.manager_acknowledgement,
      sortable: true,
      width: "250px",
    },

    {
      name: <span className='fs-6 '>Score</span>,
      selector: (row) => row.score,
      sortable: true,
      width: "150px",
    },
    {
      name: <span className='fs-6 '>Montly Score Status</span>,
      selector: (row) => row.monthly_score_status,
      sortable: true,
      width: "200px",
    },
    {
      name: <span className='fs-6  wrdsp'>Comment</span>,
      selector: (row) => row.comment,
      sortable: true,
      width: "150px",
    },
    {
      name: <span className='fs-6 '>Reasone</span>,
      selector: (row) =>
        row.reason === "Active" ? (
          <h6 data-tip data-for='registerTip'>
            {row.reason}
          </h6>
        ) : (
          <h6>{row.reason}</h6>
        ),
      sortable: true,
      width: "150px",
    },

    {
      name: <span className='fs-6 '>Action</span>,
      width: "150px",
      cell: (row) => (
        <div className='text-center'>
          <button
            className='btn btn-light m-2 bi bi-pencil-square'
            onClick={() => {
              reset();
              setEditId(row.id);
              setEditShow(true);

              getListOfdata(row.id);
            }}
            disabled={row.candidate_status === "SUBMITTED" ? false : true}>
            <AiOutlineEdit />
          </button>
        </div>
      ),
    },
  ];



  ///////post ///////////

  const krapostrevokeapist = async (data) => {
    var questionnaire_id = data;
    await axios.post("/revoke_option/", {
      questionnaire_id: questionnaire_id,
    });
    getOrganation();
  };

  ///////////////post ///////////////

  const krapostcanditeapist = async (data) => {
    var userInfo = sessionStorage.getItem('user-info');
    userInfo = JSON.parse(userInfo);
    var req = {
      reporting_manager_id: userInfo.id.toString() ? userInfo.id.toString() : "",
      candidate_status: data ? data : "",
    };
    var message = await axios.post("/listofsent_advancedfilter/", req);
    message.data.map((item, i) => {
      item.Num = i + 1;
      return item;
    });
    setCountries(message.data);
    setFilteredCountries(message.data);
    // reset();
  };

  ///////getapi for kra///

  const getListOfdata = async (id) => {
    await axios
      .get(`/monthlykra_action/${id}`)
      .then((result) => {

        console.log(result.data);
        setResponseData(result.data);
        setResponseDataQuestion(result.data.questions_answers);
        setValue("score", result.data.score)
        setValue("reason", result.data.reason)
        setValue("comment", result.data.comment)

      })
      .catch((err) => {
        console.log("errors", err);
      });
  };

  //////putapi for kra //////

  const onTrackUpdateComment = async (data) => {
    let id = editId;
    console.log("on edit id", id);

    const score = getValues("score");
    const reason = getValues("reason")
    const comment = getValues("comment")


    await axios
      .put(
        `/monthlykra_action/${id}/`,
        {
          score: score,
          reason: reason,
          comment: comment,
          monthly_score_status: data
        },
        {
          headers: {
            Accept: "application/json, text/plain, /",
            "Content-Type": "application/json",
          },
        }
      )
      .then((resp) => {
        console.log("on edit success resp", resp);
        setEditShow(false);
        getOrganation();
        setSuccessAlert(true);
        reset();
      })
      .catch((err) => {
        console.log("error resp", err);
      });

  };



  //////////////////////////////////////////////////////////////////////////////////////////////




  return (
    <>
      <div className='main container mt-4'>
        <div className='drp'>
          <div className='row'>
            <div className='col-md-4'>
              <select
                className='form-control'
                name='location_name'
                // value={compnySearch}
                onChange={(e) => {
                  krapostcanditeapist(e.target.value);
                }}>
                <option value=''>--Select company -- </option>
                <option value='NOT SUBMITTED'>NOT SUBMITTED</option>
                <option value='SUBMITTED'>SUBMITTED </option>

                {/* {depts.map((id) => (
              <option key={id.id} value={id.id}>
                {id.companyss}
              </option>
            ))} */}
              </select>
            </div>
          </div>
        </div>

        <div>
          {loader ? (
            <DataTable
              columns={columns}
              data={filteredCountries}
              pagination
              fixedHeader
              fixedHeaderScrollHeight='450px'
              fixedHeaderScrollWidth='50px'
              highlightOnHover
              subHeader
              subHeaderComponent={
                <input
                  type='text'
                  className='form-control w-25'
                  placeholder='Search'
                  onChange={(e) => setSearch(e.target.value)}
                />
              }
            />
          ) : (
            <div className='text-center'>
              <div className='spinner-border ' role='status'>
                <span className='sr-only'>Loading...</span>
              </div>
            </div>
          )}
        </div>

        <Modal
          size='lg'
          show={editShow}
          onHide={handleEditClose}
          aria-labelledby='example-modal-sizes-title-md'>
          <Modal.Header closeButton>
            <Modal.Title id='example-modal-sizes-title-md'>
              Edit Score
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className=''>
              <div className='row'>
                <div className='col-md-3'>
                  <b> {responseData.set_number}</b>
                </div>
                <div className='col-md-5'>
                  <b> Employee: </b> {responseData.employee_name}
                </div>
                <div className='col-md-4'>
                  <b>Status:</b> {responseData.monthly_score_status}
                </div>
              </div>
              <hr />
              {responseDataQuestion.map((option, i) => (
                <div className='my-3'>
                  <div class='row mb-3'>
                    <div className='col-md-2'>
                      <label className='fw-bold '>
                        <span> Question :{i + 1}</span>
                      </label>
                    </div>
                    <div className='col-md-9'>{option.question}</div>
                  </div>

                  <div class='row mb-3'>
                    <div className='col-md-2'>
                      <label className='fw-bold '>
                        <span> Answer :</span>
                      </label>
                    </div>

                    <div class='col-sm-9'>{option.answer}</div>
                  </div>
                </div>
              ))}

              <hr />

              <div className='commemt'>
                <div class='row'>
                  <div class=' col-md-2'>
                    <b>Comment:</b>
                  </div>
                  <div class='col-lg-9 mb-3'>
                    <textarea
                      type='text'
                      class='form-control m-input mb-3'
                      {...register("comment")}
                      onKeyUp={(e) => {
                        trigger("comment");
                      }}>
                      {responseData.comment}
                    </textarea>
                  </div>
                </div>
              </div>
              <hr />

              <div className='score'>
                <div class='row'>
                  <div class=' col-md-2 '>
                    <b>SCORE:</b>
                  </div>
                  <div class='col-lg-3 mb-3'>
                    <input
                      type='text'
                      // onChange={handleChange}
                      class='form-control mb-3'
                      {...register("score", {
                        required: "score Is Required",
                        pattern: {
                          value: /^[0-9]+$/,
                          message: "Only numbers Are Allowed",
                        },
                        maxLength: {
                          value: 2,
                          message: "Minimum 2 Characters Are Allowed",
                        },
                      })}
                      onKeyUp={(e) => {
                        trigger("score", "if(this.value>10){this.value=10;}");
                      }}
                    />
                    {errors.score && (
                      <small className='text-danger'>
                        {errors.score.message}
                      </small>
                    )}
                  </div>
                  <div class=' col-md-4'>
                    <b>Out of 10</b>
                  </div>
                </div>
              </div>

              <div className='reason'>
                <div class='row'>
                  <div class=' col-md-2 '>
                    <b>
                      Reason <br /> (For Edit):
                    </b>
                  </div>
                  <div class='col-lg-9 mb-3'>
                    <textarea
                      type='text'
                      rows='1'
                      {...register("reason", {
                        required: "reason Is Required",
                        pattern: {
                          value: /^[a-zA-Z ]*$/,
                          message: "Only Alphabets Are Allowed",
                        },
                      })}
                      onKeyUp={(e) => {
                        trigger("reason");
                      }}
                      class='form-control m-input mb-3'
                      placeholder=''>
                      {responseData.reason}
                    </textarea>
                    {errors.reason && (
                      <small className='text-danger'>
                        {errors.reason.message}
                      </small>
                    )}
                  </div>
                </div>
              </div>

              <Button
                className='btn btn-primary m-2'
                variant='primary'
                type='submit'
                onClick={() => onTrackUpdateComment("ON Track")}>
                ON Track
              </Button>
              <Button
                className='btn btn-danger m-2'
                variant='primary'
                type='submit'
                onClick={() => onTrackUpdateComment("OFF Track")}>
                OFF Track
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      </div>

      <Modal
        size='md'
        show={successAlert}
        onHide={() => setSuccessAlert(false)}
        className='text-center'>
        <Modal.Header closeButton></Modal.Header>
        <div className='text-center m-3'>
          <FcOk size='80px' />
        </div>
        <h4 className='text-center'> Updated Successfully</h4>
        <div className='text-center m-3'>
          <button
            className='btn btn-primary'
            onClick={() => {
              setSuccessAlert(false);
            }}>
            OK
          </button>
        </div>
      </Modal>
    </>
  );
}

export default All_KRA_List;
