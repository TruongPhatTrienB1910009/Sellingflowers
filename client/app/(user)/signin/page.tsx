'use client';
import { handleSignIn } from '@/services/homeService';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import '@/styles/signin.css';
import { signIn, signOut } from '@/redux/features/auth-slice';
import { useDispatch } from 'react-redux';

import ProgressBar from '@/components/common/ProgressBar';
import { validateForm } from '@/utils/validateForm';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignIn() {
    const [loadingPage, setLoadingPage] = React.useState(false)
    const dispatch = useDispatch();
    const [errors, setErrors] = React.useState<any>({})
    const [valid, setValid] = React.useState(false)

    const handleValidateForm = (data: any) => {
        const error = validateForm(data);

        if (Object.keys(error).length === 0) {
            return true;
        } else {
            setErrors(error);
            return false;
        }
    }


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const user = {
            email: data.get('email'),
            password: data.get('password'),
        };

        const isValidate = handleValidateForm(user);

        if (isValidate) {
            const userSignIn = await handleSignIn(user);
            if (userSignIn && userSignIn.EC === 0) {
                dispatch(signIn(userSignIn.DT));
                localStorage.setItem('accesstoken', userSignIn.DT.accesstoken);
                if (userSignIn.DT.groupRoles.id == 3) {
                    // router.push("/dashboard")
                    location.href = "http://localhost:3001/dashboard"
                } else {
                    // router.push("/");
                    location.href = "http://localhost:3001/"
                }
            }
        } else {
            setValid(!setValid);
        }
    };

    React.useEffect(() => {
        // if (loadingPage) {
        //     const timer = setTimeout(() => {
        //         setLoadingPage(false);
        //     }, 2000);
        //     return () => clearTimeout(timer);
        // }
    }, [valid]);

    return (
        <>
            {
                (loadingPage) ? (
                    <ProgressBar />
                ) : (
                    <ThemeProvider theme={defaultTheme}>
                        <Container component="main" maxWidth="sm">
                            <Box
                                sx={{
                                    marginTop: 8,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Typography component="div" className='title'>
                                    <Avatar src='/images/signin.png' sx={{ m: 1, mr: 2, bgcolor: 'secondary.main' }} />
                                    Đăng nhập vào Green.
                                </Typography>
                                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
                                    <Box> 
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email"
                                            name="email"
                                            autoComplete="email"
                                            autoFocus
                                            className='input-field'
                                            sx={styleInput}
                                        />
                                        <span style={{ fontSize: '12px', color: 'red' }}>{errors.email ? errors.email : ''} </span>
                                    </Box>
                                    <Box>
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="password"
                                            label="Mật khẩu"
                                            type="password"
                                            id="password"
                                            autoComplete="current-password"
                                            className='input-field'
                                            sx={styleInput}
                                        />
                                        {errors.password && <span style={{ fontSize: '12px', color: 'red' }}>{errors.password}</span>}
                                    </Box>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                        className='btn'
                                    >
                                        Đăng Nhập
                                    </Button>
                                    <Grid container>
                                        <Grid item xs>
                                            <Link href="#" variant="body2" className='link'>
                                                Quên mật khẩu?
                                            </Link>
                                        </Grid>
                                        <Grid item>
                                            <Link href="/signup" variant="body2" className='link'>
                                                {"Chưa có mật khẩu? Đăng ký"}
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Box >
                        </Container >
                    </ThemeProvider >
                )
            }
        </>
    );
}

const styleInput = {
    width: '100%',
    "& .MuiOutlinedInput-root": {
        "&.Mui-focused fieldset": {
            borderColor: "green"
        }
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'green', // Change the underline color when in focus
    },
    '& .MuiInputLabel-root.Mui-focused': {
        color: 'green', // Change the label color when in focus
    },
    '& .MuiInputBase-root.Mui-focused': {
        color: 'green', // Change the text color when in focus
    },
}   