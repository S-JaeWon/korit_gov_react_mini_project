import { Route, Routes } from "react-router-dom";
import AuthRouter from "./AuthRouter";
import MainPage from "../pages/user/main-page/MainPage";
import Layout from "../components/layout/Layout";
import { useState } from "react";

function MainRouter() {
    const [showSideBar, setShowSideBar] = useState(false);

    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Layout
                            showSideBar={showSideBar}
                            setShowSideBar={setShowSideBar}>
                            <MainPage
                                showSideBar={showSideBar}
                                setShowSideBar={setShowSideBar}
                            />
                        </Layout>
                    }
                />
                <Route path="/auth/*" element={<AuthRouter />} />
            </Routes>
        </>
    );
}
export default MainRouter;
