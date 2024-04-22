"use client";

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
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DialogChangeAvatar from "./DialogChangeAvatar";
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

  const { toast } = useToast();

  const fullname = `${firstname} ${lastname}`;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: firstname,
      lastname: lastname,
      email: email,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append("firstname", values.firstname);
    formData.append("lastname", values.lastname);
    formData.append("email", values.email);

    try {
      await updateProfile(id, formData);
      toast({
        description: "Votre profil a été mis à jour",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          "w-full p-8 bg-orange-3 rounded-lg space-y-8 flex flex-col items-center",
          className
        )}
      >
        {errorMessage && (
          <p className="text-sm font-bold text-red-700">{errorMessage}</p>
        )}

        <DialogChangeAvatar
          fullname={fullname}
          imageUrl={imageUrl}
          userId={id}
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

        <FormItem className="flex flex-col space-y-1">
          <FormLabel>Mot de passe</FormLabel>
          <DialogChangePassword userId={id} />
        </FormItem>

        <div className="w-full !mt-14 flex flex-col space-y-4">
          <Button type="submit" size="lg">
            Enregistrer les modifications
          </Button>
          <DialogDeleteProfile userId={id} />
        </div>
      </form>
    </Form>
  );
};

export default ProfileForm;
