import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Avatar, Typography, Toolbar, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
// import decode from "jwt-decode";
import useStyles from "./styles.js";
import * as actionType from "../../constants/actionTypes";

const Navbar = () => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const location = useLocation(); add useLocation back to react-router-dom

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    navigate.push("/auth");
    setUser(null);
  };

  // useEffect(() => {
  //   const token = user?.token;

  //   if (token) {
  //     const decodedToken = decode(token);

  //     if (decodedToken.exp * 1000 < new Date().getTime()) logout();
  //   }

  //   setUser(JSON.parse(localStorage.getItem("profile")));
  // }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography
          componant={Link}
          to="/"
          className={classes.heading}
          variant="h2"
          align="center"
        >
          Posts
        </Typography>
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.result.name}
              src={user.result.imageUrl}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.result.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained">
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
