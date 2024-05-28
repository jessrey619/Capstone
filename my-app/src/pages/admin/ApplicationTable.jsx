import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Snackbar,
  } from "@mui/material";
  import PageviewIcon from "@mui/icons-material/Pageview";
  import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';
  import DoDisturbAltRoundedIcon from '@mui/icons-material/DoDisturbAltRounded';
  import { useEffect, useState } from "react";
  import ViewApplicantModal from "../Admin/ViewApplicantModal";
  import DeleteApplicantModal from "../Admin/DeleteApplicantModal";
  import axios from "axios";
  import '../../components/Main/main.css'
  import '../../components/Table/table.css'
  
  function ApplicationTable({ applicants, currentTab }) {
    const [filteredApplicants, setFilteredApplicants] = useState([]);
    const [userFilter, setUserFilter] = useState("");
    const [dateFilter, setDateFilter] = useState("");
    const [userOptions, setUserOptions] = useState([]);
  
    const [openViewApplicantModal, setOpenViewApplicantModal] = useState(false);
    const [openDeleteApplicantModal, setOpenDeleteApplicantModal] =
      useState(false);
    const [selectedApplicant, setSelectedApplicant] = useState({});
  
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
  
    useEffect(() => {
      setFilteredApplicants(
        applicants.filter((x) => x.studentName === userFilter)
      );
    }, [userFilter, applicants]);
  
    useEffect(() => {
      setFilteredApplicants(
        applicants.filter((x) => new Date(x.datesubmitted) <= new Date(dateFilter))
      );
    }, [dateFilter, applicants]);
  
    useEffect(() => {
      setUserOptions([...new Set(applicants.map((x) => x.studentName))]);
      setFilteredApplicants(applicants);
    }, [applicants]);
  
    const approveApplicant = async (email) => {
      try {
        const res = await axios.put(
          `http://localhost:8080/applicants/approveApplicant/${email}`
        );
  
        setSnackbarMessage("Successfully Approved Application");
        setSnackbarOpen(true);
  
        setFilteredApplicants(filteredApplicants.filter((x) => x.email !== email));
  
        console.log("res", res);
      } catch (error) {
        console.log("error", error);
      }
    };
  
    const deniedApplicant = async (email, message) => {
      try {
        await axios.post(
          `http://localhost:8080/applicants/rejectApplicant`,
          {
            email,
            message,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            }
          }
        );
        setSnackbarMessage("Successfully Denied Application");
        setSnackbarOpen(true);
        setFilteredApplicants(filteredApplicants.filter((x) => x.email !== email));
      } catch (error) {
        console.log("error", error);
      }
    };
  
    const renderTableRows = () => {
      return filteredApplicants.map((row, index) => (
        <tr key={row.applicantid}>
          <th scope="row">{index + 1}</th>
          <td>{row.studentName}</td>
          <td>{row.isStaff ? "Faculty" : "Student"}</td>
          <td>{row.applicationType}</td>
          <td>{row.gradeLevel}</td>
          <td>{row.idNumber}</td>
          <td>
            {new Date(row.datesubmitted).toLocaleDateString("en-PH", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </td>
          <td>{row.isFourWheel ? "4" : "2"}</td>
          <td>
            <PageviewIcon
              className="admin-icon"
              style={{ color: "yellow" }}
              fontSize="large"
              onClick={() => {
                setSelectedApplicant(row);
                setOpenViewApplicantModal(true);
              }}
            />
            {currentTab === "pending" && (
              <>
                <CheckBoxRoundedIcon
                  className="admin-icon"
                  style={{ color: "green" }}
                  size={24}
                  onClick={() => approveApplicant(row.email)}
                />
                <DoDisturbAltRoundedIcon
                  className="admin-icon"
                  style={{ color: "red" }}
                  size={24}
                  onClick={() => {
                    setSelectedApplicant(row);
                    setOpenDeleteApplicantModal(true);
                  }}
                />
              </>
            )}
          </td>
        </tr>
      ));
    };
  
    return (
      <>
        {/* Menu */}
        <div className="applist-options">
          {/* Users Filter */}
          <div>
            <FormControl fullWidth size="small">
              <InputLabel id="user-filter-select-label1">Select User</InputLabel>
              <Select
                labelId="user-filter-select-label1"
                id="user-filter-select1"
                label="user-filter"
                sx={{ width: "150px", padding: "0" }}
                defaultValue=""
                MenuProps={{
                  disableScrollLock: true,
                }}
                value={userFilter}
                onChange={(e) => setUserFilter(e.target.value)}
              >
                {userOptions.map((user) => (
                  <MenuItem key={user} value={user}>
                    {user}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
  
          {/* Date Filter */}
          <div className="applist-date">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />
          </div>
        </div>
  
        {/* Table */}
        <div className="table-container">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">User Type</              th>
                <th scope="col">Application Type</th>
                <th scope="col">Grade/Year</th>
                <th scope="col">ID Number</th>
                <th scope="col">Date Submitted</th>
                <th scope="col">Vehicle Type</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>{renderTableRows()}</tbody>
          </table>
        </div>
  
        {/* Modals */}
        <ViewApplicantModal
          isOpen={openViewApplicantModal}
          setIsOpen={setOpenViewApplicantModal}
          applicant={selectedApplicant}
        />
  
        <DeleteApplicantModal
          isOpen={openDeleteApplicantModal}
          setIsOpen={setOpenDeleteApplicantModal}
          applicant={selectedApplicant}
          denieApplicant={deniedApplicant}
        />
  
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
          message={snackbarMessage}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        />
      </>
    );
  }
  
  export default ApplicationTable;
  