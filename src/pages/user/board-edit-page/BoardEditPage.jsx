/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import {
    getBoardByBoardIdRequest,
    modifyBoardByBoardIdRequest,
    removeBoardByBoardIdRequest,
} from "../../../apis/board/boardApis";
import { usePrincipalState } from "../../../store/usePrincipalState";

function BoardEditPage() {
    const navigate = useNavigate();
    const { principal } = usePrincipalState();
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
        navigate(`/profile/${principal.username}`);
    };

    const editOnClickHandler = () => {
        if (
            contentInputValue.trim().length === 0 ||
            titleInputValue.trim().length === 0
        ) {
            alert("모든 항목을 입력 해주세요.");
            return;
        }

        modifyBoardByBoardIdRequest({
            title: titleInputValue,
            content: contentInputValue,
            userId: principal.userId,
            boardId: boardId,
        })
            .then((response) => {
                if (response.data.status === "success") {
                    alert("게시물 수정 완료");
                    navigate(`/board/${boardId}`);
                } else if (response.data.status === "failed") {
                    alert(response.data.message);
                    return;
                }
            })
            .catch((error) => {
                alert("오류 발생");
                return;
            });
    };

    const removeOnClickHandler = () => {
        if (!confirm("게시물을 삭제 하시겠습니까?")) {
            return;
        }

        removeBoardByBoardIdRequest({
            userId: principal.userId,
            boardId: boardId,
        })
            .then((response) => {
                if (response.data.status === "success") {
                    alert("게시물 삭제 완료");
                    navigate(`/profile/${principal.username}`);
                } else if (response.data.status === "failed") {
                    alert(response.data.message);
                    return;
                }
            })
            .catch((error) => {
                alert("오류 발생");
                return;
            });
    };

    useEffect(() => {
        getBoardByBoardIdRequest(boardId).then((response) => {
            if (response.data.status === "success") {
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
                            <button onClick={removeOnClickHandler}>
                                삭제하기
                            </button>
                            <div>
                                <button onClick={cancelOnClickHandler}>
                                    취소
                                </button>
                                <button onClick={editOnClickHandler}>
                                    수정하기
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default BoardEditPage;
