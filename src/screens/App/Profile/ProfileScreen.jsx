import React from "react";
import PropTypes from "prop-types";
import Router from "next/router";
import { logout } from "../../../actions/User";
import urls from "../../../../utils/urls";
import classes from "./ProfileScreen.module.css";


const ProfileScreen = ({ currUser }) => {

  return(
  <div className={classes.root}>
    <h1 className={classes.centerText}>
      {currUser.username}
    </h1>
  </div>
)};

ProfileScreen.propTypes = {
  currUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProfileScreen;
