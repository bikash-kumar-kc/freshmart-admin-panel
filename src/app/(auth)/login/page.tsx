"use client";

import { showToast } from "@/components/Toast";
import { useLogin } from "@/lib/hooks/useLogin";
import { useAuthContext } from "@/providers/AuthContextProvider";
import { ILoginType, schemaForSession } from "@/validation/zod-schema-validation/login.schema.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const Page = () => {
  const router = useRouter();
  const { refetchUser } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);

  const {
    mutateAsync: adminLogin,
    data: response,
    isPending: loading,
  } = useLogin();

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(schemaForSession),
  });

  const handleSubmitHandler = async (data: ILoginType) => {
    try {
      await adminLogin(data);
      showToast.success("LogIn Successfully");
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message === "Network Error") return;
      }
      showToast.error("Failed to LogIn");
    }
  };

  useEffect(() => {
    if (response) {
      refetchUser(response.user);
      reset();
      router.push("/dashboard");
    }
  }, [response, router, refetchUser, reset]);

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center min-h-screen px-8 sm:px-12 bg-app-background">
        <div className=" w-full md:w-[40%]  rounded-lg  p-8  shadow-card">
          <div className="mb-10 flex flex-col items-center">
            <Link href={"/"}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">🌿</span>
                <span className="text-lg font-bold text-app-foreground tracking-wider">
                  FRESHMART
                </span>
              </div>
            </Link>
            <p className="text-app-muted-foreground text-sm">
              Sign in to your account
            </p>
          </div>

          <form
            onSubmit={handleSubmit(handleSubmitHandler)}
            className="flex flex-col gap-5 w-full"
          >
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-sm font-medium text-app-muted-foreground"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                placeholder="Enter your email..."
                {...register("email")}
                className="w-full border border-gray-200 rounded-sm px-3.5 py-2.5 text-sm text-input-text outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition placeholder:text-input-placeholder"
              />
              {errors.email?.message && (
                <p className="text-input-text-error text-xs t">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-app-muted-foreground"
                >
                  Password
                </label>
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Enter your password..."
                  {...register("password")}
                  className="w-full border border-gray-200 rounded-sm px-3.5 py-2.5 pr-11 text-sm text-input-text outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition placeholder:text-input-placeholder"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) =>
                      getValues("password").trim() ? !prev : prev,
                    )
                  }
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {errors.password?.message && (
                <p className="text-input-text-error text-xs">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 active:bg-green-800 text-white text-sm font-semibold py-2.5 rounded-sm transition-colors duration-200 mt-1"
            >
              {loading ? "loading..." : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Page;
