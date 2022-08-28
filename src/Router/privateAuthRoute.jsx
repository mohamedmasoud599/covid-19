import React from "react";
import { Route, Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { load } from "../lib/local-storage";

const AuthRoute = ({ component: Component, ...res }) => {
  return (
    <Route
      {...res}
      strict
      sensitive
      render={(props) => {
        if (load("token")) {
          let tokenDecode = jwt_decode(load("token"));
          switch (tokenDecode.role) {
            case "Admin":
              return (
                <Redirect
                  to={{
                    pathname: "/register",
                    state: {
                      from: props.location,
                    },
                  }}
                />
              );
            case "Register":
              return (
                <Redirect
                  to={{
                    pathname: "/register",
                    state: {
                      from: props.location,
                    },
                  }}
                />
              );
            case "Confirm":
              return (
                <Redirect
                  to={{
                    pathname: "/after_adminstration",
                    state: {
                      from: props.location,
                    },
                  }}
                />
              );
            case "Inquire":
              return (
                <Redirect
                  to={{
                    pathname: "/inquire",
                    state: {
                      from: props.location,
                    },
                  }}
                />
              );
            default:
              return false;
          }
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
};

const PrivateRoute = ({ component: Component, ...res }) => {
  const pathname = res.path;

  const RouteComponent = (props) => {
    return props.urls.includes(pathname) ? (
      <Component {...props} />
    ) : (
      <Redirect
        to={{
          pathname: "/",
          state: {
            from: props.location,
          },
        }}
      />
    );
  };

  return (
    <Route
      {...res}
      strict
      sensitive
      render={(props) => {
        if (load("token")) {
          let tokenDecode = jwt_decode(load("token"));
          switch (tokenDecode.role) {
            case "Admin":
              return (
                <RouteComponent
                  {...props}
                  urls={[
                    "/register",
                    "/RegisteredPeople",
                    "/adminstration",
                    "/after_adminstration",
                    "/reports",
                    "/inquire",
                    "/confirms",
                    "/confirm/:id",
                    "/after_vaccines",
                    "/report",
                  ]}
                />
              );
            case "Register":
              return (
                <RouteComponent
                  {...props}
                  urls={[
                    "/register",
                    "/RegisteredPeople",
                    "/adminstration",
                    "/after_vaccines",
                  ]}
                />
              );
            case "Inquire":
              return <RouteComponent {...props} urls={["/inquire"]} />;
            default:
              return (
                <Redirect
                  to={{
                    pathname: "/",
                    state: {
                      from: props.location,
                    },
                  }}
                />
              );
          }
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

export { AuthRoute, PrivateRoute };
