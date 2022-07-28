import { ChattingDto } from "../../../types/chatting";
import { ChatActionTypes, ChatTypes } from "../../actions/chat";
import ChattingListMock from "../../../apis/chat-mock.json";

export interface ChatState extends ChattingDto {

}

const initialState: ChatState = {
    room_id: -1,
    room_name: '',
    participant: [],
    chatting: ChattingListMock,
    last_read_chat_id: -1,
};

const chatReducer = (state = initialState, action: ChatActionTypes) => {
    switch (action.type) {
        case ChatTypes.ADD_CHATTING:
            return {
                ...state,
                chatting: [...state.chatting, action.payload]
            };
        case ChatTypes.SET_CHAT_LIST:
            return {
                ...state,
                chatting: Object.assign(action.payload, state.chatting)
            };
        case ChatTypes.DELETE_CHAT:
            return {
                ...state,
                chatting: state.chatting.some(chat => chat.id === action.payload) ? state.chatting.filter(chat => chat.id !== action.payload) : state.chatting
            };
        case ChatTypes.UPDATE_CHAT:
            return {
                ...state,
                chatting: state.chatting.map(chat => chat.id === action.payload.id ? action.payload : chat)
            };
        default:
            return state;
    }
}

export default chatReducer;