import { cn } from "@/lib/utils";
import image from "@public/post-it-intraconnect.webp";
import { Metadata } from "next";
import Image from "next/image";
import LoginForm from "./form";

export const metadata: Metadata = {
  title: "intraconnect - Connectez-vous",
  description:
    "Connectez-vous à IntraConnect, le réseau social interne d'entreprise, pour accéder à un espace de collaboration dynamique. Créez un compte en quelques étapes simples et rejoignez une communauté d'employés engagés. Rejoignez-nous dès aujourd'hui pour rester connecté et productif au sein de votre organisation.",
};

const Page = () => {
  return (
    <section className={cn("w-full p-4", "md:p-8")}>
      <div
        className={cn(
          "w-full bg-orange-3 rounded-lg overflow-hidden",
          "md:grid md:grid-cols-2 md:items-center",
          "lg:grid-cols-5"
        )}
      >
        <LoginForm className={cn("lg:col-span-3 lg:px-20")} />
        <Image
          src={image}
          alt="Des post-it oranges accrochés sur un mur, illustrant l'ambiance collaborative d'intraconnect."
          sizes="(min-width: 1040px) calc(40vw - 26px), calc(50vw - 32px)"
          priority={true}
          className={cn(
            "hidden",
            "md:block md:w-full md:h-full md:object-right md:object-cover",
            "lg:col-span-2"
          )}
        />
      </div>
    </section>
  );
};

export default Page;
