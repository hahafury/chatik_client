import {APP_ACTIONS} from "./action-types";

export const initializeModal = (modalService: any) => ({
	type: APP_ACTIONS.ACTION_INITIALIZE_MODAL_SERVICE,
	modalService
});
