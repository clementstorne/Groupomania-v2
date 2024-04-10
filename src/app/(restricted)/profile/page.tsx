import { authOptions } from "@/lib/auth";
import { DbUser } from "@/types";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (!session) {
    redirect("/login");
  }
  const user = session.user as Omit<DbUser, "password" | "imageUrl">;
  const userFullname = `${user?.firstname} ${user?.lastname}`;

  return <div>{userFullname}</div>;
};

export default page;
