import { Route, Routes } from "react-router-dom";
import BoardListPage from "../pages/user/board-list-page/BoardListPage";
import BoardDetailPage from "../pages/user/board-detail-page/BoardDetailPage";
import BoardWritePage from "../pages/user/board-write-page/BoardWritePage";
import BoardEditPage from "../pages/user/board-edit-page/BoardEditPage";

function BoardRouter() {
    return (
        <>
            <Routes>
                <Route path="/list" element={<BoardListPage />} />
                <Route path="/:boardId" element={<BoardDetailPage />} />
                <Route path="/write" element={<BoardWritePage />} />
                <Route path="/edit/:boardId" element={<BoardEditPage />} />
            </Routes>
        </>
    );
}
export default BoardRouter;
