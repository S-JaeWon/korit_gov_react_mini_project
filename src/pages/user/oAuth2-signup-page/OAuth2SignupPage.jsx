/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { oAuth2SignupRequest } from "../../../apis/auth/oAuth2Apis";
import { TbArrowBackUp } from "react-icons/tb";

function OAuth2SignupPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [signupInputValue, setSignupInputValue] = useState({
        username: "",
        email: "",
        password: "",
        passwordConfirm: "",
    });

    const inputOnChangeHandler = (e) => {
        const { name, value } = e.target;

        setSignupInputValue((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    const passwordRegex =
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,16}$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;

    const signupOnClickHandler = () => {
        if (
            signupInputValue.username.trim().length === 0 ||
            signupInputValue.email.trim().length === 0 ||
            signupInputValue.password.trim().length === 0 ||
            signupInputValue.passwordConfirm.trim().length === 0
        ) {
            alert("모든 항목을 입력해주세요.");
            return;
        }

        if (!emailRegex.test(signupInputValue.email)) {
            alert("이메일 형식에 맞게 입력해주세요.");
            return;
        }
        if (!passwordRegex.test(signupInputValue.password)) {
            alert(
                "비밀번호는 최소 8자리, 최대 16자리까지, 영문자, 숫자 및 특수 문자를 포함해야 합니다."
            );
            return;
        }

        if (signupInputValue.password !== signupInputValue.passwordConfirm) {
            alert("비밀번호가 일치하지 않습니다.");
        }

        if (!confirm("회원가입 하시겠습니까?")) {
            return;
        }

        oAuth2SignupRequest({
            username: signupInputValue.username,
            email: signupInputValue.email,
            password: signupInputValue.password,
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
                return;
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
                <div css={s.signupBox}>
                    <div css={s.topBox}>
                        <h4>회원가입</h4>
                        <p>TechBoard와 함께 시작하세요</p>
                    </div>
                    <div css={s.bottomBox}>
                        <div>
                            <label htmlFor="">이름</label>
                            <input
                                name="username"
                                value={signupInputValue.username}
                                type="text"
                                placeholder="사용자 이름을 입력해주세요."
                                onChange={inputOnChangeHandler}
                            />
                        </div>
                        <div>
                            <label htmlFor="">이메일</label>
                            <input
                                name="email"
                                value={signupInputValue.email}
                                type="email"
                                placeholder="이메일을 입력해주세요."
                                onChange={inputOnChangeHandler}
                            />
                        </div>
                        <div>
                            <label htmlFor="">비밀번호</label>
                            <input
                                name="password"
                                value={signupInputValue.password}
                                type="password"
                                placeholder="비밀번호를 입력해주세요."
                                onChange={inputOnChangeHandler}
                            />
                        </div>
                        <div>
                            <label htmlFor="">비밀번호 확인</label>
                            <input
                                name="passwordConfirm"
                                value={signupInputValue.passwordConfirm}
                                type="password"
                                placeholder="비밀번호를 다시 입력해주세요."
                                onChange={inputOnChangeHandler}
                            />
                        </div>

                        <button onClick={signupOnClickHandler}>회원가입</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default OAuth2SignupPage;
