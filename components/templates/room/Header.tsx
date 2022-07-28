import * as React from "react";
import { MainHeader } from "../../../styles/BaseStyle";
import BackIcon from "../../../public/assets/icn-back.svg";
import UploadIcon from "../../../public/assets/icn-upload.svg";
import SearchIcon from "../../../public/assets/icn-search.svg";
import Text from "../../UI/atoms/Text";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import { ChattingRequestDto } from "../../../types/chatting";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/reducers";
import { ChatActions } from "../../../store/actions/chat";

interface Props {
  room_name: string;
  room_id: number;
}
const myImageMock = [
    'img-shot-1.png',
    'img-shot-2.png',
    'img-shot-3.png',
    'img-shot-4.png',
    'img-shot-5.png',
    'img-shot-6.png',
    'img-shot-7.png'
]
const Header: React.FC<Props> = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const allChat = useSelector((state: RootState) => state.chat.chatting);
  const [isTooltip, openTooltip] = useState(false);

  const sendMessage = (img:string) => {
      const chattingRequest: ChattingRequestDto = {
        id: allChat.length + 1,
        room_id: props.room_id,
        type: 'image',
        imgPath: img,
        uploaded: false,
        send_user_id: 1,
        message: '',
        not_read: 1,
        createdAt: new Date().toISOString(),
      };
      dispatch(ChatActions.addChatting(chattingRequest));
      openTooltip(false);   
  }

  return (
    <MainHeader>
      <BackIcon onClick={router.back} />
      <Text
        content={props.room_name}
        color="white"
        weight="bold"
        size="large"
      />
      <MenuIconWrapper>
        <UploadIcon onClick={() => openTooltip(!isTooltip)} />
        <SearchIcon />
        
      </MenuIconWrapper>
      {isTooltip && 
        <TooltipWrapper>
            {myImageMock.map((img, idx) => {
                return <img src={`/assets/img/${img}`} onClick={() => sendMessage(img)} key={idx}/>
            })}
        </TooltipWrapper>}
    </MainHeader>
  );
};

export default Header;

const TooltipWrapper = styled.div`
  width: 100vw;
  height: 4.25rem;
  background-color: ${(props) => props.theme.purple};
  padding: 0.688rem 1rem;
  position: absolute;
  z-index: 1;
  top: 2.73rem;
  left: 0;
  overflow: auto;
  white-space: nowrap;

  & > img {
    width: 2.875rem;
    height: 2.875rem;
    margin: 0 0.625rem 0 0;
    border-radius: 5px;
  }

  &::-webkit-scrollbar{
    display: none; 
    }
`;

const MenuIconWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: right;
  text-align: right;
  & > svg {
    margin-left: 1rem;
  }
`;
