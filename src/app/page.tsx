import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Paperclip, Speech, ThumbsUp } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/intraconnect-logo.svg";
import image from "../../public/trois-collegues-discutent-intraconnect.webp";

export const metadata: Metadata = {
  title: "intraconnect - Le réseau social interne d'entreprise",
  description:
    "Découvrez IntraConnect, le réseau social interne conçu pour faciliter les échanges et la collaboration au sein de votre entreprise. Partagez des idées, des projets et des moments avec vos collègues de manière conviviale et sécurisée.",
};

type Feature = {
  icon: React.ReactNode;
  title: string;
  content: string;
};

const features: Feature[] = [
  {
    icon: <Speech />,
    title: "Communication simplifiée",
    content:
      "Facilitez la communication entre les membres de votre équipe grâce à notre plateforme intuitive.",
  },
  {
    icon: <Paperclip />,
    title: "Partage de contenus",
    content:
      "Partagez des idées, des documents et des mises à jour en temps réel avec vos collègues.",
  },
  {
    icon: <ThumbsUp />,
    title: "Feedback instantané",
    content:
      "Obtenez rapidement des retours sur vos projets et vos idées grâce à notre système de réactions.",
  },
];

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  content: string;
  className?: string;
};

const FeatureCard = ({ icon, title, content, className }: FeatureCardProps) => {
  return (
    <Card className={cn("basis-0 grow", className)}>
      <CardHeader>
        <CardTitle className="flex flex-col items-center">
          {icon}
          <span className="mt-2 text-center">{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center">{content}</p>
      </CardContent>
    </Card>
  );
};

const Page = () => {
  return (
    <main>
      <section
        className={cn(
          "w-full h-screen p-4 flex flex-col items-center space-y-8",
          "md:space-y-16 md:grid md:grid-cols-2 md:items-center md:gap-x-8"
        )}
      >
        <figure
          className={cn(
            "w-full h-80 rounded-lg overflow-hidden",
            "md:h-full md:w-auto"
          )}
        >
          <Image
            src={image}
            alt="Trois collègues discutent sur intraconnect avec quelqu'un sur leur ordinateur portable"
            sizes="(min-width: 780px) calc(50vw - 32px), calc(100vw - 32px)"
            priority={true}
            className="w-full h-full object-1/2-55p object-cover"
          />
        </figure>
        <article className={cn("space-y-8", "md:space-y-12")}>
          <div>
            <h1 className="flex flex-col items-center space-y-2">
              <span>Bienvenue sur</span>
              <Image src={logo} alt="intraconnect" priority={true} />
            </h1>
            <p className="text-xl w-2/3 text-center mx-auto">
              votre solution tout-en-un pour une communication interne efficace
              et engageante au sein de votre entreprise.
            </p>
          </div>
          <p>
            Avec <span className="font-extrabold leading-tighter">intra</span>
            <span className="font-light">connect</span>, nous visons à renforcer
            les liens entre les membres de votre équipe, à encourager la
            créativité et à favoriser la collaboration, le tout dans un
            environnement convivial et sécurisé.
          </p>
          <div className="space-y-4">
            <Link
              href="/signup"
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "w-full"
              )}
            >
              Inscrivez-vous maintenant
            </Link>
            <p className="text-center">
              Vous avez déjà un compte ?{" "}
              <Link href="/login" className="link">
                Connectez-vous
              </Link>
            </p>
          </div>
        </article>
      </section>

      <section
        className={cn(
          "w-full min-h-screen py-16 px-4 bg-orange-2",
          "md:min-h-fit md:py-32 md:px-16"
        )}
      >
        <h2 className="text-center mb-8">
          Pourquoi choisir{" "}
          <span className="font-extrabold leading-tighter">intra</span>
          <span className="font-light">connect</span> ?
        </h2>
        <div
          className={cn(
            "flex flex-col space-y-8",
            "md:max-w-224 md:mx-auto md:flex-row md:items-stretch md:space-y-0 md:space-x-8"
          )}
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              content={feature.content}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Page;
