import { ComingSoon, Post } from "@/Components";
import prisma from "@/lib/prisma";
import React from "react";

const publications = ({ posts }) => {
  let lists = JSON.parse(posts);
  console.log(lists);
  console.log(lists[0]);
  return (
    <div className="template centered">
      <h1 className="heading">Publications</h1>
      {<ComingSoon /> && (
        <div>
          {lists.map((post) => (
            <Post post={post} key={post.id} />
          ))}
        </div>
      )}
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
