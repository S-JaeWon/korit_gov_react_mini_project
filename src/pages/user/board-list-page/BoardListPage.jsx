/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { TbArrowBackUp } from "react-icons/tb";
import { GoSearch } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
    getBoardByKeywordRequest,
    getBoardInfiniteRequest,
    getBoardRequest,
} from "../../../apis/board/boardApis";
import { useInfiniteQuery } from "@tanstack/react-query";
import { SyncLoader } from "react-spinners";

function BoardListPage() {
    // const [boardList, setBoardList] = useState([]);
    const [searchInputValue, setSearchInputValue] = useState("");
    const navigate = useNavigate();
    const bottomRef = useRef(null);

    const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
        useInfiniteQuery({
            queryKey: ["getBoardInfitite"],
            queryFn: getBoardInfiniteRequest,
            initialPageParam: null,
            getNextPageParam: (lastPage) => {
                if (
                    !lastPage?.data?.data?.hasNext ||
                    !lastPage?.data?.data?.boardNextCursor
                ) {
                    return undefined;
                }
                return lastPage?.data?.data?.boardNextCursor;
            },
        });

    const boardList =
        data?.pages?.flatMap((p) => p?.data?.data?.boardRespDtoList ?? []) ??
        []; // n 개씩 가져오는 데이터를 이어서 붙여줌

    useEffect(() => {
        if (!bottomRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const first = entries[0];
                if (!first.isIntersecting) return;
                if (!hasNextPage) return;
                if (isFetchingNextPage) return;

                fetchNextPage();
            },
            { threshold: 0.1 }
        );

        observer.observe(bottomRef.current);
        return () => observer.disconnect();
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

    // useEffect(() => {
    //     getBoardRequest().then((response) => {
    //         if (response.data.status === "success") {
    //             setBoardList(response.data.data);
    //         } else if (response.data.status === "failed") {
    //             alert(response.data.message);
    //         }
    //     });
    // }, []);

    // const searchOnChangeHandler = (e) => {
    //     setSearchInputValue(e.target.value);
    // };

    // const searchOnKeyDownHander = (e) => {
    //     if (e.key === "Enter") {
    //         getBoardByKeywordRequest(searchInputValue).then((response) => {
    //             if (response.data.status === "success") {
    //                 setBoardList(response.data.data);
    //             } else if (response.data.status === "failed") {
    //                 alert(response.data.message);
    //             }
    //         });
    //     }
    // };

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
                            // onChange={searchOnChangeHandler}
                            // onKeyDown={searchOnKeyDownHander}
                        />
                    </div>
                </div>
                <div css={s.listContainer}>
                    <ul>
                        {boardList?.map((board) => (
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
                        <div ref={bottomRef} style={{ height: 1 }} />
                    </ul>
                    {isFetchingNextPage && (
                        <div css={s.loaderBox}>
                            <SyncLoader color="#4f39f6" />
                        </div>
                    )}
                    {!hasNextPage && <div>마지막 페이지 입니다.</div>}
                </div>
            </div>
        </div>
    );
}
export default BoardListPage;
