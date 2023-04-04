import React from "react";

import { FiMail } from "react-icons/fi";
import { GoMailRead } from "react-icons/go";
import { AiOutlineDelete } from "react-icons/ai";
import Favicon from "../../images/img/favicon.png";
function Notification() {
  return (
    <>
      <div className='container'>
        <div className=' borderbb mb-3 mt-4'>
          <div className='row p-3'>
            <div className='col-md-6 d-flex aligncenter'>
              <div className='mright'>
                <input
                  type='checkbox'
                  className='inputcheckbox me-3'
                  id='flexCheckChecked'
                />
                <label className='form-check-label me-4' for='flexCheckChecked'>
                  Select All
                </label>
              </div>
              <div className='ml-4'>
                <h6>Notification Selected</h6>
              </div>
            </div>
            <div className='col-md-6'>
              <ul className='d-flex justify-content-around alignc'>
                <li>
                  <div className='justify-content-around'>
                    <FiMail />
                    <span className='ft-14'>Mark as Unread</span>
                  </div>
                </li>
                <li>
                  <div className=''>
                    <GoMailRead />
                    <span className='ft-14'>Mark as read</span>
                  </div>
                </li>
                <li>
                  <div className=''>
                    <AiOutlineDelete />
                    <span>Delete</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className='row bbc m-0 p-3 mb-3'>
          <div className='col-md-9'>
            <ul className='d-flex alignc m-0 p-0'>
              <li>
                <div className=''>
                  <input
                    type='checkbox'
                    className='inputcheckbox me-3'
                    id='flexCheckChecked'
                  />
                </div>
              </li>
              <li>
                <img src={Favicon} className='me-4' />
              </li>
              <li>
                <p class='ft-14 m-0'>        
                  <span class='semibold'>332 323</span> has rejected your Tax
                  Scheme request
                </p>
                <p class='ft-13 text-muted m-0'>08/11/22 03:57 p.m.</p>
              </li>
            </ul>
          </div>
          <div className='col-md-3 text-end align-self-center'>
            <FiMail className='me-4' />
            <AiOutlineDelete />
          </div>
        </div>
        <div className='row bbc m-0 p-3 mb-3'>
          <div className='col-md-9'>
            <ul className='d-flex alignc m-0 p-0'>
              <li>
                <div className=''>
                  <input
                    type='checkbox'
                    className='inputcheckbox me-3'
                    id='flexCheckChecked'
                  />
                </div>
              </li>
              <li>
                <img src={Favicon} className='me-4' />
              </li>
              <li>
                <p class='ft-14 m-0'>
                  <span class='semibold'>332 323</span> has rejected your Tax
                  Scheme request
                </p>
                <p class='ft-13 text-muted m-0'>08/11/22 03:57 p.m.</p>
              </li>
            </ul>
          </div>
          <div className='col-md-3 text-end align-self-center'>
            <FiMail className='me-4' />
            <AiOutlineDelete />
          </div>
        </div>
        <div className='row bbc m-0 p-3 mb-3'>
          <div className='col-md-9'>
            <ul className='d-flex alignc m-0 p-0'>
              <li>
                <div className=''>
                  <input
                    type='checkbox'
                    className='inputcheckbox me-3'
                    id='flexCheckChecked'
                  />
                </div>
              </li>
              <li>
                <img src={Favicon} className='me-4' />
              </li>
              <li>
                <p class='ft-14 m-0'>
                  <span class='semibold'>332 323</span> has rejected your Tax
                  Scheme request
                </p>
                <p class='ft-13 text-muted m-0'>08/11/22 03:57 p.m.</p>
              </li>
            </ul>
          </div>
          <div className='col-md-3 text-end align-self-center'>
            <FiMail className='me-4' />
            <AiOutlineDelete />
          </div>
        </div>
        <div className='row bbc m-0 p-3 mb-3'>
          <div className='col-md-9'>
            <ul className='d-flex alignc m-0 p-0'>
              <li>
                <div className=''>
                  <input
                    type='checkbox'
                    className='inputcheckbox me-3'
                    id='flexCheckChecked'
                  />
                </div>
              </li>
              <li>
                <img src={Favicon} className='me-4' />
              </li>
              <li>
                <p class='ft-14 m-0'>
                  <span class='semibold'>332 323</span> has rejected your Tax
                  Scheme request
                </p>
                <p class='ft-13 text-muted m-0'>08/11/22 03:57 p.m.</p>
              </li>
            </ul>
          </div>
          <div className='col-md-3 text-end align-self-center'>
            <FiMail className='me-4' />
            <AiOutlineDelete />
          </div>
        </div>
        <div className='row bbc m-0 p-3 mb-3'>
          <div className='col-md-9'>
            <ul className='d-flex alignc m-0 p-0'>
              <li>
                <div className=''>
                  <input
                    type='checkbox'
                    className='inputcheckbox me-3'
                    id='flexCheckChecked'
                  />
                </div>
              </li>
              <li>
                <img src={Favicon} className='me-4' />
              </li>
              <li>
                <p class='ft-14 m-0'>
                  <span class='semibold'>332 323</span> has rejected your Tax
                  Scheme request
                </p>
                <p class='ft-13 text-muted m-0'>08/11/22 03:57 p.m.</p>
              </li>
            </ul>
          </div>
          <div className='col-md-3 text-end align-self-center'>
            <FiMail className='me-4' />
            <AiOutlineDelete />
          </div>
        </div>
      </div>
    </>
  );
}

export default Notification;
