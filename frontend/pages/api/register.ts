import type { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import { API_URL } from "@/config/index";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { username, email, password } = req.body;

    const strapiRes = await fetch(`${API_URL}/api/auth/local/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await strapiRes.json();

    if (strapiRes.ok) {
      // set cookie
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", data.jwt, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 60 * 60 * 24 * 7, // 1 week
          sameSite: "strict",
          path: "/",
        })
      );

      res.status(200).json({ user: data.user });
    } else {
      if (data.error?.details?.errors.length > 0) {
        const errors = data.error.details.errors;

        res
          .status(data.error.status)
          .json({ message: data.error.details.errors[0].message });
        return;
      }
      res.status(data.error.status).json({ message: data.error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).send(`Method ${req.method} Not Allowed`);
  }
}
