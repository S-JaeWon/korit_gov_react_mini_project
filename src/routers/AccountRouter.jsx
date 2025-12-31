import { Route, Routes } from "react-router-dom";
import ProfilePage from "../pages/user/profile-page/ProfilePage";
import ChangePasswordPage from "../pages/user/change-password-page/ChangePasswordPage";

function AccountRouter() {
    return (
        <>
            <Routes>
                <Route path="/:username" element={<ProfilePage />} />
                <Route
                    path="/change/password"
                    element={<ChangePasswordPage />}
                />
            </Routes>
        </>
    );
}
export default AccountRouter;
