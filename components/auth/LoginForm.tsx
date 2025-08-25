// src/components/LoginForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginSchema } from "@/schemas/loginSchema";
import Link from "next/link";
import { useLogin } from "@/queries/auth";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate, isPending, isError, error } = useLogin();
  const router = useRouter();
  const onSubmit = (data: LoginSchema) => {
    mutate(data, {
      onSuccess() {
        router.replace("/dashboard");
      },
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-sm rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
          Login <Link href="/dashboard">dashboard</Link>
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="mb-1 block text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:ring-indigo-500"
              {...register("email")}
            />
            {errors.email && (
              <span className="mt-1 block text-sm text-red-500">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="mb-6">
            <label
              className="mb-1 block text-sm font-medium text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:ring-indigo-500"
              {...register("password")}
            />
            {errors.password && (
              <span className="mt-1 block text-sm text-red-500">
                {errors.password.message}
              </span>
            )}
          </div>
          <button
            type="submit"
            disabled={isPending}
            className={`w-full rounded-md py-2 text-white transition-colors ${
              isPending
                ? "cursor-not-allowed bg-indigo-400"
                : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            }`}
          >
            {isPending ? "Logging in..." : "Login"}
          </button>
          {isError && (
            <p className="mt-4 text-center text-sm text-red-500">
              {error.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
