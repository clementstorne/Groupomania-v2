"use client";

import { reactToPost } from "@/app/(restricted)/feed/action";
import ReactionIcon from "@/app/(restricted)/feed/ReactionIcon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ReactionCategories } from "@/types";

const getLabel = (category: ReactionCategories) => {
  switch (category) {
    case "like":
      return "J'aime";
    case "dislike":
      return "Je n'aime pas";
    case "celebrate":
      return "Bravo";
    case "insightful":
      return "Instructif";
    case "funny":
      return "Drôle";
  }
};

type ReactionButtonProps = {
  type: ReactionCategories;
  isChecked: boolean;
  userId: string;
  postId: string;
  className?: string;
};

const ReactionButton = ({
  type,
  isChecked,
  userId,
  postId,
  className,
}: ReactionButtonProps) => {
  const label = getLabel(type);

  const handleOnClick = async () => {
    await reactToPost(userId, postId, type);
  };

  return (
    <Button
      variant="ghost"
      className={cn(
        "text-gray-11",
        "hover:text-orange-10 hover:bg-gray-4",
        isChecked && "text-orange-10",
        className
      )}
      onClick={handleOnClick}
    >
      <ReactionIcon
        category={type}
        className={cn("h-6 w-6", "md:h-4 md:w-4")}
      />
      <span className={cn("sr-only", "md:not-sr-only md:ml-2 md:text-sm")}>
        {label}
      </span>
    </Button>
  );
};

export default ReactionButton;
