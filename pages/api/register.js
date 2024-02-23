import prisma from "@/lib/prisma";
import { hash } from "bcrypt";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, password } = req.body;
    const hashedPassword = await hash(password, 10);

    try {
      // Try to find if user exists.
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      if (user != null) {
        res.status(409).json({ message: `Account already exists for ${name}` });
      } else {
        await prisma.user.create({
          data: {
            name: name,
            email: email,
            password: hashedPassword,
          },
        });
        res.status(200).json({ message: `Account created for ${name}` });
      }
    } catch (e) {
      console.error("Error creating user", e);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).json({ error: "Bad request" });
  }
}
