import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SendQuestionnaire from "./SendQuestionnaire";
import SendQuestionnaireForm from "./SendQuestionnaireForm";
import InnerNavKRA from "../InnerNavKRA";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const handleChange1 = () => {
    a11yProps(0);
    setValue(0);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className='container-fluid'>
        <InnerNavKRA />
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <Box sx={{ width: "100%" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label='basic tabs example'>
                    <Tab label='All Sent Forms' {...a11yProps(0)} />
                    <Tab label='Send Form' {...a11yProps(1)} />
                  </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                  <SendQuestionnaire />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <SendQuestionnaireForm handleChangee={handleChange1} />
                </TabPanel>
              </Box>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
