import React from "react";
import EimDepartment from "./EimDepartment";
import DepartmentInnerNav from "../InnerNav/DepartmentInnerNav";
export default function Department() {
  document.title = "HRMS | Department";
  return (
    <>
      <div className='container-fluid'>
        <DepartmentInnerNav />
        <div className='row'>
          <div className='col-md-12 mt-4'>
            <EimDepartment />
          </div>
        </div>
      </div>
    </>
  );
}