import { UserResponseDto } from '../types/user';
import friendList from './friends-mock.json'
// 친구 목록 가져옴
export const fecthFriendsRequest = async (id: number) => {
    // axios를 통한 데이터 호출이 아닌 목업데이터를 활용함!
    const friends: Array<UserResponseDto> = friendList
    return friends
};

