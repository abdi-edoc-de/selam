import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { getRows, getAssignOrders } from "../store/greet";
import Table from "../component/Tabel";
import SaveButton from "../component/SaveFile";

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

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

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
  const orders = useSelector((state) => getAssignOrders(state));
  const filter = (rows, ords) => {
    const res = {};
    ords.forEach((element) => {
      if (rows[element]){
      res[element] = rows[element];
        
      }
    });
    return res;
  };
  const buildRows = (ro) => {
    const res = [];
    let total = 0;
    Object.entries(ro).forEach(([_, value]) => {
      res.push({
        "Confirmation No": value["Confirmation No"],
        Date: value["Date"],
        Bank: value["Bank"],
        "Bank Account": value["Bank Account"],
        Fee: value["Fee"],
        "Net Amount Receiver": value["Net Amount Receiver"],
        "Rate Change Receiver": value["Rate Change Receiver"],
        Receiver: value["Receiver"],
        "Receiver Phone": value["Receiver Phone"],
        Total: value["Total"],
        "Total Pay Receiver": value["Total Pay Receiver"],
      });
      total += parseInt(value["Total Pay Receiver"]);
    });
    res.push({
      "Confirmation No": "",
      Date: "",
      Bank: "",
      "Bank Account": "",
      Fee: "",
      "Net Amount Receiver": "",
      "Rate Change Receiver": "",
      Receiver: "",
      "Receiver Phone": "",
      Total: "",
      "Total Pay Receiver": total,
    });
    return res;
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
        {Object.entries(orders).map(([name, _], ind) => (
          <Tab label={name + "          "} {...a11yProps(ind)} />
        ))}
      </Tabs>
      {Object.entries(orders).map(([name, ids], ind) => (
        <TabPanel style={{ width: "100%" }} value={value} index={ind}>
          <div>
            <SaveButton
              apiData={buildRows(filter(rows, ids))}
              fileName={name}
            />
            <Table rows={filter(rows, ids)} />
          </div>
        </TabPanel>
      ))}
    </Box>
  );
}
