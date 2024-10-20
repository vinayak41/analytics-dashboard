"use client";
import { LoginForm } from "@/components/auth/login-form";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function RegisterPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const error = searchParams.get("error");

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
        <h1 className="text-center text-2xl font-semibold">Login</h1>
        {error === "CredentialsSignin" && (
          <p className="text-center mt-2 text-red-500 font-medium">
            Invalid Credentials
          </p>
        )}
        <LoginForm />
        {/* <Link
          className="block text-blue-500 text-center mt-2 mb-4 text-sm"
          href={`/auth/reset-password?${new URLSearchParams(
            searchParams
          ).toString()}`}
        >
          Forgot Password?
        </Link> */}
        <p className="text-center mt-2 text-sm text-gray-500">
          Don't have an account?{" "}
          <Link
            className="text-blue-500"
            href={`/register?${new URLSearchParams(
              searchParams
            ).toString()}`}
          >
            Register
          </Link>{" "}
        </p>
      </div>
    </div>
  );
}
