import React, { useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "./listItem";
import Typography from "@mui/material/Typography";
import logo from "../../assets/images/logo.png";
import { withRouter } from "react-router-dom";
import { Button } from "antd";
import Models from "./modals";
import { RegisterRole, AdminRole } from "./roles";
import jwt_decode from "jwt-decode";
import { load } from "../../lib/local-storage";

const drawerWidth = 300;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const tokenDecode = load("token")
    ? jwt_decode(load("token"))
    : { role: null };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div
      style={{
        backgroundColor: props.theme.palette.primary.main,
        height: "100%",
        color: "#FFFFFF",
      }}
    >
      <header
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <img src={logo} alt="" style={{ width: "140px" }} />
        <Typography
          style={{
            fontSize: "24px",
            width: "65%",
            textAlign: "center",
            fontWeight: 600,
            fontFamily: "Arial",
          }}
        >
          منطقه تجنيد وتعبئة الزقازيق
        </Typography>
      </header>

      <Divider style={{ border: "2px solid #E48257" }} />
      <List>
        {tokenDecode.role === "Admin"
          ? AdminRole().map((data, key) => (
              <ListItem {...data} key={key} {...props} />
            ))
          : RegisterRole().map((data, key) => (
              <ListItem {...data} key={key} {...props} />
            ))}
        {tokenDecode.role === "Register" ? (
          <Button
            onClick={() => setOpen(true)}
            style={{
              textDecoration: "none",
              textAlign: "center",
              width: "100%",
              backgroundColor: "#fff",
              color: "#47636e",
              fontSize: "25px",
              height: "70px",
              fontWeight: 600,
              marginTop: "60px",
            }}
          >
            رفع ملف
          </Button>
        ) : null}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Box
        component="nav"
        className="no-print"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Models
        visible={open}
        onCancel={() => setOpen(false)}
        title="اضافة ملف"
      />
    </>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default withRouter(ResponsiveDrawer);
