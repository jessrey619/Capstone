import React from "react";
import '../CSS/LogsEmployee.css';
import { theme } from "./responsive/style";
import { ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import TheHeader from "../components/Header";

function LogsEmployee() {

  const Responsive = styled("div")(({ theme }) => ({
    [theme.breakpoints.up("mobile")]:{

    },
    [theme.breakpoints.up("tablet")]:{

    },
    [theme.breakpoints.up("desktop")]:{

    },
  }));

    return (
        <ThemeProvider theme={theme}>
              {/* <img src="/employee_bg.png" alt="background" className="background-image" /> */}
            <TheHeader/>
            <div>
            </div>
        </ThemeProvider>
    );
}

export default LogsEmployee;
