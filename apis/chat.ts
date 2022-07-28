import { ChattingResponseDto, FetchChattingRequest, RoomListResponse } from "../types/chatting";
import room from './roomlist-mock.json'
import chat from './chat-mock.json'
import _ from 'lodash'

// 현재 채팅방 목록을 가져옴
export const fetchRoomList = async (userId: number) => {
    // axios를 통한 데이터 호출이 아닌 목업데이터를 활용함!
    const roomList: Array<RoomListResponse> = room;
    return roomList;
};

// 현재 채팅방 목록을 가져옴
export const fetchRoomInfo = async (room_id: number) => {
    // axios를 통한 데이터 호출이 아닌 목업데이터를 활용함!
    const roomInfo: RoomListResponse = room.find(r=>r.room_id === room_id);
    return roomInfo;
};

// 채팅방의 채팅 데이터를 가져옴
export const fetchChatting = async (room_id: number) => {
    const chatting: Array<ChattingResponseDto> = chat;
    return chatting;
};