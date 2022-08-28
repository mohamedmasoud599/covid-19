import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import SideBar from "./components/layout/SideBar";
import Navbar from "./components/layout/navbar";
import { ToastContainer } from "react-toastify";
import { createTheme, ThemeProvider } from "@mui/material";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { BrowserRouter, withRouter } from "react-router-dom";
import Browser from "./Router";
import Box from "@mui/material/Box";
import "./App.scss";
import jwt_decode from "jwt-decode";
import { load } from "./lib/local-storage";
import RoleContext from "./store/store";

// Create rtl cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin],
});

function RTL(props) {
  return <CacheProvider value={cacheRtl}>{props.children}</CacheProvider>;
}

function App(props) {
  const theme = createTheme({
    palette: {
      type: "light",
      primary: {
        main: "#3A6351",
      },
      secondary: {
        main: "#F2EDD7",
      },
      background: {
        default: "#F2EDD7",
      },
    },
    typography: {
      fontSize: 30,
      fontFamily: "Arial",
      fontWeightLight: 1000,
      fontWeightBold: 1000,
      fontWeightMedium: 1000,
      htmlFontSize: 20,
      fontWeightRegular: 1000,
    },
  });

  const [currentRole, setCurrentRole] = useState(null);

  useEffect(() => {
    load("token")
      ? setCurrentRole(jwt_decode(load("token")).role)
      : setCurrentRole(null);
  }, []);

  const handleCurrentRole = (role) => {
    setCurrentRole(role);
  };

  return (
    <RoleContext.Provider value={{ currentRole, handleCurrentRole }}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <RTL>
            {currentRole ? <Navbar logout={handleCurrentRole} /> : null}
            <Box sx={{ display: "flex" }}>
              <CssBaseline />
              {currentRole ? <SideBar theme={theme} {...props} /> : null}
              <Box
                component="main"
                sx={{ flexGrow: 1, p: 3 }}
                style={{ position: "relative" }}
              >
                <Browser {...props} role={currentRole} />
              </Box>
            </Box>
          </RTL>
          <ToastContainer />
        </ThemeProvider>
      </BrowserRouter>
    </RoleContext.Provider>
  );
}

export default withRouter(App);
