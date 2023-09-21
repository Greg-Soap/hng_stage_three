"use client";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import React from "react";
import { DropdownOptions, DropdownToggler } from "./dropdown";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function Navbar({ user }: { user: User | undefined }) {
  const supabase = createClientComponentClient();
  return (
    <nav className="navbar">
      <div className="brand">HNGx Gallery</div>
      <div className="auth">
        {user ? (
          <DropdownToggler lead={"Profile"}>
            <DropdownOptions>
              <li>{user.email}</li>
              <li
                onClick={async () => {
                  await supabase.auth.signOut();
                  location.reload();
                }}
              >
                Sign Out
              </li>
            </DropdownOptions>
          </DropdownToggler>
        ) : (
          <Link href="/login" className="auth_link">
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}
