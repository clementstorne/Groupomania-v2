"use client";

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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createNewUser } from "./action";

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

type SignupFormProps = {
  className?: string;
};

const SignupForm = ({ className }: SignupFormProps) => {
  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { firstname, lastname, email, password } = values;
    // try {
    //   const res = await UsersService.createUser({
    //     name,
    //     email,
    //     password,
    //     role,
    //   });
    //   if (res.status === 201) {
    //     signIn(undefined, { callbackUrl: "/dashboard" });
    //   }
    // } catch (error: any) {
    //   if (error.response.status === 409) {
    //     setErrorMessage("Cet email est déjà utilisé");
    //   } else {
    //     console.error(error);
    //   }
    // }
    console.log(values);
  };

  return (
    <Form {...form}>
      <form
        // onSubmit={form.handleSubmit(onSubmit)}
        action={createNewUser}
        className={cn(
          "w-full p-8 bg-orange-3 rounded-lg space-y-8 flex flex-col items-center",
          className
        )}
      >
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

        {errorMessage && (
          <p className="text-sm font-medium text-red-700 dark:text-red-900 !mt-16">
            {errorMessage}
          </p>
        )}

        <div className="w-full !mt-14 flex flex-col space-y-4">
          <Button type="submit" size="lg" className="!w-full">
            Je crée mon compte
          </Button>
          <Link href={"/login"} className={buttonVariants({ variant: "link" })}>
            J&apos;ai déjà un compte
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default SignupForm;
