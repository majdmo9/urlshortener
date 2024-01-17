import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@urlshortener/lib/index";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  if (method !== "GET") {
    return res.status(400).json({ message: "Only GET methods are allowed!" });
  }
  const { code } = req.query;
  if (typeof code === "string") {
    const analytic = await prisma.urlAnalytic.findFirst({
      where: {
        url: { urlCode: code },
      },
      include: { url: true },
    });
    if (!analytic) {
      return res.status(400).json({ error: { message: "Analytic not found!" }, statusCode: 400, data: null });
    }
    return res.status(200).json({
      error: null,
      statusCode: 200,
      data: {
        clicked: analytic.clicked,
        url: {
          originalUrl: analytic.url.originalUrl,
          shortUrl: analytic.url.shortUrl,
          code: analytic.url.urlCode,
        },
      },
    });
  }
};

export default handler;
