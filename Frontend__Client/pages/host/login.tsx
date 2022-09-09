import { Box } from '@material-ui/core'
import { Button, TextField, Typography } from '@mui/material'
import { IconButton } from '@material-ui/core'
import { FcGoogle } from 'react-icons/fc'
import { BsFacebook } from 'react-icons/bs'
import React, { useState } from 'react'
import styles from '../../styles/Login.module.scss'
import * as yup from 'yup'
import { withFormik, FormikProps, FormikErrors, Form, Field, useFormik } from 'formik'
import { margin, padding } from '@mui/system'
import Firework from '../../components/Firework'
import Link from 'next/link'
import Image from 'next/image'
import axios from 'axios'
import { Props } from 'next/script'
import { useRouter } from 'next/router'

const validationSchema = yup.object({
	username: yup
		.string()
		.required('Username is required')
		.trim()
		.min(8, 'Username must be at least 8 characters')
		.max(20, 'Username must be less than 20 characters'),
	password: yup
		.string()
		.required('Password is required')
		.trim()
		.min(8, 'Password must be at least 8 characters')
		.max(20, 'Password must be less than 20 characters'),
})
const Login = (props: Props) => {
	const [errorMessage, setErrorMessage] = useState<string>('')

	const router = useRouter()

	const formik = useFormik({
		initialValues: {
			username: '',
			password: '',
		},
		validationSchema: validationSchema,
		onSubmit: async (values: any) => {
			let host = null
			try {
				host = await axios.post('/api/auth/host/login', values)
			} catch (error) {
				if (error.response.status === 403) {
					setErrorMessage('You are banned from this service')
				} else {
					setErrorMessage('Invalid username or password')
				}

				return
			}
			// const user = await axios.post("http://"+"localhost"+":"+"3000"+"/user/signin", values);

			if (host !== null && host.status === 200) {
				router.push('/host/dashboard')
			} else {
				setErrorMessage('Invalid username or password')
			}
			// console.log(errorMessage);
		},
	})

	return (
		<>
			<Box className={styles.container}>
				<Box className={styles.left}>
					<Box className={styles.container__left}>
						<Typography component='h2'>Sign in to Evenity</Typography>
						{errorMessage !== '' && <Typography component='h4'>{errorMessage}</Typography>}
						<Box className={styles.form__section}>
							<form
								onSubmit={formik.handleSubmit}
								onKeyPress={(e) => e.key === 'Enter' && formik.handleSubmit()}
								className={styles.mainForm}
							>
								<TextField
									fullWidth
									sx={{ '& div > input': { marginLeft: '30px' } }}
									id='username'
									name='username'
									label='username'
									value={formik.values.username}
									onChange={formik.handleChange}
									error={formik.touched.username && Boolean(formik.errors.username)}
									helperText={formik.touched.username && formik.errors.username}
								/>
								<TextField
									fullWidth
									id='password'
									name='password'
									label='Password'
									type='password'
									value={formik.values.password}
									onChange={formik.handleChange}
									error={formik.touched.password && Boolean(formik.errors.password)}
									helperText={formik.touched.password && formik.errors.username}
									sx={{ my: '1.5rem', '& div > input': { marginLeft: '30px' } }}
								/>
								<Button variant='contained' size='medium' type='submit'>
									Sign in
								</Button>
							</form>
						</Box>
					</Box>
				</Box>
				<Box className={styles.right}>
					<Firework />
					<Box className={styles.redirect}>
						<Typography component='h3'>Welcome Back!</Typography>
						<Typography component='h4'>To keep connected with us please log in with your personal info.</Typography>
						<Link href='/host/register' passHref>
							<Button
								variant='contained'
								size='medium'
								type='button'
								sx={{
									bgcolor: 'hwb(257 27% 1%)',
									width: '25s0px',
									height: '50px',
									borderRadius: '20px',
									boxShadow:
										'0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
									'&:hover': { backgroundColor: 'hwb(257 27% 30%)' },
								}}
							>
								Create New Account
							</Button>
						</Link>
					</Box>
				</Box>
			</Box>
		</>
	)
}

export default Login
