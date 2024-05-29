import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../components/Main/main.css';
import CardsContainer from '../../components/Card/CardsContainer'; 
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import RolesTab from "./RolesTab";
import PermissionsTab from "./PermissionsTab";

function UserManagement() {
  const [tabValue, setTabValue] = useState("1");
  const [totalUserCount, setTotalUserCount] = useState(0);
  const [totalEmployee, setTotalEmployee] = useState(0);
  const [totalAdmin, setTotalAdmin] = useState(0);
  const [OverallTotalUser, setOverallTotalUser] = useState();
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    
    axios.get('http://localhost:8080/jwt/total-user-count')
      .then(response => {
        setTotalUserCount(response.data);
        console.log("User Management", totalUserCount)
      })
      .catch(error => {
        console.error('Error fetching user counts:', error);
      });
      axios.get('http://localhost:8080/jwt/total-admin-count')
      .then(response => {
        setTotalAdmin(response.data);
      })
      .catch(error => {
        console.error('Error fetching user counts:', error);
      });
      axios.get('http://localhost:8080/jwt/total-employee-count')
      .then(response => {
        setTotalEmployee(response.data);
      })
      .catch(error => {
        console.error('Error fetching user counts:', error);
      });
  }, []);

  useEffect(() => {
    setOverallTotalUser(totalUserCount+totalEmployee+totalAdmin)
  }, [totalUserCount, totalEmployee,totalAdmin]);

  const cardsData = [
    { title: 'Total Users', count:totalUserCount, iconClass: 'bi-people' },
    { title: 'Total Employee', count:totalEmployee, iconClass: 'bi-person' },
    { title: 'Total Admin', count:totalAdmin, iconClass: 'bi-person' },
    { title: 'Total People', count:OverallTotalUser, iconClass: 'bi-person' },
  ];

  const handleCardClick = (title) => {
    setSelectedCard(title);
  };

  return (
    <div>
      <div>
        <CardsContainer cards={cardsData} onCardClick={handleCardClick} />
      </div>
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            aria-label="Tabs example"
            onChange={(e, newValue) => setTabValue(newValue)}
          >
            <Tab label="Roles" value="1" />
            <Tab label="Permissions" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <RolesTab selectedCard={selectedCard} />
        </TabPanel>
        <TabPanel value="2">
          <PermissionsTab />
        </TabPanel>
      </TabContext>
    </div>
  );
}

export default UserManagement;
