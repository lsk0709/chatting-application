import { UserData } from "../../../types/user";
import { UserActionTypes, UserTypes } from "../../actions/user";
import RoomListMock from "../../../apis/roomlist-mock.json";
import FriendListMock from "../../../apis/friends-mock.json";

export interface UserState extends UserData { }

const initialState: UserState = {
    id: 1,
    user_id: 'admin',
    name: 'admin',
    friends_list: FriendListMock,
    room_list: RoomListMock
};

const userReducer = (state = initialState, action: UserActionTypes) => {
    switch (action.type) {
        case UserTypes.SET_ROOM_LIST:
            return {
                ...state,
                room_list: Object.assign(state.room_list, action.payload) 
            };
        case UserTypes.SET_FRIENDS_LIST:
            return {
                ...state,
                friends_list: Object.assign(state.friends_list, action.payload) 
            };

        default:
            return state;
    }
};

export default userReducer;