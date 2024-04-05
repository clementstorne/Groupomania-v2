import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";

const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "intraconnect",
  description:
    "Le réseau social interne d'entreprise favorisant les échanges informels entre les employés. Partagez des posts avec texte et images, recevez des likes, dislikes et commentaires pour renforcer la cohésion et la collaboration au sein de votre organisation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={cn(lato.className, "bg-orange-1 text-gray-12")}>
        {children}
      </body>
    </html>
  );
}
