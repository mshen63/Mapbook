import { getCurrentUser } from "../actions/User";
import RegisterScreen from "../screens/RegisterScreen.jsx";
import Router from "next/router";
import urls from "../../utils/urls";

const RegisterPage = () => <RegisterScreen />;

RegisterPage.getInitialProps = async ({ req, res }) => {
    const cookies = req ? req.headers.cookie : null;
    const currUser = await getCurrentUser(cookies).catch(() => null)

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
