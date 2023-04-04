import React, { useState, useEffect } from "react";
import axios, { Axios } from "axios";

import directoryicon from "../../images/img/directory-icon.png";
import attendanceicon from "../../images/img/attendance-icon.png";
import salaryicon from "../../images/img/salary-icon.png";
import reportsicon from "../../images/img/reports-icon.png";
import leaveicon from "../../images/img/leave-icon.png";
import calendaricon from "../../images/img/calendar-icon.png";
import announcementicon from "../../images/img/announcement-icon.png";
import monthlykraicon from "../../images/img/monthly-kra-icon.png";
import companyprofileicon from "../../images/img/company-profile-icon.png";

import slide1 from "../../images/img/slide-1.png";
import slide2 from "../../images/img/slide-2.png";
import slide3 from "../../images/img/slide-3.png";
import slide4 from "../../images/img/slide-4.png";
import settingsicon from "../../images/img/settings-icon.png";
import "bootstrap/dist/css/bootstrap.min.css";
import SideNavigation from "./SideNavigation";
import { BsFillCalendarCheckFill } from "react-icons/bs";
import { BiTransferAlt } from "react-icons/bi";
import {
  FaFileAlt,
  FaCalendarAlt,
  FaTree,
  FaBuilding,
  FaChartBar,
  FaChartLine,
} from "react-icons/fa";
import { MdSettingsSuggest } from "react-icons/md";
import { RiNotificationFill } from "react-icons/ri";
import { GoFileDirectory } from "react-icons/go";
import "./Dashboard.css";
import Header from "./Header";
import Modal from "react-bootstrap/Modal";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import CompanyHeader from "./CompanyHeader";

