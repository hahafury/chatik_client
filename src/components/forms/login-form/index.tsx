import styles from "./login-form.module.sass";
import React from "react";
import {useFormik} from "formik";
import {ILogin} from "../../../interfaces/auth";
import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from "redux";
import {login} from "../../../actions/auth/action-creators";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {RootState} from "../../../reducers";
import Loading from "../../loading";
import {TextField, ThemeProvider, createTheme} from "@mui/material";
import validationSchemas from "../../../validation";


const theme = createTheme({
	components: {
		MuiTextField: {
			styleOverrides: {
				root: {
					width: "100%",
					'& label.Mui-focused': {
						color: "white"
					},
					'&:hover': {
						borderColor: "yellow"
					},
					label: {
						color: "white"
					}
				},
			},
		},
	},
});

const LoginForm: React.FC = (): React.ReactElement => {
	const {isFetching} = useSelector((state: RootState) => state.auth);
	const dispatch: Dispatch = useDispatch();
	const navigate: NavigateFunction = useNavigate();

	const onClickDontHaveAccount = () => {
		navigate('/signup');
	};

	const formik = useFormik({
			initialValues: {
				email: '',
				password: '',
			},
			// validationSchema: validationSchemas.loginSchema,
			onSubmit(values: ILogin): void {
				dispatch(login({
					email: values.email,
					password: values.password
				}));
			},
		}
	);

	return (
		<div className={styles.wrapperLoginForm}>
			<div className={styles.partLoginForm}>
				<div className={styles.loginFormContent}>
					<div className={styles.loginText}>
						<p className={styles.backText}>Welcome back</p>
						<p className={styles.forwardText}>Login to your account</p>
					</div>
					<div className={styles.loginMenu}>
						<form onSubmit={formik.handleSubmit}>
							<ThemeProvider theme={theme}>
								<TextField
									id="standard-basic"
									label="Email"
									variant="standard"
									name='email'
									onChange={formik.handleChange}
									value={formik.values.email}
								/>
								{formik.touched.email && formik.errors.email && <p className={styles.error}>{formik.errors.email}</p>}
								<TextField
									id="standard-basic"
									label="Password"
									variant="standard"
									name='password'
									placeholder='******'
									onChange={formik.handleChange}
									value={formik.values.password}
									type='password'
								/>
								{formik.touched.password && formik.errors.password &&
                    <p className={styles.error}>{formik.errors.password}</p>}
							</ThemeProvider>
							<div className={styles.loginButtons}>
								<button type='submit' className={styles.loginNowButton} disabled={isFetching}>
									{
										isFetching ? <Loading/> : 'Login'
									}
								</button>
							</div>
							<div className={styles.registrationButton} onClick={onClickDontHaveAccount}>
								Dont have an account?
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};
export default LoginForm