import {ChatAction} from "../actions/chat/action-interfaces";
import {CHAT_ACTIONS} from "../actions/chat/action-type";
import {Room} from "../interfaces/chat";
import {IUser} from "../interfaces/auth";
import {SocketAction} from "../actions/socket/action-interfaces";
import {SOCKET_ACTIONS} from "../actions/socket/action-types";
import {IRoom} from "../types/chat";

export interface ChatState {
	isFetchingCurrentRoom: boolean;
	isFetchingSearchRooms: boolean;
	isFetchingCurrentRoomMessages: boolean;
	error: object | null;
	currentRoom: IRoom | null;
	rooms: IRoom[] | null;
	searchedRooms: IRoom[] | null;
	searchedUsers: IUser[] | null;
	contacts: IUser[] | null;
}

const initialState: ChatState = {
	isFetchingCurrentRoomMessages: false,
	isFetchingCurrentRoom: false,
	isFetchingSearchRooms: false,
	error: null,
	currentRoom: null,
	rooms: null,
	searchedRooms: null,
	searchedUsers: null,
	contacts: null
};

const chatReducer = (state: ChatState = initialState, action: ChatAction | SocketAction): ChatState => {
	switch (action.type) {
		case CHAT_ACTIONS.ACTION_CHAT_GET_ROOM: {
			return {
				...state,
				currentRoom: action.room
			}
		}
		case CHAT_ACTIONS.ACTION_CHAT_ROOM_REQUEST: {
			return {
				...state,
				isFetchingCurrentRoom: true
			};
		}
		case CHAT_ACTIONS.ACTION_CHAT_GET_ROOMS_SUCCESS: {
			return {
				...state,
				rooms: action.rooms
			};
		}
		case CHAT_ACTIONS.ACTION_CHAT_GET_ROOM_MESSAGES: {
			return {
				...state,
				isFetchingCurrentRoomMessages: true
			}
		}
		case CHAT_ACTIONS.ACTION_CHAT_GET_ROOM_SUCCESS: {
			return {
				...state,
				isFetchingCurrentRoom: false,
				currentRoom: {
					...state.currentRoom,
					...action.room
				}
			};
		}
		case SOCKET_ACTIONS.ACTION_SOCKET_ON_NEW_MESSAGE: {
			const newCurrentRoom = state.currentRoom
				? state.currentRoom._id === action.message.roomId
					? {
						...state.currentRoom as Room,
						messages: state.currentRoom
							? state.currentRoom.messages.concat([action.message])
							: [action.message]
					} : state.currentRoom
				: null;

			state.rooms?.find(room => room._id === action.message.roomId)?.messages.push(action.message);

			return {
				...state,
				rooms: state.rooms && state.rooms?.map(room => {
					if (room._id === action.message.roomId) {
						room.preview = action.message;
					}
					return room;
				}),
				currentRoom: newCurrentRoom
			};
		}
		case CHAT_ACTIONS.ACTION_CHAT_SEARCH_ROOMS: {
			return {
				...state,
				isFetchingSearchRooms: true
			};
		}
		case CHAT_ACTIONS.ACTION_CHAT_SEARCH_ROOMS_SUCCESS: {
			return {
				...state,
				isFetchingSearchRooms: false,
				searchedRooms: action.rooms
			};
		}
		case CHAT_ACTIONS.ACTION_CHAT_GET_CONTACTS_SUCCESS: {
			return {
				...state,
				contacts: action.users
			};
		}
		case CHAT_ACTIONS.ACTION_CHAT_SEARCH_USERS_SUCCESS: {
			return {
				...state,
				searchedUsers: action.users
			}
		}
		case CHAT_ACTIONS.ACTION_CHAT_CLEAR_FOUND_USERS: {
			return {
				...state,
				searchedUsers: null
			}
		}
		case SOCKET_ACTIONS.ACTION_SOCKET_ON_NEW_GROUP: {
			return {
				...state,
				rooms: state.rooms?.concat([action.room]) || []
			};
		}
		case CHAT_ACTIONS.ACTION_CHAT_CLEAR_FOUND_ROOMS: {
			return {
				...state,
				searchedRooms: null
			}
		}
		case CHAT_ACTIONS.ACTION_CHAT_CLEAR_STORE: {
			return initialState;
		}
		default: {
			return state;
		}
	}
};

export default chatReducer;