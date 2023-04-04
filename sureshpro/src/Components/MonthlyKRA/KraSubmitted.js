import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import InnerNavKRA from "./InnerNavKRA";
import Header from "../Dashboard/Header";
import { FaGripVertical } from "react-icons/fa";
import logo from "../../images/login-img.png";
import axios from "axios";
import { useParams } from "react-router-dom";
import * as moment from "moment";

const KraSubmitted = () => {
  const [submitKra, setSubmitKra] = useState({});
  const { id } = useParams();
  const [responseData, setResponseData] = useState({});
  const [responseDataQuestion, setResponseDataQuestion] = useState([]);


  const getListOfdata = async (id) => {
    // for (let i = 0; i < numrows; i++) {
    //   ObjectRow();
    // }

    var req = {
      sendquestionnaire_id: id,
    };
    await axios
      .post(`/view_submitted_monthlykra_form/`, req)
      .then((result) => {
        console.log(result.data);
        setResponseData(result.data);
        setResponseDataQuestion(result.data.questions_answers);
      })
      .catch((err) => {
        console.log("errors", err);
      });
  };

  //  for (let i = 0; i < numrows; i++) {
  //    ObjectRow();
  //  }

  useEffect(() => {
    getListOfdata(id);
  }, []);

  return (
    <>
      <div className='container-fluid'>
        <InnerNavKRA />
        <div className='container'>
          <div className='row'>
            <div className='col-md-12  mt-4'>
              <div className='container'>
                <div className='h5 p-2'>
                  <FaGripVertical size='20px' />
                  Form of {responseData.emp_id}
                </div>
                <div className='h3 p-2'>
                  VITEL GLOBAL MONTHLY KRA -
                  {moment(responseData.date).format("MMMM-YYYY")}
                </div>
                <div className='border border-3 p-3'>
                  <div class='row mb-3'>
                    <div class='col-sm-2 '>
                      <img className="w-100 h-100"
                        src={`${process.env.REACT_APP_TEST_MEDIA_LOAD}${responseData.photo}`}
                      />
                    </div>
                    <div class='col-sm-10'>
                      <div className='h5'> {responseData.emp_name}</div>
                      <div>
                        <span className='p-2'>Emp ID :</span>
                        <span className='fw-bold'>{responseData.emp_id}</span>
                      </div>
                      <div>
                        <span className='p-2'>Department : </span>
                        <span className='fw-bold'>
                          {responseData.department_name}
                        </span>
                      </div>
                      <div>
                        <span className='p-2'>Set Name :</span>
                        <span className='fw-bold'> {responseData.set_name}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {responseDataQuestion.map((option, i) => (
                  <div className='my-3'>
                    <div class='row mb-3'>
                      <div className='col-md-2'>
                        <label className='fw-bold '>
                          <span> Question :{i + 1}</span>
                        </label>
                      </div>
                      <div className='col-md-9'>{option.question}</div>
                      {/* <div class='col-sm-9'>
                      <textarea
                        class='form-control '
                        value={option.answer}></textarea>
                    </div> */}
                    </div>

                    <div class='row mb-3'>
                      <div className='col-md-2'>
                        <label className='fw-bold '>
                          <span> Answer :</span>
                        </label>
                      </div>
                      {/* <div className='col-md-9'>{option.question}</div> */}
                      <div class='col-sm-9'>
                        <textarea
                          readOnly
                          class='form-control '
                          value={option.answer}></textarea>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default KraSubmitted;
