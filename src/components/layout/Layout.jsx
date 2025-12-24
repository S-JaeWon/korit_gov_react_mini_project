/** @jsxImportSource @emotion/react */
import MainHeader from "../main-header/MainHeader";
import * as s from "./styles";

function Layout({ children, showSideBar, setShowSideBar }) {
    return (
        <div css={s.container}>
            <MainHeader
                showSideBar={showSideBar}
                setShowSideBar={setShowSideBar}
            />
            {children}
        </div>
    );
}
export default Layout;
