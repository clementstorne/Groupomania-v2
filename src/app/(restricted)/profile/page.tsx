import { authOptions } from "@/lib/auth";
import { getUserData } from "@/lib/data";
import { cn } from "@/lib/utils";
import { DbUser } from "@/types";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ProfileForm from "./ProfileForm";

const Page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  const userSession = session.user as Omit<DbUser, "password">;
  const user = await getUserData(userSession.id);

  return (
    <section className={cn("w-full max-w-224 p-4", "md:w-11/12 md:p-8")}>
      <ProfileForm
        {...user}
        imageUrl={user.imageUrl ? user.imageUrl : undefined}
      />
    </section>
  );
};

export default Page;
