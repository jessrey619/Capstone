import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
// import { useState } from "react";
import PropTypes from 'prop-types';

function Slider({ tabs, value, onChange }) {
  return (
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList onChange={onChange} aria-label="lab API tabs example">
          {tabs.map(tab => (
            <Tab key={tab.value} label={tab.label} value={tab.value} />
          ))}
        </TabList>
      </Box>
      {tabs.map(tab => (
        <TabPanel key={tab.value} value={tab.value}>
          {tab.content}
        </TabPanel>
      ))}
    </TabContext>
  );
}

Slider.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      content: PropTypes.node,
    })
  ).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Slider;
