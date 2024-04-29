"use client";

import UserAvatar from "@/components/UserAvatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { changeAvatar } from "./action";

const formSchema = z.object({ avatar: z.instanceof(File) });

type DialogChangeAvatarProps = {
  fullname: string;
  imageUrl?: string;
  userId: string;
};

const DialogChangeAvatar = ({
  fullname,
  imageUrl,
  userId,
}: DialogChangeAvatarProps) => {
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [avatar, setAvatar] = useState(imageUrl);

  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      avatar: undefined,
    },
  });

  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleImageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const newAvatar = e.target.files[0];

      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target && event.target.result) {
          const imageUrl = event.target.result as string;
          setAvatar(imageUrl);
        }
      };

      reader.readAsDataURL(newAvatar);

      form.setValue("avatar", newAvatar);
    }
  };

  const handleUploadButtonClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    hiddenFileInput.current?.click();
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append("image", values.avatar);
    try {
      await changeAvatar(userId, formData);
      setOpen(false);
      toast({
        description: "Votre avatar a été mis à jour",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div
          className={cn(
            "w-60 h-60 rounded-full",
            "hover:cursor-pointer hover:opacity-80"
          )}
        >
          {avatar ? (
            <UserAvatar
              src={avatar}
              name={fullname}
              className="w-full h-full"
            />
          ) : (
            <UserAvatar name={fullname} className="w-full h-full" />
          )}
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Modifier l&apos;avatar</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={cn("w-full space-y-8")}
          >
            {errorMessage && (
              <p className="text-sm font-bold text-red-700">{errorMessage}</p>
            )}

            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel id="avatar-label" className="sr-only">
                    Nouvel avatar
                  </FormLabel>
                  <div className={cn("w-60 h-60 rounded-full mx-auto mb-4")}>
                    {avatar ? (
                      <UserAvatar
                        src={avatar}
                        name={fullname}
                        className="w-full h-full"
                      />
                    ) : (
                      <UserAvatar name={fullname} className="w-full h-full" />
                    )}
                  </div>

                  <input
                    type="file"
                    name="image"
                    id="avatar"
                    className="hidden"
                    aria-describedby="avatar-label"
                    accept="image/png, image/jpg, image/jpeg, image/svg+xml, image/webp"
                    ref={hiddenFileInput}
                    onChange={handleImageInput}
                  />

                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full font-bold"
                    onClick={handleUploadButtonClick}
                  >
                    Sélectionner une image
                  </Button>
                </FormItem>
              )}
            />
            <Button type="submit" size="lg" className="w-full">
              Modifier mon avatar
            </Button>
          </form>
        </Form>
        <DialogFooter>
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

export default DialogChangeAvatar;
