"use server";

import prisma from "@/lib/prisma";
import { ReactionCategories } from "@/types";
import { statfs, unlink, writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";

const checkIfReactionAlreadyExists = async (userId: string, postId: string) => {
  const reactionAlreadyExists = await prisma.reaction.findFirst({
    where: {
      userId: userId,
      postId: postId,
    },
  });
  return reactionAlreadyExists ? true : false;
};

const deleteReaction = async (userId: string, postId: string) => {
  await prisma.reaction.deleteMany({
    where: {
      userId: userId,
      postId: postId,
    },
  });
};

const deleteOldMedia = async (mediaToDelete: string) => {
  const filename = mediaToDelete.split("/images/")[1];
  const filePath = join(process.cwd(), "public/images/", filename);
  if (await statfs(filePath)) {
    await unlink(filePath);
  }
};

const uploadMedia = async (file: File) => {
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

  const fileName = uuidv4() + "." + extension;

  const path = join(process.cwd(), "public/images/" + fileName);

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  await writeFile(path, buffer);

  return fileName;
};

export const reactToPost = async (
  userId: string,
  postId: string,
  type: ReactionCategories
) => {
  const reactionAlreadyExists = await checkIfReactionAlreadyExists(
    userId,
    postId
  );
  if (reactionAlreadyExists) {
    await deleteReaction(userId, postId);
  }
  await prisma.reaction.create({
    data: {
      userId: userId,
      postId: postId,
      type: type,
    },
  });

  revalidatePath("/feed");
};

export const deletePost = async (postId: string) => {
  const post = await prisma.post.findUnique({
    where: { id: postId },
  });

  if (!post) {
    throw new Error("Post not found");
  }

  if (post.media) {
    await deleteOldMedia(post.media);
  }

  await prisma.post.delete({
    where: {
      id: postId,
    },
  });

  revalidatePath("/feed");
};

export const editPost = async (postId: string, formData: FormData) => {
  const content = (await formData.get("content")) as string;
  const file = (await formData.get("media")) as File;

  const post = await prisma.post.findUnique({
    where: { id: postId },
    select: {
      id: true,
      media: true,
    },
  });

  if (!post) {
    throw new Error("Post not found");
  }

  if (file && file.size !== 0) {
    const fileName = await uploadMedia(file);

    if (post.media) {
      await deleteOldMedia(post.media);
    }

    await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        content: content,
        media: "/images/" + fileName,
        updatedAt: new Date(),
      },
    });
  } else {
    await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        content: content,
        updatedAt: new Date(),
      },
    });
  }

  revalidatePath("/feed");
};

export const createPost = async (userId: string, formData: FormData) => {
  const content = (await formData.get("content")) as string;
  const file = (await formData.get("media")) as File;

  if (file && file.size !== 0) {
    const fileName = await uploadMedia(file);

    await prisma.post.create({
      data: {
        authorId: userId,
        content: content,
        media: "/images/" + fileName,
      },
    });
  } else {
    await prisma.post.create({
      data: {
        authorId: userId,
        content: content,
      },
    });
  }

  revalidatePath("/feed");
};
