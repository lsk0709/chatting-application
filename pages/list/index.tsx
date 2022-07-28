import { useEffect } from "react";
import ChattingList from "../../components/templates/list/ChattingList";
import Header from "../../components/templates/list/Header";
import { Main } from "../../styles/BaseStyle";
import * as friendApi from "../../apis/friend";
import * as chatApi from "../../apis/chat";
import { ChatActions } from "../../store/actions/chat";
import { UserActions } from "../../store/actions/user";
import { RootState } from "../../store/reducers";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { GetStaticProps } from "next";
import { UserResponseDto } from "../../types/user";
import { RoomListResponse } from "../../types/chatting";

interface Props {
  friendList: Array<UserResponseDto>;
  roomList: Array<RoomListResponse>;
}

const ChattingContainer: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const rootState = useSelector((state: RootState) => state);

  useEffect(() => {
    // dispatch(UserActions.setFriendsListAction(props.friendList));
    // dispatch(UserActions.setRoomListAction(props.roomList));
  }, []);
  
  return (
    <Main>
      <Header />
      <ChattingList userState={rootState.user} />
    </Main>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const friendList = await friendApi.fecthFriendsRequest(1);
  const roomList = await chatApi.fetchRoomList(1);

  return {
    props: {
      friendList,
      roomList,
    },
  };
};

export default ChattingContainer;
