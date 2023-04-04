import axios, { Axios } from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

const SendQ = () => {
  const [filteredCountries, setFilteredCountries] = useState([]);
  const columns = [
    {
      name: <span className='fs-6 fw-bold text-center h3'>S.No</span>,
      cell: (row, index) => index + 1,
      sortable: true,
      width: "100px",
      textAlign: "center",
      style: {
        fontSize: "16px",
      },
    },
    {
      name: <span className='fs-6 fw-bold h3'>Employee Name</span>,
      selector: (row) => "Prasad",
      sortable: true,
      width: "200px",
      style: {
        fontSize: "16px",
      },
    },
    {
      name: <span className='fs-6 fw-bold h3'>KRA Month</span>,
      selector: (row) => "",
      sortable: true,
      width: "200px",
      style: {
        fontSize: "16px",
      },
    },

    {
      name: <span className='fs-6 fw-bold h3'>Set Name</span>,
      selector: (row) => "",
      sortable: true,
      width: "200px",
      style: {
        fontSize: "16px",
      },
    },
    {
      name: <span className='fs-6 fw-bold h3'>Department</span>,
      selector: (row) => "",
      sortable: true,
      width: "200px",
      style: {
        fontSize: "16px",
      },
    },
    {
      name: <span className='fs-6 fw-bold h3'>Author</span>,
      selector: (row) => "",
      sortable: true,
      width: "200px",
      style: {
        fontSize: "16px",
      },
    },
    {
      name: <span className='fs-6 fw-bold h3'>Date</span>,
      selector: (row) => "",
      sortable: true,
      width: "200px",
      style: {
        fontSize: "16px",
      },
    },
    {
      name: <span className='fs-6 fw-bold h3'>E-Mail Status</span>,
      selector: (row) => "",
      sortable: true,
      width: "200px",
      style: {
        fontSize: "16px",
      },
    },
  ];

  //--------------------- getting a data -----------------//
  const getCountries = async () => {
    try {
      const response = await axios.get(
        "/get_annoucement/"
      );
      console.log(" responsedata", response.data);
      setFilteredCountries(response.data);
      console.log("get api ", response.data);
    } catch (error) {
      console.log("not found");
    }
  };
  useEffect(() => {
    getCountries();
  }, []);

  return (
    <div>
      <div className='container'>
        <DataTable
          columns={columns}
          data={filteredCountries}
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
              // onChange={(e) => setSearch(e.target.value)}
            />
          }
        />
      </div>
    </div>
  );
};
export default SendQ;
