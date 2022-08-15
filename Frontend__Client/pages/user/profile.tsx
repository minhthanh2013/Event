import { Avatar, Box, Button, FormControl, IconButton, Input, InputAdornment, InputLabel, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import Header from '../../components/Header'
import Divider from '@mui/material/Divider'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import Alert from '@mui/material/Alert'
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';
import { useRouter } from 'next/router'

const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).max(32).required(),
})

interface State {
    firstName: string
    lastName: string
    password: string
    email: string
    showPassword: boolean
}

const UserProfile = (props: any) => {
    const router = useRouter()
    const [data, setData] = useState<State>();
    const [values, setValues] = React.useState<State>({
        firstName:  '',
        password: '',
        lastName: '',
        email: '',
        showPassword: false,
    })

    const [isEdit, setIsEdit] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [isErrorEmail, setIsErrorEmail] = useState(false)
    const [openErrorEmail, setOpenErrorEmail] = React.useState(true)
    const forceUpdate = React.useReducer(() => ({}), {})[1] as () => void
    useEffect(() => {
        const fetchConferences = async () => {
			// Fetch conference by user id
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+props.value.toString(),
                },
            }
			const dataResult = await fetch(`/api/user/${props.tempDecode.sub}`, config);
			const cateResult = await dataResult.json();
			setValues(cateResult)
		}
        fetchConferences();
    }, []);
    const handleEdit = () => {
        setIsEdit(!isEdit)
    }

    const handleCancel = () => {
        setIsEdit(!isEdit)
        // console.log(64)
        // forceUpdate;
        router.push('/user/profile');
    }

    const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value })
    }

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        })
    }

    const handleSubmit = () => {
        console.log(values)

        //nếu trả về lỗi thì setIsErrorEmail(true)
        setIsErrorEmail(true)
        //nếu trả thành công thì setIsSuccess(true)
    }
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    }

    function stringToColor(string: any) {
        let hash = 0
        let i
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash)
        }
        let color = '#'
        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff
            color += `00${value.toString(16)}`.slice(-2)
        }
        return color
    }
    function stringAvatar(name: any) {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: `${name.split(' ')[0][0]}`.toUpperCase(),
        }
    }
    return (
        <>
            <Header {...props} />
            <Divider sx={{ borderColor: '#4F3398' }} />
            <Box sx={{ width: '80vw', mx: 'auto' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6, mb: 7 }}>
                    <Typography sx={{ color: '#4F3398', fontWeight: '700', fontSize: '3rem' }}>My Profile</Typography>
                </Box>
                <Box sx={{ display: 'flex', height: 'auto' }}>
                    <Box sx={{ width: '30%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <IconButton>
                            <Avatar {...stringAvatar(`${values.firstName}`)} sx={{ width: 250, height: 250 }} />
                        </IconButton>
                    </Box>
                    <Box sx={{ width: '70%' }}>
                        <form>
                            <Box sx={{ display: 'flex', gap: '6rem', mb: '5rem', justifyContent: 'space-evenly' }}>
                                <FormControl variant='standard' sx={{ width: '400px' }}>
                                    <InputLabel sx={{ fontSize: '1.4rem' }}>First Name</InputLabel>
                                    <Input
                                        disabled={!isEdit}
                                        id='component-simple'
                                        sx={{ fontSize: '1.4rem' }}
                                        // defaultValue={values.firstName}
                                        value={values.firstName}
                                        onChange={handleChange('firstName')}
                                    />
                                </FormControl>
                                <FormControl variant='standard' sx={{ width: '400px' }}>
                                    <InputLabel sx={{ fontSize: '1.4rem' }}>Last Name</InputLabel>
                                    <Input
                                        disabled={!isEdit}
                                        id='component-simple'
                                        sx={{ fontSize: '1.4rem' }}
                                        value={values.lastName}
                                        // defaultValue={values.lastName}
                                        onChange={handleChange('lastName')}
                                    />
                                </FormControl>
                            </Box>

                            <Box sx={{ display: 'flex', gap: '6rem', mb: '5rem', justifyContent: 'space-evenly' }}>
                                <FormControl variant='standard' sx={{ width: '400px' }}>
                                    <InputLabel sx={{ fontSize: '1.4rem' }}>Email</InputLabel>
                                    <Input
                                        id='component-simple'
                                        sx={{ fontSize: '1.4rem' }}
                                        value={values.email}
                                        // defaultValue={values.email}
                                        onChange={handleChange('email')}
                                        disabled={!isEdit}
                                    />
                                    {isErrorEmail && (
                                        <Collapse in={isErrorEmail}>
                                            <Alert
                                                severity="error"
                                                action={
                                                    <IconButton
                                                        aria-label='close'
                                                        color='inherit'
                                                        size='small'
                                                        onClick={() => {
                                                            setIsErrorEmail(false)
                                                        }}
                                                    >
                                                        <CloseIcon fontSize='inherit' />
                                                    </IconButton>
                                                }
                                                sx={{ mb: 2 }}
                                            >
                                                Bỏ cái lỗi email ở đây
                                            </Alert>
                                        </Collapse>
                                    )}
                                </FormControl>
                                <FormControl variant='standard' sx={{ width: '400px' }}>
                                    <InputLabel sx={{ fontSize: '1.4rem' }}>Password</InputLabel>
                                    <Input
                                        disabled={!isEdit}
                                        id='standard-adornment-password'
                                        type={values.showPassword && isEdit ? 'text' : 'password'}
                                        value={values.password}
                                        onChange={handleChange('password')}
                                        endAdornment={
                                            <InputAdornment position='end'>
                                                <IconButton
                                                    aria-label='toggle password visibility'
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    disabled={!isEdit}
                                                >
                                                    {values.showPassword && isEdit ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                            </Box>

                            <Box sx={{ display: 'flex', gap: '3rem', justifyContent: 'center' }}>
                                {isEdit ? (
                                    <>
                                        <Button
                                            variant='outlined'
                                            sx={{ color: '#4F3398', borderColor: '#4F3398', width: '130px' }}
                                            size='large'
                                            onClick={handleCancel}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            variant='contained'
                                            size='large'
                                            sx={{ color: 'white', bgcolor: '#4F3398', width: '130px' }}
                                            onClick={handleSubmit}
                                        >
                                            Save
                                        </Button>{' '}
                                    </>
                                ) : (
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                                        <Button
                                            variant='contained'
                                            size='large'
                                            sx={{ color: 'white', bgcolor: '#4F3398', width: '130px' }}
                                            onClick={handleEdit}
                                        >
                                            Edit
                                        </Button>
                                    </Box>
                                )}
                            </Box>
                        </form>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export async function getServerSideProps(ctx: any) {
    // Fetch data from external API
    // Pass data to the page via props
    let raw = null
    try {
        raw = ctx.req.cookies
    } catch (e) {
        return { props: {} }
    }
    try {
        if (raw.OursiteJWT.toString()) {
            let token = 'OursiteJWT'
            let value = raw.OursiteJWT.toString()
            let tempDecode = JSON.parse(Buffer.from(value.split('.')[1], 'base64').toString())
            return {
                props: {
                    token,
                    value,
                    tempDecode,
                },
            }
        }
        return { props: {} }
    } catch (error) {
        return { props: {} }
    }
}
export default UserProfile

