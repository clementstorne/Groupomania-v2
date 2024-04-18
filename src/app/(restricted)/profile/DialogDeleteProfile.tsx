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
import { signOut } from "next-auth/react";
import { deleteProfile } from "./action";

type DialogDeleteProfileProps = {
  userId: string;
};

const DialogDeleteProfile = ({ userId }: DialogDeleteProfileProps) => {
  const handleOnClick = async () => {
    signOut();
    await deleteProfile(userId);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Supprimer mon profil</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirmer la suppression du profil</DialogTitle>
          <DialogDescription>
            Êtes-vous sûr de vouloir supprimer définitivement votre profil
            intraconnect ?{" "}
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
            Supprimer le profil
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

export default DialogDeleteProfile;
