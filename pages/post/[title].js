import React from "react";
import prisma from "@/lib/prisma";

const PostDetail = ({ post }) => {
  const { title, content, createdAt, updatedAt } = JSON.parse(post);
  const formatDate = new Date(createdAt).toLocaleDateString();
  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <p className="text-gray-500 mb-2">
        Published on {formatDate} by Tenzin Passang
      </p>
      <div className="prose max-w-none">{content}</div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
  });
  const paths = feed.map((item) => ({
    params: {
      title: item.title,
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};
export const getStaticProps = async ({ params: { title } }) => {
  const feed = await prisma.post.findMany({
    where: { published: true },
  });
  const filtered = feed.find((post) => post.title === title);
  const post = JSON.stringify(filtered);
  return {
    props: { post },
  };
};

export default PostDetail;
