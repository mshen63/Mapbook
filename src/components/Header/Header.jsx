import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import NavLink from "../NavLink";
import routes from "./routes";
import styles from "./Header.module.css";
import { logout } from "../../actions/User";
import Router from "next/router";
import urls from "../../../utils/urls";
import { Image, InputGroup, InputLeftElement, Input, chakra, Grid, GridItem, Stack, Flex, Button, Text, Divider, Box } from "@chakra-ui/react";
import router from "next/router";
import { useRouter } from "next/router";



const Header = ({ loggedIn, currentRoute, currUser }) => {

  const handleLogout = () =>
    logout()
      .then(() => Router.replace(urls.pages.login))
      .catch((e) => window.alert(e));

  const handleGoToProfile = () => Router.replace(urls.pages.app.profile.get(currUser.id))


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
      {loggedIn && (<Flex align="center" direction="row" marginRight={8}>
        <Button bg="green.800" _hover={{ background: "green.500" }} onClick={handleGoToProfile}>
          <Image margin={1} src={currUser.profileImg} boxSize="20px" borderRadius="full" />
          <Text marginRight={3} color="white" >{currUser.username} </Text>
        </Button>
      </Flex>)}



    </div >
  )
}

Header.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  currentRoute: PropTypes.string.isRequired,
};

export default Header;
