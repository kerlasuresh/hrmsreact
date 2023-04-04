import React, {useEffect, useState} from "react";
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import { NavLink } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { MenuItem } from '@mui/material';
import { FaTachometerAlt } from "react-icons/fa";
import { MdAdminPanelSettings, MdManageAccounts } from "react-icons/md";
import { RiMessageFill } from "react-icons/ri";
import { BsCalendarRangeFill, BsFillCalendarCheckFill } from "react-icons/bs";
import { AiOutlineDown, AiOutlineRight } from "react-icons/ai";
const SideNavigation = ({ showSide }) => {
  const [companyProfile, setCompanyProfile] = useState(false);
  const [employee, setEmployee] = useState(false);
  const [MonthlyKRA, setMonthlyKRA] = useState(false);
  const [Settings, setSettings] = useState(false);

  return (
    <>
      {showSide ?
        <div className='side'>
          <>
            <Offcanvas show={true} backdrop={false} scroll={false} style={{width:"300px"}}>
       
              <Offcanvas.Body>
                <ul className="mainNavigation">
                  <li> <NavLink to='/dashboard' activeclassname="active">Dashboard</NavLink> </li>
                  <li> <span className="textToclick" onClick={() => setCompanyProfile(!companyProfile)}>Company Profile <span className="iconToclick" >{!companyProfile ? <AiOutlineRight /> : <AiOutlineDown />}</span></span>
                    <ul className={companyProfile ? "sub-navigation show" : "sub-navigation"} >
                      <li><NavLink to='/organization' activeclassname="active">  Overview </NavLink></li>
                      <li><NavLink to='/address' activeclassname="active">  Address </NavLink></li>
                      <li><NavLink to='/department' activeclassname="active">  department </NavLink></li>
                      <li><NavLink to='/Designation' activeclassname="active">  Designation </NavLink></li>
                      <li><NavLink to='/announcement' activeclassname="active">  Announcement </NavLink></li>
                      <li><NavLink to='/Policiess' activeclassname="active">  Policiess </NavLink></li>
                      <li><NavLink to='/Statutory' activeclassname="active">  Statutory </NavLink></li>
                    </ul>
                  </li>
                  <li><span className="textToclick" onClick={() => setEmployee(!employee)}>Employee  <span className="iconToclick" >{!employee ? <AiOutlineRight /> : <AiOutlineDown />}</span></span>
                    
                    <ul className={employee ? "sub-navigation show" : "sub-navigation"}>
                      <li><NavLink to='/addemp' activeclassname="active">Add Employee </NavLink ></li>
                      <li><NavLink to='/directory' activeclassname="active">Directory</NavLink ></li>
                    </ul>
                  </li>
                  <li>
                    <NavLink to='/attendance' activeclassname="active">Attendance</NavLink>
                  </li>
                  <li>
                    <NavLink to='/ManualAttandance' activeclassname="active">Manual Attendance</NavLink>
                  </li>
                  <li><span className="textToclick" onClick={() => setMonthlyKRA(!MonthlyKRA)}>Monthly KRA <span className="iconToclick" >{!MonthlyKRA ? <AiOutlineRight /> : <AiOutlineDown />}</span></span>
                    
                    <ul className={MonthlyKRA ? "sub-navigation show" : "sub-navigation"}>
                      <li><NavLink to='/monthlykra' activeclassname="active">Add Questionnaire </NavLink ></li>
                      <li><NavLink to='/SendQuestionnaire' activeclassname="active">Send Questionnaire </NavLink ></li>
                      <li><NavLink to='/allkrafromlist' activeclassname="active">All KRA Form List </NavLink ></li>
                      <li><NavLink to='/notificationdate' activeclassname="active" >Notification Dates</NavLink ></li>
                      <li><NavLink to='/employeekra' activeclassname="active">Employee KRA </NavLink ></li>
                    </ul>
                  </li>
                  <li><NavLink to='/messages' activeclassname="active">Message</NavLink></li>
                  <li><span className="textToclick" onClick={() => setSettings(!Settings)}>Settings <span className="iconToclick" >{!Settings ? <AiOutlineRight /> : <AiOutlineDown />}</span></span>
                    
                    <ul className={Settings ? "sub-navigation show" : "sub-navigation"}>
                      <li><NavLink to='/workweeksetting' activeclassname="active">Work Week </NavLink ></li>
                      <li><NavLink to='/controlPermissions' activeclassname="active">Controls Permissions </NavLink ></li>
                      <li><NavLink to='/moduleselector' activeclassname="active">Module Selector </NavLink ></li>
                      <li><NavLink to='/setupwizard' activeclassname="active">Setup Wizard</NavLink ></li>
                    </ul>
                  </li>
                </ul>
              </Offcanvas.Body>
            </Offcanvas>
          </>
          
          
          
          
          {/* <ProSidebar
            className='bg-danger'
            style={styles.sideBarHeight}
          >
            <div style={{ padding: 10 }}>
              {!collapsed ? <>
                <div>Welcome</div>
                <div > {sessionStorage.getItem('username')}</div>
              </> : ""}
            </div>
            <Menu iconShape='square'>
              <MenuItem
                className='nnn1'
                icon={<FaTachometerAlt />}
                active={window.location.pathname === "/dashboard"}>
                Dashboard
                <NavLink to='/dashboard' />
              </MenuItem>
              <SubMenu title='Company Profile' icon={<MdAdminPanelSettings />}>
                <MenuItem
                  active={window.location.pathname === "/departmentmaster/"}>
                  Overview
                  <NavLink to='/organization' />
                </MenuItem>
                <MenuItem
                  active={window.location.pathname === "/departmentmaster/"}>
                  Address
                  <NavLink to='/department' />
                </MenuItem>

                <MenuItem
                  active={window.location.pathname === "/departmentmaster/"}>
                  Department
                  <NavLink to='/department' />
                </MenuItem>
                <MenuItem>
                  Designation
                  <NavLink to='/designation' />
                </MenuItem>
               
                <MenuItem >
                  Announcement <NavLink to='/announcement' />
                </MenuItem>
                <MenuItem>
                  Policiess
                  <NavLink to='/policiess' />
                </MenuItem>
                <MenuItem>
                  Statutory
                  <NavLink to='/statutory' />
                </MenuItem>
              </SubMenu>
              <SubMenu title='Employee' icon={<MdManageAccounts />}>
                <MenuItem>
                  Add Employee <NavLink to='/addemp' />
                </MenuItem>
                <MenuItem>
                  Directory <NavLink to='/directory' />
                </MenuItem>
               
              </SubMenu>
             
              <MenuItem icon={<BsFillCalendarCheckFill />}>Attendance <NavLink to='/attendance' /></MenuItem>
              <MenuItem icon={<BsCalendarRangeFill />}>
                Manual Attendance
                <NavLink to='/ManualAttandance' />
              </MenuItem>
              <SubMenu title='Monthly KRA' icon={<SiChakraui />}>
                <MenuItem>Add Questionnaire <NavLink to='/monthlykra' /></MenuItem>
                <MenuItem>Send Questionnaire <NavLink to='/SendQuestionnaire' /></MenuItem>
                <MenuItem>All KRA Form List <NavLink to='/allkrafromlist' /></MenuItem>
                <MenuItem>Notification Dates <NavLink to='/notificationdate' /></MenuItem>
                <MenuItem>Employee KRA <NavLink to='/employeekra' /></MenuItem>
              </SubMenu>
              <MenuItem icon={<RiMessageFill />}>
                Message
                <NavLink to='/messages' />
              </MenuItem>
              <SubMenu title='Settings' icon={<MdSettingsSuggest />}>
                <MenuItem>Work Week <NavLink to='/workweeksetting' /></MenuItem>
                <MenuItem>Controls Permissions <NavLink to='/controlPermissions' /></MenuItem>
                <MenuItem>Module Selector <NavLink to='/moduleselector' /></MenuItem>
                <MenuItem>Setup Wizard <NavLink to='/setupwizard' /></MenuItem>
              </SubMenu>
             
            </Menu>
          </ProSidebar> */}
        </div> : ""}
    </>
  );
};
export default SideNavigation;
