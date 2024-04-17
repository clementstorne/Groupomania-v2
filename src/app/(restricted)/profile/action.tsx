"use server";

import prisma from "@/lib/prisma";
import { statfs, unlink, writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { join } from "path";

export const deleteOldAvatar = async (avatarToDelete: string) => {
  const filename = avatarToDelete.split("/avatars/")[1];
  const filePath = join(process.cwd(), "public/avatars/", filename);
  if (await statfs(filePath)) {
    await unlink(filePath);
  }
};

export const updateProfile = async (userId: string, formData: FormData) => {
  const firstname = (await formData.get("firstname")) as string;
  const lastname = (await formData.get("lastname")) as string;
  const email = (await formData.get("email")) as string;

  const file = (await formData.get("image")) as File;

  if (file.size !== 0) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        firstname: true,
        lastname: true,
        imageUrl: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const MIME_TYPES: Record<string, string> = {
      "image/jpg": "jpg",
      "image/jpeg": "jpg",
      "image/png": "png",
      "image/svg+xml": "svg",
      "image/webp": "webp",
    };

    const extension = MIME_TYPES[file.type];

    if (!extension) {
      throw new Error("Unsupported file type");
    }

    const fileName =
      user.firstname.toLowerCase().split(" ").join("-") +
      "-" +
      user.lastname.toLowerCase().split(" ").join("-") +
      "." +
      extension;

    const path = join(process.cwd(), "public/avatars/" + fileName);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(path, buffer);

    if (user.imageUrl) {
      await deleteOldAvatar(user.imageUrl);
    }

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        imageUrl: "/avatars/" + fileName,
      },
    });
  }
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      firstname: firstname,
      lastname: lastname,
      email: email,
    },
  });
  revalidatePath("/feed");
  revalidatePath("/profile");
};

export const deleteProfile = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      imageUrl: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  if (user.imageUrl) {
    await deleteOldAvatar(user.imageUrl);
  }

  await prisma.user.delete({
    where: {
      id: userId,
    },
  });

  revalidatePath("/feed");
  revalidatePath("/profile");
  revalidatePath("/login");
  // signOut();
  redirect("/");
};
