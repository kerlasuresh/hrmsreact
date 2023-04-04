import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./vendor/bootstrap/css/bootstrap.min.css";
import "./vendor/font-awesome/css/font-awesome.min.css";
import "./vendor/animate-css/vivify.min.css";
import "./vendor/c3/c3.min.css";
import "./vendor/chartist/css/chartist.min.css";
import "./vendor/chartist-plugin-tooltip/chartist-plugin-tooltip.css";
import "./vendor/jvectormap/jquery-jvectormap-2.0.3.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";

import "./App.css";
import "./style.css";
import ResetPassword from "./Components/Login/ResetPassword";
import LoginForm from "./Components/Login/LoginForm";
import Dashboard from "./Components/Dashboard/Dashboard";
import Auth from "./Components/route";
import Department from "./Components/EimAdmin/Department/Department";
import Designation from "./Components/EimAdmin/Designation/Designation";
import Organization from "./Components/EimAdmin/Organization/Organization";
import LeaveConfig from "./Components/LeaveManagement/LeaveConfiguration/Leaveconfig";
import InnerSideNavigation from "./Components/Dashboard/InnerSideNavigation";
import Calenders from "./Components/LeaveManagement/Holiday/Calender";
//import Announcement from "./Components/Announcement/Announcement";
import LeaveEntitlement from "./Components/LeaveManagement/Leave-entitlements/LeaveEntitlement";
import NewPassword from "./Components/Login/NewPassword";
import AddEmployee from "./Components/Employee/AddEmployee";
import ViewEmployee from "./Components/Employee/ViewEmp";
import CheckInOut from "./Components/Dashboard/CheckInOut";
import ManualAttandance from "./Components/ManualAttandence/ManualAttandance";
import MonthlyKRA from "./Components/MonthlyKRA/KRA";
import Attendance from './Components/Attendance/Attendance'
import KRANotification from "./Components/MonthlyKRA/NotificationDate";
import SendQuestionnaire from "./Components/MonthlyKRA/SendQuestionnaireTabs/SendQuestionnaireTabs";
import PrivateRoute from './Privaterote';
import ALLKRA from "./Components/MonthlyKRA/AllKRA";
import Messagesing from "./Components/Announcement/Messages";
import { GlobalProvider } from './Context/ThemeContext';
import EmployeeKRA from "./Components/MonthlyKRA/EmployeeKRA/EmployeeKRA";
import KraSubmitted from "./Components/MonthlyKRA/KraSubmitted";
import SetupWizard from "./Components/SetupWizard/SetupWizard";
import SignUp from './Components/SignUp/SignUp'
import Statutory from "./Components/EimAdmin/Statutory/Statutory";
import Statutory11 from "./Components/EimAdmin/Statutory/Statutory1";
import Directory from "./Components/Employee/Directory";
import EmpDocument from "./Components/MyProfile/EmpDocument";
import Family from "./Components/MyProfile/Family";
import Education from "./Components/MyProfile/Education";
import Documents from "./Components/MyProfile/Documents"
import Address from "./Components/EimAdmin/Address/Address";
import WorkWeek from "./Components/Employee/workWeek";
import Policiess from "./Components/EimAdmin/Policies/Policiess";
import AddEmp from "./Components/Employee/AddEmp";
import Admin from "./Components/EimAdmin/admin/admin";
import AttenLog from "./Components/Attendance/AttenLog";
import ParticularEmpDocuments from './Components/MyProfile/ParticularEmpDocuments'
import Workweeksett from "./Components/Settings/WorkWeek/Workweeksett";
import ModuleSelector from "./Components/Settings/moduleSelector";
import ControlsPermissions from "./Components/Settings/controls";
import Notification from "./Components/Settings/Notification";
import ChangePassword from "./Components/Login/changePassword";
import Announcement from "./Components/CompanyProfile/NewAnnouncement";
import TermsAndConditions from "./Components/SignUp/TermsAndConditions";
import ResendActivation from "./Components/SignUp/ResendActivation";
import Privacypolicy from "./Components/SignUp/Privacypolicy";
import LeaveManageRules from "./Components/LeaveManagement/LeaveType/LeaveManageRules";
import LeaveManagelogs from "./Components/LeaveManagement/LeaveType/LeaveManageLogs";
import LeaveManageSettings from "./Components/LeaveManagement/LeaveType/Settings";
import LeaveRules from "./Components/LMangement/LeaveRules";
import LeaveManageBalance from "./Components/LeaveManagement/Balance";
export default function App() {
  let uid;
  let usertoken;
  let user = JSON.parse(localStorage.getItem("user-data"));
  if (user) {
    console.log("local", user);
    uid = user.uid;
    usertoken = user.token;
  }
  var userinfo = sessionStorage.getItem("user-info");
  userinfo = JSON.parse(userinfo);
  return (
    <GlobalProvider>

      <BrowserRouter>
        <Routes>
          <Route path='/resendActivation' element={<><ResendActivation /></>} />
          <Route path='/' element={<LoginForm />} />
          <Route path='/reset' element={<ResetPassword />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/route' element={<Auth />} />
          <Route path='/termsAndConditions' element={<TermsAndConditions />} />
          <Route path='/privacy-policy' element={<Privacypolicy />} />
          <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path='/WorkWeek' element={<PrivateRoute><WorkWeek /></PrivateRoute>} />
          <Route path='/statutory' element={<PrivateRoute><Statutory /></PrivateRoute>} />
          <Route path='/statutoryss' element={<PrivateRoute><Statutory11 /></PrivateRoute>} />
          <Route path='/address' element={<PrivateRoute><Address /></PrivateRoute>} />
          <Route path='/admin' element={<PrivateRoute><Admin /></PrivateRoute>} />
          <Route path='/notification' element={<PrivateRoute><Notification /></PrivateRoute>} />
          <Route path='/policiess' element={<PrivateRoute><Policiess /></PrivateRoute>} />
          <Route path='/attendanlog' element={<PrivateRoute><AttenLog /></PrivateRoute>} />
          <Route path='/workweeksetting' element={<PrivateRoute><Workweeksett /></PrivateRoute>} />
          <Route path='/moduleselector' element={<PrivateRoute><ModuleSelector /></PrivateRoute>} />
          <Route path='/controlPermissions' element={<PrivateRoute><ControlsPermissions /></PrivateRoute>} />
          <Route path='/changePassword' element={<PrivateRoute><ChangePassword /></PrivateRoute>} />
          <Route path='/family' element={<PrivateRoute><Family /></PrivateRoute>} />
          <Route path='/education' element={<PrivateRoute><Education /></PrivateRoute>} />
          <Route path='/empdocument' element={<PrivateRoute><EmpDocument /></PrivateRoute>} />
          <Route path='/documents' element={<PrivateRoute><Documents /></PrivateRoute>} />
          <Route path='/department' element={<PrivateRoute><Department /></PrivateRoute>} />
          <Route path='/designation' element={<PrivateRoute><Designation /></PrivateRoute>} />
          <Route path='/organization' element={<PrivateRoute><Organization userinfo={userinfo} /></PrivateRoute>} />
          <Route path='/LeaveManageRules' element={<PrivateRoute><LeaveManageRules /></PrivateRoute>} />
          <Route path='/leavebalance' element={<PrivateRoute><LeaveManageBalance /></PrivateRoute>} />
          <Route path='/leavesettings' element={<PrivateRoute><LeaveManageSettings /></PrivateRoute>} />
          <Route path='/LeaveManagelogs' element={<PrivateRoute><LeaveManagelogs /></PrivateRoute>} />
          <Route path='/leaveconfiguration' element={<PrivateRoute><LeaveConfig /></PrivateRoute>} />
          <Route path='/innersidenav' element={<PrivateRoute><InnerSideNavigation /></PrivateRoute>} />
          <Route path='/holiday' element={<PrivateRoute><Calenders /></PrivateRoute>} />
          <Route path='/announcement' element={<PrivateRoute><Announcement/></PrivateRoute>} />
          <Route path='/attendance' element={<PrivateRoute><Attendance /></PrivateRoute>} />
          <Route path='/messages' element={<PrivateRoute><Messagesing /></PrivateRoute>} />
          <Route path='/leaveentitlement' element={<LeaveEntitlement />} />
          <Route path='/monthlykra' element={<PrivateRoute><MonthlyKRA /></PrivateRoute>} />
          <Route path='/employeekra' element={<PrivateRoute><EmployeeKRA /></PrivateRoute>} />
          <Route path='/employeekra/:id' element={<PrivateRoute><EmployeeKRA /></PrivateRoute>} />
          <Route path='/notificationdate' element={<PrivateRoute><KRANotification /></PrivateRoute>} />
          <Route path='/SendQuestionnaire' element={<PrivateRoute><SendQuestionnaire /></PrivateRoute>} />
          <Route path='/allkrafromlist' element={<PrivateRoute><ALLKRA /></PrivateRoute>} />
          <Route path='/allkraformbyEmployee' element={<PrivateRoute><KraSubmitted /></PrivateRoute>} />
          <Route path='/allkraformbyEmployee/:id' element={<PrivateRoute><KraSubmitted /></PrivateRoute>} />
          <Route path={`/setupwizard/`} element={<PrivateRoute><SetupWizard /></PrivateRoute>} />
          <Route
            path={`/newpassword/:email/:token/`}
            element={<NewPassword />}
          />
          <Route
            path={`/newpassword/`}
            element={<NewPassword />}
          />
          <Route path='/particularEmpDocuments' element={<ParticularEmpDocuments />} />
          <Route path={`/addemployee/`} element={<PrivateRoute><AddEmployee /></PrivateRoute>} />
          <Route path={`/addemp/`} element={<PrivateRoute><AddEmp /></PrivateRoute>} />
          <Route path={`/directory/`} element={<PrivateRoute><Directory /></PrivateRoute>} />
          <Route path={`/viewemployee`} element={<PrivateRoute><ViewEmployee /></PrivateRoute>} />
          <Route path={`/viewemployee/:id`} element={<PrivateRoute><ViewEmployee /></PrivateRoute>} />
          <Route path={'/CheckInOut'} element={<PrivateRoute><CheckInOut /></PrivateRoute>} />
          <Route path={'/ManualAttandance'} element={<PrivateRoute><ManualAttandance /></PrivateRoute>} />
          <Route path={`/leaveRules/`} element={<PrivateRoute><LeaveRules /></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}
