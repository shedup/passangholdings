import { useAuthContext } from "@/context/AuthContext";
import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { title, content, userId } = req.body;
    console.log("HERE in api", title, content);

    try {
      const post = await prisma.post.create({
        data: {
          title: title,
          content: content,
          published: true,
          authorId: userId,
        },
      });
      res.status(200).json({ message: "Post made successfully" });
    } catch (e) {
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).json({ error: "Bad request" });
  }
}
