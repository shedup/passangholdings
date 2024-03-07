import { ComingSoon, Post } from "@/Components";
import { useAuthContext } from "@/context/AuthContext";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export const revalidate = 0;

const publications = ({ posts }) => {
  const router = useRouter();
  let lists = JSON.parse(posts);
  const { isAdmin, user } = useAuthContext();
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch("/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content, userId: user.id }),
      });
      if (resp.ok) {
        setEditMode(false);
        toast.success("Article published!");
        router.push("/publications");
      } else {
        toast.error("Something went wrong");
      }
    } catch (err) {
      toast.error(`Something went wrong, try again.`);
      console.error("Error:", err.message);
    }
  };

  return (
    <div className=" template full-screen">
      {isAdmin && !editMode && (
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded mr-4 hover:bg-blue-700 ease-in-out duration-200 transition-colors"
            type="button"
            onClick={() => setEditMode(true)}
          >
            Post
          </button>
        </div>
      )}
      {editMode && (
        <form onSubmit={handleSubmit} className="border flex flex-col p-8 m-2">
          <h1>Post an article</h1>
          <div className="my-8">
            <label className="text-2xl mr-4" htmlFor="title">
              Title
            </label>
            <input
              className="border w-5/6"
              type="text"
              id="title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-3 flex flex-col">
            <label className="text-2xl" htmlFor="content">
              Content
            </label>
            <textarea
              className="border"
              id="content"
              rows="20"
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <button
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded mr-4 hover:bg-blue-700 ease-in-out duration-200 transition-colors"
              type="submit"
            >
              Post
            </button>
            <button
              className="bg-white border text-black font-bold py-2 px-4 rounded hover:bg-blue-700 ease-in-out duration-200 transition-colors"
              type="button"
              onClick={() => setEditMode(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
      <div>
        {lists.length === 0 && <h1 className="text-center">No posts yet.</h1>}
        {lists.map((post) => (
          <Post post={post} key={post.id} />
        ))}
        {/* <div className="post-preview">
          <Link
            href={`/post/post-detailed`}
            className="no-underline text-black"
          >
            <h1>Op-Ed: Bitcoin - A Speculative Vehicle or New Asset Class?</h1>
            <p>
              Bitcoin was invented in 2009 by an anonymous person as a form of
              exchange. Initially valued at $0.00099, today a single bitcoin is
              a little over $50K. Since its inception it has gained over
              1,415,120,233.33% in value while the S & P 500 has gained 510.15%.
              So it begs the question...{" "}
            </p>
            <hr />
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  const feed = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });
  const posts = JSON.stringify(feed);
  return {
    props: { posts },
    revalidate: 10,
  };
};

export default publications;
