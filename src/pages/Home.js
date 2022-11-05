import { useDispatch, useSelector } from "react-redux";
import {
  setRows,
  getRows,
  getFileName,
  setFileName,
  setBanks,
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
export default function Home() {
  const orders = `Orders(${useSelector((state) => getFileName(state))})`;
  const rows = useSelector((state) => getRows(state));
  const dispatch = useDispatch();
  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: "buffer" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        resolve(data);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
    promise.then((d) => {
      d.sort((a, b) => (a['Total Pay Receiver']>b['Total Pay Receiver']?-1:1))
      const rows = {};
      const banks = [];
      d.forEach((item, ind) => {
        item["Assign"] = "Hold";
        item['Speed'] = "Regular"
        console.log(ind)
        rows[ind] = item;
        if (!banks.includes(item.Bank)) {
          banks.push(item.Bank);
        }
      });
      console.log(rows);
      dispatch(setBanks({ banks: banks }));
      dispatch(setRows({ rows: rows }));
    });
  };
  return (
    <div>
      <Container sx={{ mt: 4 }} maxWidth="xl">
        <NameSelelction assign />
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
            startIcon={<PostAddIcon />}
            variant="contained"
            component="label"
          >
            Upload File
            <input
              type="file"
              onChange={(e) => {
                const file = e.target.files[0];
                readExcel(file);
                dispatch(setFileName({ fileName: file.name }));
              }}
              hidden
            />
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
