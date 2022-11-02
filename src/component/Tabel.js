
import {useSelector} from 'react-redux';
import { getRows} from '../store/greet'
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Row from './Row'
export default function TableSelam(props) {
  const {rows} = props
  return (
    <div className="App">
      <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead sx={{backgroundColor:"#4C9090"}}>
          <TableRow>
            <TableCell />
            <TableCell align="left">No</TableCell>
            <TableCell align="left">Bank</TableCell>
            <TableCell align="left">Fee</TableCell>
            <TableCell align="left">NetReciver</TableCell>
            <TableCell align="left">Rate</TableCell>
            <TableCell align="left">Total</TableCell>
            <TableCell align="left">TotalReciver</TableCell>
            <TableCell align="left">Assign</TableCell>
            <TableCell align="left">Urgency</TableCell>
            <TableCell align="left"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(rows).map(([key, value], index)=> <Row sx={{backgroundColor:"#123f34"}} key={key} no={key} id={index} row={value} />)}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}