import { Link, useNavigate } from "react-router-dom";
//header
const Dashboard = () => {
  var settings = {
    dots: true,
    infinite: false,
    speed: 280,
    slidesToShow: 4,
    slidesToScroll: 1,
  };
  const [AnnouncementData, setAnnouncementData] = useState([]);
  const [employeeID, setemployeeID] = useState();
  document.title = "HRMS | Dashboard";
  const getAnnouncementData = async () => {
    var userinfo = JSON.parse(sessionStorage.getItem('user-info'));
    try {
      const response = await axios.get(`/api/company/announcement/${userinfo.data.id}/`);
      setAnnouncementData(response.data)
    } catch (error) {
      console.log('not found');
    }
  }
  useEffect(() => {
    var userinfo = JSON.parse(sessionStorage.getItem('user-info'));
    setemployeeID(userinfo.data.employee.id)
    getAnnouncementData();
  }, []);
  return (
    <>
      <CompanyHeader />
      <section className='allservices'>
        <div className='container'>
          <h5>All Services</h5>
          <ul>
            <li>
              <Link to='/directory'>
                <div className='img-box'>
                  <img src={directoryicon} alt='Directory' loading='lazy' />
                </div>
                <p>Directory</p>
              </Link>
            </li>
            <li>
              <Link to="/attendance">
                <div className='img-box'>
                  <img src={attendanceicon} alt='Attendance' loading='lazy' />
                </div>
                <p>Attendance</p>
              </Link>
            </li>
            <li>
               <Link to={`/ViewEmployee/${employeeID}`}>
                <div className='img-box'>
                  <img src={salaryicon} alt='myProfile' loading='lazy' />
                </div>
                <p>My Profile</p>
              </Link>
            </li>
            <li>
              <a href='#'>
                <div className='img-box'>
                  <img src={reportsicon} alt='Reports' loading='lazy' />
                </div>
                <p>Reports</p>
              </a>
            </li>
            <li>
              <Link to='/LeaveManagelogs'>
                <div className='img-box'>
                  <img src={leaveicon} alt='Leave' loading='lazy' />
                </div>
                <p>Leave</p>
              </Link>
            </li>
            <li>
              <Link to='/holiday'>
                <div className='img-box'>
                  <img src={calendaricon} alt='Calendar' loading='lazy' />
                </div>
                <p>Calendar</p>
              </Link>
            </li>
            <li>
              <Link to='/announcement'>
                <div className='img-box'>
                  <img
                    src={announcementicon}
                    alt='Announcement'
                    loading='lazy'
                  />
                </div>
                <p>Announcement</p>
              </Link>
            </li>
            <li>
              <Link to='/allkrafromlist'>
                <div className='img-box'>
                  <img src={monthlykraicon} alt='Monthly KRA' loading='lazy' />
                </div>
                <p>Monthly KRA</p>
              </Link>
            </li>
            <li>
              <Link to='/organization'>
                <div className='img-box'>
                  <img
                    src={companyprofileicon}
                    alt='Company Profile'
                    loading='lazy'
                  />
                </div>
                <p>Company Profile</p>
              </Link>
            </li>
            <li>
              <Link to="/workweeksetting">
                <div className='img-box'>
                  <img src={settingsicon} alt='Settings' loading='lazy' />
                </div>
                <p>Settings</p>
              </Link>
            </li>
          </ul>
        </div>
      </section>
      <section className='multislider'>
        <div className='container'>
          <div className='col-md-12'>
            <Slider {...settings}>
              {AnnouncementData.map((item, i)=>{
                return (
                  <div key={i}>
                    <Link to='announcement text-decoration-none'>
                      <div className='slide annoucement text-decoration-none'>
                        <h4 className='text-black  '>Annoucements</h4>
                        {item.annoucement}
                      </div>
                    </Link>
                  </div>
                );
              })}
              
              <div>
                <div className='slide'>
                  <a href='#'>
                    <img src={slide2} alt='' loading='lazy' />
                  </a>
                </div>
              </div>
              <div>
                <div className='slide'>
                  <a href='#'>
                    <img src={slide3} alt='' loading='lazy' />
                  </a>
                </div>
              </div>
              <div>
                <div className='slide'>
                  <a href='#'>
                    <img src={slide4} alt='' loading='lazy' />
                  </a>
                </div>
              </div>
              <div>
                <div className='slide'>
                  <a href='#'>
                    <img src={slide1} alt='' loading='lazy' />
                  </a>
                </div>
              </div>
              <div>
                <div className='slide'>
                  <a href='#'>
                    <img src={slide2} alt='' loading='lazy' />
                  </a>
                </div>
              </div>
              <div>
                <div className='slide'>
                  <a href='#'>
                    <img src={slide3} alt='' loading='lazy' />
                  </a>
                </div>
              </div>
              <div>
                <div className='slide'>
                  <a href='#'>
                    <img src={slide4} alt='' loading='lazy' />
                  </a>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </section>
      {/* <Header /> */}
      {/* <div className='p-3 mt-80'>
        <div className='row'>
          <marquee
            className='text-warning f-20'
            onMouseOver={stop()}
            onMouseOut={start()}>
            {tickerData.map((option, i) => (
              <button
                className='btn btn-sm btn-outline-black bg-success m-3 '
                key={i}
                value={option.id}>
                {option.title}
              </button>
            ))}
          </marquee>
        </div>
        <div className='row'>
          <div className='col-md-3 p-4'>
            <div className='card border-0'>
              <div className='align-items-center'>
              
                <CompanyLogo />
              </div>
             
            </div>
          </div>
          <div className='col-md-2'>
            <div
              className='card border-0 m-3 align-items-center icon direct1'
              style={{ color: "#2A9D8F" }}>
              <GoFileDirectory className='direct' />
              <h6 className='p-3 text-dark'>Directory</h6>
            </div>
            <div
              className='card border-0 m-3 align-items-center icon direct1'
              style={{ color: "Gray" }}>
              <FaFileAlt className='direct' />
              <h6 className='p-3 text-dark'>Reports</h6>
            </div>
            <div
              className='card border-0 m-3 align-items-center icon direct1'
              style={{ color: "Orange" }}>
              <RiNotificationFill className='direct' />
              <h6 className='p-3 text-dark'>Announcement</h6>
            </div>
          </div>
          <div className='col-md-2 '>
            <div
              className='card border-0 m-3 align-items-center icon direct1'
              style={{ color: "SlateBlue" }}>
              <BsFillCalendarCheckFill className='direct' />
              <h6 className='p-3 text-dark'>Attendance</h6>
            </div>
            <div
              className='card border-0 m-3 align-items-center icon direct1'
              style={{ color: "MediumSeaGreen" }}>
              <FaTree className='direct' />
              <h6 className='p-3 text-dark'>Leave</h6>
            </div>
            <div
              className='card border-0 m-3 align-items-center icon direct1'
              style={{ color: "#2A9D8F" }}>
              <FaChartLine className='direct' />
              <h6 className='p-3 text-dark'>Monthly KRA</h6>
            </div>
          </div>
          <div className='col-md-2'>
            <div
              className='card border-0 m-3 align-items-center icon direct1'
              style={{ color: "Violet" }}>
              <BiTransferAlt className='direct' />
              <h6 className='p-3 text-dark'>Payroll</h6>
            </div>
            <div
              className='card border-0 m-3 align-items-center icon direct1'
              style={{ color: "DodgerBlue" }}>
              <FaCalendarAlt className='direct' />
              <h6 className='p-3 text-dark'>Calendar</h6>
            </div>
            <div
              className='card border-0 m-3 align-items-center icon direct1'
              style={{ color: "Tomato" }}>
              <MdSettingsSuggest className='direct' />
              <h6 className='p-3 text-dark'>Settings</h6>
            </div>
          </div>
          <div className='col-md-2 '>
            <div className='card  m-3 align-items-center reinvite w-100'>
              <div className='m-3'>
                <h6>Employees Onboard: 7</h6>
                <h6>Employees Not Activated: 5</h6>
                <h6>Invalid Email: 0</h6>
                <h6>Mobile Number not Verified: 3</h6>
                <button type='button' className='form-control rounded'>
                  Re-invite
                </button>
              </div>
            </div>

            <div className='card  m-3 align-items-center reinvite w-100'>
              <div className='m-3'>
                <h5 className='text-center text-danger'>Announcements</h5>
                <br />
                <ol>
                  {tickerData.map((option, i) => (
                    <li key={i} value={option.id}>
                      <span className='fw-bold'> Title : </span>
                      {option.title}
                      <div>
                        <span className='fw-bold'>Description : </span>
                        {option.description}
                      </div>
                      <br />
                    </li>
                  ))}
                </ol>

                <AnnouncementDetails />
              </div>
            </div>
          </div>
          <div className='colmd-1'></div>
        </div>
      </div> */}
    </>
  );
};

