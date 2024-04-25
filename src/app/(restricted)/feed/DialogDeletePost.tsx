"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { deletePost } from "./action";

type DialogDeletePostProps = {
  postId: string;
};

const DialogDeletePost = ({ postId }: DialogDeletePostProps) => {
  const [open, setOpen] = useState(false);

  const { toast } = useToast();

  const handleOnClick = async () => {
    await deletePost(postId);
    setOpen(false);
    toast({
      variant: "destructive",
      description: "Votre post a été supprimé",
    });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"admin"}>
          <Trash2 className={cn("h-6 w-6", "md:h-4 md:w-4")} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirmer la suppression du post</DialogTitle>
          <DialogDescription>
            Êtes-vous sûr de vouloir supprimer définitivement ce post ?{" "}
            <span className="font-bold">Cette action est irréversible.</span>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="destructive"
            size="lg"
            onClick={handleOnClick}
            className="w-full"
          >
            Supprimer le post
          </Button>
          <DialogClose asChild>
            <Button variant="outline" className="w-full">
              Annuler
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogDeletePost;
