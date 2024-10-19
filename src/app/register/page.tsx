"use client";
import { RegisterForm } from "@/components/auth/registration-form";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { signIn } from "next-auth/react";

const Register = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const callbackUrl = searchParams.get("callbackUrl");

  return (
    <div
      style={{
        display: "flex",
        height: "70vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        {callbackUrl?.match("products") && (
          <p className="text-center mb-2 text-amber-500 font-medium">
            Login to continue your shopping
          </p>
        )}
        <>
          <h1 className="text-center text-2xl font-semibold">Register</h1>
          <RegisterForm
            onRegister={async (email: string, password?: string) => {
              if (email && password) {
                const res = await signIn("credentials", {
                  email,
                  password,
                  callbackUrl: searchParams.get("callbackUrl") || "/",
                });

                if (res?.error) {
                  alert("Invalid credentials");
                }
              }
              // router.push(
              //   `/auth/verify?email=${email}&${new URLSearchParams(
              //     searchParams
              //   ).toString()}`
              // );
            }}
          />
          <p className="text-center mt-2 text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              className="text-blue-500"
              href={`/auth/login?${new URLSearchParams(
                searchParams
              ).toString()}`}
            >
              Login
            </Link>
          </p>
        </>
      </div>
    </div>
  );
};

export default Register;
