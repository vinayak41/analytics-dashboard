"use client";
import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import PasswordInput from "@/components/ui/password-input";
import { Input } from "@/components/ui/input";
import { register } from "@/actions/auth";
import { useRouter } from "next/navigation";

interface RegisterFormTypes {
  onRegister?: (email: string, password?: string) => void;
}

export const RegisterForm: FC<RegisterFormTypes> = ({ onRegister }) => {
  const [errors, setErrors] = useState<{ [key: string]: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formElement = e.target as HTMLFormElement;
    const formData = new FormData(formElement);

    const password = formData.get("password") as string;
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const confirmPassword = formData.get("confirm-password");

    if (password !== confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match" });
      return;
    }

    setLoading(true);

    setErrors(null);

    try {
      register({ name, email, password });
      router.push("/login");
    } catch (error: any) {
      setLoading(false);
      setErrors({ registration: error.message });
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        width: 500,
        rowGap: 10,
        maxWidth: "90vw",
      }}
    >
      {errors?.registration && (
        <p className="text-red-700 text-sm font-light -mt-1">
          {errors?.registration}
        </p>
      )}
      <Label htmlFor="name">Name</Label>
      <Input required type="text" name="name" className="p-4" />
      <Label htmlFor="email">Email</Label>
      <Input required type="email" name="email" className="p-4" />
      <Label htmlFor="password">Password</Label>
      <PasswordInput
        name="password"
        id="password"
        className="p-4"
        minLength={8}
      />
      <Label htmlFor="confirm-password">Confirm Password</Label>
      <PasswordInput
        name="confirm-password"
        id="confirm-password"
        className="p-4"
      />
      {errors?.confirmPassword && (
        <p className="text-red-700 text-sm font-light -mt-1">
          {errors?.confirmPassword}
        </p>
      )}
      <Button
        style={{
          backgroundColor: `${loading ? "#ccc" : "#3446eb"}`,
          color: "#fff",
          padding: "1rem",
          cursor: "pointer",
        }}
        disabled={loading}
      >
        {loading ? "loading..." : "Register"}
      </Button>
    </form>
  );
};
