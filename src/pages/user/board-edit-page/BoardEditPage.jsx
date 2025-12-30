/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { getBoardByBoardIdRequest } from "../../../apis/board/boardApis";

function BoardEditPage() {
    const navigate = useNavigate();
    const [boardData, setBoardData] = useState({});
    const { boardId } = useParams();
    const [titleInputValue, setTitleInputValue] = useState("");
    const [contentInputValue, setContentInputValue] = useState("");

    const titleInputonChangeHandler = (e) => {
        setTitleInputValue(e.target.value);
    };

    const contentInputOnChangeHandler = (e) => {
        setContentInputValue(e.target.value);
    };

    const cancelOnClickHandler = () => {
        setTitleInputValue("");
        setContentInputValue("");
        navigate("/board/list");
    };

    useEffect(() => {
        getBoardByBoardIdRequest(boardId).then((response) => {
            if (response.data.status === "success") {
                setBoardData(response.data.data);
                setTitleInputValue(response.data.data.title);
                setContentInputValue(response.data.data.content);
            } else if (response.data.status === "failed") {
                alert(response.data.message);
            }
        });
    }, []);

    return (
        <div css={s.container}>
            <div css={s.mainContainer}>
                <div>
                    <div>
                        <MdOutlineTipsAndUpdates />
                    </div>
                    <h1>게시글을 수정하세요</h1>
                    <p>내용을 다듬고 최신 정보로 업데이트해보세요</p>
                </div>
                <div css={s.bottomContainer}>
                    <div css={s.innerBox}>
                        <div>
                            <label htmlFor="title">제목</label>
                            <input
                                id="title"
                                type="text"
                                placeholder="제목을 입력하세요."
                                value={titleInputValue}
                                onChange={titleInputonChangeHandler}
                            />
                        </div>
                        <div>
                            <label htmlFor="content">내용</label>
                            <textarea
                                name=""
                                id="content"
                                placeholder="내용을 입력하세요."
                                value={contentInputValue}
                                onChange={contentInputOnChangeHandler}
                            />
                        </div>
                        <div>
                            <span>{contentInputValue.length}자</span>
                            <span>최소 10자 이상 작성해주세요</span>
                        </div>
                        <div>
                            <button onClick={cancelOnClickHandler}>취소</button>
                            <button>수정하기</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default BoardEditPage;
