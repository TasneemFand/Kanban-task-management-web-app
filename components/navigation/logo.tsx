"use client";

import { useTheme } from "next-themes";
import Image from "next/image";

export const Logo = () => {
  const { resolvedTheme } = useTheme();

  return (
    <Image
      className={"my-8 ml-8"}
      src={
        resolvedTheme === "light"
          ? "/assets/logo-dark.svg"
          : "/assets/logo-light.svg"
      }
      height="25"
      width="152"
      alt="Kanban - Home"
    />
  );
};
