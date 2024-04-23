"use client"

// import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import {signup} from '../lib';
import { redirect } from "next/navigation";

export default function Signup() {
  const [users, setUsers] = useState([]);

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
        const success = await signup(formdata);
        if(success){redirect('/')}else{alert("This user already exist")}
      }}>
        <main className="loginMain">
          <h1>Signup</h1>
          <input type="text" 
            name="name" 
            id="name" 
            placeholder="Name"/>
          <input type="password" 
            name="password" 
            id="password" 
            placeholder="Password"/>
          <button type="submit">Signup</button>
        <Link className="accountLink" href="/">Already have an account? Log in</Link>
        </main>
      </form>
    </section>
  )
}