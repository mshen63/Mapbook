import { getCurrentUser } from "../actions/User";
import LoginScreen from "../screens/Login";
import Router from "next/router";
import urls from "../../utils/urls";

const LoginPage = () => <LoginScreen />;

LoginPage.getInitialProps = async ({ req, res }) => {
    const cookies = req ? req.headers.cookie : null;
    const currUser = await getCurrentUser(cookies).catch(() => null)

    if (currUser != null) {
        if (res) {
            res.writeHead(301, { Location: urls.pages.app.home });
            res.end();
        } else {
            return Router.replace(urls.pages.app.home);
        }
    }
    console.log(currUser)
    return {currUser}
}
export default LoginPage;
