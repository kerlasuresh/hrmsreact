import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

function AttenLog() {


 const [education, setEducation] = useState([]);
 const [filteredAdminstation, setFilteredAdminstation] = useState([]);


const getEducation = async () => {
  try {
    const response = await axios.get(
      "http://38.143.106.215:8000/education_info_get/"
    );
    response.data.map((item, i) => {
      item.Num = i + 1;
    });
    setEducation(response.data);
    setFilteredAdminstation(response.data);
    //  setLoader(true);
  } catch (error) {
    console.log("not found");
  }
};



 const columns = [
//    {
//      name: <span className='fs-6 fw-bold'>S.No</span>,
//      selector: (row) => row.Num,
//      sortable: true,
//    },

   {
     name: <span className='fs-6 fw-bold'>Emp </span>,
     selector: (row) => row.qualification_type,
     sortable: true,
     width: "200px",
   },
   {
     name: <span className='fs-6 fw-bold'>Course Name </span>,
     selector: (row) => row.course_name,
     sortable: true,
     width: "150px",
   },
   {
     name: <span className='fs-6 fw-bold'>Course Type</span>,
     selector: (row) => row.course_type,
     sortable: true,
     width: "150px",
   },
   {
     name: <span className='fs-6 fw-bold'>Stream</span>,
     selector: (row) => row.stream,
     sortable: true,
     width: "100px",
   },
   {
     name: <span className='fs-6 fw-bold'>Course Start Date </span>,
     selector: (row) => row.course_start_date,
     sortable: true,
     width: "200px",
   },
   {
     name: <span className='fs-6 fw-bold'>Course End Date</span>,
     selector: (row) => row.course_end_date,
     sortable: true,
     width: "200px",
   },
   {
     name: <span className='fs-6 fw-bold'>College Name </span>,
     selector: (row) => row.college_name,
     sortable: true,
     width: "200px",
   },
   {
     name: <span className='fs-6 fw-bold'>University</span>,
     selector: (row) => row.university,
     sortable: true,
     width: "150px",
   },

   {
     name: <span className='fs-6 fw-bold'>Action</span>,
     cell: (row) => (
       <div className='text-center'>
         <button
           className='btn btn-light m-2 bi bi-pencil-square'
           onClick={() => {
            //  //reset();
            //  clearErrors();
            //  setEditId(row.id);
            //  setTextDisplay("Update");
            //  handleEducationShow();
            //  setisEdited(true);
            //  onloadvalues(row);
           }}>
           <AiOutlineEdit />
         </button>

         <button
           className='btn btn-light  text-danger bi bi-trash3'
           onClick={() => {
            //  setDeleteRowID(row.id);
            //  setSmShowe(true);
           }}>
           <AiOutlineDelete />
         </button>
       </div>
     ),
   },
 ];











  return (
    <>
      <div className='container'>
        <div>
          <DataTable
            columns={columns}
            data={filteredAdminstation}
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
                // onChange={(e) => setSearch(e.target.value)}
              />
            }
          />
        </div>
      </div>
    </>
  );
}

export default AttenLog;
