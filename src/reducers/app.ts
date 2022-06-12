import {APP_ACTIONS} from '../actions/app/action-types';
import {AppAction} from '../actions/app/action-interfaces';
import {Socket} from 'socket.io-client';
import {ApiCalls, IModalService} from '../types/app';

export interface AppState {
	modalService: IModalService;
	socket: Socket | null;
	api: typeof ApiCalls;
}

const initialState: AppState = {
	api: ApiCalls,
	modalService: null as unknown as IModalService,
	socket: null
};

const appReducer = (state: AppState = initialState, action: AppAction): AppState => {
	switch (action.type) {
		case APP_ACTIONS.ACTION_INITIALIZE_MODAL_SERVICE: {
			return {
				...state,
				modalService: action.modalService
			};
		}
		default:
			return state;
	}
};

export default appReducer;