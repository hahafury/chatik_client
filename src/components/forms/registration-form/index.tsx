import styles from './registration-form.module.sass';
import {signUpRequest} from '../../../api/services/auth';
import React from 'react';
import {useFormik} from 'formik';
import {ISignup} from '../../../interfaces/auth';
import {NavigateFunction, useNavigate} from 'react-router-dom';
import {TextField, ThemeProvider, createTheme} from '@mui/material';
import validationSchemas from '../../../validation';

const theme = createTheme({
	components: {
		MuiTextField: {
			styleOverrides: {
				root: {
					width: "100%",
					'& label.Mui-focused': {
						color: "black"
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

const RegistrationForm: React.FC = (): React.ReactElement => {
	const navigate: NavigateFunction = useNavigate();
	const formik = useFormik({
		initialValues: {
			email: '',
			username: '',
			password: '',
			phone: ''
		},
		validationSchema:validationSchemas.signUpSchema,
		async onSubmit(values: ISignup): Promise<void> {
			await signUpRequest(values)
		},
	});

	return (
		<div className={styles.Registration}>
			<form onSubmit={formik.handleSubmit}>
				<div className={styles.loginText}>
					<p className={styles.backText}>Welcome</p>
					<p className={styles.forwardText}>Sign up now</p>
				</div>
				<ThemeProvider theme={theme}>
					<TextField
						id="standard-basic"
						label="Username"
						variant="standard"
						name='username'
						onChange={formik.handleChange}
						value={formik.values.username}
					/>
					{formik.touched.username && formik.errors.username && <p className={styles.error}>{formik.errors.username}</p>}
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
						label="Phone"
						variant="standard"
						name='phone'
						onChange={formik.handleChange}
						value={formik.values.phone}
					/>
					{formik.touched.phone && formik.errors.phone && <p className={styles.error}>{formik.errors.phone}</p>}
					<TextField
						id="standard-basic"
						label="Password"
						variant="standard"
						name='password'
						onChange={formik.handleChange}
						value={formik.values.password}
					/>
					{formik.touched.password && formik.errors.password && <p className={styles.error}>{formik.errors.password}</p>}
					<button className={styles.signUpButton} type="submit">Sign up</button>
				</ThemeProvider>
			</form>
			<div onClick={() => navigate('/login')} className={styles.backToLogin}>
				Already have an account?
			</div>
		</div>
	);
};

export default RegistrationForm