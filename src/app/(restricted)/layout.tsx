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
          "mt-20 mb-8 space-y-8 flex flex-col items-center",
          "md:mb-16 md:space-y-16"
        )}
      >
        {children}
      </main>
    </>
  );
};

export default layout;
