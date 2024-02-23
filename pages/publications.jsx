import { ComingSoon, Post } from "@/Components";
import { useAuthContext } from "@/context/AuthContext";
import prisma from "@/lib/prisma";
import React from "react";

const publications = ({ posts }) => {
  // let lists = JSON.parse(posts);
  const { isAdmin } = useAuthContext();
  return (
    <div className="template centered full-screen">
      {isAdmin && <button>Post</button>}
      <p>Zero Publications yet</p>
      {/* {lists.length == -1 && <ComingSoon />}
      {lists.length != -1 && (
        <div>
          {lists.map((post) => (
            <Post post={post} key={post.id} />
          ))}
        </div>
      )} */}
    </div>
  );
};

export const getStaticProps = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  const posts = JSON.stringify(feed);
  console.log("Fetched posts:", posts);
  console.log("in sql");
  return {
    props: { posts },
    revalidate: 10,
  };
};

export default publications;
