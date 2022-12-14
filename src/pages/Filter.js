import { useDispatch, useSelector } from "react-redux";
import {
  setRows,
  getRows,
  getFileName,
  getBanks,
  getFill,
  filter,
} from "../store/greet";
import * as XLSX from "xlsx";
import * as React from "react";
import NameSelelction from "../component/Name";
import TableRow from "../component/Tabel";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FilterListIcon from "@mui/icons-material/FilterList";
export default function Home() {
  const [bank, setbank] = React.useState(0);
  const [min, setMin] = React.useState(0);
  const orders = `Orders(${useSelector((state) => getFileName(state))})`;
  const ro = useSelector((state) => getRows(state));

  const rows = useSelector((state) => getFill(state));
  const [max, setMax] = React.useState();
  const banks = ["None", ...useSelector((state) => getBanks(state))];
  React.useEffect(() => {
    handleFilter();
  }, [ro]);
  const dispatch = useDispatch();
  const handleFilter = () => {
    dispatch(filter({ min: min, max: max, bank: bank, banks: banks }));
  };
  return (
    <div>
      <Container sx={{ mt: 4 }} maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              sx={{ borderRadius: 100, my: 1 }}
              className="inputRounded"
              id="standard-name"
              label="Min"
              fullWidth
              value={min}
              type="number"
              onChange={(e) => {
                setMin(parseInt(e.target.value));
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              sx={{ borderRadius: 100, my: 1 }}
              className="inputRounded"
              id="standard-name"
              label="Max"
              fullWidth
              value={max}
              type="number"
              onChange={(e) => {
                setMax(parseInt(e.target.value));
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Bank</InputLabel>
              <Select
                sx={{ borderRadius: 100, my: 1 }}
                className="inputRounded"
                id="standard-name"
                label="Max"
                fullWidth
                value={bank}
                onChange={(e) => {
                  setbank(parseInt(e.target.value));
                }}
              >
                {banks.map((bank, ind) => (
                  <MenuItem key={ind} value={ind}>
                    {bank}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
            startIcon={<FilterListIcon />}
            variant="contained"
            component="label"
            onClick={() => {
              handleFilter();
            }}
          >
            {" "}
            Filter
          </Button>
        </Box>
        <Divider sx={{ my: 2 }}>
          <Typography variant="h4" gutterBottom>
            <Chip label={orders} />
          </Typography>
        </Divider>
        <TableRow rows={rows} />
      </Container>
    </div>
  );
}
