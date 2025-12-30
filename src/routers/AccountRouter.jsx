import { Route, Routes } from "react-router-dom";
import ProfilePage from "../pages/user/profile-page/ProfilePage";

function AccountRouter() {
    return (
        <>
            <Routes>
                <Route
                    path="/:username"
                    element={<ProfilePage  />}
                />
            </Routes>
        </>
    );
}
export default AccountRouter;
