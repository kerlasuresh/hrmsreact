import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Header from "../Dashboard/Header";
import EmployeeInnerNav from "./EmployeeInnerNav";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { AiOutlineCaretRight } from "react-icons/ai";
const ImportEmployeeData = () => {
  document.title = "HRMS | Import Employee";
  const navigate = useNavigate();
  const [show, setShow] = useState(false); //main model
  const [showSuccess, setshowSuccess] = useState(false); //warning delete popup
  const [showInstruction, setshowInstruction] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();

  const okquestionalreadyexit = () => {
    setShow(false);
    setValue('Upload_ExcelFile', "")
  }
  const oksuccesstomanage = () => {
    setshowSuccess(false)
  }
  const onImportFileforEmployee = async () => {
    const data = getValues();
    const formData = new FormData();
    formData.append("files", data.Upload_ExcelFile[0]);
    try {
      const response = await axios.post("/excel/", formData);
      if (response.data.msg !== "already exiting data") {
        setshowSuccess(true)
      } else {
        setShow(true)
      }
    } catch (error) {
      console.log("not found");
    }
  }
  const importFileInstructions = () => {
    setshowInstruction(true)
  }
  return (
    <>
      <div className='container-fluid'>
        <EmployeeInnerNav />
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <div className='row text-center'>
                <div className='col-md-12' style={{ padding: 20 }}>
                  <a href={`${process.env.REACT_APP_TEST_MEDIA_LOAD}excel/example_xl_file.csv`} onClick={() => importFileInstructions()} >Download Sample Import File</a>
                </div>
                <form onSubmit={handleSubmit(onImportFileforEmployee)} className="row text-center" >
                  <div className="col-md-4"></div>

                  <div className="col-md-3">
                    <div class='form-group'>
                      <input
                        className='form-control'
                        type='file'
                        {...register("Upload_ExcelFile", {
                          required: "Excel is Required",
                        })}
                      />
                      {errors.Upload_ExcelFile && (
                        <small className='text-danger'>
                          {errors.Upload_ExcelFile.message}
                        </small>
                      )}
                    </div>

                  </div>
                  <div className="col-md-2">

                    <button className="btn btn-primary md-form-buttom" type="submit"> Import</button>

                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        size='md'
        show={show}
        onHide={() => setShow(false)}
        aria-labelledby='example-modal-sizes-title-md'
        className='text-center'>
        <Modal.Body>
          <h4 className='text-center padding20'>This employee already exits please check your details</h4>

          <Button variant='primary' onClick={() => okquestionalreadyexit()}>
            Ok
          </Button>
        </Modal.Body>

      </Modal>

      <Modal
        size='md'
        show={showSuccess}
        onHide={() => setshowSuccess(false)}
        aria-labelledby='example-modal-sizes-title-md'
        className='text-center'>
        <Modal.Body>

          <div className="padding100">
            <AiOutlineCaretRight size={100} className="text-success" />
          </div>
          <h4 className='text-center padding20'>Employee added successfully</h4>

          <Button variant='primary' onClick={() => oksuccesstomanage()}>
            Ok
          </Button>
        </Modal.Body>

      </Modal>

      <Modal
        size='md'
        show={showInstruction}
        onHide={() => setshowInstruction(false)}
        aria-labelledby='example-modal-sizes-title-md'
        className='text-center'>
        <Modal.Body>

          <ul>
            <li>Must and should change EMP ID</li>
            <li>Change Name name email and Phone number</li>
          </ul>

          <Button variant='primary' onClick={() => setshowInstruction(false)}>
            Ok
          </Button>
        </Modal.Body>

      </Modal>
    </>
  );
};
export default ImportEmployeeData;
