import Router from "next/router";
import urls from "../../utils/urls";
import { getCurrentUser } from "../actions/User";

const IndexPage = () => <div>Hello!</div>;

IndexPage.getInitialProps = async ({ req, res }) => {
    const cookies = req ? req.headers.cookie : null;
    const currUser = await getCurrentUser(cookies).catch(() => null)

    if (currUser == null) {
        if (res) {
            res.writeHead(301, { Location: urls.pages.login });
            res.end();
        } else {
            return Router.replace(urls.pages.login);
        }
    } else {
        if (res) {
            res.writeHead(301, { Location: urls.pages.app.map });
            res.end();
        } else {
            return Router.replace(urls.pages.app.map);
        }
    }

    return {currUser}
}
export default IndexPage;
