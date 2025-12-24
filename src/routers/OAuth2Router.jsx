import { Route, Routes } from "react-router-dom";
import OAuth2Page from "../pages/user/oAuth2-page/OAuth2Page";

function OAuth2Router() {
    return (
        <>
            <Routes>
                <Route path="/" element={<OAuth2Page />} />
            </Routes>
        </>
    );
}
export default OAuth2Router;
