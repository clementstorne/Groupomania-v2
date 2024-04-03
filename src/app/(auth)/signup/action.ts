"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

export const createNewUser = async (formData: FormData) => {
  const email = (await formData.get("email")) as string;
  const password = (await formData.get("password")) as string;
  const firstname = (await formData.get("firstname")) as string;
  const lastname = (await formData.get("lastname")) as string;

  const hash = await bcrypt.hash(password, 10);

  await prisma.users.create({
    data: {
      email,
      password: hash,
      firstname,
      lastname,
      role: "user",
    },
  });
  redirect("/feed");
};
