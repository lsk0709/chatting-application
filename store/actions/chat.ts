import { ChattingResponseDto, FetchChattingRequest } from "../../types/chatting";

export enum ChatTypes {
    ADD_CHATTING = 'chat/ADD_CHATTING',
    SET_CHAT_LIST = 'chat/SET_CHAT_LIST',
    DELETE_CHAT = 'chat/DELETE_CHAT',
    UPDATE_CHAT = 'chat/UPDATE_CHAT',
}


export interface AddChattingAction {
    type: ChatTypes.ADD_CHATTING;
    payload: ChattingResponseDto;
}
export interface SetChatListAction {
    type: ChatTypes.SET_CHAT_LIST;
    payload: Array<ChattingResponseDto>;
}
export interface DelChatAction {
    type: ChatTypes.DELETE_CHAT;
    payload: number;
}
export interface UpdateChatAction {
    type: ChatTypes.UPDATE_CHAT;
    payload: ChattingResponseDto;
}


export type ChatActionTypes =
    | AddChattingAction
    | SetChatListAction
    | DelChatAction
    | UpdateChatAction;


    // 채팅방에 채팅 추가
export const addChatting = (chat: ChattingResponseDto): AddChattingAction => ({
    type: ChatTypes.ADD_CHATTING,
    payload: chat
});

// 서버에서 가져온 채팅 데이터 store에 저장
export const setChatListAction = (chatList: Array<ChattingResponseDto>) => ({
    type: ChatTypes.SET_CHAT_LIST,
    payload: chatList
});

// 채팅 삭제
export const delChatAction = (chat_id: number) => ({
    type: ChatTypes.DELETE_CHAT,
    payload: chat_id
});

// 채팅 수정
export const updateChatAction = (chat: ChattingResponseDto) => ({
    type: ChatTypes.UPDATE_CHAT,
    payload: chat
});



export const ChatActions = {
    addChatting,
    setChatListAction,
    delChatAction,
    updateChatAction
};