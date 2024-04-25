"use client";

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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createPost } from "./action";

const formSchema = z.object({
  content: z.string().min(1, {
    message:
      "Le texte du post est requis. Veuillez saisir un texte pour créer votre post.",
  }),
  media: z.instanceof(File).optional(),
});

type DialogCreatePostProps = {
  userId: string;
  userFullName: string;
};

const DialogCreatePost = ({ userId, userFullName }: DialogCreatePostProps) => {
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [image, setImage] = useState<string>("");

  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
      media: undefined,
    },
  });

  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleImageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const newImage = e.target.files[0];

      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target && event.target.result) {
          const imageUrl = event.target.result as string;
          setImage(imageUrl);
        }
      };

      reader.readAsDataURL(newImage);

      form.setValue("media", newImage);
    }
  };

  const handleUploadButtonClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    hiddenFileInput.current?.click();
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append("content", values.content);
    if (values.media) {
      formData.append("media", values.media);
    }
    try {
      await createPost(userId, formData);
      setOpen(false);
      setImage("");
      toast({
        description: "Votre post a publié",
      });
      form.reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">Quoi de neuf, {userFullName} ?</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Créer un nouveau post</DialogTitle>
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
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contenu</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="media"
              render={({ field }) => (
                <FormItem>
                  <FormLabel id="media-label" className="sr-only">
                    Media
                  </FormLabel>
                  {image ? (
                    <Image
                      src={image}
                      alt="Image d'illustration de votre post"
                      width={600}
                      height={600}
                      className="max-h-[600px] w-auto mx-auto mb-4"
                    />
                  ) : null}

                  <input
                    type="file"
                    name="image"
                    id="media"
                    className="hidden"
                    aria-describedby="media-label"
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
                    {image ? "Modifier l'image" : "Ajouter une image"}
                  </Button>
                </FormItem>
              )}
            />
            <Button type="submit" size="lg" className="w-full">
              Créer mon post
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

export default DialogCreatePost;
