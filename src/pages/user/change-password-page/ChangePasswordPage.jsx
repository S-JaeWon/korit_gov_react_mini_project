/** @jsxImportSource @emotion/react */
import { useNavigate } from "react-router-dom";
import * as s from "./styles";
import { useState } from "react";
import { TbArrowBackUp } from "react-icons/tb";
import { changePasswordRequest } from "../../../apis/auth/account/accountApis";
import { useQueryClient } from "@tanstack/react-query";
import { usePrincipalState } from "../../../store/usePrincipalState";

function ChangePasswordPage() {
    const navigate = useNavigate();
    const [passwordInputValue, setPasswordInputValue] = useState({
        password: "",
        newPassword: "",
        newPasswordConfirm: "",
    });
    const queryClient = useQueryClient();
    const principalData = queryClient.getQueryData(["getPrincipal"])?.data
        ?.data;
    const { logout } = usePrincipalState();

    const passwordRegex =
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,16}$/;

    const inputOnChangeHandler = (e) => {
        const { name, value } = e.target;

        setPasswordInputValue((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    const changePasswordOnClickHandler = () => {
        if (
            passwordInputValue.password.trim().length === 0 ||
            passwordInputValue.newPassword.trim().length === 0 ||
            passwordInputValue.newPasswordConfirm.trim().length === 0
        ) {
            alert("모든 항목을 입력해주세요.");
            return;
        }

        if (!passwordRegex.test(passwordInputValue.newPassword)) {
            alert(
                "비밀번호는 최소 8자리, 최대 16자리까지, 영문자, 숫자 및 특수 문자를 포함해야 합니다."
            );
            return;
        }

        if (
            passwordInputValue.newPassword !==
            passwordInputValue.newPasswordConfirm
        ) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        if (!confirm("비밀번호를 변경 하시겠습니까?")) {
            return;
        }

        changePasswordRequest({
            userId: principalData.userId,
            password: passwordInputValue.password,
            newPassword: passwordInputValue.newPassword,
        })
            .then((response) => {
                if (response.data.status === "success") {
                    alert(response.data.message);
                    logout();
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
                <div css={s.changePasswordBox}>
                    <div css={s.topBox}>
                        <h4>비밀번호 변경</h4>
                    </div>
                    <div css={s.bottomBox}>
                        <div>
                            <label htmlFor="">비밀번호</label>
                            <input
                                name="password"
                                value={passwordInputValue.password}
                                type="password"
                                placeholder="비밀번호를 입력해주세요."
                                onChange={inputOnChangeHandler}
                            />
                        </div>
                        <div>
                            <label htmlFor="">새 비밀번호</label>
                            <input
                                name="newPassword"
                                value={passwordInputValue.newPassword}
                                type="password"
                                placeholder="새 비밀번호를 입력해주세요."
                                onChange={inputOnChangeHandler}
                            />
                        </div>
                        <div>
                            <label htmlFor="">새 비밀번호 확인</label>
                            <input
                                name="newPasswordConfirm"
                                value={passwordInputValue.newPasswordConfirm}
                                type="password"
                                placeholder="새 비밀번호를 다시 입력해주세요."
                                onChange={inputOnChangeHandler}
                            />
                        </div>

                        <button onClick={changePasswordOnClickHandler}>
                            비밀번호 변경
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ChangePasswordPage;
