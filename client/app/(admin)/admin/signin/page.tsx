"use client"
import '@/styles/admin/formsignin.css'
import React from 'react'
import ReCAPTCHA from "react-google-recaptcha";

const page = () => {

  function onChange(value: any) {
    console.log("Captcha value:", value);
  }

  return (
    <>
      <form className="login">
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <ReCAPTCHA
          sitekey="6Lcd5xspAAAAAGFc3PocJV3GWxfqbQ6snlEK-r3O"
          onChange={onChange}
        />
        <button>Đăng nhập</button>
      </form>
      <a href="https://codepen.io/davinci/" target="_blank">check my other pens</a>
    </>
  )
}

export default page