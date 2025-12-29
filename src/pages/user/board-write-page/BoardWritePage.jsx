/** @jsxImportSource @emotion/react */
import { LuSparkles } from "react-icons/lu";
import * as s from "./styles";
import { useEffect, useState } from "react";

function BoardWritePage() {
    const [contentInputValue, setContentInputValue] = useState("");

    const contentInputOnChangeHandler = (e) => {
        setContentInputValue(e.target.value);
    };

    return (
        <div css={s.container}>
            <div css={s.mainContainer}>
                <div>
                    <div>
                        <LuSparkles />
                    </div>
                    <h1>새로운 이야기를 시작하세요</h1>
                    <p>당신의 지식과 경험을 커뮤니티와 공유해보세요</p>
                </div>
                <div css={s.bottomContainer}>
                    <div css={s.innerBox}>
                        <div>
                            <label htmlFor="">제목</label>
                            <input
                                type="text"
                                placeholder="제목을 입력하세요."
                            />
                        </div>
                        <div>
                            <label htmlFor="">내용</label>
                            <textarea
                                name=""
                                id=""
                                placeholder="내용을 입력하세요."
                                onChange={contentInputOnChangeHandler}
                            />
                        </div>
                        <div>
                            <span>{contentInputValue.length}자</span>
                            <span>최소 10자 이상 작성해주세요</span>
                        </div>
                        <div>
                            <button>취소</button>
                            <button>게시하기</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default BoardWritePage;
