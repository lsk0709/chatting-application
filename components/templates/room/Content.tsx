import * as React from "react";
import { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { MainContent } from "../../../styles/BaseStyle";
import {
  ChattingRequestDto,
  ChattingResponseDto,
} from "../../../types/chatting";
import ProgressBar from "../../UI/atoms/ProgressBar";
import Text from "../../UI/atoms/Text";
import IconClose from "../../../public/assets/icn-close.svg";
import { useDispatch } from "react-redux";
import { ChatActions } from "../../../store/actions/chat";

interface Props {
  myId: number;
  room_id: number;
  chatList: Array<ChattingResponseDto>;
}

interface ChatProps {
  id?: number;
  msg: string;
  localeTime: string;
  notRead: number;
  content?: string;
  type: string;
  imgPath?: string;
  uploaded?: boolean;
}

interface SeparationBlockProps {
  content: string;
}

const RenderImgUploding: React.FC<ChattingResponseDto> = (props) => {
  const [progressValue, setProgressValue] = useState(0);
  const progress_ref = useRef(0);
  const dispatch = useDispatch();
  const uploadedRequest: ChattingRequestDto = {
    id: props.id,
    room_id: props.room_id,
    type: "image",
    imgPath: props.imgPath,
    uploaded: true,
    send_user_id: 1,
    message: props.message,
    not_read: 1,
    createdAt: props.createdAt,
  };
  useEffect(() => {
    const progress = setInterval(() => {
      progress_ref.current += 1;
      setProgressValue(progress_ref.current);
      if (progress_ref.current > 100) {
        clearInterval(progress);
        dispatch(ChatActions.updateChatAction(uploadedRequest));
      }
    }, 50);
  }, []);

  const uploadCancle = () => {
    dispatch(ChatActions.delChatAction(props.id));
  };

  return (
    <RightBlock type={"image"}>
      <div>
        <ChatWrapper>
          <img src={`/assets/img/${props.imgPath}`} />
          <IconClose onClick={() => uploadCancle()} />
          <ProgressBar value={progressValue} min={0} max={100} />
        </ChatWrapper>
      </div>
    </RightBlock>
  );
};

const Content: React.FC<Props> = (props) => {
    const dispatch = useDispatch();
  const allChat = props.chatList;
  let chatList = allChat.filter((c) => c.room_id === props.room_id);
  const chattingBoxRef = useRef<HTMLUListElement>();
  const scrollToBottom = () => {
    if (chattingBoxRef.current) {
      chattingBoxRef.current.scrollTop = chattingBoxRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
    readChat()
  }, [allChat]);


  const readChat = () => {
    const noReadChat = chatList.filter(c => (c.send_user_id !== props.myId) && (c.not_read === 1))
    noReadChat.forEach(c => {
        const updateValue = {
            ...c,
            not_read: 0
        }
        dispatch(ChatActions.updateChatAction(updateValue))
    })
  }

  const renderChatting = chatList.map((chat, idx) => {
    const createdAt = new Date(chat.createdAt);
    const localeTime = createdAt.toLocaleTimeString();
    const localeDate = createdAt.toLocaleDateString();
    const removeSecond = localeTime.substring(0, localeTime.length - 3);
    const senderId = chat.send_user_id;

    const prevChat = idx >= 1 ? chatList[idx - 1] : undefined;
    const prevCreatedAt = prevChat ? new Date(prevChat.createdAt) : "";
    const prevLocaleDate = prevCreatedAt
      ? prevCreatedAt.toLocaleDateString()
      : "";
    const prevLocaleTime = prevCreatedAt
      ? prevCreatedAt.toLocaleTimeString()
      : "";
    const prevRemoveSecond = prevLocaleTime
      ? prevLocaleTime.substring(0, prevLocaleTime.length - 3)
      : "";

    const isPrevSender = prevChat ? prevChat.send_user_id === senderId : false;
    const isSameDate = prevLocaleDate === localeDate;

    // 채팅한 날짜를 표시
    const getDate = () => {
      let weekday = new Array(7);
      weekday[0] = "일요일";
      weekday[1] = "월요일";
      weekday[2] = "화요일";
      weekday[3] = "수요일";
      weekday[4] = "목요일";
      weekday[5] = "금요일";
      weekday[6] = "토요일";
      const splitDate = localeDate.split(".");
      return `${splitDate[0].trim()}년 ${splitDate[1].trim()}월 ${splitDate[2].trim()}일`;
    };

    // 지금 채팅 날짜가 이전에 채팅 날짜와 다르면 날짜 표시
    const date = isSameDate ? "" : getDate();

    if (chat.type === "image" && chat.uploaded === false) {
      return (
        <RenderImgUploding
          id={chat.id}
          room_id={chat.room_id}
          message={chat.message}
          not_read={chat.not_read}
          createdAt={chat.createdAt}
          send_user_id={chat.send_user_id}
          type={chat.type}
          uploaded={chat.uploaded}
          imgPath={chat.imgPath}
          key={chat.id}
        />
      );
    }

    // 마지막 채팅인 경우
    if (idx === chatList.length - 1) {
      // 내가 보낸 채팅인 경우
      if (senderId === props.myId) {
        return (
          <MyChat
            msg={chat.message}
            notRead={chat.not_read}
            localeTime={removeSecond}
            content={date}
            type={chat.type}
            imgPath={chat.imgPath}
            key={chat.id}
          />
        );
      }

      // 이전에 보낸 채팅과 사람, 날짜가 동일한 경우
      if (isPrevSender && isSameDate) {
        return (
          <FriendChat
            msg={chat.message}
            notRead={chat.not_read}
            type={chat.type}
            imgPath={chat.imgPath}
            localeTime={removeSecond}
            key={chat.id}
          />
        );
      }
      return (
        <FriendChat
          msg={chat.message}
          notRead={chat.not_read}
          type={chat.type}
          imgPath={chat.imgPath}
          localeTime={removeSecond}
          content={date}
          key={chat.id}
        />
      );
    }
    /**
    채팅 시간 표시 여부를 결정하기 위해, 다음과 같은 규칙을 적용했습니다. 
    1. 기준 채팅과 다음 채팅을 보낸 사람이 다르면 시간을 표시합니다.
    2. 기준 채팅과 다음 채팅을 보낸 시간 또는 날짜가 다르면 시간을 표시합니다.
    **/
    const afterSender = chatList[idx + 1];
    const afterCreateAt = new Date(afterSender.createdAt);
    const afterLocaleDate = afterCreateAt.toLocaleDateString();
    const afterLocaleTime = afterCreateAt.toLocaleTimeString();
    const afterRemoveSecond = afterLocaleTime.substring(
      0,
      afterLocaleTime.length - 3
    );
    const isSameTimeWithAfterTime = afterRemoveSecond === removeSecond;
    const isSameDateWithAfterTime = afterLocaleDate === localeDate;
    const time =
      afterSender.send_user_id !== senderId ||
      !isSameTimeWithAfterTime ||
      !isSameDateWithAfterTime
        ? removeSecond
        : "";

    // 내가 보낸 경우
    if (senderId === props.myId) {
      return (
        <MyChat
          msg={chat.message}
          notRead={chat.not_read}
          localeTime={time}
          type={chat.type}
          imgPath={chat.imgPath}
          content={date}
          key={chat.id}
        />
      );
    }
    // 이전 채팅과 지금 채팅이 보낸 사람, 날짜가 같고, 보낸 시간이 같을 경우
    if (isPrevSender && isSameDate && prevRemoveSecond === removeSecond) {
      return (
        <FriendChat
          msg={chat.message}
          notRead={chat.not_read}
          type={chat.type}
          imgPath={chat.imgPath}
          localeTime={time}
          key={chat.id}
        />
      );
    }
    return (
      <FriendChat
        msg={chat.message}
        notRead={chat.not_read}
        type={chat.type}
        imgPath={chat.imgPath}
        localeTime={time}
        content={date}
        key={chat.id}
      />
    );
  });

  return (
    <ChattingContent ref={chattingBoxRef}>{renderChatting}</ChattingContent>
  );
};

export const Chat: React.FC<ChatProps> = ({
  msg,
  localeTime,
  notRead,
  type,
  imgPath,
  uploaded,
}) => {
  return (
    <ChatWrapper>
      {type === "image" ? <img src={`/assets/img/${imgPath}`} /> : msg}
      <TimeText content={localeTime} size={"small"} color={"charcoalGreyTwo"} />
      <NotRead content={notRead > 0 ? notRead.toString() : ""} />
    </ChatWrapper>
  );
};

// 내가 보낸 채팅
export const MyChat: React.FC<ChatProps> = (props) => {
  const { content } = props;
  return (
    <>
      {content ? <SeparationBlock content={content} /> : null}
      <RightBlock type={props.type}>
        <div>
          <Chat {...props} />
        </div>
      </RightBlock>
    </>
  );
};

// 다른 사람이 보낸 채팅
export const FriendChat: React.FC<ChatProps> = (props) => {
  const { content } = props;
  return (
    <>
      {content ? <SeparationBlock content={content} /> : null}
      <LeftBlock type={props.type}>
        <div>
          <Chat {...props} />
        </div>
      </LeftBlock>
    </>
  );
};

// 날짜를 표시하는 등 채팅방의 경계를 나타냅니다.
export const SeparationBlock: React.FC<SeparationBlockProps> = ({
  content,
}) => {
  return (
    <BorderBlock>
      <span>{content}</span>
    </BorderBlock>
  );
};
export default Content;

const ChattingContent = styled(MainContent)`
  padding: 0 1rem;
  background-color: ${(props) => props.theme.paleGrey};
  position: absolute;
  inset: 2.75rem 0px 4.125rem;
  overflow: auto;
`;

// 채팅방에서 채팅을 나타내는 컴포넌트
const ChatWrapper = styled.div`
  position: relative;
  display: inline-block;
  /* padding: 7px 8px; */
  border-radius: 12px;
  /* margin-bottom: 0.625rem; */
  /* margin-top: 0.625rem; */
  max-width: 70%;
  word-wrap: break-word;
  white-space: pre-wrap;

  & > img {
    width: 12.5rem;
    height: 12.5rem;

    border-radius: 12px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  }

  & > svg {
    width: 2.5rem;
    height: 2.5rem;
    padding: 12px;
    opacity: 0.8;
    border-radius: 26.5px;
    background-color: #000;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const TimeText = styled(Text)`
  min-width: 65px;
  bottom: 0;
`;

const NotRead = styled(Text)`
  color: #ffec42;
  min-width: 30px;
  bottom: 16px;
`;

const RightBlock = styled.div<{ type: string }>`
  text-align: right;
  margin: 0.625rem 0;

  & ${ChatWrapper} {
    ${(props) =>
      props.type === "image" ? "" : `background-color: ${props.theme.purple}`};
    ${(props) =>
      props.type === "image"
        ? ""
        : `box-shadow: 0 2px 4px 0 rgba(91, 56, 177, 0.4)`};
    text-align: left;
    color: white;
    font-size: 0.875rem;
    font-weight: 500;
    padding: ${(props) => (props.type === "image" ? 0 : "0.75rem")};
    & span {
      position: absolute;
      display: inline-block;
    }
    & ${TimeText} {
      text-align: right;
      left: -70px;
    }
    & ${NotRead} {
      text-align: right;
      left: -35px;
    }
  }
`;
const LeftBlock = styled.div<{ type: string }>`
  position: relative;
  margin: 0.625rem 0;

  & ${ChatWrapper} {
    ${(props) =>
      props.type === "image" ? "" : `background-color: ${props.theme.white}`};
    ${(props) =>
      props.type === "image"
        ? ""
        : `box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);`};
    color: ${(props) => props.theme.charcoalGrey};
    font-size: 0.875rem;
    font-weight: 500;
    padding: ${(props) => (props.type === "image" ? 0 : "0.75rem")};
    & span {
      position: absolute;
    }
    & ${TimeText} {
      text-align: left;
      right: -70px;
    }
    & ${NotRead} {
      text-align: left;
      right: -35px;
    }
  }
  & img {
    position: absolute;
    top: 3px;
    left: 0;
    height: 45px;
    width: 45px;
    border-radius: 20px;
    float: left;
    cursor: pointer;
  }
`;

const BorderBlock = styled.div`
  position: relative;
  text-align: center;
  width: 100%;
  margin: 0.625rem 0;
  /* padding: 1rem 0; */
  & span {
    position: relative;
    display: inline-block;
    background-color: ${(props) => props.theme.paleGrey};
    color: ${(props) => props.theme.charcoalGreyTwo};
    font-size: 0.75rem;
    font-weight: 500;
    padding: 0 0.625rem;
  }
  &:before {
    content: "";
    display: block;
    position: absolute;
    left: 2%;
    top: 50%;
    width: 96%;
    height: 1px;
    background-color: ${(props) => props.theme.paleLilac};
  }
`;
