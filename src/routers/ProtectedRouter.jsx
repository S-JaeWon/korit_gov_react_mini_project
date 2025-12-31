import { useLocation } from "react-router-dom";
import { usePrincipalState } from "../store/usePrincipalState";
import { useEffect } from "react";

function ProtectedRouter({ children }) {
    const location = useLocation();
    const { isLoggedIn, principal, loading, login, logout } =
        usePrincipalState();

    useEffect(() => {
        if (!loading) {
            if (!isLoggedIn) {
                alert("로그인이 필요합니다.");
                window.location.href = "/auth/signin";
            } else {
                if (
                    location.pathname.includes("board") &&
                    principal?.authorities[0]?.authority === "ROLE_TEMP_USER"
                ) {
                    alert("이메일 인증을 완료해주세요.");
                    window.location.href = `/profile/${principal.username}`;
                    return;
                }
            }
        }
    }, [loading, location.pathname]);

    return children;
}

export default ProtectedRouter;
