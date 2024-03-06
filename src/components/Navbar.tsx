"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Home, LogOut, Menu, User, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type BurgerButtonProps = {
  className?: string;
  isOpen: boolean;
  onClick: () => void;
};

const BurgerButton = ({ className, isOpen, onClick }: BurgerButtonProps) => {
  return (
    <Button
      variant={"outline"}
      className={className}
      aria-label="Open Menu"
      onClick={onClick}
    >
      {isOpen ? <X /> : <Menu />}
    </Button>
  );
};

type Link = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

const links: Link[] = [
  {
    href: "/feed",
    label: "Accueil",
    icon: <Home />,
  },
  {
    href: "/profile",
    label: "Profil",
    icon: <User />,
  },
  {
    href: "/login",
    label: "Se déconnecter",
    icon: <LogOut />,
  },
];

const NavbarLink = ({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) => {
  return (
    <Link href={href} className="flex items-center hover:font-bold">
      <>{icon}</>
      <span className="ml-2">{label}</span>
    </Link>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDrawer = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleEscKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.body.style.setProperty("overflow", "hidden");
    } else {
      document.body.style.removeProperty("overflow");
    }

    document.addEventListener("keydown", handleEscKeyPress);

    return () => {
      document.removeEventListener("keydown", handleEscKeyPress);
    };
  }, [isOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 h-20 w-full px-2 flex justify-between items-center bg-orange-9 z-10",
        "md:px-4"
      )}
    >
      <div className="w-full flex justify-between items-center">
        <Link href="/">
          <Image
            src={"/groupomania.svg"}
            alt="Logo de Groupomania, le réseau social interne d'entreprise"
            width={249}
            height={40}
            priority={true}
          />
        </Link>

        <BurgerButton
          className="mr-2 md:hidden"
          isOpen={isOpen}
          onClick={handleDrawer}
        />

        <div className="hidden md:block">
          <nav className="flex items-center space-x-8">
            {links.map((link, index) => (
              <NavbarLink
                key={index}
                href={link.href}
                label={link.label}
                icon={link.icon}
              />
            ))}
          </nav>
        </div>
      </div>

      <nav
        className={cn(
          "w-full fixed left-0 bg-orange-9 overflow-auto",
          "flex flex-col justify-center items-center space-y-8 py-8",
          "transform ease-in-out transition-all duration-300",
          isOpen && "top-20 translate-y-0",
          !isOpen && "top-0 -translate-y-full"
        )}
      >
        {links.map((link, index) => (
          <NavbarLink
            key={index}
            href={link.href}
            label={link.label}
            icon={link.icon}
          />
        ))}
      </nav>
    </header>
  );
};

export default Navbar;
