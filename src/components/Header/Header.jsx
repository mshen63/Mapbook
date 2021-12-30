import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import NavLink from "../NavLink";
import routes from "./routes";
import styles from "./Header.module.css";
import { logout } from "../../actions/User";
import Router from "next/router";
import urls from "../../../utils/urls";

const Header = ({ loggedIn, currentRoute, currUser }) => {

  const handleLogout = () =>
    logout()
      .then(() => Router.replace(urls.pages.login))
      .catch((e) => window.alert(e));


  return (
    <div className={styles.root}>
      {routes
        // show the routes which don't require auth
        // and the ones that require auth and being logged in
        .filter((route) => (loggedIn && route.auth) || (!loggedIn && !route.auth))
        .map(({ name, link, atEnd }) => (
          <NavLink
            href={link}
            className={clsx(
              atEnd ? styles.endRoute : styles.route,
              currentRoute === link && styles.selected
            )}
            key={name}
          >
            {name}
          </NavLink>
        )

        )}
      {loggedIn &&
        (<button
          className={clsx(styles.endRoute)}
          key="Logout"
          onClick={handleLogout}
        >
          Logout
        </button>)
      } 
      <p>{currUser.username}</p>


    </div >
  )
}

Header.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  currentRoute: PropTypes.string.isRequired,
};

export default Header;
