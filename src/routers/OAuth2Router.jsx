import { Route, Routes } from "react-router-dom";
import OAuth2Page from "../pages/user/oAuth2-page/OAuth2Page";
import OAuth2MergePage from "../pages/user/oAuth2-merge-page/OAuth2MergePage";
import OAuth2SigninPage from "../pages/user/oAuth2-signin-page/OAuth2SigninPage";
import OAuth2SignupPage from "../pages/user/oAuth2-signup-page/OAuth2SignupPage";

function OAuth2Router() {
    return (
        <>
            <Routes>
                <Route path="/" element={<OAuth2Page />} />
                <Route path="/merge" element={<OAuth2MergePage />} />
                <Route path="/signin" element={<OAuth2SigninPage />} />
                <Route path="/signup" element={<OAuth2SignupPage />} />
            </Routes>
        </>
    );
}
export default OAuth2Router;
