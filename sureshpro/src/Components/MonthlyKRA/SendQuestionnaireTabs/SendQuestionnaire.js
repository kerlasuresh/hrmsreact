import axios, { Axios } from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import * as moment from "moment";

const SendQuestionnaire = () => {
  const [listOfSendData, setListOfSendData] = useState([]);
  const [searchListOfSendData, setSearchListOfSendData] = useState([]);
  const [search, setSearch] = useState([" "]); // for search purpose
  const [loader, setLoader] = useState(false);

  const columns = [
    {
      name: <span className='fs-6 fw-bold text-center h3'>S.No</span>,
      selector: (row) => row.Num,
      sortable: true,
      width: "100px",
      textAlign: "center",
      style: {
        fontSize: "16px",
      },
    },
    {
      name: <span className='fs-6 fw-bold h3'>Employee Name</span>,
      selector: (row) => row.employee_name,
      sortable: true,
      width: "200px",
      style: {
        fontSize: "16px",
      },
    },
    {
      name: <span className='fs-6 fw-bold h3'>KRA Month</span>,
      selector: (row) => moment(row.date).format("MMMM-YYYY"),
      sortable: true,
      width: "200px",
      style: {
        fontSize: "16px",
      },
    },

    {
      name: <span className='fs-6 fw-bold h3'>Set Name</span>,
      selector: (row) => row.set_name,
      sortable: true,
      width: "200px",
      style: {
        fontSize: "16px",
      },
    },
    {
      name: <span className='fs-6 fw-bold h3'>Department</span>,
      selector: (row) => row.department,
      sortable: true,
      width: "200px",
      style: {
        fontSize: "16px",
      },
    },
    {
      name: <span className='fs-6 fw-bold h3'>Author</span>,
      selector: (row) => row.author,
      sortable: true,
      width: "200px",
      style: {
        fontSize: "16px",
      },
    },
    {
      name: <span className='fs-6 fw-bold h3'>Date</span>,
      selector: (row) => moment(row.date).format("YYYY-MM-DD HH:mm"),
      sortable: true,
      width: "200px",
      style: {
        fontSize: "16px",
      },
    },
    {
      name: <span className='fs-6 fw-bold h3'>E-Mail Status</span>,
      selector: (row) => row.email_status,
      sortable: true,
      width: "200px",
      style: {
        fontSize: "16px",
      },
    },
  ];

  //--------------------- getting a data -----------------//
  const getListOfData = async () => {
    try {
      const response = await axios.get("/monthlykra_listofsent/");
      console.log(" responsedata", response.data);
      response.data.map((item, i) => {
        item.Num = i + 1;
      });
      setLoader(false);
      setListOfSendData(response.data);
      setSearchListOfSendData(response.data);
    } catch (error) {
      console.log("not found");
      setLoader(false);
    }
  };

  useEffect(() => {
    setLoader(true);
    getListOfData();
  }, []);

  useEffect(() => {
    const result = searchListOfSendData.filter((employee) => {
      console.log("employeee data", employee);
      return (
        employee.employee_name.toLowerCase().match(search.toLowerCase()) ||
        employee.set_name.toLowerCase().match(search.toLowerCase()) ||
        employee.department.toLowerCase().match(search.toLowerCase()) ||
        employee.author.toLowerCase().match(search.toLowerCase()) ||
        (employee.email_status || "")
          .toLowerCase()
          .match(search.toLowerCase()) ||
        moment(employee.date)
          .format("MMMM-YYYY")
          .toLowerCase()
          .match(search.toLowerCase()) ||
        moment(employee.date)
          .format("YYYY-MM-DD HH:mm")
          .toLowerCase()
          .match(search.toLowerCase())
      );
    });
    setListOfSendData(result);
  }, [search]);

  return (
    <div>
      <div>
        {!loader ? (
          <DataTable
            columns={columns}
            data={listOfSendData}
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
  );
};
export default SendQuestionnaire;
