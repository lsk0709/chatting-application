import { useRouter } from "next/router";
import * as React from "react";
import Content from "../../components/templates/room/Content";
import Footer from "../../components/templates/room/Footer";
import Header from "../../components/templates/room/Header";
import { Main } from "../../styles/BaseStyle";
import * as chatApi from "../../apis/chat";
import { ChattingResponseDto, RoomListResponse } from "../../types/chatting";
import { GetServerSideProps, GetStaticProps } from "next";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducers";
import { useEffect } from "react";
import { ChatActions } from "../../store/actions/chat";
import { useDispatch } from "react-redux";
import _ from "lodash";
import { UserActions } from "../../store/actions/user";

interface Props {
  roomInfo: RoomListResponse;
  chatList: Array<ChattingResponseDto>;
}

const ChattingRoom: React.FC<Props> = (props) => {
  const router = useRouter();
  const userState = useSelector((state: RootState) => state.user);
  const chatState = useSelector((state: RootState) => state.chat);
  const room_name = userState.friends_list.find(
    (f) => f.id === props.roomInfo.participant[0]
  ).name;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ChatActions.setChatListAction(props.chatList));
  }, []);

  useEffect(() => {
    // 채팅 데이터를 기준으로 채팅방 리스트 페이지를 구성할 데이터를 만드는 과정
    const makeRoomList = () => {
      const roomList = _.chain(chatState.chatting)
        .groupBy("room_id")
        .map((v, i) => {
          return {
            room_id: _.get(_.find(v, "room_id"), "room_id"),
            participant: _.chain(v)
              .groupBy("send_user_id")
              .map((v, i) => {
                if (i !== "1") return i;
              })
              .value()
              .filter((element, i) => element !== undefined)
              .map((p) => {
                return Number(p);
              }),
            last_chat: _.get(_.maxBy(v, "createdAt"), "message"),
            not_read_chat: _.sumBy(v, (c) => {
              return c.send_user_id !== 1 && c.not_read;
            }),
            last_read_chat_id: _.get(_.maxBy(v, "createdAt"), "id"),
            updatedAt: _.get(_.maxBy(v, "createdAt"), "createdAt"),
          };
        })
        .value();
      dispatch(UserActions.setRoomListAction(roomList));
    };
    makeRoomList();
  }, [chatState.chatting]);

  return (
    <Main>
      <Header room_name={room_name} room_id={Number(router.query.room_id)} />
      <Content
        myId={userState.id}
        room_id={Number(router.query.room_id)}
        chatList={chatState.chatting}
      />
      <Footer room_id={Number(router.query.room_id)} />
    </Main>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const chatList = await chatApi.fetchChatting(
    // parseInt(context.params.room_id)
    Number(context.params.room_id)
  );
  const roomInfo = await chatApi.fetchRoomInfo(Number(context.params.room_id));

  return {
    props: {
      roomInfo,
      chatList,
    },
  };
};

export default ChattingRoom;
