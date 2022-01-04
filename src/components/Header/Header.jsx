import { Flex, Image, Text } from "@chakra-ui/react";
import clsx from "clsx";
import Router from "next/router";
import PropTypes from "prop-types";
import React from "react";
import urls from "../../../utils/urls";
import { logout } from "../../actions/User";
import NavLink from "../NavLink";
import styles from "./Header.module.css";
import routes from "./routes";

const Header = ({ loggedIn, currentRoute, currUser }) => {

  const handleLogout = () => {
    console.log("logout")
    return (logout()
      .then(() => Router.replace(urls.pages.login))
      .catch((e) => window.alert(e))
    )
  };

  const handleGoToProfile = () => Router.replace(urls.pages.app.profile.get(currUser.id))


  return (
    <div className={styles.root}>
      {routes
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
      {loggedIn && (<Flex align="center" direction="row" marginRight={8}>
        <button onClick={handleGoToProfile} className={clsx(styles.endRoute)}>
          <Image margin={1} src={currUser.profileImg} boxSize="20px" borderRadius="full" />
          <Text marginLeft={1} color="white" >{currUser.username} </Text>
        </button>
      </Flex>)}
    </div >
  )
}

Header.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  currentRoute: PropTypes.string.isRequired,
};

export default Header;
