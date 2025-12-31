/** @jsxImportSource @emotion/react */
import { useLocation, useNavigate } from "react-router-dom";
import * as s from "./styles";
import { useState } from "react";
import { TbArrowBackUp } from "react-icons/tb";
import { oAuth2MergeRequest } from "../../../apis/auth/oAuth2Apis";

function OAuth2MergePage() {
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location);
    const [mergeInputValue, setMergeInputValue] = useState({
        email: "",
        password: "",
    });

    const inputOnChangeHandler = (e) => {
        const { name, value } = e.target;

        setMergeInputValue((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    const mergeOnClickHandler = () => {
        if (
            mergeInputValue.email.trim().length === 0 ||
            mergeInputValue.password.trim().length === 0
        ) {
            alert("모든 항목을 입력해주세요.");
            return;
        }

        oAuth2MergeRequest({
            email: mergeInputValue.email,
            password: mergeInputValue.password,
            provider: location.state.provider,
            providerUserId: location.state.providerUserId,
        })
            .then((response) => {
                if (response.data.status === "success") {
                    alert(response.data.message);
                    navigate("/auth/signin");
                } else if (response.data.status === "failed") {
                    alert(response.data.message);
                    return;
                }
            })
            .catch((error) => {
                alert("오류 발생");
            });
    };

    return (
        <div css={s.container}>
            <div css={s.mainContainer}>
                <div>
                    <button onClick={() => navigate(-1)}>
                        <TbArrowBackUp />
                        뒤로가기
                    </button>
                </div>
                <div css={s.mergeBox}>
                    <div css={s.topBox}>
                        <h4>계정 연동</h4>
                        <p>TechBoard와 함께 시작하세요</p>
                    </div>
                    <div css={s.bottomBox}>
                        <div>
                            <label htmlFor="">이메일</label>
                            <input
                                name="email"
                                value={mergeInputValue.email}
                                type="email"
                                placeholder="이메일을 입력해주세요."
                                onChange={inputOnChangeHandler}
                            />
                        </div>
                        <div>
                            <label htmlFor="">비밀번호</label>
                            <input
                                name="password"
                                value={mergeInputValue.password}
                                type="password"
                                placeholder="비밀번호를 입력해주세요."
                                onChange={inputOnChangeHandler}
                            />
                        </div>

                        <button onClick={mergeOnClickHandler}>연동하기</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default OAuth2MergePage;
