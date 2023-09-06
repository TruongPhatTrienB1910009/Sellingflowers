'use client';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import '@/styles/signin.css';
import { pink } from '@mui/material/colors';


// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignIn() {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    return (
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
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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