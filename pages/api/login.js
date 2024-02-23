import { useAuthContext } from "@/context/AuthContext";
import prisma from "@/lib/prisma";
import { compare, hash } from "bcrypt";

export default async function handler(req, res) {
  // const { login } = useAuthContext();
  if (req.method === "POST") {
    const { email, password } = req.body;

    try {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      if (user == null) {
        res.status(401).json({ message: "Invalid login credentials" });
      }
      compare(password, user.password, (err, result) => {
        if (result) {
          // login(user);
          res
            .status(200)
            .json({ message: "Logged in successfully", user: user });
        } else {
          res.status(401).json({ message: "Invalid login credentials" });
        }
      });
    } catch (e) {
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).json({ error: "Bad request" });
  }
}
