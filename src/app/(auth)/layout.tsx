import { cn } from "@/lib/utils";
import logo from "@public/intraconnect-logo.svg";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header
      className={cn(
        "fixed top-0 h-20 w-full px-2 flex bg-orange-2 z-10",
        "md:px-4"
      )}
    >
      <Link href="/">
        <Image
          src={logo}
          alt="Logo d'intraconnect, le réseau social interne d'entreprise"
          width={249}
          height={80}
          priority={true}
          className="h-20"
        />
      </Link>
    </header>
  );
};

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Header />
      <main className="mt-20">{children}</main>
    </>
  );
};

export default layout;
