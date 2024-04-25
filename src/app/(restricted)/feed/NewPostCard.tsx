import UserAvatar from "@/components/UserAvatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { authOptions } from "@/lib/auth";
import { getUserData } from "@/lib/data";
import { DbUser } from "@/types";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import DialogCreatePost from "./DialogCreatePost";

const NewPostCard = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  const userSession = session.user as Omit<DbUser, "password">;
  const user = await getUserData(userSession.id);
  const userFullName = `${user.firstname} ${user.lastname}`;

  return (
    <Card className="border-gray-6 max-w-[598px]">
      <CardContent className="p-4">
        <div className="flex flex-row items-center space-x-4">
          <UserAvatar
            src={user.imageUrl ? user.imageUrl : undefined}
            name={userFullName}
          />
          <DialogCreatePost userId={user.id} userFullName={userFullName} />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start mx-4 p-0"></CardFooter>
    </Card>
  );
};

export default NewPostCard;
