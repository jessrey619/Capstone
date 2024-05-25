import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useState } from "react";

function Slider({ tabs }) { // Accept 'tabs' prop to define tab labels and values
  const [value, setValue] = useState(tabs[0].value); // Set initial value based on the first tab value
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            {tabs.map(tab => (
              <Tab key={tab.value} label={tab.label} value={tab.value} /> // Render tabs dynamically
            ))}
          </TabList>
        </Box>
        {tabs.map(tab => (
          <TabPanel key={tab.value} value={tab.value}>
            {tab.content}
          </TabPanel>
        ))}
      </TabContext>
    </div>
  );
}

export default Slider;
