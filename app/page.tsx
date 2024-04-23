"use client"

import { redirect } from "next/navigation";
import {login} from './lib';
import { useState, useEffect } from "react";

export default function Login() {
  const [users, setUsers] = useState([]);
  // const [formData, setFormData] = useState({
  //   name: '',
  //   password: ''
  // });

  useEffect(() => {
    // gets all of the users
    const fetchUsers = async () => {
      try {
        const usersData = await fetch('http://localhost:9000/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (usersData.ok) {
          const usersOutput = await usersData.json();
          setUsers(usersOutput.x);
        } else {
          console.error('couldnt fetch users');
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchUsers();
  }, []);
  
  return (
    <section className="loginSection">
      <form  autoComplete="off" action={async (formdata)=>{
        const success = await login(formdata);
        if(success){redirect('/home')}else{alert("Wrong email/password")}
      }}>
        <main className="loginMain">
          <h1>Login</h1>
          <input type="text" 
            name="name" 
            id="name" 
            placeholder="Name"/>
          <input type="password" 
            name="password" 
            id="password" 
            placeholder="Password"/>
          <button type="submit">Login</button>
        </main>
      </form>
    </section>
  )
}