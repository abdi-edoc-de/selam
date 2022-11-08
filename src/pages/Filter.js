import {useSelector } from "react-redux";
import {
  getFileName,
  getFill,
} from "../store/greet";
import * as React from "react";
import TableRow from "../component/Tabel";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";
import Chip from "@mui/material/Chip";
import FilterFields from "../component/FilterFields"
export default function Home() {
  const orders = `Orders(${useSelector((state) => getFileName(state))})`;
  const rows = useSelector((state) => getFill(state));
  return (
      <Container sx={{ mt: 5 , pt:5}} maxWidth="xl">
        <FilterFields/>
        <Divider sx={{ my: 2 }}>
          <Typography variant="h4" gutterBottom>
            <Chip label={orders} />
          </Typography>
        </Divider>
        <TableRow rows={rows} />
      </Container>
  );
}
