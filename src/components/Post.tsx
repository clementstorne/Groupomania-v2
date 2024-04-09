import { ReactionButton } from "@/components/ReactionButton";
import ReactionIcon from "@/components/ReactionIcon";
import UserAvatar from "@/components/UserAvatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { REACTIONS } from "@/lib/const";
import { getAuthorData, getPostReactions } from "@/lib/data";
import { formatDateTime } from "@/lib/dateUtils";
import { cn } from "@/lib/utils";
import { DbPost, DbReaction, DbUser, ReactionCategories } from "@/types";
import Image from "next/image";

type PostProps = DbPost;

const Post = async ({
  id,
  content,
  media,
  authorId,
  createdAt,
  updatedAt,
}: PostProps) => {
  const author = (await getAuthorData(authorId)) as DbUser;
  const authorFullName = `${author?.firstname} ${author?.lastname}`;

  const getNumberOfReactions = (
    reactionsArray: DbReaction[],
    type: ReactionCategories
  ) => {
    return reactionsArray.filter((reaction) => reaction.type === type).length;
  };

  const reactionsArray = await getPostReactions(id);
  const numberOfReactions = REACTIONS.map((reaction) =>
    getNumberOfReactions(reactionsArray, reaction)
  );

  return (
    <Card className="border-gray-6 max-w-[598px]">
      <CardHeader className="p-4 flex flex-row items-center space-x-4">
        <UserAvatar name={authorFullName} />
        <div className="flex flex-col">
          <CardTitle>{authorFullName}</CardTitle>
          <CardDescription className="text-gray-11">
            {updatedAt
              ? `Modifié ${formatDateTime(updatedAt)}`
              : `Publié ${formatDateTime(createdAt)}`}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <p className="mx-4 mb-2">{content}</p>
        {media ? (
          <Image
            src={media}
            alt={content}
            width={600}
            height={600}
            className="max-h-[600px] w-auto mx-auto"
          />
        ) : null}
      </CardContent>
      <CardFooter className="flex flex-col items-start mx-4 p-0">
        <div className="w-full py-2 flex flex-row items-center space-x-2">
          {REACTIONS.map((reaction, index) =>
            numberOfReactions[index] === 0 ? null : (
              <div
                key={reaction}
                className="bg-orange-8 rounded-full py-1 px-3 flex items-center text-sm"
              >
                <ReactionIcon category={reaction} className="w-3 h-3" />
                <span className="ml-1">{numberOfReactions[index]}</span>
              </div>
            )
          )}
        </div>
        <div
          className={cn(
            "w-full py-1 flex flex-row justify-center space-x-0 border-t border-gray-6",
            "md:space-x-2"
          )}
        >
          {REACTIONS.map((reaction) => (
            <ReactionButton key={reaction} type={reaction} isChecked={false} />
          ))}
        </div>
      </CardFooter>
    </Card>
  );
};

export default Post;
