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
import axios from 'axios'
import Image from 'next/image'
import { Props } from 'next/script'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const ITEM_HEIGHT = 35;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

const validationSchema = yup.object({
	email: yup.string().email('Enter a valid email').required('Email is required').trim(),
	password: yup
		.string()
		.required('Password is required')
		.min(8, 'Password must be at least 8 characters')
		.max(20, 'Password must be less than 20 characters')
		.trim(),
	first_name: yup
		.string()
		.required('firstname is required')
		.trim(),
	last_name: yup
		.string()
		.required('lastname is required')
		.trim(),
	user_name: yup
		.string()
		.required('username is required')
		.min(8, 'Username must be at least 8 characters')
		.max(20, 'Username must be less than 20 characters')
		.trim(),
	category: yup
		.array()
		.max(3, 'Please select maximum 3 categories!'),
})
interface CategoryProps {
	status: boolean;
	data: CategoryProp[];
}

interface CategoryProp {
	category_id: number;
	category_name: string;
}

const Register = (props: Props) => {
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [categoryList, setCategoryList] = useState<CategoryProps>()

	useEffect(() => {
		const fetchDataCate = async () => {
			const dataResult = await fetch("/api/conference-category/get-all");
			const cateResult = await dataResult.json();
			setCategoryList(cateResult)
		}

		fetchDataCate();
	}, [])
	const router = useRouter()

	const formik = useFormik({
		initialValues: {
			last_name: '',
			first_name: '',
			email: '',
			password: '',
			user_name: '',
			category: [],
		},
		validationSchema: validationSchema,
		onSubmit: async (values: any) => {
			let user = null
			try {
				user = await axios.post('/api/auth/user/register', values)
			} catch (error) {
				console.log(error)
			}
			// const user = await axios.post("http://"+"localhost"+":"+"3000"+"/user/signin", values);

			if (user !== null && user.status === 200) {
				router.push('/')
			} else {
				setErrorMessage('Username or email already exists')
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
						<Link href='/user/login' passHref>
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
								Go To Sign in
							</Button>
						</Link>
					</Box>
				</Box>
				<Box className={styles.left}>
					<Box className={styles.container__left}>
						<Typography component='h2'>Sign Up User</Typography>
						{errorMessage !== '' && <Typography component='h4' sx={{ color: 'red', marginTop: '2rem' }}>{errorMessage}</Typography>}
						<Box className={styles.form__section}>
							<form
								onSubmit={formik.handleSubmit}
								className={styles.mainForm}
								onKeyPress={(e) => e.key === 'Enter' && formik.handleSubmit()}
							>
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
									type='password'
									value={formik.values.password}
									onChange={formik.handleChange}
									error={formik.touched.password && Boolean(formik.errors.password)}
									helperText={formik.touched.password && formik.errors.password}
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
									id='first_name'
									name='first_name'
									label='First Name'
									value={formik.values.first_name}
									onChange={formik.handleChange}
									error={formik.touched.first_name && Boolean(formik.errors.first_name)}
									helperText={formik.touched.first_name && formik.errors.first_name}
									sx={{ my: '2rem', '& input': { marginLeft: '1.5rem' } }}
								/>
								<TextField
									fullWidth
									id='last_name'
									name='last_name'
									label='Last Name'
									value={formik.values.last_name}
									onChange={formik.handleChange}
									error={formik.touched.last_name && Boolean(formik.errors.last_name)}
									helperText={formik.touched.last_name && formik.errors.last_name}
									sx={{ mb: '1.5rem', '& input': { marginLeft: '1.5rem' } }}
								/>
								<InputLabel sx={{ mb: '0.5rem' }}>What are you interesting at? (maximum 3 items)</InputLabel>
								<FormControl sx={{ mb: '1.5rem' }}>
									<InputLabel id="category-label">Category</InputLabel>
									<Select
										sx={{ marginBottom: '1rem', paddingLeft: '1.5rem' }}
										multiple
										label="Category"
										name="category"
										id="category"
										value={formik.values.category}
										onChange={formik.handleChange}
										input={<OutlinedInput id="select-multiple-items" label="Tag" />}
										renderValue={(selected) => selected.join(', ')}
										error={formik.touched.category && Boolean(formik.errors.category)}
										helperText={formik.touched.category && formik.errors.category}
										MenuProps={MenuProps}
									>
										{categoryList?.data.map((dataItem) => (
											<MenuItem
												key={dataItem.category_id} value={dataItem.category_name}
											>
												{dataItem.category_name}
											</MenuItem>
										))}
									</Select>
								</FormControl>


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
