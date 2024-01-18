import generateShortLink from "@urlshortener/lib/generateShortLink";
import { NextApiRequest, NextApiResponse } from "next";
import { isWebUri } from "valid-url";
import { prisma } from "@urlshortener/lib/index";

type RequestData = { url: string };

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if (method !== "POST") {
    return res.status(400).json({ message: "Only POST methods are allowed!" });
  }

  const { url }: RequestData = JSON.parse(req.body);

  const host = req.headers.host;
  const { shortCode, shortUrl } = generateShortLink(host!);

  if (!isWebUri(url)) {
    return res.status(400).json({ error: { message: "Invalid Url!" }, statusCode: 400, data: null });
  }

  const result = await prisma?.$transaction(async tx => {
    // query if there us an existing original url
    const originalUrl = await tx.url.findFirst({
      where: { originalUrl: url },
    });
    if (originalUrl) {
      return originalUrl;
    }
    // create a new url
    const newUrl = await tx.url.create({
      data: {
        originalUrl: url,
        shortUrl,
        urlCode: shortCode,
      },
    });
    // cerate new analytic
    await tx.urlAnalytic.create({
      data: {
        clicked: 0,
        url: {
          connect: {
            id: newUrl.id,
          },
        },
      },
    });

    return newUrl;
  });

  return res.status(200).json({
    statusCode: 200,
    error: null,
    data: {
      originalUrl: result?.originalUrl,
      shortUrl: result?.shortUrl,
      code: result?.urlCode,
    } as Record<string, string>,
  });
}
