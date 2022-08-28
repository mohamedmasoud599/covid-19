import React, { useState, useContext } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import jwt_decode from "jwt-decode";
import { storeMany } from "../../lib/local-storage";
import Logo from "../../assets/images/logo.png";
import {
  FormControl,
  Input,
  FormGroup,
  Typography,
  makeStyles,
  Button,
} from "@material-ui/core";
import { play } from "../../lib/player";
import { LoginForm } from "../common/actions";
import ToastHandling from "../common/toastify";
import RoleContext from "../../store/store";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "95%",
    boxShadow:
      "rgb(0 0 0 / 16%) 8px 28px 44px 8px, rgb(0 0 0 / 24%) 2px 42px 17px 10px",
    position: "relative",
    fontFamily: "Arial",
  },
  paper: {
    borderRadius: "0",
    padding: "100px 30px",
    height: "100vh",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  formControl: {
    marginTop: "20px",
  },
  input: {
    fontSize: "20px",
  },
  button: {
    marginTop: "20px !important",
    fontSize: "20px",
  },
}));

const Login = (props) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  // const history = useHistory();

  const { currentRole, handleCurrentRole } = useContext(RoleContext);
  const auth = () => {
    play();

    const data = {
      name: username,
      password: password,
    };

    LoginForm(data).then((res) => {
      if (res) {
        let newData = res.data;
        if (newData.status) {
          var decoded = jwt_decode(newData.data);
          storeMany([
            {
              key: "token",
              value: newData.data,
            },
          ]);
          handleCurrentRole(decoded.role);
          decoded.role === "Admin"
            ? props.history.push("register")
            : decoded.role === "Register"
            ? props.history.push("register")
            : decoded.role === "Confirm"
            ? props.history.push("after_adminstration")
            : props.history.push("inquire");
        } else {
          ToastHandling("error", newData.message);
        }
      }
    });
  };

  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <Grid item xs={6}>
        <Paper className={classes.paper}>
          <Typography variant="h3" component="h4" gutterBottom>
            منظومة تلقي اللقاحات
          </Typography>
          <FormGroup style={{ marginTop: "50px" }}>
            <Typography variant="subtitle1" gutterBottom>
              تسجيل الدخول
            </Typography>
            <FormControl className={classes.formControl}>
              <Input
                name="username"
                id="username"
                className={classes.input}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                // onInput={(e) => setTripleNumOne(e.target.value)}
                placeholder="اسم المستخدم"
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <Input
                name="password"
                type="password"
                id="password"
                className={classes.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                // onInput={(e) => setTripleNumOne(e.target.value)}
                placeholder="كلمة السر"
              />
            </FormControl>
            <div className={classes.button}>
              <Button
                onClick={auth}
                style={{
                  minWidth: "200px",
                  minHeight: "50px",
                  borderRadius: "20px",
                  padding: 0,
                  transition: "all .3s ease-in",
                  fontSize: "20px",
                  fontWeight: 600,
                  background: "#3a6351",
                  margin: "30px 0",
                  color: "#fff",
                  position: "relative",
                }}
              >
                تسجيل
              </Button>
            </div>
          </FormGroup>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper
          className={classes.paper}
          style={{
            backgroundColor: "#3a6351",
            color: "#fff",
            alignItems: "center",
          }}
        >
          <img src={Logo} alt="" style={{ width: "170px" }} />
          <Typography
            variant="h2"
            component="h4"
            gutterBottom
            style={{ color: "#fff" }}
          >
            منطقة تجنيد
            <br /> وتعبئة الزقازيق
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Login;
