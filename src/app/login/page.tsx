"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import style from "./page.module.css";
import { useRouter } from "next/navigation";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const supabase = createClientComponentClient();

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };

  const clearMessages = () => {
    setErrorMsg("");
    setSuccessMsg("");
  };

  const displaySuccessMessage = (message: string) => {
    setSuccessMsg(message);
    setTimeout(() => {
      clearMessages();
    }, 5000);
  };

  const displayErrorMessage = (message: string) => {
    setErrorMsg(message);
    setTimeout(() => {
      clearMessages();
    }, 5000);
  };

  async function login(e: any) {
    e.preventDefault();
    setIsSubmitting(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      displayErrorMessage(error.message);
      setIsSubmitting(false);
    } else {
      displaySuccessMessage("Successfully Logged in");
      setIsSubmitting(false);
      router.push("/");
    }
  }

  return (
    <div className={style.body}>
      <form onSubmit={login} className={style.form}>
        <h2>Login Form</h2>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
        {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}
        {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
        <p>
          Don&apos;t have an account?. <Link href="/sign-up">Sign Up Here</Link>{" "}
        </p>{" "}
      </form>
    </div>
  );
}

export default Login;
