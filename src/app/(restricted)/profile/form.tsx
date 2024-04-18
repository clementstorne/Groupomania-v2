"use client";

import UserAvatar from "@/components/UserAvatar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DialogChangePassword from "./DialogChangePassword";
import DialogDeleteProfile from "./DialogDeleteProfile";
import { updateProfile } from "./action";

const formSchema = z.object({
  firstname: z
    .string()
    .min(1, {
      message: "Ce champ est requis",
    })
    .refine(
      (value) => /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/.test(value),
      "Le prénom doit commencer par une lettre majuscule, suivie de lettres minuscules, d'espaces, de tirets, d'apostrophes ou de points. Les caractères spéciaux ne sont pas autorisés."
    ),
  lastname: z
    .string()
    .min(1, {
      message: "Ce champ est requis",
    })
    .refine(
      (value) => /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/.test(value),
      "Le prénom doit commencer par une lettre majuscule, suivie de lettres minuscules, d'espaces, de tirets, d'apostrophes ou de points. Les caractères spéciaux ne sont pas autorisés."
    ),
  email: z
    .string()
    .min(1, {
      message: "Ce champ est requis",
    })
    .email({
      message: "Cet email n'est pas valide",
    }),

  avatar: z.instanceof(File).optional(),
});

type ProfileFormProps = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  imageUrl?: string;
  className?: string;
};

const ProfileForm = ({
  id,
  firstname,
  lastname,
  email,
  imageUrl,
  className,
}: ProfileFormProps) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [avatar, setAvatar] = useState(imageUrl);

  const fullname = `${firstname} ${lastname}`;

  const updateProfileWithId = updateProfile.bind(null, id);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: firstname,
      lastname: lastname,
      email: email,
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

  return (
    <Form {...form}>
      <form
        action={updateProfileWithId}
        className={cn(
          "w-full p-8 bg-orange-3 rounded-lg space-y-8 flex flex-col items-center",
          className
        )}
      >
        {errorMessage && (
          <p className="text-sm font-bold text-red-700">{errorMessage}</p>
        )}

        <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center">
              <div className="w-40 h-40">
                {imageUrl ? (
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
                aria-describedby="Avatar-label"
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
                {imageUrl ? "Changer de Avatar" : "Ajouter un Avatar"}
              </Button>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="firstname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prénom</FormLabel>
              <FormControl>
                <Input autoComplete="given-name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input autoComplete="family-name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" autoComplete="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="w-full !mt-14 flex flex-col space-y-4">
          <DialogChangePassword userId={id} />
          <Button type="submit" size="lg" className="!w-full">
            Enregistrer les modifications
          </Button>
          <DialogDeleteProfile userId={id} />
        </div>
      </form>
    </Form>
  );
};

export default ProfileForm;
