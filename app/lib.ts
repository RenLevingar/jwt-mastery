"use server"
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// gets all users
const fetchUsers = async () => {
    try {
      const usersData = await fetch('http://localhost:9000/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return usersData.json();
    } catch (error) {
      console.error(error);
    }
  };

  fetchUsers();

//make your secret
const secretKey = 'secret';
const key = new TextEncoder().encode(secretKey);

//encrypt yout dat
export async function encrypt(payload: any){
    return await new SignJWT(payload)
    .setProtectedHeader({alg: 'HS256'})
    .setIssuedAt()
    .setExpirationTime('20 seconds')
    .sign(key)
}

//decrypt your data
export async function decrypt(input: string): Promise<any> {
    const {payload} = await jwtVerify(input, key, {algorithms:['HS256'],}); 
    return payload
}

export async function login(formData: FormData) {
    let users = await fetchUsers();
    // console.log(users)
    // Verify credentials && get the user

    const user = {name: formData.get("name"),password:formData.get('password')};
    console.log("Check")
    for (let i = 0; i < users.x.length; i++) {
        console.log("User List: "+ users.x[i].name);
        if (users.x[i].name === user.name && users.x[i].password === user.password) {
            console.log("User List: "+ users.x[i]);
            // Credentials match, return true to indicate successful login
            const expires = new Date(Date.now() + 10 * 1000);
            const session = await encrypt({ user, expires });
            cookies().set("session", session, { expires, httpOnly: true });
            return true;
        }
    }
}

export async function logout() {
    // Destroy the session
    cookies().set("session", "", {expires: new Date(0) });
}

export async function getSession() {
    const session = cookies().get("session")?.value;
    if (!session) return null;
    return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
    const session = request.cookies.get("session")?.value;
    if (!session) return;

    // refresh the session so it doesn't expire
    const parsed = await decrypt(session);
    parsed.expires = new Date(Date.now() + 10 * 1000);
    const res = NextResponse.next();
    res.cookies.set({
        name: "session",
        value: await encrypt(parsed),
        httpOnly: true,
        expires: parsed.expires,
    });
    return res;
}