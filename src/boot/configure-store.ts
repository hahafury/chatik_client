import { applyMiddleware, createStore } from "redux";
import combineReducers from "../reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas";
import socketMiddleware from "../redux/middleware/socket";

const sagaMiddleware = createSagaMiddleware();

const configureStore = () => {
	const store = createStore(
		combineReducers,
		composeWithDevTools(
			applyMiddleware(sagaMiddleware, socketMiddleware)
		)
	);
	sagaMiddleware.run(rootSaga);
	return store;
};

export default configureStore;