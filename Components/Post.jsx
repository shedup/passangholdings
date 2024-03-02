import Link from "next/link";
import React from "react";

const Post = ({ post: { id, title, content, createdAt, updatedAt } }) => {
  const maxLength = 250;
  const truncatedContent =
    content.length > maxLength ? `${content.slice(0, maxLength)}...` : content;
  return (
    <div className="post-preview ">
      <Link className="no-underline text-black" href={`/post/${id}`}>
        <h1>{title}</h1>
        <p>{truncatedContent}</p>
        <hr />
      </Link>
    </div>
  );
};

export default Post;
