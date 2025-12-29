/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { IoListSharp } from "react-icons/io5";
import { MdModeEditOutline } from "react-icons/md";
import { RiMenuUnfold4Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

function Sidebar({ setShowSideBar }) {
    const navigate = useNavigate();
    return (
        <div css={s.container}>
            <div css={s.topBox}>
                <div>메뉴</div>
                <button onClick={() => setShowSideBar((prev) => !prev)}>
                    <RiMenuUnfold4Line />
                </button>
            </div>
            <div css={s.bottomBox}>
                <ul>
                    <li
                        onClick={() => {
                            navigate("/board/list");
                            setShowSideBar((prev) => !prev);
                        }}>
                        <IoListSharp />
                        게시물 보기
                    </li>
                    <li
                        onClick={() => {
                            navigate("/board/write");
                            setShowSideBar((prev) => !prev);
                        }}>
                        <MdModeEditOutline />
                        글쓰기
                    </li>
                </ul>
            </div>
        </div>
    );
}
export default Sidebar;
