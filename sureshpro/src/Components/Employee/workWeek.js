import React, { useEffect, useState, useCallback } from "react";
import Header from "../Dashboard/Header";
import EmployeeInnerNav from "./EmployeeInnerNav";


function workWeek() {

  return (
    <>
      <div className='container-fluid'>
        <EmployeeInnerNav />
      </div>
      <div className="container">
        <div className="card p-3 mt-4">
          <h3 className="fw-bold"> Saturday Sunday Off </h3> <br />
          <div>
            <div className="fw-normal fw-bold ">Description</div>
            <div >This is a 5 days Work Week rule with Weekly off set as Saturday and Sunday.</div>
          </div>
          <div>
            <div className="fw-normal fw-bold">Effective Date</div>
            <div>01 Jan, 2022</div>
          </div>
          <hr />
          <div className="d-flex bd-highlight  ">  <p className="fw-normal fw-bold me-auto">Rule Settings1 </p>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked />
              <label className="form-check-label" for="flexCheckChecked">Half Day </label></div>
          </div>
          <table className="table workweek ">
            <tr>
              <th>Week</th>
              <th>Mon</th>
              <th>Tue</th>
              <th>Wed</th>
              <th>Thu</th>
              <th>Fri</th>
              <th>Sat</th>
              <th>Sun</th>
            </tr>

            <tr>
              <td><span ></span>1</td>
              <td><span className="green"></span></td>
              <td><span className="green"></span></td>
              <td><span className="green"></span></td>
              <td><span className="green"></span></td>
              <td><span className="green"></span></td>
              <td><span className="red"></span></td>
              <td><span className="red"></span></td>

            </tr>
            <tr>
              <td><span ></span>2</td>
              <td><span className="green"></span></td>
              <td><span className="green"></span></td>
              <td><span className="green"></span></td>
              <td><span className="green"></span></td>
              <td><span className="green"></span></td>
              <td><span className="red"></span></td>
              <td><span className="red"></span></td>

            </tr>
            <tr>
              <td><span ></span>3</td>
              <td><span className="green"></span></td>
              <td><span className="green"></span></td>
              <td><span className="green"></span></td>
              <td><span className="green"></span></td>
              <td><span className="green"></span></td>
              <td><span className="red"></span></td>
              <td><span className="red"></span></td>

            </tr>
            <tr>
              <td><span ></span>4</td>
              <td><span className="green"></span></td>
              <td><span className="green"></span></td>
              <td><span className="green"></span></td>
              <td><span className="green"></span></td>
              <td><span className="green"></span></td>
              <td><span className="red"></span></td>
              <td><span className="red"></span></td>

            </tr>
            <tr>
              <td><span ></span>5</td>
              <td><span className="green"></span></td>
              <td><span className="green"></span></td>
              <td><span className="green"></span></td>
              <td><span className="green"></span></td>
              <td><span className="green"></span></td>
              <td><span className="red"></span></td>
              <td><span className="red"></span></td>

            </tr>

          </table>


          <ul className="color-container">
            <li>
              <div className="color-indicator full"></div>Working Day
            </li>
            <li><div className="color-indicator off"></div>Weekly Off</li>
            <li> <div className="color-indicator half"></div>  Half Day</li>
          </ul>
        </div>

      </div>

    </>
  )

}
export default workWeek;
