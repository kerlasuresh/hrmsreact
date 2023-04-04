import React, { useState, useEffect } from 'react';
import axios from 'axios'
import DepartmentInnerNav from '../EimAdmin/InnerNav/DepartmentInnerNav'
import { BiMessageError,BiX } from "react-icons/bi";
import DataTable from 'react-data-table-component'
import { useForm } from "react-hook-form";
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { FcOk } from 'react-icons/fc'
import Modal from 'react-bootstrap/Modal'
function NewAnnouncement() {
  document.title = "HRMS | Announcement";
	const [datatableAnnouncementData, setDatatableAnnouncementData] = useState([])
	const [onClickPostCondition, setOnClickPostCondition] = useState(true);
	const [onClickUpdateCondition, setOnClickUpdateCondition] = useState(true);
	const [editId, setEditId] = useState(null);
	const [isEdited, setisEdited] = useState(false)
	const [loader, setLoader] = useState(false)
	const [alertPopBoxes, setAlertPopBoxes] = useState(false);
	const [alertText, setAlertText] = useState('');
  const [smShowe, setSmShowe] = useState(false);
  const [deleteRowId, setDeleteRowID] = useState(null);
  const [smShow, setSmShow] = useState(false);
  const [clicked, setClicked] = useState(false);
  const handleClose1 = () => setSmShowe(false);
	//-------------------------------------------------------------//

  const {  register, handleSubmit, reset, trigger,  clearErrors,  formState: { errors }, getValues, setValue} = useForm();
  //------------------------------------------------------------//
   const columns = [
    {
      name: <span className="fs-6 fw-bold">S.No</span>,
      selector: (row) => row.Num,
      sortable: true,
    },
    {
      name: <span className="fs-6 fw-bold">Live Announcements</span>,
      selector: (row) => row.annoucement,
      sortable: true,
    },
    {
      name: <span className="fs-6 fw-bold">Action</span>,
      cell: (row) => (
        <div className="text-center">
          <button className="btn btn-light m-2 bi bi-pencil-square"
            onClick={() => {
              clearErrors()
              setEditId(row.id)
              onloadvalues(row)
              setOnClickPostCondition(false);
			        setisEdited(true);
			        setOnClickUpdateCondition(false);
            }}
          >
            <AiOutlineEdit />
          </button>

          <button className="btn btn-light  text-danger bi bi-trash3"
            onClick={() => {
              setDeleteRowID(row.id)
              setSmShowe(true)
            }}
          >
            <AiOutlineDelete />
          </button>
        </div>
      ),
    },
  ]
  //-------------------------------------------------------------------------------------//
  

//----------------- announcement model -------------//
	const onClickPost = ()=>{
    setClicked(false)
    setisEdited(false);
    setOnClickUpdateCondition(true)
    setOnClickPostCondition(!onClickPostCondition);
	  reset();
	}
	
	const onPopUpClose = ()=>{
		setAlertPopBoxes(false); 
		setisEdited(false);
	} 
//-----------------------------------------------------------//

 const getAnnouncementData = async () => {
    var userinfo = JSON.parse(sessionStorage.getItem('user-info'));
    try {
      const response = await axios.get(`/api/company/announcement/${userinfo.data.id}/`);
      response.data.map((item, i) => {
        item.Num = i + 1
      })
	    setDatatableAnnouncementData(response.data)
      setLoader(true)
    } catch (error) { setLoader(true); }
  }
//----------------------------------------------------------//
  useEffect(() => {
    getAnnouncementData()
  }, [])
//------------------------- onloadvalues ----------------------------------//
  const onloadvalues = async (data) => {
    setisEdited(false);
    setValue('announcementMessage', data.annoucement)
  }
//-------------------------------------------------------------//
  const onSubmit = async (data) => {
    setClicked(true)
    var userinfo = JSON.parse(sessionStorage.getItem("user-info"));
    var req = {
      company: userinfo.data.id,
      annoucement: data.announcementMessage,
    }
    if (!isEdited) {
      try {
        var department = await axios.post("/api/company/announcement/", req);
        if (department.data) {
          setAlertText("Successfully Posted Your Announcement")
          getAnnouncementData()
          setOnClickPostCondition(true);
          setLoader(true);
          setAlertPopBoxes(true);
        } else {
           alert("elsepart")
        }
      } catch {
        alert("error")
      }
    } else {
      try {
        var response = await axios.patch(`/api/company/update/announcement/${editId}/`, req);
        if (response.data) {
			  	setAlertText("Successfully Updated Your Announcement")
          getAnnouncementData();
          setOnClickPostCondition(true);
          setLoader(true);
          setAlertPopBoxes(true);
        } else {
           alert("edit elsepart")
        }
      } catch (err) { }
    }
  };
 //----------------------------------------------------------//
   const deleteUser = async () => {
    let id = deleteRowId;
    try {
      var response = await axios.patch(`/api/company/update/announcement/${id}/`,{isDeleted:true});
      if (response.data) {
        setSmShow(true);
        setSmShowe(false);
       	getAnnouncementData();
      } else {
        //setDeleteAlertMessage(true);
        setSmShowe(false);
      }
    } catch (error) {}
  };
//-------------------------------------------------------------//

  return (
<>
 	<div className="container-fluid">
		<DepartmentInnerNav />
	</div>
	<div className="container mt-4">
		<div className="shadow-lg p-3 mb-3 bg-body rounded"><b>ANNOUNCEMENTS</b></div>
		{onClickPostCondition ? <div className="shadow-lg p-3 mb-3  mt-2 card " onClick={onClickPost}><span><BiMessageError className='me-1 h5'/> Post an Announcement </span></div> : 
		<div className='bg-white  mb-3'>
			<div className=' card '>
				<div className='p-3 card-header'>
					<div className='row'>
						<div className='col-md-6'><BiMessageError className='h4'/> Post an Announcement</div>
						<div className='col-md-6 text-end'><BiX className='h4 text-end' onClick={onClickPost}/></div>
					</div>
				</div>
				<form  onSubmit={handleSubmit(onSubmit)}>
					<div className='card-body '>
						<div className='form-group'>
            		<label className='form-label'>Message</label>
								<input
									className='form-control'
									type='text'
									{...register("announcementMessage", {
										required: "This field is required and allow max 100 characters",
										maxLength: {
                      value: 100,
                      message: " max 100 Characters "
                    }})}
									  onKeyUp={(e) => { trigger("announcementMessage")}}
                />
          		</div>
						<div>
							{errors.announcementMessage && (
							<span className='text-danger fnsd'>
								{errors.announcementMessage.message}
							</span>
							)}
						</div>
				  </div>
					<div className='card-footer  text-end'>
            {onClickUpdateCondition ? <button className='btn btn-primary' disabled={clicked} type='submit'>POST</button> :
						<div>
							<button className='btn btn-primary' type='button' onClick={onClickPost} >CANCEL</button>&nbsp;&nbsp;
							<button className='btn btn-primary' type='submit' >UPDATE</button>	
						</div>}
					</div>
				</form>
			</div>
		</div>	}
		<div className='card shadow-lg  bg-body rounded'>
			<div className='p-3'>
				<div className="p-1"><b>LIVE ANNOUNCEMENTS</b></div>
			</div>
		</div>
		<div className='card shadow-lg  mb-3 bg-body rounded'>
      {loader ? (
      <DataTable
        columns={columns}
        data={datatableAnnouncementData}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="450px"
        fixedHeaderScrollWidth="50px"
        highlightOnHover
      />
      ) : (
      <div className="text-center">
        <div className="spinner-border " role="status">
        <span className="sr-only">Loading...</span>
        </div>
      </div>
      )}
    </div>
	</div>
	
  <Modal size="md" show={alertPopBoxes} onClick={onPopUpClose } className="text-center" >
    <Modal.Header closeButton></Modal.Header>
    <div className="text-center m-3 text-danger"> <FcOk size="80px" />  </div>
    <h4 className="text-center">{alertText}</h4>
    <div className="text-center m-3">
      <button className="btn btn-primary" onClick={onPopUpClose }>  Okay </button>
    </div>
  </Modal>
  
  <Modal size='md' show={smShowe} onHide={() => setSmShowe(false)} className='text-center'>
    <Modal.Header closeButton></Modal.Header>
    <div className='text-center m-3 text-danger'> <AiOutlineDelete size='80px' /> </div>
    <h4>Are you sure you want to delete this!</h4>
    <div className='text-center m-3'>
      <button className='btn btn-secondary me-3' onClick={handleClose1}>  Cancel </button>
      <button className='btn btn-primary' onClick={deleteUser}>  Delete  </button>
    </div>
  </Modal>
  <Modal size='md' show={smShow} onHide={() => setSmShow(false)} className='text-center'>
    <Modal.Header closeButton></Modal.Header>
    <div className='text-center m-3 text-danger'> <AiOutlineDelete size='80px' /> </div>
    <h4 className='text-center'>Deleted Successfully</h4>
    <div className='text-center m-3'>
      <button className='btn btn-primary' onClick={() => setSmShow(false)}> Okay </button>
    </div>
  </Modal>

</>
  );
}

export default NewAnnouncement;
