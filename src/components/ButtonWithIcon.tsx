import { Button } from "@/components/ui/button";
import { MessageCircle, ThumbsDown, ThumbsUp } from "lucide-react";

type ButtonCategories = "like" | "dislike" | "comment";

const getIcon = (category: ButtonCategories) => {
  switch (category) {
    case "like":
      return <ThumbsUp className="h-4 w-4" />;
    case "dislike":
      return <ThumbsDown className="h-4 w-4" />;
    case "comment":
      return <MessageCircle className="h-4 w-4" />;
  }
};

type ButtonWithIconProps = {
  icon: ButtonCategories;
  label: string;
  className?: string;
};

export function ButtonWithIcon({
  icon,
  label,
  className,
}: ButtonWithIconProps) {
  return (
    <Button>
      {getIcon(icon)}
      <span className="ml-2">{label}</span>
    </Button>
  );
}
