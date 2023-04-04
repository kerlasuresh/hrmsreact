import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Logs from "./LeaveManageLogs";
import Rules from "./LeaveManageRules";
import Balance from "./Balance";
import Settings from "./Settings";
import InnerHeader from "../../Dashboard/InnerHeader";
import InnerSideNavigation from "../../Dashboard/InnerSideNavigation";
import LeaveInnerNav from "../InnerNav/LeaveInnerNav";
export default function Leave() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <InnerHeader />
      <div className='p-2 mt-80'>
        <LeaveInnerNav />
        <div className='row p-3 mt-100'>
          <div className='col-md-2'></div>
          <div className='col-md-8'>
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    aria-label='lab API tabs example'>
                    <Tab label='Logs' value='1' />
                    <Tab label='Rules' value='2' />

                    <Tab label='Balance' value='3' />
                    <Tab label='Settings' value='4' />
                  </TabList>
                </Box>
                <TabPanel value='1'>
                  <Logs />
                </TabPanel>
                <TabPanel value='2'>
                  <Rules />
                </TabPanel>
                <TabPanel value='3'>
                  <Balance />
                </TabPanel>
                <TabPanel value='4'>
                  <Settings />
                </TabPanel>
              </TabContext>
            </Box>
          </div>
          <div className='col-md-2'></div>
        </div>
      </div>
    </>
  );
}
