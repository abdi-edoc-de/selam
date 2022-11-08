import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useDispatch } from 'react-redux';
import { addRow } from '../store/greet';
export default function AddOrder() {
  const [expanded, setExpanded] = React.useState(false);
  const dispatch = useDispatch()
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [sender, setSender] = React.useState("")
  const [receiver , setReceiver] = React.useState("")
  const [sPhone, setSPhone] = React.useState()
  const [rPhone, setRPhone] = React.useState()
  const [bank, setBank] = React.useState("")
  const [account , setAccount] = React.useState("")
  const [rate, setRate] = React.useState()
  const [total, setTotal ] = React.useState()
  const [birr, setBirr] = React.useState()
  const [fee, setFee] = React.useState()
  const handleSubmit = (e) => {
    e.preventDefault()
    var d = Date(Date.now());
    console.log("submited hi hi")
    dispatch(addRow({
        row:{
            "Bank": bank,
            "Total Pay Receiver" : birr,
            "Sender" : sender,
            "Sender Phone":sPhone,
            "Bank Account" : account,
            "Assign" : "Hold",
            "Speed" : "Regular",
            "Receiver":receiver,
            "Receiver Phone":rPhone,
            "Fee":fee,
            "Rate Change Receiver" : rate,
            "Total" : total,
            "Date" : d.toString(),
            "Confirmation No":`add new ${sPhone}`
        }
    }))
    setAccount("")
    setBank("")
    setFee("")
    setSPhone("")
    setSender("")
    setBirr("")
    setTotal("")
    setRate("")
    setReceiver("")
    setRPhone("")

  }
  return (
    <div>
        <form onSubmit={handleSubmit}>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          sx={{backgroundColor:"#4C9090"}}
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Add New Order
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
        <div>
        <Grid sx={{mt:4}} container spacing={2}>
          <Grid item xs={3}>
            <TextField
              sx={{ borderRadius: 100, my: 1 }}
              className="inputRounded"
              id="standard-name"
              label="Receiver Pay"
              fullWidth
              required
              name='pay'
              value={birr}
              type="number"
              onChange={(e) => {
                setBirr(parseInt(e.target.value));
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              sx={{ borderRadius: 100, my: 1 }}
              className="inputRounded"
              id="standard-name"
              label="Total"
              fullWidth
              name='total'
              value={total}
              type="number"
              onChange={(e) => {
                setTotal(parseFloat(e.target.value));
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              sx={{ borderRadius: 100, my: 1 }}
              className="inputRounded"
              id="standard-name"
              label="Fee"
              name='fee'
              fullWidth
              value={fee}
              type="number"
              onChange={(e) => {
                setFee(parseFloat(e.target.value));
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              sx={{ borderRadius: 100, my: 1 }}
              className="inputRounded"
              id="standard-name"
              label="Rate"
              fullWidth
              name='rate'
              value={rate}
              type="number"
              onChange={(e) => {
                setRate(parseInt(e.target.value));
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              sx={{ borderRadius: 100, my: 1 }}
              className="inputRounded"
              id="standard-name"
              label="Sender Name"
              required

              fullWidth
              name='sender'
              value={sender}
              type="text"
              onChange={(e) => {
                setSender((e.target.value));
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              sx={{ borderRadius: 100, my: 1 }}
              className="inputRounded"
              id="standard-name"
              label="Sender Phone"
              fullWidth
              required

              value={sPhone}
              name='sPhone'
              type="number"
              onChange={(e) => {
                setSPhone(parseInt(e.target.value));
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              sx={{ borderRadius: 100, my: 1 }}
              className="inputRounded"
              id="standard-name"
              label="Receiver Name"
              required

              fullWidth
              value={receiver}
              type="text"
              name='receiver'
              onChange={(e) => {
                setReceiver((e.target.value));
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              sx={{ borderRadius: 100, my: 1 }}
              className="inputRounded"
              id="standard-name"
              label="Receiver Phone"
              required

              fullWidth
              value={rPhone}
              name="rPhone"
              type="number"
              onChange={(e) => {
                setRPhone(parseInt(e.target.value));
              }}
            />
          </Grid>
          <Grid item xs={6}>
          <TextField
              sx={{ borderRadius: 100, my: 1 }}
              className="inputRounded"
              id="standard-name"
              label="Bank Name"
              fullWidth
              required

              value={bank}
              name="bank"
              type="text"
              onChange={(e) => {
                setBank((e.target.value));
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              sx={{ borderRadius: 100, my: 1 }}
              className="inputRounded"
              id="standard-name"
              label="Bank Account"
              name="accoutn"
              fullWidth
              value={account}
              required

              onChange={(e) => {
                setAccount(e.target.value);
              }}
            />
          </Grid>
        </Grid>

        <Box
          sx={{ my: 4, width: "100%" }}
          display="flex"
          width={500}
          height={80}
          bgcolor="lightgreen"
          alignItems="center"
          justifyContent="center"
          backgroundColor="#ffffff"
        >
          <Button
            size="large"
            startIcon={<AddCircleOutlineIcon />}
            variant="contained"
            component="label"
            // onClick={() => {
            //   handleFilter(ro);
            // }}
          >
            <button hidden type='submit'></button>
            Add
          </Button>
        </Box>
    </div>
        </AccordionDetails>
      </Accordion>
      </form>
        </div>
  );
}

