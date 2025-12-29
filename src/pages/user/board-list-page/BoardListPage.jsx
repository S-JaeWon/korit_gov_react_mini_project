/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { TbArrowBackUp } from "react-icons/tb";
import { GoSearch } from "react-icons/go";
import { useNavigate } from "react-router-dom";

function BoardListPage() {
    const navigate = useNavigate();
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
                        />
                    </div>
                </div>
                <div css={s.listContainer}>
                    <ul>
                        <li onClick={() => navigate("/board/1")}>
                            <div>
                                <h4>React 18의 새로운 기능들</h4>
                                <p>
                                    React 18에서는 Concurrent Rendering,
                                    Automatic Batching, 그리고 새로운 Suspense
                                    기능들이 추가되었습니다. 이번 업데이트는
                                    특히 성능 개선에 초점을 맞추고 있으며...
                                </p>
                            </div>
                            <div css={s.boardBottomBox}>
                                <div>
                                    <div>김</div>
                                    <p>김개발</p>
                                </div>
                                <div>
                                    <p>2025.12.29</p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div>
                                <h4>React 18의 새로운 기능들</h4>
                                <p>
                                    React 18에서는 Concurrent Rendering,
                                    Automatic Batching, 그리고 새로운 Suspense
                                    기능들이 추가되었습니다. 이번 업데이트는
                                    특히 성능 개선에 초점을 맞추고 있으며...
                                </p>
                            </div>
                            <div css={s.boardBottomBox}>
                                <div>
                                    <div>김</div>
                                    <p>김개발</p>
                                </div>
                                <div>
                                    <p>2025.12.29</p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div>
                                <h4>React 18의 새로운 기능들</h4>
                                <p>
                                    React 18에서는 Concurrent Rendering,
                                    Automatic Batching, 그리고 새로운 Suspense
                                    기능들이 추가되었습니다. 이번 업데이트는
                                    특히 성능 개선에 초점을 맞추고 있으며...
                                </p>
                            </div>
                            <div css={s.boardBottomBox}>
                                <div>
                                    <div>김</div>
                                    <p>김개발</p>
                                </div>
                                <div>
                                    <p>2025.12.29</p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div>
                                <h4>React 18의 새로운 기능들</h4>
                                <p>
                                    React 18에서는 Concurrent Rendering,
                                    Automatic Batching, 그리고 새로운 Suspense
                                    기능들이 추가되었습니다. 이번 업데이트는
                                    특히 성능 개선에 초점을 맞추고 있으며...
                                </p>
                            </div>
                            <div css={s.boardBottomBox}>
                                <div>
                                    <div>김</div>
                                    <p>김개발</p>
                                </div>
                                <div>
                                    <p>2025.12.29</p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div>
                                <h4>React 18의 새로운 기능들</h4>
                                <p>
                                    React 18에서는 Concurrent Rendering,
                                    Automatic Batching, 그리고 새로운 Suspense
                                    기능들이 추가되었습니다. 이번 업데이트는
                                    특히 성능 개선에 초점을 맞추고 있으며...
                                </p>
                            </div>
                            <div css={s.boardBottomBox}>
                                <div>
                                    <div>김</div>
                                    <p>김개발</p>
                                </div>
                                <div>
                                    <p>2025.12.29</p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div></div>
            </div>
        </div>
    );
}
export default BoardListPage;
