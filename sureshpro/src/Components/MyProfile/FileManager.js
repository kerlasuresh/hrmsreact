import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { BsCloudDownload } from "react-icons/bs";
import { useParams } from 'react-router-dom';
import axios from "axios";
const MyProfileFileManager = ({ employeeID }) => {
    const [loader, setLoader] = useState(false)
    const [search, setSearch] = useState("")
    const [fileManagerList, setfileManagerList] = useState([{}])
    const columns = [
        {
            name: <span className='fs-6 fw-bold'>Request Type</span>,
            selector: (row) => row.name,
            sortable: true,
        },

        {
            name: <span className='fs-6 fw-bold'>Format</span>,
            selector: (row) => row.file,
            sortable: true,
        },
        {
            name: <span className='fs-6 fw-bold'>Schedule On</span>,
            selector: (row) => row.contentType,
            sortable: true,
        },
        {
            name: <span className='fs-6 fw-bold'>Size</span>,
            selector: (row) => row.category,
            sortable: true,
        },
        {
            name: <span className='fs-6 fw-bold'>Status</span>,
            selector: (row) => row.status,
            sortable: true,
        },

        {
            name: <span className='fs-6 fw-bold'>Action</span>,
            cell: (row) => (
                <div className='text-center'>
                    <button className='btn  btn-sm btn-warning ml-2'>
                        <a
                            href={row.file}
                            download>
                            <BsCloudDownload />
                        </a>
                    </button>
                </div>
            ),
        },
    ];
    const getFileManagers = async () => {
        setLoader(true)
        try {
            const response = await axios.get(`/api/reports/get/employee/`);
            if (response.data){
                setfileManagerList(response.data)
            }   
            setLoader(true);
        } catch (error) {
            console.log("not found");
        }
        
    }
    useEffect(() => {
        
        getFileManagers();
    }, []);

    return(
        <>  
            {loader ? (
                <DataTable
                    columns={columns}
                    data={fileManagerList}
                    pagination
                    fixedHeader
                    fixedHeaderScrollHeight="450px"
                    highlightOnHover
                    subHeader
                    subHeaderComponent={
                        <input
                            type="text"
                            className="form-control w-25"
                            placeholder="Search"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    }
                />
            ) : (
                <div className="text-center">
                    <div className="spinner-border " role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            )}
        </>
    )
}

export default MyProfileFileManager;