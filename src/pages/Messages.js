import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { getNames, getRows, getAssignOrders } from "../store/greet";
import {Editor, EditorState, ContentState} from 'draft-js';
import 'draft-js/dist/Draft.css';
import TE from '../component/TextEditor'
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { DiscFull } from "@mui/icons-material";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function Div() {
 
  
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const rows = useSelector((state) => getRows(state));
  const names = useSelector((state) => getNames(state));
  const orders = useSelector((state) => getAssignOrders(state));
  const filter = (rows, ords) => {
    var st = ''
    let dollarUSLocale = Intl.NumberFormat('en-US');
    let sum = 0
    let res = []
    console.log(ords, "here")

    ords.forEach((element, ind) => {
      if (!rows[element]){
        console.log("undefined here man" , element)
      }
      if (ind===0){
        st += `${rows[element]["Date"]}\n`
      }
     if (ind%10 === 0 && !ind===0){
        res.push(st)
        st = ''
     }
      st += `${ind+1}:- ${rows[element]['Receiver']} \n`
      if (rows[element]['Receiver Phone'].length >= 10){
        st += `${rows[element]['Receiver Phone']} \n`
      }
    st += `${rows[element]['Bank']} \n${rows[element]['Bank Account']} \n${ dollarUSLocale.format(rows[element]['Total Pay Receiver'])} BIRR \n`
      st += "\n------------End------------\n"
      sum += parseInt(rows[element]['Total Pay Receiver'])
      
    });
    st += ""
    st += `sum = ${dollarUSLocale.format(sum)}\n-----End-----\n`
    st += ""
    res.push(st)
    return res
  }; 
  
  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: "90vh",
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        {Object.entries(orders).map(([name, val], ind) => {
          return (<Tab label={name } {...a11yProps(ind)} />)}
        )}
      </Tabs>
      {Object.entries(orders).map(([name, ids], ind) =>{
        let items = filter(rows, ids)
        return (
        <TabPanel  value={value} index={ind}>
            
        {items.map((st,i)=><TE txt = {st} />)}
      </TabPanel>
      )})}

    </Box>
  );
}
