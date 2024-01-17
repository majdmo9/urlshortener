export type ShortedUrlResponseType = {
  error: { message: string } | null;
  data: { originalUrl: string; shortUrl: string; code: string } | null;
  statusCode: number;
};
