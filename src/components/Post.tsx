import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAuthorData } from "@/lib/data";
import { formatDateTime } from "@/lib/dateUtils";
import { DbPost, DbUser } from "@/types";
import { ButtonWithIcon } from "./ButtonWithIcon";
import UserAvatar from "./UserAvatar";

const LikeButton = () => {
  return <ButtonWithIcon icon="like" label="J'aime" />;
};

const DislikeButton = () => {
  return <ButtonWithIcon icon="dislike" label="Je n'aime pas" />;
};

const CommentButton = () => {
  return <ButtonWithIcon icon="comment" label="Commenter" />;
};

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

  return (
    <Card>
      <CardHeader className="flex flex-row items-center space-x-4">
        <UserAvatar name={authorFullName} />
        <div className="flex flex-col">
          <CardTitle className="text-orange-11">{authorFullName}</CardTitle>
          <CardDescription className="text-gray-11">
            {updatedAt
              ? `Modifié ${formatDateTime(updatedAt)}`
              : `Publié ${formatDateTime(createdAt)}`}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p>{content}</p>
      </CardContent>
      <CardFooter className="flex flex-row justify-center space-x-4">
        <LikeButton />
        <DislikeButton />
        <CommentButton />
      </CardFooter>
    </Card>
  );
};

export default Post;
