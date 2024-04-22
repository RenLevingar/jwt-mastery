"use client"

import { redirect } from "next/navigation";
import {login} from './lib';
import Header from './components/Header'

export default function Login() {
  
  return (
    <section className="loginSection">
      <form autoComplete="off" action={async (formdata)=>{
        const success = await login(formdata);
        if(success){redirect('/home')}else{alert("Wrong email/password")}
      }}>
        <main className="loginMain">
          <h1>Login</h1>
          <input type="email" name="email" id="email" placeholder="Email"/>
          <input type="password" name="password" id="password" placeholder="Password"/>
          <button type="submit">Login</button>
        </main>
      </form>
    </section>
  )
}