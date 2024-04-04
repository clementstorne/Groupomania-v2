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
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
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
});

type LoginFormProps = {
  className?: string;
};

const LoginForm = ({ className }: LoginFormProps) => {
  const [errorMessage, setErrorMessage] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const callbackUrl = searchParams.get("callbackUrl") || "/feed";

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        callbackUrl,
        redirect: false,
      });

      if (res?.ok && res.url) {
        router.push(res?.url);
      } else {
        setErrorMessage("L'email et/ou le mot de passe sont incorrects");
      }
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

        {errorMessage && (
          <p className="text-sm font-medium text-red-700 dark:text-red-900 !mt-16">
            {errorMessage}
          </p>
        )}

        <div className="w-full !mt-14 flex flex-col space-y-4">
          <Button type="submit" size="lg" className="!w-full">
            Je me connecte
          </Button>
          <Link href={"/login"} className={buttonVariants({ variant: "link" })}>
            Je n&apos;ai pas encore de compte
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
