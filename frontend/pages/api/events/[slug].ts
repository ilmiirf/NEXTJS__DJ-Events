import { Event } from "@/types/event";
import type { NextApiRequest, NextApiResponse } from "next";

const { events } = require("./data.json");

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Event | { message: string }>
) {
  const { slug } = req.query;
  const evt = events.filter((ev: Event) => ev.slug === slug);

  if (req.method === "GET") {
    res.status(200).json(evt);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
