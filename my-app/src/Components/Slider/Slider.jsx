import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useState } from "react";

function Slider() {
  const [value, setValue] = useState("1"); // Define value state variable
  const handleChange = (event, newValue) => {
    setValue(newValue); // Define handleChange function
  };

  return (
    <>
      <div>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Item One" value="1" />
              <Tab label="Item Two" value="2" />
              <Tab label="Item Three" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">Pending</TabPanel>
          <TabPanel value="2">Approved</TabPanel>
          <TabPanel value="3">Delete</TabPanel>
        </TabContext>
      </div>
    </>
  );
}

export default Slider;
