import { getCurrentUser } from "../actions/User";
import RegisterScreen from "../screens/Register";
import Router from "next/router";
import urls from "../../utils/urls";

const RegisterPage = () => <RegisterScreen />;

RegisterPage.getInitialProps = async ({ req, res }) => {
    const cookies = req ? req.headers.cookie : null;
    console.log("register")
    const currUser = await getCurrentUser(cookies).catch(() => null)
    console.log(currUser)

    if (currUser != null) {
        if (res) {
            res.writeHead(301, { Location: urls.pages.app.map });
            res.end();
        } else {
            return Router.replace(urls.pages.app.map);
        }
    }

    return {currUser}
}

export default RegisterPage;
