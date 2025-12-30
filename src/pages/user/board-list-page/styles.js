import { css } from "@emotion/react";

export const container = css`
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
`;

export const mainContainer = css`
    width: 1000px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 50px;
    padding: 16px;
    box-sizing: border-box;

    & > div:nth-of-type(1) {
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 16px;
        color: #4a5565;
        padding: 8px 12px;
        box-sizing: border-box;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.15s ease;

        &:hover {
            background-color: #f2f2f2;
        }
    }

    & > div:nth-of-type(2) {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 24px;
        padding: 0px 13px;
        box-sizing: border-box;

        & > div:nth-of-type(1) {
            font-size: 36px;
            font-weight: 700;
            color: #4f39f6;
        }

        & > div:nth-of-type(2) {
            width: 100%;
            display: flex;
            justify-content: start;
            align-items: center;
            gap: 12px;
            border: 1px solid #dbdbdb;
            padding: 4px 12px;
            box-sizing: border-box;
            border-radius: 8px;
            color: #0a0a0a;

            & > input {
                width: 100%;
                height: 24px;
                outline: none;
                border: none;
                font-size: 14px;
            }
        }
    }
`;

export const listContainer = css`
    width: 100%;
    padding: 0 12px;
    box-sizing: border-box;

    & > ul {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 34px;
        padding: 0;

        & > li {
            display: flex;
            flex-direction: column;
            gap: 16px;
            padding: 24px;
            box-sizing: border-box;
            border-radius: 14px;
            box-shadow: 0px 10px 15px 3px rgba(0, 0, 0, 0.1);
            cursor: pointer;

            &:hover {
                box-shadow: 0px 20px 15px 3px rgba(0, 0, 0, 0.1);
            }

            & > div:nth-of-type(1) {
                display: flex;
                flex-direction: column;
                gap: 10px;

                & > h4 {
                    font-size: 20px;
                    font-weight: 400;
                    color: #0a0a0a;
                }

                & > p {
                    font-size: 16px;
                    font-weight: 300;
                    color: #717182;
                }
            }
        }
    }
`;

export const boardBottomBox = css`
    display: flex;
    justify-content: space-between;
    align-items: center;

    & > div {
        display: flex;
        align-items: center;
        gap: 10px;

        & > p {
            font-size: 14px;
            color: #0a0a0a;
        }
    }
`;

export const profileImgBox = css`
    width: 32px;
    height: 32px;
    border-radius: 50px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;

    & > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;
