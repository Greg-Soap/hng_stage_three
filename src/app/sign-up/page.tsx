"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import style from "../login/page.module.css";
function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    }, 10000);
  };

  const displayErrorMessage = (message: string) => {
    setErrorMsg(message);
    setTimeout(() => {
      clearMessages();
    }, 8000);
  };
  async function signUp(e: any) {
    e.preventDefault();
    setIsSubmitting(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });
    if (error) {
      displayErrorMessage(error.message);
      setIsSubmitting(false);
    } else {
      displaySuccessMessage(
        "Success! Please Check your email for further instructions"
      );
      setIsSubmitting(false);
    }
  }

  return (
    <div className={style.body}>
      <form onSubmit={signUp} className={style.form}>
        <h2>Sign Up</h2>
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
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>
        </div>
        {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}
        {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
        <p>
          Already have an account?. <Link href="/login">Login here</Link>{" "}
        </p>
      </form>
    </div>
  );
}

export default SignUp;
