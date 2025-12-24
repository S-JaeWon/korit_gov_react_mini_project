import { Route, Routes } from "react-router-dom";
import SigninPage from "../pages/user/signin-page/SigninPage";
import SignupPage from "../pages/user/signup-page/SignupPage";
import OAuth2Router from "./OAuth2Router";

function AuthRouter() {
    return (
        <>
            <Routes>
                <Route path="/signin" element={<SigninPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/oauth2/*" element={<OAuth2Router />} />
            </Routes>
        </>
    );
}
export default AuthRouter;
