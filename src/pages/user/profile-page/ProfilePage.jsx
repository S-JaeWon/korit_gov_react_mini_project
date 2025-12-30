/** @jsxImportSource @emotion/react */
import { TbArrowBackUp } from "react-icons/tb";
import * as s from "./styles";
import { useNavigate } from "react-router-dom";
import { usePrincipalState } from "../../../store/usePrincipalState";
import { useRef, useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../apis/utils/config/firebaseConfig";
import { v4 as uuid } from "uuid";
import { changeProfileImg } from "../../../apis/auth/account/accountApis";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function ProfilePage() {
    const [progress, setProgress] = useState(0);
    const [isUploaindg, setIsUploading] = useState(false);
    const navigate = useNavigate();
    const { isLoggedIn, principal, loading, login, logout } =
        usePrincipalState();
    const imgInputRef = useRef();
    const querClient = useQueryClient();

    function onRefresh() {
        querClient.invalidateQueries({ queryKey: ["getPrincipal"] });
    }

    const changeProfileImgMutation = useMutation({
        mutationKey: "changeProfileImg",
        mutationFn: changeProfileImg,
        onSuccess: (response) => {
            if (response.data.status === "success") {
                alert("프로필 이미지 변경 완료");
                onRefresh();
                setIsUploading(false);
            } else if (response.data.status === "failed") {
                alert(response.data.message);
                setIsUploading(false);
                return;
            }
        },
        onError: (error) => {
            alert("에러 발생");
            setIsUploading(false);
            return;
        },
    });

    const onChangeFileHandler = (e) => {
        const file = e.target.files[0];

        if (!confirm("프로필 이미지를 변경하시겠습니까?")) {
            return;
        }

        setIsUploading(true);

        const imageRef = ref(
            storage,
            `profile-img/${uuid()}_${file.name.split(".").pop()}`
        );

        const uploadTask = uploadBytesResumable(imageRef, file);
        // 업로드 상태 변화를 감지하는 이벤트 리스너를 등록
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // 진행도 확인
                const progressPercent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progressPercent);
            },
            (error) => {
                isUploaindg(false);
                alert("업로드 중 에러 발생");
            },
            async () => {
                try {
                    const downloadUrl = await getDownloadURL(
                        uploadTask.snapshot.ref
                    );
                    changeProfileImgMutation.mutate({
                        userId: principal.userId,
                        profileImg: downloadUrl,
                    });
                } catch (error) {
                    setIsUploading(false);
                    alert("이미지 URL 업로드 중 문제 발생");
                }
            }
        );
    };

    const onClickProfileImgHandler = () => {
        imgInputRef.current.click();
    };

    return (
        <div css={s.container}>
            <div css={s.mainContainer}>
                <button onClick={() => navigate("/")}>
                    <TbArrowBackUp />
                    홈으로
                </button>
                <h1>마이페이지</h1>
                <div css={s.profileBox}>
                    <div css={s.profileTopBox}>
                        <div>
                            <div css={s.profileImg}>
                                <img
                                    src={principal?.profileImg}
                                    alt="profileImg"
                                    onClick={onClickProfileImgHandler}
                                />
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={imgInputRef}
                                    onChange={onChangeFileHandler}
                                />
                            </div>
                            <div>
                                <h3>{principal?.username}</h3>
                                <p>{principal?.email}</p>
                            </div>
                        </div>
                        <div>
                            <button onClick={() => logout()}>로그아웃</button>
                        </div>
                    </div>
                    <div css={s.profileBottomBox}>
                        <div>작성한 게시물</div>
                        <p>3</p>
                    </div>
                </div>
                <div css={s.profileSettingBox}>
                    <div>
                        <h3>계정 설정</h3>
                        <p>계정 보안 및 정보를 관리 하세요</p>
                    </div>
                    <div css={s.settingButtonBox}>
                        <button>비밀번호 변경</button>
                        <button>이메일 인증</button>
                        <button>회원탈퇴</button>
                    </div>
                </div>
                <div css={s.profileBoardBox}>
                    <div>
                        <h3> 내가 작성한 게시물</h3>
                        <p>총 0개의 게시물을 작성했습니다.</p>
                    </div>
                    <div css={s.boardBox}>
                        <p>작성한 게시물이 없습니다.</p>
                    </div>
                </div>
            </div>
            {isUploaindg ? (
                <div css={s.blurBox}>
                    <h4>{progress}%</h4>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}
export default ProfilePage;
