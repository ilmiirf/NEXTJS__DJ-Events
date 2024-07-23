import { Event } from "@/types/event";
import type { NextApiRequest, NextApiResponse } from "next";

const { events } = require("./data.json");

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Event | { message: string }>
) {
  if (req.method === "GET") {
    res.status(200).json(events);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
