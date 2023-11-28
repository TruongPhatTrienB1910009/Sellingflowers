"use client"
import { signIn } from '@/redux/features/auth-slice';
import { handleSignIn } from '@/services/homeService';
import '@/styles/admin/formsignin.css'
import { validateForm } from '@/utils/validateForm';
import { Box } from '@mui/material';
import React from 'react'
import ReCAPTCHA from "react-google-recaptcha";
import { useDispatch } from 'react-redux';


const page = () => {
  const dispatch = useDispatch();
  const [errors, setErrors] = React.useState<any>({})
  const [valid, setValid] = React.useState(false)

  function onChange(value: any) {
    console.log("Captcha value:", value);
  }

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
    console.log(event)
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
          location.href = "http://localhost:3001/admin/dashboard"
        } else {
          // router.push("/");
          location.href = "http://localhost:3001/"
        }
      }
    } else {
      setValid(!setValid);
    }
  }

  return (
    <>
      <Box component={"form"} onSubmit={handleSubmit} className="login">
        <input name='email' type="text" placeholder="Username" />
        <input name='password' type="password" placeholder="Password" />
        <ReCAPTCHA
          sitekey="6Lcd5xspAAAAAGFc3PocJV3GWxfqbQ6snlEK-r3O"
          onChange={onChange}
        />
        <button type='submit'>Đăng nhập</button>
      </Box>
      <a href="https://codepen.io/davinci/" target="_blank">check my other pens</a>
    </>
  )
}

export default page