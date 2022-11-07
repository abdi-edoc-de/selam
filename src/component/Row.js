import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ControllableStates from "./Dropdown";
import { getColors } from "../store/greet";
import { useSelector } from "react-redux";
import UrgentContr from "./Urgent";
import AlertDialogDelete from "./Delete";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import RowTextField from "./RowTextField";
import { useDispatch } from "react-redux";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import { editFilds } from "../store/greet";

export default function Row(props) {
  const dispatch = useDispatch();
  const { row, id, no } = props;
  const [open, setOpen] = React.useState(false);
  const colors = useSelector((state) => getColors(state));
  const [edit, setEdit] = React.useState(false);
  const [bank, setBank] = React.useState(row["Bank"]);
  const [birr, setBirr] = React.useState(row["Total Pay Receiver"]);
  const [rate, setRate] = React.useState(row["Rate Change Receiver"]);
  const [fee, setFee] = React.useState(row["Fee"]);
  const [total, setTotal] = React.useState(row["Total"]);
  const [name, setName] = React.useState(row["Receiver"]);
  const [account, setAccount] = React.useState(row["Bank Account"]);

  return (
    <React.Fragment>
      <TableRow
        sx={{
          backgroundColor: colors[row.Assign],
          "& > *": { borderBottom: "unset" },
        }}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{1 + parseInt(id)}</TableCell>
        <TableCell>
          <RowTextField value={bank} edit={edit} set={setBank} size={20} />
        </TableCell>
        <TableCell align="left">
          <RowTextField value={name} edit={edit} set={setName} />
        </TableCell>
        <TableCell align="left">{row["Sender Phone"]}</TableCell>
        <TableCell align="left">
          <RowTextField value={rate} edit={edit} set={setRate} size={3} />
        </TableCell>
        <TableCell align="left">
          <RowTextField value={birr} edit={edit} set={setBirr} size={10} />
        </TableCell>
        <TableCell align="left">
          <ControllableStates assign={row.Assign} id={no} />
        </TableCell>
        <TableCell align="left">
          <UrgentContr speed={row.Speed} id={no} />
        </TableCell>
        <TableCell align="left">
          <div style={{ display: "inline-flex" }}>
            <IconButton aria-label="expand row" size="small">
              {edit ? (
                <ClearIcon
                  sx={{ color: "#DC143C" }}
                  onClick={() => {
                    setBank(row["Bank"]);
                    setBirr(row["Total Pay Receiver"]);
                    setRate(row["Rate Change Receiver"]);
                    setFee(row["Fee"]);
                    setTotal(row["Total"]);
                    setAccount(row["Bank Account"]);
                    setName(row["Receiver"]);
                    setEdit(!edit);
                  }}
                />
              ) : (
                <EditIcon
                  sx={{ color: "#2E8BC0" }}
                  onClick={() => setEdit(!edit)}
                />
              )}
            </IconButton>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => {
                dispatch(
                  editFilds({
                    id: id,
                    updates: [
                      {
                        Total: total,
                        Receiver: name,
                        "Bank Account": account,
                        Bank: bank,
                        "Total Pay Receiver": birr,
                        "Rate Change Receiver": rate,
                        Fee: fee,
                      },
                    ],
                  })
                );
                setEdit(false);
              }}
            >
              <BeenhereIcon sx={{ color: "#00FF00" }} />
            </IconButton>
            <AlertDialogDelete id={no} row={row} />
          </div>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Other Information
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Date</TableCell>
                    <TableCell align="left">Bank Account</TableCell>
                    <TableCell align="left">Fee</TableCell>
                    <TableCell align="left">Total</TableCell>
                    <TableCell align="left">Sender</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      {row["Date"]}
                    </TableCell>
                    <TableCell align="left">
                      <RowTextField
                        value={account}
                        edit={edit}
                        set={setAccount}
                      />
                    </TableCell>
                    <TableCell align="left">
                      <RowTextField value={fee} edit={edit} set={setFee} />
                    </TableCell>
                    <TableCell align="left">
                      <RowTextField value={total} edit={edit} set={setTotal} />
                    </TableCell>
                    <TableCell align="left">{row["Sender"]}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
