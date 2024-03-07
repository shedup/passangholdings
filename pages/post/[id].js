import React, { useState } from "react";
import prisma from "@/lib/prisma";
import { useAuthContext } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";

const options = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  hour12: true,
  timeZoneName: "short",
  timeZone: "America/Chicago", // Adjust to your desired time zone
};
export const dynamic = "force-dynamic";
const PostDetail = ({ post }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { id, title, content, createdAt, updatedAt } = JSON.parse(post);
  console.log("HERE", JSON.parse(post));
  const formatDate = new Date(createdAt).toLocaleDateString("en-US");
  const updatedDate = new Date(updatedAt).toLocaleString("en-US", options);
  const { isAdmin } = useAuthContext();
  const [editMode, setEditMode] = useState(false);

  const [updatedTitle, setTitle] = useState(title);
  const [updatedContent, setContent] = useState(content);
  const renderContent = () => {
    return { __html: content.replace(/\n/g, "<br>") };
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch("/api/post", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, updatedTitle, updatedContent }),
      });
      if (resp.ok) {
        setEditMode(false);
        toast.success("Article updated!");
        router.push("/publications");
      } else {
        toast.error("Something went wrong");
      }
    } catch (err) {
      toast.error(`Something went wrong, try again.`);
      console.error("Error:", err.message);
    }
  };
  const handleDelete = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const resp = await fetch("/api/post", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      if (resp.ok) {
        setEditMode(false);
        toast.success("Article deleted!");
        router.push("/publications");
      } else {
        toast.error("Something went wrong");
      }
    } catch (err) {
      toast.error(`Something went wrong, try again.`);
      console.error("Error:", err.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      {isAdmin && !editMode && (
        <div className="flex items-center justify-end">
          <FaEdit
            className="mr-3 hover:text-blue-900 text-blue-500 h-6 w-6 ease-in-out duration-200 transition-colors"
            type="button"
            onClick={() => setEditMode(true)}
          />
          <RiDeleteBin6Line
            className="hover:text-red-900 text-red-500 h-6 w-6 ease-in-out duration-200 transition-colors"
            type="button"
            data-toggle="modal"
            data-target="#exampleModal"
          />
        </div>
      )}
      {/* Modal for delete to confirm deletion. */}
      <div
        className="modal fade "
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div
          className="modal-dialog fixed top-0 left-0 w-full h-full sm:flex sm:items-center sm:justify-center"
          role="document"
        >
          <div className="modal-content ">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Are you sure you want to delete the article?
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">This action is irreversible.</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                disabled={isLoading}
                onClick={handleDelete}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      {!editMode && (
        <div>
          <h1 className="text-3xl font-bold mb-4">{title}</h1>
          <p className="text-gray-500 mb-2">
            Published on {formatDate} by Tenzin Passang
          </p>
          {createdAt !== updatedAt && (
            <p className="text-gray-400 mb-2 italic">Updated {updatedDate}</p>
          )}
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={renderContent()}
          />
        </div>
      )}
      {editMode && (
        <form onSubmit={handleEdit} className="border flex flex-col p-8 m-2">
          <h1>Edit</h1>
          <div className="my-8">
            <label className="text-2xl mr-4" htmlFor="title">
              Title
            </label>
            <input
              className="border w-2/6"
              type="text"
              id="title"
              onChange={(e) => setTitle(e.target.value)}
              value={updatedTitle}
            />
          </div>
          <div className="mb-3 flex flex-col">
            <label className="text-2xl" htmlFor="content">
              Content
            </label>
            <textarea
              className="border"
              id="content"
              rows="6"
              onChange={(e) => setContent(e.target.value)}
              value={updatedContent}
            />
          </div>
          <div className="flex justify-end">
            <button
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded mr-4 hover:bg-blue-700 ease-in-out duration-200 transition-colors"
              type="submit"
            >
              Update
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
    </div>
  );
};

export const getServerSideProps = async ({ params: { id } }) => {
  const feed = await prisma.post.findMany();
  const filtered = feed.find((post) => post.id === id);
  const post = JSON.stringify(filtered);
  return {
    props: { post },
  };
};

export default PostDetail;
