import React from "react";
import DesignationMaster from "./DesignationMaster";
import DepartmentInnerNav from "../InnerNav/DepartmentInnerNav";
function Designation() {
  document.title = "HRMS | Designations";
  return (
    <>
      <div className='container-fluid'>
        <DepartmentInnerNav />
        <div className='row'>
          <div className='col-md-12 mt-4'>
            <DesignationMaster />
          </div>
        </div>
      </div>
    </>
  );
}
export default Designation;
