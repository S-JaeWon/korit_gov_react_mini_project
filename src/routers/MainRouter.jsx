import { Route, Routes } from "react-router-dom";
import AuthRouter from "./AuthRouter";
import MainPage from "../pages/user/main-page/MainPage";
import Layout from "../components/layout/Layout";
import { useEffect } from "react";
import BoardRouter from "./BoardRouter";
import { useQuery } from "@tanstack/react-query";
import { getPrincipal } from "../apis/auth/authApis";
import { usePrincipalState } from "../store/usePrincipalState";
import AccountRouter from "./AccountRouter";
import ProtectedRouter from "./ProtectedRouter";
import AdminRouter from "./AdminRouter";

function MainRouter() {
    const accessToken = localStorage.getItem("AccessToken");
    const { isLoggedIn, principal, loading, login, logout, setLoading } =
        usePrincipalState();
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

    useEffect(() => {
        setLoading(isLoading);
    }, [isLoading]);

    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Layout>
                            <MainPage />
                        </Layout>
                    }
                />

                <Route
                    path="/board/*"
                    element={
                        <ProtectedRouter>
                            <Layout>
                                <BoardRouter />
                            </Layout>
                        </ProtectedRouter>
                    }
                />

                <Route
                    path="/profile/*"
                    element={
                        <ProtectedRouter>
                            <Layout>
                                <AccountRouter />
                            </Layout>
                        </ProtectedRouter>
                    }
                />
                <Route path="/auth/*" element={<AuthRouter />} />
                <Route path="/admin/*" element={<AdminRouter />} />
            </Routes>
        </>
    );
}
export default MainRouter;
