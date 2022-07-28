import { combineReducers } from "redux";
import chat, { ChatState } from "./chat";
import user, { UserState } from "./user";

export interface RootState {
    user: UserState;
    chat: ChatState;
}

const rootReducer = combineReducers({
    user,
    chat
});

export default rootReducer;