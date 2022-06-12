import * as yup from 'yup';


const validationSchemas = {
	loginSchema: yup.object().shape({
		email: yup.string()
			.email()
			.required('Please enter email'),
		password: yup.string()
			.required('Please enter password')
			.matches(/[a-zA-Z0-9!@#$%^&]/, 'Must contain only latin letters')
	}),
	signUpSchema: yup.object().shape({
		email: yup.string()
			.email()
			.required(),
		username: yup.string()
			.min(6, 'Too short')
			.max(15,'Too long')
			.matches(/[a-zA-Z0-9!@#$%^&]/, 'Must contain only latin letters')
			.required(),
		password: yup.string()
			.min(6, 'Too Short!')
			.required('Please enter password')
			.matches(/[a-zA-Z0-9!@#$%^&]/, 'Must contain only latin letters')
			.required(),
		phone: yup.string()
			.matches(/^\+?3?8?(0\d{9})$/, 'Invalid phone number')

	}),
	editProfileSchema: yup.object().shape({
		username: yup.string()
			.min(6,'Too short')
			.max(15,'Too long')
			.required()	,
		bio: yup.string()
			.max(50,'Too long'),
		phone: yup.string()
			.matches(/^\+?3?8?(0\d{9})$/, 'Invalid phone number')
			.required()

	})
};

export default validationSchemas;
