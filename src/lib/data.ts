import prisma from "./prisma";

export const getPosts = async () => {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return posts;
};

export const getAuthorData = async (authorId: string) => {
  const author = await prisma.user.findUniqueOrThrow({
    where: {
      id: authorId,
    },
  });
  return author;
};

export const getPostReactions = async (postId: string) => {
  const reactions = await prisma.reaction.findMany({
    where: {
      postId: postId,
    },
  });
  return reactions;
};
