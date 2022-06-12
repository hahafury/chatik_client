import {FunctionComponent, ReactElement, useState} from "react";
import { Provider } from "react-redux";
import configureStore from "./configure-store";
import App from "../App";

const Setup: FunctionComponent = (): ReactElement => {
	const [store] = useState(configureStore);

	return (
		<Provider store={store}>
			<App />
		</Provider>
	);
};

export default Setup;