/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { TbArrowBackUp } from "react-icons/tb";
import { FcGoogle } from "react-icons/fc";
import { SiNaver } from "react-icons/si";
import { Link, useNavigate } from "react-router-dom";

function SigninPage() {
    const navigate = useNavigate();

    return (
        <div css={s.container}>
            <div css={s.mainContainer}>
                <div>
                    {" "}
                    <button onClick={() => navigate("/")}>
                        <TbArrowBackUp />
                        뒤로가기
                    </button>
                </div>
                <div css={s.signinBox}>
                    <div css={s.topBox}>
                        <h4>로그인</h4>
                        <p>TechBoard에 오신 것을 환영합니다</p>
                    </div>
                    <div css={s.bottomBox}>
                        <div css={s.inputBox}>
                            <div>
                                <label htmlFor="email">이메일</label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="이메일을 입력해주세요"
                                />
                            </div>
                            <div>
                                <label htmlFor="password">비밀번호</label>
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="비밀번호를 입력해주세요"
                                />
                            </div>
                            <button>로그인</button>
                        </div>
                        <div css={s.lineBox}>
                            <span>또는</span>
                        </div>
                        <div css={s.buttonBox}>
                            <button onClick={() => navigate("/auth/oauth2")}>
                                <FcGoogle style={{ fontSize: 25 }} />
                                구글로 로그인
                            </button>
                            <button>
                                <SiNaver
                                    style={{ fontSize: 18, color: "#03C75A" }}
                                />
                                네이버로 로그인
                            </button>
                        </div>
                        <div css={s.signupBox}>
                            계정이 없으신가요?{" "}
                            <Link to={"/auth/signup"}>회원가입</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default SigninPage;
