import React from "react";
import { withRouter } from "react-router-dom";
import { clearItems } from "../../lib/local-storage";
import { Button } from "antd";

const Navbar = (props) => {
  // let history = useHistory();

  const logOut = () => {
    clearItems(["token", "role"]);
    props.logout(null);
    props.history.push("/");
  };

  return (
    <div
      className="navbar-nav navbar-nav-right no-print"
      style={{ height: "80px", background: "#3a6351",textAlign:"end" }}
    >
      <Button onClick={logOut} className="btn" style={{ margin:"15px" }}>
        تسجيل خروج
      </Button>
    </div>
  );
};

export default withRouter(Navbar);
