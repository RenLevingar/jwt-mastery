import { redirect } from "next/navigation";
import {getSession, logout} from '../lib'
import Header from '../components/Header'

export default async function Profile() {
  const session = await getSession();
  let user = session?.user
  if(!user){redirect('/')}
  return (
    <section className="profileSection">
      <Header/>
      <main className="profileMain">
        <h1 className="profileTitle">Your Profile</h1>
        <h2 className="profileInfo">Name: {user.name}</h2>
        <h2 className="profileInfo">Email: {user.email}</h2>
        <form action={async (formdata)=>{
          'use server'
          await logout()
          redirect('/')
        }}>
          <button type="submit">Logout</button>
        </form>
      </main>
    </section>
  )
}