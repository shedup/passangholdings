import React from "react";

const Post = ({
  post: { title, content, published, createdAt, updatedAt, authorId, author },
}) => {
  return (
    <div className="post-preview">
      <h2>{title}</h2>
      <p>{content}</p>
      <hr />
    </div>
  );
};

export default Post;
