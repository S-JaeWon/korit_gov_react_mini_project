/** @jsxImportSource @emotion/react */
import { useNavigate, useParams } from "react-router-dom";
import * as s from "./styles";
import { TbArrowBackUp } from "react-icons/tb";
import { MdOutlineCancel, MdOutlineEmail } from "react-icons/md";
import { FiCalendar, FiCheckCircle, FiEdit } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import {
    getUserByUsernameRequest,
    getUserListRequest,
} from "../../../apis/admin/adminApis";

function UserDetailPage() {
    const navigate = useNavigate();
    const { username } = useParams();
    const { data, isLoading } = useQuery({
        queryKey: ["getUserByUsername"],
        queryFn: () => getUserByUsernameRequest(username),
    });

    return (
        <div css={s.container}>
            <div css={s.mainContainer}>
                <div>
                    <button onClick={() => navigate("/admin/manage/user")}>
                        <TbArrowBackUp />
                        회원목록으로
                    </button>
                </div>
                <div css={s.profileContainer(data?.data?.data.status)}>
                    <div>
                        <h4>회원 상세 정보</h4>
                        <span>
                            {data?.data?.data.status === "ACTIVE" ? (
                                <>
                                    <FiCheckCircle />
                                    활성 계정
                                </>
                            ) : (
                                <>
                                    <MdOutlineCancel />
                                    비활성 계정
                                </>
                            )}
                        </span>
                    </div>
                    <div>
                        <div>
                            <img src={data?.data?.data.profileImg} alt="" />
                        </div>
                        <div>
                            <h2>{data?.data?.data.username}</h2>
                            <div>
                                <MdOutlineEmail />
                                <div>
                                    <p>이메일</p>
                                    <p>{data?.data?.data.email}</p>
                                </div>
                            </div>
                            <div>
                                <FiCalendar />
                                <div>
                                    <p>가입일</p>
                                    <p>{data?.data?.data.createDt}</p>
                                </div>
                            </div>
                            {data?.data?.data?.updateDt && (
                                <div>
                                    <FiEdit />
                                    <div>
                                        <p>최종 수정일</p>
                                        <p>{data?.data?.data.updateDt}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div css={s.manageContainer}>
                        <h2>계정 관리</h2>
                        <div>
                            <button>
                                <MdOutlineCancel />
                                계정 비활성화
                            </button>
                        </div>
                        <p>비활성화되면 해당 회원이 로그인할 수 없습니다.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default UserDetailPage;
