import Link from "next/link";
import React from "react";

const Post = ({
  post: { title, content, published, createdAt, updatedAt, authorId, author },
}) => {
  return (
    <div className="post-preview">
      <Link href={`/post/${title}`} style={{ textDecoration: "none" }}>
        <h1>{title}</h1>
        <p>{content}</p>
        <hr />
      </Link>
    </div>
  );
};

export default Post;
