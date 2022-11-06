import React from "react";
import { TextField } from "@mui/material";
export default function RowTextField(props) {
const {edit, value, set, size} = props
  return (
    <TextField
    // id="formatted-numberformat-input"

    // fullWidth
    sx={{m:0, p:0}}
    disabled={!edit}
    // id="outlined-disabled"
    id="standard-basic"
    defaultValue="Hello World"
    value={value}
    variant="standard"
    onChange={(e)=>{
      set(e.target.value)
    }}
    inputProps={{
        size: size,
        style: {fontSize: 15}
    }}
    
  />
      );
}
