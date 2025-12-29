import { Route, Routes } from "react-router-dom";
import AuthRouter from "./AuthRouter";
import MainPage from "../pages/user/main-page/MainPage";
import Layout from "../components/layout/Layout";
import { useEffect, useState } from "react";
import BoardRouter from "./BoardRouter";
import { useQuery } from "@tanstack/react-query";
import { getPrincipal } from "../apis/auth/authApis";
import { usePrincipalState } from "../store/usePrincipalState";

function MainRouter() {
    const accessToken = localStorage.getItem("AccessToken");
    const [showSideBar, setShowSideBar] = useState(false);
    const { isLoggedIn, principal, login, logout } = usePrincipalState();
    const { data, isLoading } = useQuery({
        queryKey: ["getPrincipal"],
        queryFn: getPrincipal,
        refetch: 1, // 재시도 횟수
        enabled: !!accessToken, // 조건부, 토큰이 있으면(True)
    });

    useEffect(() => {
        if (data?.data.status === "success") {
            login(data?.data.data); // userData.data -> principal
        }
    }, [data, login]);

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
                <Route
                    path="/board/*"
                    element={
                        <Layout
                            showSideBar={showSideBar}
                            setShowSideBar={setShowSideBar}>
                            <BoardRouter />
                        </Layout>
                    }
                />
                <Route path="/auth/*" element={<AuthRouter />} />
            </Routes>
        </>
    );
}
export default MainRouter;
