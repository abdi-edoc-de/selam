import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { getRow, deleteRow } from "../store/greet";
import { useSelector, useDispatch } from "react-redux";
export default function AlertDialog(props) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const { id } = props;
  const row = useSelector((state) => getRow(state, id));
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  let dollarUSLocale = Intl.NumberFormat("en-US");

  return (
    <div>
      <IconButton aria-label="delete" sx={{color:"#DC143C"}} onClick={handleClickOpen}>
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want delete ? <br />
            <strong style={{ color: "#000000" }}> Bank </strong>: {row["Bank"]}{" "}
            <strong style={{ color: "#e43222" }}>||</strong>{" "}
            <strong style={{ color: "#000000" }}>Account Number</strong>:{" "}
            {row["Bank Account"]}
            <br />
            <strong style={{ color: "#000000" }}>Sender</strong>:{" "}
            {row["Sender"]} <strong style={{ color: "#e43222" }}>||</strong>{" "}
            <strong style={{ color: "#000000" }}>Sender Phone</strong>:{" "}
            {row["Sender Phone"]}
            <br />
            <strong style={{ color: "#000000" }}>Receiver</strong>:{" "}
            {row["Receiver"]} <strong style={{ color: "#e43222" }}>||</strong>{" "}
            <strong style={{ color: "#000000" }}> Receiver Phone</strong>:{" "}
            {row["Receiver Phone"]}
            <br />
            <strong style={{ color: "#000000" }}>Net Amount Receiver</strong>: $
            {dollarUSLocale.format(row["Net Amount Receiver"])} <br />
            <strong style={{ color: "#000000" }}>Total</strong>: $
            {dollarUSLocale.format(row["Total"])}
            <br />
            <strong style={{ color: "#000000" }}>
              {" "}
              Total Pay Receiver
            </strong>: {dollarUSLocale.format(row["Total Pay Receiver"])} BIRR
            <br />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>NO</Button>
          <Button
            onClick={() => {
              dispatch(deleteRow({ id: id }));
              setOpen(false);
            }}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
