/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { TbArrowBackUp } from "react-icons/tb";
import { GoSearch } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
    getBoardByKeywordRequest,
    getBoardRequest,
} from "../../../apis/board/boardApis";

function BoardListPage() {
    const [boardList, setBoardList] = useState([]);
    const [searchInputValue, setSearchInputValue] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getBoardRequest().then((response) => {
            if (response.data.status === "success") {
                setBoardList(response.data.data);
            } else if (response.data.status === "failed") {
                alert(response.data.message);
            }
        });
    }, []);

    const searchOnChangeHandler = (e) => {
        setSearchInputValue(e.target.value);
    };

    const searchOnKeyDownHander = (e) => {
        if (e.key === "Enter") {
            getBoardByKeywordRequest(searchInputValue).then((response) => {
                if (response.data.status === "success") {
                    setBoardList(response.data.data);
                } else if (response.data.status === "failed") {
                    alert(response.data.message);
                }
            });
        }
    };

    return (
        <div css={s.container}>
            <div css={s.mainContainer}>
                <div onClick={() => navigate("/")}>
                    <TbArrowBackUp /> 홈
                </div>
                <div>
                    <div>게시물</div>
                    <div>
                        <GoSearch />
                        <input
                            type="text"
                            placeholder="검색할 게시물 제목을 적어주세요."
                            onChange={searchOnChangeHandler}
                            onKeyDown={searchOnKeyDownHander}
                        />
                    </div>
                </div>
                <div css={s.listContainer}>
                    <ul>
                        {boardList.map((board) => (
                            <li
                                key={board.boardId}
                                onClick={() =>
                                    navigate(`/board/${board.boardId}`)
                                }>
                                <div>
                                    <h4>{board.title}</h4>
                                    <p>{board.content}</p>
                                </div>
                                <div css={s.boardBottomBox}>
                                    <div>
                                        <div css={s.profileImgBox}>
                                            <img
                                                src={board.profileImg}
                                                alt="profileImg"
                                            />
                                        </div>
                                        <p>{board.username}</p>
                                    </div>
                                    <div>
                                        <p>{board.createDt}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div></div>
            </div>
        </div>
    );
}
export default BoardListPage;
