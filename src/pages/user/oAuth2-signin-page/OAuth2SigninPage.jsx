import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

function OAuth2SigninPage() {
    const [searchParam] = useSearchParams();
    useEffect(() => {
        localStorage.setItem("AccessToken", searchParam.get("accessToken"));
        window.location.href = "/";
    }, [searchParam]);

    return <div></div>;
}
export default OAuth2SigninPage;
