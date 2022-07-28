import { RoomListResponse } from "../../types/chatting";
import { UserResponseDto } from "../../types/user";

export enum UserTypes {
    SET_FRIENDS_LIST = 'user/SET_FRIENDS_LIST',
    SET_ROOM_LIST = 'user/SET_ROOM_LIST'
}

export type UserActionTypes =
    | SetRoomListAction
    | SetFriendsListAction

export interface SetRoomListAction {
    type: UserTypes.SET_ROOM_LIST;
    payload: Array<RoomListResponse>;
}

export interface SetFriendsListAction {
    type: UserTypes.SET_FRIENDS_LIST;
    payload: Array<UserResponseDto>;
}

export const setFriendsListAction = (friendList: Array<UserResponseDto>) => ({
    type: UserTypes.SET_FRIENDS_LIST,
    payload: friendList
});

export const setRoomListAction = (roomList: Array<RoomListResponse>) => ({
    type: UserTypes.SET_ROOM_LIST,
    payload: roomList
});

export const UserActions = {
    setFriendsListAction,
    setRoomListAction
};
