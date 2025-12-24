/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { RiMenuUnfold3Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";

function MainHeader({ showSideBar, setShowSideBar }) {
    const navigate = useNavigate();

    return (
        <div css={s.container}>
            <div css={s.leftbox}>
                <button onClick={() => setShowSideBar((prev) => !prev)}>
                    <RiMenuUnfold3Line />
                </button>
                <div>TechBoard</div>
            </div>
            <div css={s.rightbox}>
                <button onClick={() => navigate("/auth/signin")}>로그인</button>
                <button onClick={() => navigate("/auth/signup")}>
                    회원가입
                </button>
            </div>
            <div css={s.sideBarContainer(showSideBar)}>
                <Sidebar />
            </div>
        </div>
    );
}
export default MainHeader;
