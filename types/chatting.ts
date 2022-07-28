import { UserResponseDto } from "./user";

// chat state
export interface ChattingDto {
    room_id: number;
    room_name: string;
    participant: Array<UserResponseDto>;
    chatting: Array<ChattingResponseDto>;
    last_read_chat_id: number;
}


// 채팅방들의 참가자 정보를 명확히
export interface RoomListDto {
    room_id: number;
    room_name?: string;
    participant: Array<UserResponseDto>;
    last_chat: string;
    not_read_chat: number;
    last_read_chat_id: number;
    updatedAt?: string;
}

// 서버에서 채팅방 리스트에 대한 정보를 받아올 때
export interface RoomListResponse {
    room_id: number;
    room_name?: string;
    participant: Array<number>;
    last_chat: string;
    not_read_chat: number;
    last_read_chat_id: number;
    updatedAt: string;
}

// 채팅 수신
export interface ChattingResponseDto {
    id: number;
    room_id: number;
    send_user_id: number;
    type: string;
    imgPath: string;
    uploaded: boolean;
    message: string;
    not_read: number;
    createdAt: string;
}

// 채팅 송신
export interface ChattingRequestDto {
    id: number;
    room_id: number;
    send_user_id: number;
    type: 'message' | 'image';
    imgPath: string;
    uploaded: boolean;
    message: string;
    not_read: number;
    createdAt: string;
}

// 서버에 채팅 가져오기
export interface FetchChattingRequest {
    room_id: number;
}