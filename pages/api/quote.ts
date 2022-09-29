// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export interface RootObject {
  q: string;
  a: string;
  h: string;
}

function fetchRandomQuote() {
  const url = "https://zenquotes.io/api/random";

  return fetch(url)
    .then((res) => res.json())
    .then((data: any) => {
      return data;
    });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const result: any = await fetchRandomQuote();

    const response = {
      quote: result[0].q,
      author: result[0].a,
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: "failed to load data" });
  }
}
