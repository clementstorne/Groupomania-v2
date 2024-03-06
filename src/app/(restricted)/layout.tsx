import Navbar from "@/components/Navbar";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Navbar />
      <main className="mt-20">{children}</main>
    </>
  );
};

export default layout;
