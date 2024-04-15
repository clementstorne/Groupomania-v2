"use client";

import UserAvatar from "@/components/UserAvatar";
import { Button, buttonVariants } from "@/components/ui/button";
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
import Link from "next/link";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z
  .object({
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
    password: z
      .string({
        required_error: "Ce champ est requis",
      })
      .min(8, {
        message: "Le mot de passe doit contenir au moins 8 caractères",
      })
      .refine(
        (value) => /(?=.*\d)/.test(value),
        "Le mot de passe doit contenir au moins un chiffre"
      )
      .refine(
        (value) => /(?=.*[a-z])/.test(value),
        "Le mot de passe doit contenir au moins une minuscule"
      )
      .refine(
        (value) => /(?=.*[A-Z])/.test(value),
        "Le mot de passe doit contenir au moins une majuscule"
      )
      .refine(
        (value) => /(?=.*[\W|_])/.test(value),
        "Le mot de passe doit contenir au moins un caractère spécial"
      ),
    confirmPassword: z
      .string({
        required_error: "Ce champ est requis",
      })
      .min(8, {
        message: "Le mot de passe doit contenir au moins 8 caractères",
      })
      .refine(
        (value) => /(?=.*\d)/.test(value),
        "Le mot de passe doit contenir au moins un chiffre"
      )
      .refine(
        (value) => /(?=.*[a-z])/.test(value),
        "Le mot de passe doit contenir au moins une minuscule"
      )
      .refine(
        (value) => /(?=.*[A-Z])/.test(value),
        "Le mot de passe doit contenir au moins une majuscule"
      )
      .refine(
        (value) => /(?=.*[\W|_])/.test(value),
        "Le mot de passe doit contenir au moins un caractère spécial"
      ),
    avatar: z.instanceof(File).optional(),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Les mots de passe ne sont pas identiques",
      path: ["confirmPassword"],
    }
  );

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

  // const updateProfileWithId = updateProfile.bind(null, id);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: "",
      confirmPassword: "",
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
        // action={updateProfileWithId}
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
              {imageUrl ? (
                <UserAvatar
                  name={fullname}
                  src={imageUrl}
                  className="w-20 h-20"
                />
              ) : (
                <UserAvatar name={fullname} className="w-20 h-20" />
              )}
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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mot de passe</FormLabel>
              <FormControl>
                <Input type="password" autoComplete="new-password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmer le mot de passe</FormLabel>
              <FormControl>
                <Input type="password" autoComplete="new-password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="w-full !mt-14 flex flex-col space-y-4">
          <Button type="submit" size="lg" className="!w-full">
            Modifier mon profil
          </Button>
          <Link
            href={"/login"}
            className={buttonVariants({ variant: "destructive" })}
          >
            Supprimer mon profile
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default ProfileForm;
