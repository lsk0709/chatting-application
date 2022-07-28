import * as React from "react";
import { useState, KeyboardEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import SendIcon from "../../../public/assets/icn-send.svg";
import { ChatActions } from "../../../store/actions/chat";
import { RootState } from "../../../store/reducers";
import { ChattingRequestDto } from "../../../types/chatting";

interface Props {
  room_id: number;
}

const Footer: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const allChat = useSelector((state: RootState) => state.chat.chatting);
  const [message, setMessage] = useState("");

  // 채팅 내용이 공백이라면, 채팅을 보낼 수 없도록 설정
  const isCanSubmit = !!message.replace(/ |\n/g, "");

  const sendMessage = () => {
    if (isCanSubmit) {
      const chattingRequest: ChattingRequestDto = {
        id: allChat.length + 1,
        room_id: props.room_id,
        type: 'message',
        imgPath: '',
        uploaded: true,
        send_user_id: 1,
        message: message,
        not_read: 1,
        createdAt: new Date().toISOString(),
      };
      
      dispatch(ChatActions.addChatting(chattingRequest));
      setMessage("");
    }
  };

  const onEnterPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    // shift + enter 이면 줄바꿈이 되고, enter키만 누르면 채팅 전송이 됩니다.
    if (!event.shiftKey && event.key === 'Enter') {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <Wrapper>
      <div>
        <textarea
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          onKeyPress={onEnterPress}
          autoFocus={true}
          placeholder={"메시지를 입력하세요."}
        />
        <button className={"canSubmit"} onClick={() => sendMessage()}>
          <SendIcon />
        </button>
      </div>
    </Wrapper>
  );
};

export default Footer;

const Wrapper = styled.footer`
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;
  overflow: auto;
  z-index: 100;
  height: 4.125rem;
  background: ${(props) => props.theme.paleGrey};
  /* margin: 0 1rem 1rem 1rem; */

  & div {
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    padding: 0 1rem 1rem 1rem;
    & textarea,
    button {
      display: inline-block;
      border: none;
      outline: none;
    }
    & textarea {
      width: 100%;
      resize: none;
      height: 100%;
      margin-right: 0.75rem;
      padding: 1rem 1rem;
      border-radius: 1.5rem;
      box-shadow: 0 2px 4px 0 ${(props) => props.theme.black10};

      color: #74747e;
      font-size: 0.875rem;
      font-weight: 500;
      letter-spacing: -0.12px;
    }
    & textarea::placeholder {
      color: #74747e99;
      font-size: 0.875rem;
      font-weight: 500;
      letter-spacing: -0.12px;
    }
    & button {
      width: 3.125rem;
      height: 3.125rem;
      padding: 1rem 0.75rem;
      border-radius: 25px;
      background-color: #5b36ac;
      &.canSubmit {
        cursor: pointer;
        pointer-events: all;
        color: #000;
      }
      &.cannotSubmit {
        pointer-events: none;
        color: #b4b4b4;
      }
    }
  }
`;
