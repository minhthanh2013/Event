import { Box } from '@material-ui/core'
import { Button, TextField, Typography } from '@mui/material'
import { IconButton } from '@material-ui/core'
import { FcGoogle } from 'react-icons/fc'
import { BsFacebook } from 'react-icons/bs'
import styles from '../../styles/Register.module.scss'
import * as yup from 'yup'
import { withFormik, FormikProps, FormikErrors, Form, Field, useFormik } from 'formik'
import { margin, padding } from '@mui/system'
import Firework from '../../components/Firework'
import Link from 'next/link'
import Image from 'next/image'
import { Props } from 'next/script'
const validationSchema = yup.object({
	email: yup.string().email('Enter a valid email').required('Email is required'),
	password: yup.string().required('Password is required'),
	firstname: yup.string().required('firstname is required'),
	lastname: yup.string().required('lastname is required'),
	username: yup.string().required('username is required'),
})

const Register = (props: Props) => {
	const formik = useFormik({
		initialValues: {
			lastname: '',
			firstname: '',
			email: '',
			password: '',
			username: '',
		},
		validationSchema: validationSchema,
		onSubmit: (values: any) => {
			alert(JSON.stringify(values, null, 5))
		},
	})
	return (
		<>
			<Box className={styles.container}>
				<Box className={styles.right}>
					<Firework />
					<Box className={styles.redirect}>
						<Typography component='h3'>Hello, Friend!</Typography>
						<Typography component='h4'>Enter your personal details and start your journey with us.</Typography>
						<Link href='/account/login' passHref>
							<Button variant='contained' size='medium' type='button'>
								Go To Sign in
							</Button>
						</Link>
					</Box>
				</Box>
				<Box className={styles.left}>
					<Box className={styles.container__left}>
						<Typography component='h2'>Sign Up</Typography>
						<Box className={styles.iconLogin__section}>
							<IconButton>
								<FcGoogle />
							</IconButton>
							<IconButton
								style={{
									color: '#3C5A99',
								}}
							>
								<BsFacebook />
							</IconButton>
						</Box>
						<Box className={styles.or__section}>
							<hr />
							<p>or</p>
							<hr />
						</Box>
						<Box className={styles.form__section}>
							<form onSubmit={formik.handleSubmit} className={styles.mainForm}>
								<TextField
									fullWidth
									id='username'
									name='username'
									label='Username'
									value={formik.values.username}
									onChange={formik.handleChange}
									error={formik.touched.username && Boolean(formik.errors.username)}
									helperText={formik.touched.username && formik.errors.username}
									sx={{ '& input': { marginLeft: '1.5rem' } }}
								/>
								<TextField
									fullWidth
									id='password'
									name='password'
									label='Password'
									value={formik.values.password}
									onChange={formik.handleChange}
									error={formik.touched.password && Boolean(formik.errors.password)}
									helperText={formik.touched.password && formik.errors.email}
									sx={{ my: '2rem', '& input': { marginLeft: '1.5rem' } }}
								/>
								<TextField
									fullWidth
									id='email'
									name='email'
									label='Email'
									value={formik.values.email}
									onChange={formik.handleChange}
									error={formik.touched.email && Boolean(formik.errors.email)}
									helperText={formik.touched.email && formik.errors.email}
									sx={{ '& input': { marginLeft: '1.5rem' } }}
								/>
								<TextField
									fullWidth
									id='firstname'
									name='firstname'
									label='First Name'
									value={formik.values.firstname}
									onChange={formik.handleChange}
									error={formik.touched.firstname && Boolean(formik.errors.firstname)}
									helperText={formik.touched.firstname && formik.errors.firstname}
									sx={{ my: '2rem', '& input': { marginLeft: '1.5rem' } }}
								/>
								<TextField
									fullWidth
									id='lastname'
									name='lastname'
									label='Last Name'
									value={formik.values.lastname}
									onChange={formik.handleChange}
									error={formik.touched.lastname && Boolean(formik.errors.lastname)}
									helperText={formik.touched.lastname && formik.errors.lastname}
									sx={{ mb: '1.5rem', '& input': {marginLeft:'1.5rem'}}}
								/>

								<Button variant='contained' size='medium' type='submit'>
									Sign up
								</Button>
							</form>
						</Box>
					</Box>
				</Box>
			</Box>
		</>
	)
}

export default Register
