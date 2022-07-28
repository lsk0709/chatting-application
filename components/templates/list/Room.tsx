import Link from "next/link";
import * as React from "react";
import styled from "styled-components";
import { Notification } from "../../../styles/BaseStyle";
import Text from "../../UI/atoms/Text";

interface Props {
  room_id: number;
  room_name: string;
  updatedAt: string;
  last_chat: string;
  not_read_chat: number;
  room_image: string;
}

const Room: React.FC<Props> = (props) => {
  const getUpdatetAt = (date: string) => {
    const today = new Date();
    const updateDate = new Date(date);
    const lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 7);

    const localeDate = updateDate.toLocaleDateString();
    if (today.toLocaleDateString() === localeDate) {
      const localeTime = updateDate.toLocaleTimeString();
      return localeTime.substring(0, localeTime.length - 3);
    } else if (lastWeek < updateDate) {
      return getDate(date);
    } else {
      return localeDate;
    }
  };

  const getDate = (date: string) => {
    const updateDate = new Date(date);
    let weekday = new Array(7);
    weekday[0] = "일요일";
    weekday[1] = "월요일";
    weekday[2] = "화요일";
    weekday[3] = "수요일";
    weekday[4] = "목요일";
    weekday[5] = "금요일";
    weekday[6] = "토요일";
    const day = weekday[updateDate.getDay()];
    return day;
  };

  return (
    <Link href={'/room/[room_id]'} as={`/room/${props.room_id}`}>
    
      <RoomWrapper>
        <img src={`./assets/thumbnail/${props.room_image}`} />
        <div>
          <div className="room-block-top">
            <Text
              content={props.room_name}
              color="charcoalGrey"
              weight="bold"
              size="large"
            />
            <Text
              content={getUpdatetAt(props.updatedAt)}
              color="coolGrey"
              size="small"
            />
          </div>
          <div className="preview">
            <Text content={props.last_chat===""?'사진':props.last_chat} color="coolGrey" size="0.813rem" />
            {props.not_read_chat > 0 ? (
              <Notification>
                {props.not_read_chat <= 300 ? props.not_read_chat : "300+"}
              </Notification>
            ) : null}
          </div>
        </div>
      </RoomWrapper>
    </Link>
  );
};

export default Room;

const RoomWrapper = styled.div`
  position: relative;
  height: auto;
  width: 100%;
  /* margin: 0.563rem 0 1.126rem 0; */
  overflow: hidden;
  display: flex;
  padding: 0.725rem 1rem;

  & img {
    position: relative;
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 2rem;
    cursor: pointer;
    float: left;
    margin-right: 1rem;
  }

  & .preview {
    position: relative;
    padding-right: 2.5rem;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;

    & ${Notification} {
      top: 0;
      right: 0;
      padding: 3px;
    }
  }

  & .room-block-top {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  & img {
    position: relative;
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 2rem;
    cursor: pointer;
    float: left;
  }

  & div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* flex: 1; */
    width: inherit;
  }

  &:hover {
    background-color: #eaeaeb;
  }
`;
