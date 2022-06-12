import LoginForm from "../../components/forms/login-form";
import styles from "./login-page.module.sass";
import {FunctionComponent, ReactElement, useEffect} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../reducers";
import {NavigateFunction, useNavigate} from "react-router-dom";

const LoginPage: FunctionComponent = (): ReactElement => {
	const {isLoggedIn} = useSelector((state: RootState) => state.auth);
	const navigate: NavigateFunction = useNavigate();

	useEffect(() => {
		isLoggedIn && navigate('/');
	}, [isLoggedIn]);

	return (
		<div className={styles.loginWrapper}>
			<LoginForm/>
		</div>
	);
};

export default LoginPage;

