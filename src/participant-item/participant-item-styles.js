import { css } from "lit";

const participantStyles = css`
    .participant-container {
        display: flex;
        justify-content: center;
    }
    
    .view-participant {
        width: 50%;
        text-align: justify;
    }

    .mwc-container {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;

    }

    p {
        font-size: 12px;
        margin-left: 40px;
        height: 20%;
        font-weight: bolder;
        color: black;
    }

    span {
        color: purple;
    }

    mwc-button {
        width: 30%;
        height: 30%;
    }
`;

export { participantStyles };