function CompanyLogo() {
  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);

  const handleImageUpload = (e) => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = (e) => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };
  document.title = "HRMS | Dashboard";
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <input
        type='file'
        accept='image/*'
        onChange={handleImageUpload}
        ref={imageUploader}
        style={{
          display: "none",
        }}
      />
      <div
        style={{
          height: "150px",
          width: "150px",
          // border: "1px dashed black",
        }}
        onClick={() => imageUploader.current.click()}>
        <img
          ref={uploadedImage}
          style={{
            width: "150px",
            height: "150px",
            position: "absolute",
          }}
        />
        <h6 className='align-items-center m-4'>Upload Logo</h6>
      </div>
      Company Logo
    </div>
  );
}

const AnnouncementDetails = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };
  const [tickerData, setTickerData] = useState([]);
  const loadTicker = async () => {
    await axios
      .post(`/annoucement_ticker/`, { checkbox: "True" })
      .then((result) => {
        setTickerData(result.data);
      })
      .catch((err) => {
        alert("Check your details and resubmit");
        console.log("errors", err);
      });
  };

  useEffect(() => {
    loadTicker();
  }, []);

  return (
    <div>
      <button
        onClick={handleShow}
        className='form-control rounded btn btn-light '>
        Read more
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='text-center text-danger mx-auto'>
            Announcements
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            <div className='col-md-12'>
              <br />
              <ol>
                {tickerData.map((option, i) => (
                  <li key={i} value={option.id}>
                    <span className='fw-bold'> Title : </span>
                    {option.title}
                    <div>
                      <span className='fw-bold'>Description : </span>
                      {option.description}
                    </div>
                    <br />
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Dashboard;
