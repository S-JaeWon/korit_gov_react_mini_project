/** @jsxImportSource @emotion/react */
import { FcGoogle } from "react-icons/fc";
import * as s from "./styles";
import { FiLink } from "react-icons/fi";
import { BsPersonFillAdd } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function OAuth2Page() {
    const navigate = useNavigate();
    return (
        <div css={s.container}>
            <div css={s.mainContainer}>
                <div css={s.topBox}>
                    <div>
                        <FcGoogle />
                    </div>
                    <h4>구글 계정 연동</h4>
                    <p>구글 계정으로 로그인 하시겠습니까?</p>
                </div>
                <div css={s.bottomBox}>
                    <button>
                        <FiLink />
                        <div>기존 계정과 연동</div>
                        <div>이미 가입한 계정과 구글을 연결합니다</div>
                    </button>
                    <button>
                        <BsPersonFillAdd />
                        <div>새 계정으로 가입</div>
                        <div>구글 계정으로 새로 가입합니다.</div>
                    </button>
                    <button onClick={() => navigate("/auth/signin")}>
                        취소
                    </button>
                </div>
            </div>
        </div>
    );
}
export default OAuth2Page;
