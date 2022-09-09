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
import axios from 'axios';
import Image from 'next/image'
import { Props } from 'next/script'
import { useRouter } from 'next/router'
import { useState } from 'react'

const validationSchema = yup.object({
	email: yup.string().email('Enter a valid email').required('Email is required'),
	password: yup.string().required('Password is required'),
	user_name: yup.string().required('username is required'),
})

const Register = (props: Props) => {
	console.log(27, "here")
	const [errorMessage, setErrorMessage] = useState<string>('');

	const router = useRouter();

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
			user_name: '',
		},
		validationSchema: validationSchema,
		onSubmit: async (values: any) => {

			let admin = null;
            try {
				console.log(values);
                admin = await axios.post("/api/auth/admin/register", values);
            } catch (error) {
                console.log(error)
            }
            // const user = await axios.post("http://"+"localhost"+":"+"3000"+"/user/signin", values);
            
            if(admin !== null && admin.status === 200) {
                router.push('/admin/dashboard');
            } else {
                setErrorMessage("Username or email already exists");
            }
		},
	})
	return (
		<>
			<Box className={styles.container}>
				<Box className={styles.right}>
					<Firework />
					<Box className={styles.redirect}>
						<Typography component='h3'>Hi, Friend!</Typography>
						<Typography component='h4'>Enter your personal details and start your journey with us.</Typography>
						<Link href='/admin/login' passHref>
							<Button variant='contained' size='medium' type='button'>
								Go To Sign in
							</Button>
						</Link>
					</Box>
				</Box>
				<Box className={styles.left}>
					<Box className={styles.container__left}>
						<Typography component='h2'>Sign Up Admin</Typography>
						{(errorMessage !=='') && <Typography component='h4'>{errorMessage}</Typography>}
						<Box className={styles.form__section}>
							<form onSubmit={formik.handleSubmit} className={styles.mainForm}>
								<TextField
									fullWidth
									id='user_name'
									name='user_name'
									label='Username'
									value={formik.values.user_name}
									onChange={formik.handleChange}
									error={formik.touched.user_name && Boolean(formik.errors.user_name)}
									helperText={formik.touched.user_name && formik.errors.user_name}
									sx={{ '& input': { marginLeft: '1.5rem' } }}
								/>
								<TextField
									fullWidth
									id='password'
									name='password'
									label='Password'
									type="password"
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
