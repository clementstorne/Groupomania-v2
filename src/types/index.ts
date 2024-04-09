export interface DbUser {
  id: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  imageUrl?: string;
  role: "user" | "admin";
}

export interface DbPost {
  id: string;
  content: string;
  media: string | null;
  authorId: string;
  createdAt: Date;
  updatedAt: Date | null;
}

export interface DbReaction {
  id: string;
  createdAt: Date;
  type: ReactionCategories;
  userId: string;
  postId: string;
}

export type ReactionCategories =
  | "like"
  | "dislike"
  | "celebrate"
  | "insightful"
  | "funny";
