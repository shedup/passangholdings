import { useAuthContext } from "@/context/AuthContext";
import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { title, content, userId } = req.body;
    try {
      const post = await prisma.post.create({
        data: {
          title: title,
          content: content,
          authorId: userId,
        },
      });
      res.status(200).json({ message: "Post made successfully" });
    } catch (e) {
      res.status(500).json({ error: "Internal server error" });
    }
  } else if (req.method === "PUT") {
    const { id, updatedTitle, updatedContent } = req.body;
    try {
      const post = await prisma.post.update({
        where: {
          id: id,
        },
        data: {
          title: updatedTitle,
          content: updatedContent,
        },
      });
      res.status(200).json({ message: "Post edited successfully" });
    } catch (e) {
      res.status(500).json({ error: "Internal server error" });
    }
  } else if (req.method === "DELETE") {
    const { id } = req.body;
    try {
      const post = await prisma.post.delete({
        where: {
          id: id,
        },
      });
      res.status(200).json({ message: "Post deleted successfully" });
    } catch (e) {
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).json({ error: "Bad request" });
  }
}
