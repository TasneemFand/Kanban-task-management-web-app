"use client";

import { useCallback, useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const LogInModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn('credentials', {
        ...data,
        callbackUrl: 'http://127.0.0.1:3000/user/dashboard',
        redirect: false,
    }).then((callback) => {
      setIsLoading(false);
      if (callback?.ok) {
        toast.success("Logged in");
        router.push("/");
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    }).catch((error) => 
    {
      toast.error("error");
      console.log(error,'error')
    });
  };
  useEffect(() => {
    router.prefetch("/");

  }, [router]);
  
  const onToggle = useCallback(() => {
    router.push("/sign-up");
  }, [router]);

  const FooterContent = (
    <div className="flex flex-col gap-4 mt-3 w-full">
      <hr />
      <Button
        onClick={() => signIn("google")}
        variant="outline"
        className="bg-[#FFF] text-textdark w-full "
      >
        <FcGoogle size={24} className="mr-2" />
        Continue with Google
      </Button>
      <Button
        onClick={() => signIn("github")}
        className="bg-[#FFF] text-textdark w-full"
        variant="outline"
      >
        <AiFillGithub size={24} className="mr-2" />
        Continue with Github
      </Button>

      <div
        className="
      text-neutral-500 text-center mt-4 font-light"
      >
        <p>
          First time using Kanban?
          <span
            onClick={onToggle}
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
          >
            {" "}
            Create an account
          </span>
        </p>
      </div>
    </div>
  );

  return (
      <Card className="w-[450px] max-[640px]:w-[350px] bg-white">
        <CardHeader>
          <CardTitle className="text-textdark">Welcome Back</CardTitle>
          <CardDescription>Login to your account!</CardDescription>
        </CardHeader>
        <CardContent>
          <form role="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col w-full items-center gap-4 text-textdark">
              <Input
                {...register("email", { required: true })}
                id="email"
                name="email"
                placeholder="Email"
                type="email"
                disabled={isLoading}
                className="bg-white"
              />
              <Input
                {...register("password", { required: true })}
                id="password"
                name="password"
                placeholder="Password"
                type="password"
                disabled={isLoading}
                className="bg-white focus:bg-textdark focus:text-white"
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-[#635FC7] text-[#FFF] w-full transition hover:opacity-80 hover:bg-[#635FC7]"
              >
                Continue
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center w-full">
          {FooterContent}
        </CardFooter>
        <Toaster/>
      </Card>
  );
};

export default LogInModal;
