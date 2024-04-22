import Link from "next/link";
import { redirect } from "next/navigation";
import {getSession} from '../lib'
import Header from '../components/Header'

export default async function Home() {
  const session = await getSession();
  let user = session?.user
  if(!user){redirect('/')}
  return (
    <section className="homeSection">
      <Header/>
      <h1 className="homeTitle">Welcome To The Site</h1>
    </section>
  )
}