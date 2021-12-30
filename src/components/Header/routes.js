import urls from "../../../utils/urls";

const routes = [
  {
    name: "My Map",
    link: urls.pages.app.map,
    auth: true,
    atEnd: false,
  },
  {
    name: "Explore",
    link: urls.pages.app.explore,
    auth: true,
    atEnd: false,
  },
  {
    name: "Friends",
    link: urls.pages.app.friends,
    auth: true,
    atEnd: false
  },
  {
    name: "Login",
    link: urls.pages.login,
    auth: false,
    atEnd: true,
  }, 
    
  
];

export default routes;
