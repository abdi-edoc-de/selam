import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { getRows, getAssignOrders } from "../store/greet";
import "draft-js/dist/Draft.css";
import TE from "../component/TextEditor";

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
  const orders = useSelector((state) => getAssignOrders(state));
  const filter = (rows, ords) => {
    var st = "";
    let dollarUSLocale = Intl.NumberFormat("en-US");
    let sum = 0;
    let res = [];
    let nums = 0;
    ords.forEach((element, ind) => {
      if (rows[element]) {
        if (nums === 0) {
          st += `Date: ${rows[element]["Date"]}\n\n`;
        }
        if (nums % 6 === 0 && nums !== 0) {
          res.push(st);
          st = "";
        }
        if (rows[element]["Speed"] !== "Regular") {
          st += `${rows[element]["Speed"]} \n`;
        }
        st += `${nums + 1}:- ${rows[element]["Sender Phone"]} \n${rows[element]["Receiver"]} \n`;
        if (rows[element]["Receiver Phone"].length >= 10) {
          st += `${rows[element]["Receiver Phone"]} \n`;
        }
        st += `${rows[element]["Bank"]} \n${
          rows[element]["Bank Account"]
        } \n${dollarUSLocale.format(
          rows[element]["Total Pay Receiver"]
        )} BIRR \n`;
        st += "\n------------End------------\n";
        sum += parseInt(rows[element]["Total Pay Receiver"]);
        nums = nums + 1;
      }
    });
    st += "";
    st += `sum = ${dollarUSLocale.format(sum)}\n-----End-----\n`;
    st += "";
    res.push(st);
    console.log(res);
    return res;
  };

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" , pt:5, mt:5 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {Object.entries(orders).map(([name, val], ind) => {
            return <Tab label={name} {...a11yProps(ind)} />;
          })}
        </Tabs>
      </Box>
      {Object.entries(orders).map(([name, ids], ind) => {
        let items = filter(rows, ids);
        return (
          <TabPanel value={value} index={ind}>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                p: 1,
                m: 1,
                bgcolor: "background.paper",
                maxWidth: "100%",
                borderRadius: 1,
              }}
            >
              {items.map((st, i) => (
                <TE  txt={st} key={i} />
              ))}
            </Box>
          </TabPanel>
        );
      })}
    </>
  );
}
