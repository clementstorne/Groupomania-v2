import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Navbar />
      <main
        className={cn(
          "space-y-8",
          "md:space-y-16",
          "flex flex-col items-center",
          "mt-20 mb-8 md:mb-16",
          "px-3 py-6",
          "space-y-2 md:space-y-4"
        )}
      >
        {children}
      </main>
    </>
  );
};

export default layout;
