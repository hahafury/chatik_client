import {APP_ACTIONS} from "./action-types";

export interface AppInitializeModalServiceAction {
	type: APP_ACTIONS.ACTION_INITIALIZE_MODAL_SERVICE;
	modalService: any;
}

export type AppAction = AppInitializeModalServiceAction;