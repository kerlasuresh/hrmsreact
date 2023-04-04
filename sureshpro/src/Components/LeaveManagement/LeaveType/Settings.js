import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
// import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import LeaveInnerNav from "../InnerNav/LeaveInnerNav";

const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    "&:before, &:after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
    },
    "&:before": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    "&:after": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
}));
const bull = (
  <Box
    component='span'
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}>
    •
  </Box>
);

const card = (
  <React.Fragment>
    <CardContent>
      <Typography variant='h5' component='div'>
        ANNUAL LEAVE CYCLE
        <hr />
      </Typography>

      <Typography variant='body2'>
        Enable Financial Year Cycle (Default is Calendar Year Cycle)
        <br />
        <br />
      </Typography>
      <FormControlLabel
        control={<Android12Switch defaultChecked />}
        label='ANNUAL LEAVE CYCLE'
      />
    </CardContent>
  </React.Fragment>
);

export default function LeaveManageSettings() {
  return (
    <div className="container-fluid">
      <LeaveInnerNav />
      <div className="container mt-4">
        <Box sx={{ minWidth: 275 }}>
          <Card variant='outlined'>{card}</Card>
        </Box>
      </div>
    </div>
  );
}
