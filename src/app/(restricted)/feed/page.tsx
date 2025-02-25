import { getPosts } from "@/lib/data";
import { cn } from "@/lib/utils";
import NewPostCard from "./NewPostCard";
import Post from "./Post";

const Page = async () => {
  const posts = await getPosts();

  return (
    <div
      className={cn(
        "px-3 py-6 space-y-2 max-w-[630px]",
        "md:mx-8 md:space-y-4"
      )}
    >
      <NewPostCard />
      {posts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </div>
  );
};

export default Page;
