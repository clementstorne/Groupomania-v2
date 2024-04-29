"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import logo from "@public/intraconnect-logo.svg";
import { Home, LogOut, Menu, User, X } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
      className={cn(buttonVariants({ variant: "link" }), "flex items-center")}
    >
      <>{icon}</>
      <span className="ml-2">{label}</span>
    </Link>
  );
};

const LogoutButton = () => {
  const router = useRouter();

  return (
    <Button
      variant="link"
      className="flex items-center"
      onClick={() => {
        signOut();
        router.push("/login");
      }}
    >
      <LogOut /> <span className="ml-2">Se déconnecter</span>
    </Button>
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
        <Link href="/feed">
          <Image
            src={logo}
            alt="Logo d'intraconnect, le réseau social interne d'entreprise"
            width={249}
            height={80}
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
            <LogoutButton />
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
        <LogoutButton />
      </nav>
    </header>
  );
};

export default Navbar;
