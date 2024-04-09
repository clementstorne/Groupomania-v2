import { ReactionCategories } from "@/types";
import {
  Laugh,
  Lightbulb,
  PartyPopper,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";

type ReactionIconProps = {
  category: ReactionCategories;
  className?: string;
};

const ReactionIcon = ({ category, className }: ReactionIconProps) => {
  switch (category) {
    case "like":
      return <ThumbsUp className={className} />;
    case "dislike":
      return <ThumbsDown className={className} />;
    case "celebrate":
      return <PartyPopper className={className} />;
    case "insightful":
      return <Lightbulb className={className} />;
    case "funny":
      return <Laugh className={className} />;
  }
};

export default ReactionIcon;
