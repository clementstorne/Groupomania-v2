"use server";

import prisma from "@/lib/prisma";
import { ReactionCategories } from "@/types";
import { revalidatePath } from "next/cache";

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
