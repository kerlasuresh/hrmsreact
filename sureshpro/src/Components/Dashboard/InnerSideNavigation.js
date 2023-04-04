import React from "react";
import "./sidenav.css";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FaGem, FaHeart, FaTachometerAlt } from "react-icons/fa";
// import {
//   Menu,
//   MenuItem,
//   ProSidebar,
//   SidebarHeader,
//   SubMenu,
// } from "react-pro-sidebar";
// import "react-pro-sidebar/dist/css/styles.css";
import { Link } from "react-router-dom";
import Header from "./Header";
import {
  MdAdminPanelSettings,
  MdManageAccounts,
  MdSettingsSuggest,
} from "react-icons/md";
import { FaFileAlt, FaCalendarAlt, FaTree } from "react-icons/fa";
import { BsFillCalendarCheckFill, BsCalendarRangeFill } from "react-icons/bs";
import { SiChakraui } from "react-icons/si";
import { TbPhysotherapist } from "react-icons/tb";
import {
  RiNotificationFill,
  RiMessageFill,
  RiFolderHistoryLine,
} from "react-icons/ri";
import { red } from "@mui/material/colors";
import { color } from "@mui/system";

const InnerSideNavigation = () => {
  //useState
  // const [collapsed, setCollapsed] = useState(true);

  // added styles
  const styles = {
    sideBarHeight: {
      height: "100%",
      position: "absolute",
      zindex: 1,
      left: 0,
      overflowx: "hidden",
      background: "#0b0b45",
      // color: "red",
    },
  };

  // const onClickMenuIcon = () => {
  //   setCollapsed(!collapsed);
  // };

  return (
    <aside>
      <nav className='sidebar justify-content-center ' style={styles.sideBarHeight}>
        <div id='minhasidebar'>
          <ul className='nav nav-pills d-block'>
            <Link to='/dashboard'>
              <li className='nav-item p-2'>
                <FaTachometerAlt size={40} fill='#fff' />
              </li>
            </Link>
            <li className='nav-item p-2'>
              <Link to='#'>
                <BsFillCalendarCheckFill size={40} fill='#fff' />
              </Link>
            </li>
            <li className='nav-item p-2'>
              <Link to='#'>
                <RiNotificationFill size={40} fill='#fff' />
              </Link>
            </li>
            <li className='nav-item p-2'>
              <Link to='#'>
                <RiMessageFill size={40} fill='#fff' />
              </Link>
            </li>
            <li className='nav-item p-2'>
              <Link to='#'>
                <FaFileAlt size={40} fill='#fff' />
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  );
};

export default InnerSideNavigation;
//  <div className='container-fluid'>
//     <div className='row'>
//       <div className='col-sm-auto min-vh-100 bg-light d-flex align-items-center'>
//         <ul>
//           <li>
//             <a className='nav-link'>Home</a>
//           </li>
//           <li>
//             <a className='nav-link'>Home</a>
//           </li>
//           <li>
//             <a className='nav-link'>Home</a>
//           </li>
//           <li>
//             <a className='nav-link'>Home</a>
//           </li>
//         </ul>
//       </div>
//     </div>
//   </div>
//aside
{
  /* <aside>
      <nav className='sidebar justify-content-center ' style={styles.sideBarHeight}>
        <div id='minhasidebar'>
          <ul className='nav nav-pills d-block'>
            <li className='nav-item p-2'>
              <Link to='/dashboard'>
                <FaTachometerAlt size={60} />
              </Link>
            </li>
            <li className='nav-item p-2'>
              <Link to='#'>
                <BsFillCalendarCheckFill size={60} />
              </Link>
            </li>
            <li className='nav-item p-2'>
              <Link to='#'>
                <RiNotificationFill size={60} />
              </Link>
            </li>
            <li className='nav-item p-2'>
              <Link to='#'>
                <RiMessageFill size={60} />
              </Link>
            </li>
            <li className='nav-item p-2'>
              <Link to='#'>
                <FaFileAlt size={60} />
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </aside> */
}
//old
// <ProSidebar
//   className='nnn'
//   style={styles.sideBarHeight}
//   collapsed={collapsed}>
//   {/* <SidebarHeader>
//     <div className='m-3 float-right '>
//       <AiOutlineMenu size={30} />
//     </div>
//   </SidebarHeader> */}
//   <Menu iconShape='square' className='outp'>
//     <MenuItem
//       className='menu'
//       icon={<FaTachometerAlt size={100} fill='#fff' />}>
//       <Link to='/dashboard' />
//     </MenuItem>
//     <MenuItem
//       icon={<BsFillCalendarCheckFill size={100} fill='#fff' />}></MenuItem>
//     <MenuItem icon={<FaCalendarAlt size={100} fill='#fff' />}></MenuItem>
//     <MenuItem
//       icon={<RiNotificationFill size={100} fill='#fff' />}></MenuItem>
//     <MenuItem icon={<RiMessageFill size={100} fill='#fff' />}></MenuItem>
//     <MenuItem icon={<FaFileAlt size={100} fill='#fff' />}></MenuItem>
//   </Menu>
// </ProSidebar>
