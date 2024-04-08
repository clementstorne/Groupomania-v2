"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

export const checkIfUserExists = async (email: string) => {
  const userAlreadyExists = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (userAlreadyExists) {
    return true;
  } else {
    return false;
  }
};

export const createNewUser = async ({
  firstname,
  lastname,
  email,
  password,
}: {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}) => {
  const hash = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      email,
      password: hash,
      firstname,
      lastname,
      role: "user",
    },
  });
  redirect("/login");
};
