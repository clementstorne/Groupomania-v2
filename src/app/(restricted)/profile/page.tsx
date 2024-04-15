import { authOptions } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { DbUser } from "@/types";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ProfileForm from "./form";

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  const user = session.user as Omit<DbUser, "password" | "imageUrl">;

  return (
    <div
      className={cn(
        "px-3 py-6 space-y-2 max-w-[630px]",
        "md:mx-8 md:space-y-4"
      )}
    >
      <ProfileForm {...user} />
    </div>
  );
};

export default page;
