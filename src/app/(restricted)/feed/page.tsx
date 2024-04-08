import Post from "@/components/Post";
import { getPosts } from "@/lib/data";
import { cn } from "@/lib/utils";

const page = async () => {
  const posts = await getPosts();

  return (
    <div
      className={cn("max-w-[600px] mx-4 space-y-4", "md:max-w-[800px] md:mx-8")}
    >
      {posts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </div>
  );
};

export default page;
