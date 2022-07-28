import * as React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { MainContent } from "../../../styles/BaseStyle";
import { RoomListDto, RoomListResponse } from "../../../types/chatting";
import { UserData, UserResponseDto } from "../../../types/user";
import Room from "./Room";

interface Props {
  userState: UserData;
}

const ChattingList: React.FC<Props> = (props) => {
  const roomList = props.userState.room_list.sort((a, b) =>
    b.updatedAt.toLocaleString().localeCompare(a.updatedAt.toLocaleString())
  );
  const friendList = props.userState.friends_list;
  let [rooms, setRooms] = useState([] as Array<RoomListDto>);

  useEffect(() => {
    const getParticipants = async () => {
      const getRoomList = await Promise.all(
        roomList.map( async room => {
            const participant = await Promise.all(
                room.participant.map(async val => {
                    const findParticipant = friendList.find(
                        (friend) => friend.id === val
                    );
                    if (findParticipant) return findParticipant;
                })
            );
            return { ...room, participant };
        })
      );
      
      await setRooms([...getRoomList]);
    };
    getParticipants();
  }, [props.userState]);

  const makeRoomList = rooms.map((room) => {
    return (
      <Room
        room_name={room.participant[0].name}
        room_image={room.participant[0].profile_img_url}
        room_id={room.room_id}
        updatedAt={room.updatedAt}
        last_chat={room.last_chat}
        not_read_chat={room.not_read_chat}
        key={room.room_id}
      />
    );
  });
  return <MainContent>{makeRoomList}</MainContent>;
};

export default ChattingList;
