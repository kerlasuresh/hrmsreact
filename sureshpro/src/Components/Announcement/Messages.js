import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FcOk } from "react-icons/fc";
import { BiPaperPlane } from "react-icons/bi";
import { useForm } from "react-hook-form";
import moment from "moment";
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import DepartmentInnerNav from "../EimAdmin/InnerNav/DepartmentInnerNav";
const Messagesing = () => {
  document.title = "HRMS | Messages";
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [messa, setMessa] = useState([]);
  const [selectError, setSelectError] = useState(true);
  const [officialEmail, setOfficialEmail] = useState([]);
  const [search, setSearch] = useState([" "]);
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [show, setShow] = useState(false);
  const [loader, setLoader] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [isEdited, setisEdited] = useState(false);
  const [sendto, setsendto] = React.useState([]);

  const handleClose = () => {
    setShow(false);
    setisEdited(false);
    reset();
  };
  const handleShow = () => {
    setShow(true);
    setsendto([])
  };

  const getMessage = async () => {
    try {
      const response = await axios.get("/api/user/get_messages/");
      setCountries(response.data);
      setFilteredCountries(response.data);
      setLoader(true);
    } catch (error) {
      setLoader(true);
      console.log("not found");
    }
  };

  const columns = [
    {
      name: <span className='fs-6 fw-bold'>Status</span>,
      selector: (row) => (
        <button
          disabled={row.Status === "" ? false : true}
          className='badge badge-warning'>
          {row.Status}
        </button>
      ),
      sortable: true,

    },
    {
      name: <span className='fs-6 fw-bold'>Date</span>,
      selector: (row) => row.Sent_Date,
      sortable: true,

    },
    {
      name: <span className='fs-6 fw-bold'>Message</span>,
      selector: (row) => row.Message,
      sortable: true,

    },

    {
      name: <span className='fs-6 fw-bold'>Sent Date & Time</span>,
      selector: (row) =>
        moment(row.sent_Date_Time).format("YYYY-MM-DD HH:mm:ss"),
      sortable: true,

    },
    {
      name: <span className='fs-6 fw-bold'>Sent To</span>,
      selector: (row) => row.Sent_to.join(", "),
      sortable: true,

    },
  ];
  useEffect(() => {
    getMessage();
    getallemployeedata();
  }, []);

  useEffect(() => {
    const result = countries.filter((messagesss) => {
      return (
        messagesss.Status.toLowerCase().match(search.toLowerCase()) ||
        messagesss.Sent_Date.toLowerCase().match(search.toLowerCase()) ||
        messagesss.sent_Date_Time.toLowerCase().match(search.toLowerCase()) ||
        messagesss.Sent_to.join(",")
          .toLowerCase()
          .match(search.toLowerCase()) ||
        messagesss.Message.toLowerCase().match(search.toLowerCase())
      );
    });
    setFilteredCountries(result);
  }, [search]);

  const onSubmit = async (data) => {
    // var sendtoMail = data.sendto;

    var Subject = data.subject;
    var Message = data.messagess;
    // var Sent_to = sendtoMail.join();
    var depart = data.sendto;
    let newArray = [];
    if (depart[0] == "all") {
      messa.map((item, i) => {
        newArray.push(item.Official_Email);
      });
    } else {
      newArray = data.sendto;
    }

    var message = await axios.post("/api/user/post_messagemodule/", {
      Subject: Subject,
      Message: Message,
      Sent_to: newArray,
    });
    setSuccessAlert(true);
    setShow(false);
    setLoader(true);
    reset();
  };

  const onClear = () => {
    reset();
    handleClose(false);
  };
  const setSuccessAlertok = () => {
    getMessage();
    setSuccessAlert(false);
  }
  const getallemployeedata = async () => {
    axios
      .get(`/api/user/get_allemployeedata/`)
      .then((resp) => {
        setMessa(resp.data);
        setOfficialEmail(resp.data);
        console.log(resp.data)
      })
      .catch((error) => { });
  };

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
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setsendto(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  //const isAllSelected = messa.length > 0 && sendto.length === messa.length;
  return (
    <>
      <div className='container-fluid'>
        <DepartmentInnerNav />
        <div className='container'>
          <div className='container-fluid'>
            <div className='d-flex flex-row bd-highlight justify-content-end mt-4'>
              <button
                className='btn btn-sm btn-primary text-center '
                onClick={handleShow}>
                <BiPaperPlane size={20} className='' /> Send Message
              </button>
            </div>
          </div>
        </div>
        <div className='container'>
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
        </div>

        <Modal
          show={show}
          onHide={handleClose}
          size='md'
          aria-labelledby='example-modal-sizes-title-lg'>
          <Modal.Header closeButton>
            <Modal.Title id='example-modal-sizes-title-lg'>Send</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form className='container' onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className=''>
                <Form.Label className='fs-bold'>
                  To
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
                  onChange={handleChange}
                  input={<OutlinedInput label="To" />}
                  renderValue={(selected) => selected.join(', ')}
                  MenuProps={MenuProps}
                >
                  {/* <MenuItem value="all" >
                    <Checkbox checked={isAllSelected} />
                    <ListItemText primary="Select All" />
                  </MenuItem> */}
                  {messa.map((id) => (
                    <MenuItem key={id.id} value={id.Official_Email}>
                      <Checkbox checked={sendto.indexOf(id.Official_Email) > -1} />
                      <ListItemText primary={id.Official_Email} />
                    </MenuItem>
                  ))}
                </Select>
                {selectError ? (
                  <>
                    {errors.sendto && (
                      <small className='text-danger'>
                        {errors.sendto.message}
                      </small>
                    )}
                  </>
                ) : null}
              </Form.Group>
              {/* <Form.Group className=''>
                <Form.Label className='fs-bold'>
                  To
                  <span className='text-danger mandatory-field'>*</span>
                </Form.Label>
                <select
                  className='form-control'
                  multiple
                  aria-label='multiple select example'
                  name='sendto'
                  {...register("sendto", {
                    required: "This field is required.",
                  })}>
                  {/* <option value=''>--Select To -- </option> 
              <option value={"all"}>all</option>
              {messa.map((id) => {
                return (
                  <option key={id.id} value={id.Official_Email}>
                    {id.Official_Email}
                  </option>
                );
              })}
            </select>
            {selectError ? (
              <>
                {errors.sendto && (
                  <small className='text-danger'>
                    {errors.sendto.message}
                  </small>
                )}
              </>
            ) : null}
          </Form.Group> */}
              <Form.Group className='mb-3'>
                <Form.Label className='fs-bold'>
                  Subject
                  <span className='text-danger mandatory-field'>*</span>
                </Form.Label>
                <input
                  type="text"
                  className={`form-control ${errors.subject && "invalid"}`}
                  {...register("subject", {
                    required: "Subject Is Required",
                    minLength: {
                      value: 5,
                      message: "Minimum 5 Characters Are Allowed",
                    },
                  })} />
                {errors.subject && (
                  <small className='text-danger'>
                    {errors.subject.message}
                  </small>
                )}
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label className='fs-bold'>
                  Message
                  <span className='text-danger mandatory-field'>*</span>
                </Form.Label>
                <textarea
                  className={`form-control ${errors.messagess && "invalid"}`}
                  {...register("messagess", {
                    required: "Message Is Required",
                    minLength: {
                      value: 5,
                      message: "Minimum 5 Characters Are Allowed",
                    },
                  })}></textarea>
                {errors.messagess && (
                  <small className='text-danger'>
                    {errors.messagess.message}
                  </small>
                )}
              </Form.Group>
              <Button
                className='btn btn-primary m-2'
                variant='primary'
                type='reset'
                // onClick={handleClose1}
                onClick={onClear}>
                Cancel
              </Button>
              <Button
                className='btn btn-primary m-2'
                variant='primary'
                type='submit'>
                Send
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div >
      {/* success */}
      < Modal
        size='md'
        show={successAlert}
        onHide={() => setSuccessAlert(false)}
        className='text-center' >
        <Modal.Header closeButton></Modal.Header>
        <div className='text-center m-3'>
          <FcOk size='80px' />
        </div>
        <h4 className='text-center'>Mail Sent Successfully</h4>
        <div className='text-center m-3'>
          <button
            className='btn btn-primary'
            onClick={() => {
              setSuccessAlertok();
              setisEdited(false);
            }}>
            OK
          </button>
        </div>
      </Modal >
    </>
  );
};
export default Messagesing;
