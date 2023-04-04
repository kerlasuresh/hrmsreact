import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Earned from "./Earned";
import Lossofpay from "./Lossofpay";
import Sick from "./Sick";
import Paternity from "./Paternity";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function Rules() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box
        sx={{
          // flexGrow: ,
          bgcolor: "background.paper",
          display: "flex",
          height: 824,
          width: 800,
        }}>
        <Tabs
          orientation='vertical'
          variant='scrollable'
          value={value}
          onChange={handleChange}
          aria-label='Vertical tabs example'
          sx={{ borderRight: 1, borderColor: "divider" }}>
          <Tab
            label={
              <React.Fragment>
                <div className='card w-100 p-2'>
                  <div className='text-start  text-capitalize'>
                    <h6>Earned</h6>
                    <label class='text-dark'>
                      <strong>4-</strong>
                      Employees
                    </label>
                  </div>
                </div>
              </React.Fragment>
            }
            {...a11yProps(0)}
          />

          <Tab
            label={
              <React.Fragment>
                <div className='card w-100 p-2'>
                  <div className='text-start  text-capitalize'>
                    <h6>Paternity Leave</h6>
                    <label class='text-dark'>
                      <strong>4-</strong>
                      Employees
                    </label>
                  </div>
                </div>
              </React.Fragment>
            }
            {...a11yProps(1)}
          />
          <Tab
            label={
              <React.Fragment>
                <div className='card w-100 p-2'>
                  <div className='text-start  text-capitalize'>
                    <h6>Loss Of Pay</h6>
                    <label class='text-dark'>
                      <strong>4-</strong>
                      Employees
                    </label>
                  </div>
                </div>
              </React.Fragment>
            }
            {...a11yProps(2)}
          />
          <Tab
            label={
              <React.Fragment>
                <div className='card w-100 p-2'>
                  <div className='text-start  text-capitalize'>
                    <h6>Sick Leave</h6>
                    <label class='text-dark'>
                      <strong>4-</strong>
                      Employees
                    </label>
                  </div>
                </div>
              </React.Fragment>
            }
            {...a11yProps(3)}
          />
          <Tab
            label={
              <React.Fragment>
                <div className='card w-100 p-2'>
                  <div className='text-start  text-capitalize'>
                    <h6>Maternity Leave</h6>
                    <label class='text-dark'>
                      <strong>No-</strong>
                      Employees
                    </label>
                  </div>
                </div>
              </React.Fragment>
            }
            {...a11yProps(4)}
            disabled
          />
          <Tab
            label={
              <React.Fragment>
                <div className='card w-100 p-2'>
                  <div className='text-start  text-capitalize '>
                    <h6>ON Duty Leave</h6>
                    <label class='text-dark'>
                      <strong>1-</strong>
                      Employees
                    </label>
                  </div>
                </div>
              </React.Fragment>
            }
            {...a11yProps(5)}
            disabled
          />
          <Tab
            label={
              <React.Fragment>
                <div className='card w-100 p-2'>
                  <div className='text-start  text-capitalize'>
                    <h6>Event Leave</h6>
                    <label class='text-dark'>
                      <strong>1-</strong>
                      Employees
                    </label>
                  </div>
                </div>
              </React.Fragment>
            }
            {...a11yProps(6)}
            disabled
          />
          <Tab
            label={
              <React.Fragment>
                <div className='card w-100 p-2'>
                  <div className='text-start  text-capitalize'>
                    <h6>Leave Type 1</h6>
                    <label class='text-dark'>
                      <strong>1-</strong>
                      Employees
                    </label>
                  </div>
                </div>
              </React.Fragment>
            }
            {...a11yProps(7)}
            disabled
          />
          <Tab
            label={
              <React.Fragment>
                <div className='card w-100 p-2'>
                  <div className='text-start  text-capitalize'>
                    <h6>Leave Type 2</h6>
                    <label class='text-dark'>
                      <strong>1-</strong>
                      Employees
                    </label>
                  </div>
                </div>
              </React.Fragment>
            }
            {...a11yProps(8)}
            disabled
          />
          <Tab
            label={
              <React.Fragment>
                <div className='card w-100 p-2'>
                  <div className='text-start  text-capitalize'>
                    <h6>Leave Type 3</h6>
                    <label class='text-dark'>
                      <strong>1-</strong>
                      Employees
                    </label>
                  </div>
                </div>
              </React.Fragment>
            }
            {...a11yProps(9)}
            disabled
          />
        </Tabs>

        <TabPanel value={value} index={0}>
          <Earned />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Paternity />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Lossofpay />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Sick />
        </TabPanel>
        <TabPanel value={value} index={4}></TabPanel>
        <TabPanel value={value} index={5}>
          Item Six
        </TabPanel>
        <TabPanel value={value} index={6}>
          Item Seven
        </TabPanel>
      </Box>
      <button className='btn btn-primary'>Create New Rule</button>
    </>
  );
}
