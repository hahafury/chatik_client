import { CombinedState, Reducer, combineReducers } from "redux";
import authReducer, {AuthState} from "./auth";
import chatReducer, {ChatState} from "./chat";
import appReducer, {AppState} from "./app";



export interface _AppState {
	auth: AuthState,
	chat: ChatState,
	app: AppState
}

const rootReducer: Reducer<CombinedState<_AppState>> = combineReducers({
	auth: authReducer,
	chat: chatReducer,
	app: appReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;