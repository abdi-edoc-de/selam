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
import Edit from "../component/Editable";
import UrgentContr from "./Urgent";
import AlertDialogDelete from "./Delete";
export default function Row(props) {
  const { row, id, no } = props;
  const [open, setOpen] = React.useState(false);
  const colors = useSelector((state) => getColors(state));

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
          <Edit id={no} name="Bank" value={row["Bank"]} />
        </TableCell>
        <TableCell align="left">
          <Edit id={no} name="Receiver" value={row["Receiver"]} />

        </TableCell>
        <TableCell align="left">
          {row["Sender Phone"]}
        </TableCell>
        <TableCell align="left">
          <Edit
            id={no}
            name="Rate Change Receiver"
            type="number"
            value={row["Rate Change Receiver"]}
          />
        </TableCell>
        <TableCell align="left">
          <Edit
            id={no}
            name="Total Pay Receiver"
            type="number"
            value={row["Total Pay Receiver"]}
          />
        </TableCell>
        <TableCell align="left">
          <ControllableStates assign={row.Assign} id={no} />
        </TableCell>
        <TableCell align="left">
          <UrgentContr speed={row.Speed} id={no} />
        </TableCell>
        <TableCell align="left">
          <AlertDialogDelete id={no} row={row} />
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
                      <Edit
                        id={no}
                        name="Bank Account"
                        value={row["Bank Account"]}
                      />
                    </TableCell>
                    <TableCell align="left">
                    {row["Fee"]}
                    </TableCell>
                    <TableCell align="left">
                      <Edit
                        id={no}
                        name="Receiver Phone"
                        value={row["Total"]}
                      />
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
