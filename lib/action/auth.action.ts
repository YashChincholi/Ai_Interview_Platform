"use server";

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";

const ONE_WEEK = 60 * 60 * 24 * 7;

interface SignUpParams {
  uid: string;
  name: string;
  email: string;
}

interface SignInParams {
  email: string;
  idToken: string;
}

interface User {
  id: string;
  name: string;
  email: string;
}

export async function signUp(params: SignUpParams) {
  const { uid, name, email } = params;

  try {
    const userRecord = await db.collection("users").doc(uid).get();
    if (userRecord.exists) {
      return {
        success: false,
        message: "User Already Exist. Please Sign in instead.",
      };
    }
    db.collection("users").doc(uid).set({
      name,
      email,
    });

    return {
      success: true,
      message: "Account created Succesfully. Please Sign-in.",
    };
  } catch (error: any) {
    console.error("Error in creating an account", error);

    if (error.code == "auth/email-already-exists") {
      return {
        success: false,
        message: "Account already in Use.",
      };
    }

    return {
      success: false,
      message: "Failed in creating Account. Try Again.",
    };
  }
}

export async function signIn(params: SignInParams) {
  const { email, idToken } = params;

  try {
    const userRecord = await auth.getUserByEmail(email);

    if (!userRecord) {
      return {
        success: false,
        message: "User does not exist. Create an account instead.",
      };
    }

    await setSessionCookie(idToken);

    return {
      success: true,
      message: "Signed in successfully",
    };
  } catch (error) {
    console.error("Failed to sign in", error);

    return {
      success: false,
      message: "Failed to log in an account.",
    };
  }
}

export async function setSessionCookie(idToken: string) {
  const cookieStore = await cookies();

  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: ONE_WEEK * 1000,
  });

  cookieStore.set("session", sessionCookie, {
    httpOnly: true,
    maxAge: ONE_WEEK,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();

  const sessionCookie = cookieStore.get("session")?.value;

  if (!sessionCookie) return null;

  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

    const userRecord = await db
      .collection("users")
      .doc(decodedClaims.uid)
      .get();

    if (!userRecord.exists) return null;

    return {
      ...userRecord.data(),
      id: userRecord.id,
    } as User;
  } catch (error) {
    console.error(error);

    return null;
  }
}

export async function isAuthenticated() {
  const user = await getCurrentUser(); // Fixed: Added await here
  return !!user;
}

export async function logout() {
  const cookieStore = cookies();
  cookieStore.delete("session");

  return {
    success: true,
    message: "Logged out successfully",
  };
}
