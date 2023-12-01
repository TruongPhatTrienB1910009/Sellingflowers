'use client';
import { handleSignUp } from '@/services/homeService';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '@/styles/signin.css';
import { useRouter } from 'next/navigation';
import { validateForm } from '@/utils/validateForm';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignUp() {
    const router = useRouter()
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
            confirm: data.get('confirm'),
            name: data.get('name'),
            phone: data.get('phone'),
            gender: data.get('gender'),
        };

        const isValidate = handleValidateForm(user);
        if (isValidate) {
            const newUser = await handleSignUp(user);
            if (newUser) {
                router.push('/signin');
            }
        } else {
            setValid(!setValid);
        }
    };

    React.useEffect(() => {

    }, [valid]);

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="sm">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="div" className='title'>
                        <Avatar src='/images/signup.png' sx={{ m: 1, mr: 2, bgcolor: 'secondary.main' }} />
                        Đăng ký tài khoản Green.
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="name"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Tên"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="phone"
                                    label="Điện thoại"
                                    name="phone"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    autoComplete="email"
                                    sx={styleInput}
                                />
                                <span style={{ fontSize: '12px', color: 'red' }}>{errors.email ? errors.email : ''} </span>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Mật khẩu"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    sx={styleInput}
                                />
                                <span style={{ fontSize: '12px', color: 'red' }}>{errors.password ? errors.password : ''}</span>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="confirm"
                                    label="Xác nhận mật khẩu"
                                    type="password"
                                    id="confirm"
                                    autoComplete="new-password"
                                    sx={styleInput}
                                />
                                <span style={{ fontSize: '12px', color: 'red' }}>{errors.password ? errors.password : ''}</span>
                            </Grid>
                            <Grid item xs={12}>
                                <div style={{
                                    display: 'flex',
                                    gap: '40px',
                                    padding: '5px 10px'
                                }}>
                                    <label style={{color: '#379683'}}>Giới tính:</label>
                                    <div style={{
                                        display: 'flex',
                                    }}>
                                        <div style={{
                                            width: '60px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            marginRight: '60px'
                                        }}>
                                            <label>Nam</label>
                                            <input type="radio" name="gender" value="1" />
                                        </div>
                                        <div style={{
                                            width: '50px',
                                            display: 'flex',
                                            justifyContent: 'space-between'
                                        }}>
                                            <label>Nữ</label>
                                            <input type="radio" name="gender" value="0" />
                                        </div>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            className='btn'
                        >
                            Đăng ký
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/signin" variant="body2" className='link'>
                                    Đã có mật khẩu? Đăng nhập
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

const styleInput = {
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