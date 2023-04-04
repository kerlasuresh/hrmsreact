import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { AiOutlineEdit } from "react-icons/ai";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import PropTypes from "prop-types";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

// export interface  {
//   id: string;
//   children?: React.ReactNode;
//   onClose: () => void;
// }

const BootstrapDialogTitle = (props) => {
  const {
    children,
    onClose,
    onClosed,
    onCloseded,
    onClosing,
    ...other
  } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label='close'
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}>
          <CloseIcon />
        </IconButton>
      ) : null}

      {onClosed ? (
        <IconButton
          aria-label='close'
          onClick={onClosed}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}>
          <CloseIcon />
        </IconButton>
      ) : null}

      {onCloseded ? (
        <IconButton
          aria-label='close'
          onClick={onCloseded}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}>
          <CloseIcon />
        </IconButton>
      ) : null}

      {onClosing ? (
        <IconButton
          aria-label='close'
          onClick={onClosing}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
  onClosed: PropTypes.func.isRequired,
  onCloseded: PropTypes.func.isRequired,
  onClosing: PropTypes.func.isRequired,
};

export default function Lossofpay() {
  const [value, setValue] = React.useState("general");
  const [open, setOpen] = React.useState(false);
  const [solve, setSolve] = React.useState(false);
  const [action, setAction] = React.useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpened = () => {
    setSolve(true);
  };

  const handleClosed = () => {
    setSolve(false);
  };
  const handleClickOpeneded = () => {
    setAction(true);
  };

  const handleCloseded = () => {
    setAction(false);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <h4>Loss Of Pay Leave</h4>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label='lab API tabs example'>
            {/* <Tab label="General Settings" value="general" />
            <Tab label="Advanced Settings" value="advanced" /> */}
            <Tab
              label='General Settings'
              className='text-capitalize'
              value='general'
            />
            <Tab
              label='Advanced Settings '
              className='text-capitalize'
              value='advanced '
              disabled
            />
          </TabList>
        </Box>
        <TabPanel value='general'>
          <div className='main mb-3'>
            <div className='row mb-4'>
              <div className='col-md-9'>
                <label className='mb-2'>Name</label>
                <br />
                {/* <TextField
                  defaultValue=' Loss Of Pay'
                  variant='filled'
                  padding='0px'
                /> */}
                <p>Loss Of Pay</p>
              </div>
              <div className='col-md-3 text-end'>
                <Button variant='outlined' onClick={handleClickOpen}>
                  <AiOutlineEdit />
                </Button>
                <BootstrapDialog
                  onClose={handleClose}
                  aria-labelledby='customized-dialog-title'
                  open={open}>
                  <BootstrapDialogTitle
                    id='customized-dialog-title'
                    onClose={handleClose}>
                    Loss Of Pay
                  </BootstrapDialogTitle>
                  <DialogContent dividers>
                    <Typography gutterBottom>
                      <div className='row'>
                        <div className='col-md-12 mb-2'>
                          <label className='mb-2'>Name</label>
                          <input
                            type='text'
                            className='form-control'
                            placeholder='name'
                          />
                        </div>
                        <div className='col-md-12'>
                          <label className='mb-2'>Description</label>
                          <textarea
                            class='desc ft-14 p-1 form-control'
                            name='rule_description'
                            placeholder='Enter your description here'
                            rows='4'
                            cols='50'>
                            This is a default description for the Leave Type.
                            You can customise this.
                          </textarea>
                        </div>
                      </div>
                    </Typography>
                  </DialogContent>
                  <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                      CANCEL
                    </Button>
                    <button className='btn btn-primary'>SAVE</button>
                  </DialogActions>
                </BootstrapDialog>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-12'>
                <label className='mb-2'>Description</label>
                <p>
                  This is a default description for the Leave Type. You can
                  customise this
                </p>
                {/* <textarea className="desc ft-14 p-1 form-control" name="rule_description" placeholder="Enter your description here" rows="4" cols="50">This is a default description for the Leave Type. You can customise this. </textarea> */}
              </div>
            </div>
          </div>
          <hr />

          <div className='main1 mb-3'>
            <div className='row mb-4'>
              <div className='col-md-2'>
                <h6 className='mb-2'>Leaves Count</h6>
              </div>
              <div className='col-md-4'>
                <h6>Leaves Allowed in a Year</h6>
                {/* <TextField defaultValue='7.0' variant='filled' padding='0px' /> */}
                <p>7.0</p>
              </div>
              <div className='col-md-4'>
                <h6>Weekends Between Leave</h6>
                {/* <TextField
                  defaultValue='Not Considered'
                  variant='filled'
                  padding='0px'
                /> */}
                <p>Not Considered</p>
              </div>
              <div className='col-md-2 text-end'>
                <Button variant='outlined' onClick={handleClickOpened}>
                  <AiOutlineEdit />
                </Button>
                <BootstrapDialog
                  onClosed={handleClosed}
                  aria-labelledby='customized-dialog-title'
                  open={solve}>
                  <BootstrapDialogTitle
                    id='customized-dialog-title'
                    onClosed={handleClosed}>
                    Leaves Count
                  </BootstrapDialogTitle>
                  <DialogContent dividers>
                    <Typography gutterBottom>
                      <div className='row mb-4'>
                        <div className='col-md-4 mb-2'>
                          <h6 className='mb-2'>Leaves Count</h6>
                        </div>
                        <div className='col-md-4'>
                          <h6>Leaves Allowed in a Year</h6>
                          <TextField
                            defaultValue='23.6'
                            variant='filled'
                            padding='0px'
                          />
                        </div>
                        <div className='col-md-4'>
                          <h6>Weekends Between Leave</h6>
                          <Checkbox {...label} className='p-0' />
                          Count as Leave
                        </div>
                      </div>
                      <hr />
                      <div className='row'>
                        <div className='col-md-4'></div>
                        <div className='col-md-4'>
                          <h6>Holidays Between Leave</h6>
                          <Checkbox {...label} className='p-0' />
                          Count as Leave
                        </div>
                      </div>
                    </Typography>
                  </DialogContent>
                  <DialogActions>
                    <Button autoFocus onClick={handleClosed}>
                      CANCEL
                    </Button>
                    <button className='btn btn-primary'>SAVE</button>
                  </DialogActions>
                </BootstrapDialog>
              </div>
            </div>

            <div className='row'>
              <div className='col-md-2'></div>
              <div className='col-md-4'>
                <h6>Holidays Between Leave</h6>
                {/* <TextField
                  defaultValue='Not Considered'
                  variant='filled'
                  padding='0px'
                /> */}
                <p>Not Considered</p>
              </div>
              <div className='col-md-4'></div>
              <div className='col-md-2'></div>
            </div>
          </div>
          <hr />

          <div className='main3'>
            <div className='row'>
              <div className='col-md-2'>
                <h6>Applicability</h6>
              </div>
              <div className='col-md-4'>
                <h6>Allowed under Probation</h6>
                <p>No</p>
              </div>
              <div className='col-md-4'></div>
              <div className='col-md-2 text-end'>
                <Button variant='outlined' onClick={handleClickOpeneded}>
                  <AiOutlineEdit />
                </Button>
                <BootstrapDialog
                  onCloseded={handleCloseded}
                  aria-labelledby='customized-dialog-title'
                  open={action}>
                  <BootstrapDialogTitle
                    id='customized-dialog-title'
                    onCloseded={handleCloseded}>
                    Applicability
                  </BootstrapDialogTitle>
                  <DialogContent dividers>
                    <Typography gutterBottom>
                      <div className='row'>
                        <div className='col-md-4'>
                          <h6>Applicability</h6>
                        </div>
                        <div className='col-md-8'>
                          <Checkbox {...label} className='p-0' />
                          Allowed under Probation
                        </div>
                      </div>
                    </Typography>
                  </DialogContent>
                  <DialogActions>
                    <Button autoFocus onClick={handleCloseded}>
                      CANCEL
                    </Button>
                    <button className='btn btn-primary'>SAVE</button>
                  </DialogActions>
                </BootstrapDialog>
              </div>
            </div>
          </div>
          <hr />
        </TabPanel>
        <TabPanel value='advanced'>Item Two</TabPanel>
      </TabContext>
    </Box>
  );
}
