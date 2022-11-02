import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CloseIcon from '@mui/icons-material/Close';
import TextField from "@mui/material/TextField";
import { IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {useState} from 'react'
import {addName, removeName, getNames, getColors} from '../store/greet'
import { useDispatch, useSelector } from "react-redux";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function NameSelelction() {
  const dispatch = useDispatch()
  const colors = useSelector(state => getColors(state))
  const [open, setOpen] = React.useState(false);
  
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      setOpen(false);
    }
    setOpen(false);
  };
  const [name, setName] = useState('');
  const names = useSelector(state => getNames(state))
  const handleName = (name) => {
    if (name.trim() == ''){
      setOpen(true)
      return
    }
    dispatch(addName({name:name}))
    console.log(names)
    setName('')

  }
  return (
    <div style={{ width: "100%" }}>
      <Snackbar
      anchorOrigin={{ vertical:"top", horizontal:"center" }}
       open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        Can not be empty field 
      </Alert>
    </Snackbar>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          p: 1,
          m: 1,
          bgcolor: "background.paper",
          maxWidth: "100%",
          borderRadius: 1
        }}
      >
      {names.map((item , index)=> <Button  key={index} 

        onClick={()=>{
          dispatch(removeName({name:item}))
        }}
      variant="contained"  endIcon={
        <CloseIcon/>
        } sx={{ borderRadius: 28,backgroundColor:colors[item], color:"#000000", m:2}}>{item}</Button>)}
      </Box>
       <TextField
       sx={{ borderRadius: 100}}
       className="inputRounded"

    id="standard-name"
    label="Name"
    fullWidth
    value={name}
    onChange = {(e) => setName(e.target.value)}
    onKeyPress={(ev) => {
      console.log(`Pressed keyCode ${ev.key}`);
      if (ev.key === 'Enter') {
        // Do code here
        ev.preventDefault();
        handleName(name)
      }
    }}
    InputProps={{endAdornment:
   <IconButton 
      onClick={() =>{
        handleName(name)

        }
      }
      aria-label="fingerprint" color="secondary">
        <AddIcon />
  </IconButton>}}
  />
    </div>
  );
}
