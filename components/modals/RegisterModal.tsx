"use client";

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
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
import { useRouter } from "next/navigation";

const RegisterModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/register", data)
      .then(() => {
        toast.success("Registered!");
        router.push("/sign-in");
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

    const onToggle = useCallback(() => {
        router.push("/sign-in");
    }, [router]);

  const FooterContent = (
    <div className="flex flex-col gap-4 mt-3 w-full ">
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
          text-neutral-500 
          text-center 
          mt-4 
          font-light
        "
      >
        <p>
          Already have an account?
          <span
            onClick={onToggle}
            className="
              text-textgray
              cursor-pointer 
              hover:underline
            "
          >
            {" "}
            Log in
          </span>
        </p>
      </div>
    </div>
  );

  return (
      <Card className="w-[450px] max-[640px]:w-[350px] bg-white">
        <CardHeader>
          <CardTitle className="text-textdark">Welcome to Kanban</CardTitle>
          <CardDescription>Create an account!</CardDescription>
        </CardHeader>
        <CardContent>
          <form role="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col w-full items-center gap-4 text-textdark">
              <Input
                {...register("name", { required: true })}
                id="name"
                name="name"
                placeholder="Name"
                type="text"
                disabled={isLoading}
                className="bg-white"
              />
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
      </Card>
  );
};

export default RegisterModal;
