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
      variant={"default"}
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

type NavbarLinkProps = {
  href: string;
  label: string;
  icon: React.ReactNode;
  className?: string;
};

const NavbarLink = ({ href, label, icon, className }: NavbarLinkProps) => {
  return (
    <Link
      href={href}
      className="flex items-center text-orange-9 hover:text-orange-11"
    >
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
        "fixed top-0 h-20 w-full px-2 flex justify-between items-center bg-orange-2  z-10",
        "md:px-4"
      )}
    >
      <div className="w-full flex justify-between items-center">
        <Link href="/">
          <Image
            src={"/logo.svg"}
            alt="Logo de Groupomania, le réseau social interne d'entreprise"
            width={249}
            height={40}
            priority={true}
          />
        </Link>

        <BurgerButton
          className="mr-2 md:hidden text-orange-1"
          isOpen={isOpen}
          onClick={handleDrawer}
        />

        <div className="hidden md:block">
          <nav className="flex items-center space-x-8 ">
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
          "w-full fixed top-20 left-0 bg-orange-2 overflow-auto",
          "flex flex-col justify-center items-center space-y-8 py-8",
          "transform ease-in-out transition-all duration-300",
          isOpen && "translate-x-0",
          !isOpen && "-translate-x-full"
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
