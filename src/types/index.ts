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
