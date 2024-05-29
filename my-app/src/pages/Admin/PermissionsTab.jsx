import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Swal from 'sweetalert2';
import {
  Button,
  Checkbox,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

function PermissionsTab() {
  // State variables to store user data and selected user
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});

  // State variables for permissions
  const [approver, setApprover] = useState(false);
  const [verifier, setVerifier] = useState(false);
  const [viewLogger, setViewLogger] = useState(false);

  // Function to update employee permissions
  const updateEmployee = async () => {
    try {
      // Update approver permission
      await axios.post(
        "http://localhost:8080/jwt/updateapprover",
        {
          username: selectedUser.username,
          action: approver,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // Update verifier permission
      await axios.post(
        "http://localhost:8080/jwt/updateverifier",
        {
          username: selectedUser.username,
          action: verifier,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // Update view logger permission
      await axios.post(
        "http://localhost:8080/jwt/updatelogger",
        {
          username: selectedUser.username,
          action: viewLogger,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // Show success message
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Successfully Updated Employee'
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  // Fetch all employees when component mounts
  useEffect(() => {
    const getAllEmployees = async () => {
      try {
        const res = await axios.get("http://localhost:8080/jwt/getallemployee");
        setUsers(res.data);
        if (res.data?.length) {
          setSelectedUser(res.data[0]);
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    getAllEmployees();
  }, []);

  // Update permission states when selected user changes
  useEffect(() => {
    setVerifier(!!selectedUser.isVerifier);
    setApprover(!!selectedUser.isApprover);
    setViewLogger(!!selectedUser.isViewLogger);
  }, [selectedUser]);

  // Function to get full name of a user
  const getFullName = (user) => {
    return `${user.fname} ${user.mname} ${user.lname}`;
  };

  // Render the component
  return (
    <div className="userm-tab-container">
      <div className="userm-search">
        <FormControl>
          {/* Select user dropdown */}
          <InputLabel id="user-filter-select-label1">Select User</InputLabel>
          <Select
            labelId="user-filter-select-label1"
            id="user-filter-select1"
            label="user-filter"
            sx={{ width: "300px", padding: "0" }}
            defaultValue=""
            MenuProps={{
              disableScrollLock: true,
            }}
            value={selectedUser.username ?? ""}
            onChange={(e) => {
              const selectedName = e.target.value;
              const selected = users.find((x) => x.username === selectedName);
              setSelectedUser(selected);
            }}
          >
            {/* Render user options */}
            {users.map((user) => (
              <MenuItem key={user.username} value={user.username}>
                {getFullName(user)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {/* Display selected user and permission checkboxes */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', alignItems: 'center', gridGap: '2em' }}>
        <div style={{ gridColumn: '1', fontSize: '1.5rem' }}>{getFullName(selectedUser)}</div>
        <div style={{ gridColumn: '2 / span 2', justifySelf: 'start', marginTop: '20px' }}>
          <FormGroup>
            <FormLabel id="demo-radio-buttons-group-label">
              Permissions
            </FormLabel>
            {/* Checkbox for verifier permission */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={verifier}
                  onChange={(e) => setVerifier(!verifier)}
                />
              }
              label="verifier"
            />
            {/* Checkbox for approver permission */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={approver}
                  onChange={(e) => setApprover(!approver)}
                />
              }
              label="approver"
            />
            {/* Checkbox for view logger permission */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={viewLogger}
                  onChange={(e) => setViewLogger(!viewLogger)}
                />
              }
              label="view logger"
            />
          </FormGroup>
        </div>
      </div>

      {/* Button to update permissions */}
      <Button
        variant="contained"
        sx={{ marginTop: "2em" }}
        onClick={updateEmployee}
      >
        Update
      </Button>
    </div>
  );
}

export default PermissionsTab;
