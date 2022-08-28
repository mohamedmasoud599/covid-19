import React from "react";
import { Switch, withRouter } from "react-router-dom";
import Adminstration from "../components/adminstration";
import Register from "../components/Register";
import RegisteredPeople from "../components/RegisteredPeople/RegisteredPeople";
import AfterAdminstration from "../components/after_adminstration";
import Reports from "../components/Statistics";
import Inquire from "../components/inquire";
import Confirm from "../components/confirm";
import Confirms from "../components/confirm/confirms";
import Login from "../components/login";
import Vaccines from "../components/vaccines";
import { AuthRoute, PrivateRoute } from "./privateAuthRoute";
import Table from "../components/reports/reports";

const AppRouter = (props) => {
  return (
    <Switch>
      <PrivateRoute exact path="/register" component={Register} />
      <PrivateRoute
        exact
        path="/RegisteredPeople"
        component={RegisteredPeople}
      />
      <PrivateRoute
        exact
        path="/adminstration"
        {...props}
        component={Adminstration}
      />
      <PrivateRoute
        exact
        path="/after_adminstration"
        {...props}
        component={AfterAdminstration}
      />
      <PrivateRoute exact path="/reports" component={Reports} />
      <PrivateRoute exact path="/report" component={Table} />
      <PrivateRoute exact path="/inquire" component={Inquire} />
      <PrivateRoute exact path="/confirms" component={Confirms} />
      <PrivateRoute exact path="/after_vaccines" component={Vaccines} />
      <PrivateRoute exact path="/confirm/:id" component={Confirm} />
      <AuthRoute exact path="/" component={Login} />
    </Switch>
  );
};

export default withRouter(AppRouter);
