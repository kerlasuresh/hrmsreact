import * as React from 'react'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Certifications from './Certifications'
import DocumentWork from './documentWork'
import EmpDocument from './EmpDocument'
export default function ParticularEmpDocuments() {
  const [value, setValue] = React.useState('1')

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <>
      {/* <div className="container-fluid">
        <EmployeeInnerNav />
      </div> */}
      <div className=" container">
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Ids" value="1" />
                <Tab label="CERTIFICATIONS" value="2" />
                <Tab label="WORK" value="3" />
              </TabList>
            </Box>
            <TabPanel value="2">
              <Certifications />
            </TabPanel>
            <TabPanel value="3">
              <DocumentWork />
            </TabPanel>
            <TabPanel value="1">
              <EmpDocument />
            </TabPanel>
          </TabContext>
        </Box>
      </div>
      {/* </div> */}
    </>
  )
}
