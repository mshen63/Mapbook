import React, { Component } from "react";
import PropTypes from "prop-types";
import App from "next/app";
import Head from "next/head";
import Router from "next/router";
import { getCurrentUser } from "../actions/User";
import urls from "../../utils/urls";
import Header from "../components/Header";
import "focus-visible/dist/focus-visible.min.js";
import "normalize.css";
import "../../public/static/styles/App.css";
import { ChakraProvider } from "@chakra-ui/react";

const MyApp = ({ Component, pageProps, router, currUser }) => (
  <>
    <Head>
      <title>Next.js-Starter</title>
    </Head>
    <ChakraProvider>
    <div className="App">
      <Header loggedIn={currUser != null} currentRoute={router.asPath} />
      <div className="Content">
        <Component {...pageProps} currUser={currUser} />
      </div>
    </div>
    </ChakraProvider>
  </>
);

MyApp.getInitialProps = async (appContext) => {

  // TODO: THIS AUTH SYSTEM IS NOT BEST PRACTICE:
  // https://github.com/vvo/iron-session
  
  const {Component, router, ctx} = appContext;
  const { req, res } = ctx;
  // const appProps = await App.getInitialProps(appContext);


  const cookies = req ? req.headers.cookie : null;

  const route = ctx.asPath;
  let currUser = null;
  let pageProps = {};
  try {
    currUser = await getCurrentUser(cookies);

    if (route.startsWith("/app") && currUser==null) {
      if (res) {
        res.writeHead(301, { Location: urls.pages.index });
        res.end();
      } else {
        return Router.replace(urls.pages.index);
      }
    }
    
  } catch {
    console.error("Error in _app.js")
  }
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps({
      ...ctx, 
      currUser,
    })
  }

  return {
    pageProps,
    currUser,
  };
};

MyApp.propTypes = {
  Component: PropTypes.any.isRequired,
  pageProps: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  currUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }),
};

MyApp.defaultProps = {
  currUser: null,
};

export default MyApp;
