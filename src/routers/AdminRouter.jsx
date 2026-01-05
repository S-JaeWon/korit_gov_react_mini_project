import { Route, Routes } from "react-router-dom";
import DashBoardPage from "../pages/admin/dash-board-page/DashBoardPage";
import ManageUserPage from "../pages/admin/manage-user-page/ManageUserPage";
import UserDetailPage from "../pages/admin/user-detail-page/UserDetailPage";
import ManageBoardPage from "../pages/admin/manage-board-page/ManageBoardPage";
import BoardDetailPage from "../pages/admin/board-detail-page/BoardDetailPage";

function AdminRouter() {
    return (
        <>
            <Routes>
                <Route path="/dashboard" element={<DashBoardPage />} />
                <Route path="/manage/user" element={<ManageUserPage />} />
                <Route
                    path="/manage/user/:username"
                    element={<UserDetailPage />}
                />
                <Route path="/manage/board" element={<ManageBoardPage />} />
                <Route
                    path="/manage/board/:boardId"
                    element={<BoardDetailPage />}
                />
            </Routes>
        </>
    );
}
export default AdminRouter;
