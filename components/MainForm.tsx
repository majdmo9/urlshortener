"use client";
import { useEffect, useState } from "react";
import Error from "./errors/Error";
import { ShortedUrlResponseType } from "types/shortUrlType";
import Results from "./Results";

const createUrl = async (url: string): Promise<ShortedUrlResponseType | ""> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/generate`, {
    method: "POST",
    body: JSON.stringify({ url }),
  });
  if (!res.ok) {
    return "";
  }
  return res.json();
};

const MainForm = () => {
  const [url, setUrl] = useState<string>("");
  const [error, setError] = useState<string>();
  const [urlClicked, setUrlClicked] = useState(false);
  const [shortedUrls, setShortedUrls] = useState<ShortedUrlResponseType["data"][]>([]);
  const [clicks, setClicks] = useState<{ code: string; clicks: number }[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (url) {
      const res = await createUrl(url);
      if (res) {
        const { data, error, statusCode } = res;

        if (statusCode === 200) {
          setError("");
          if (!shortedUrls.find(el => el?.code === data?.code)) {
            setShortedUrls(prev => Array.from(new Set([...prev, data as ShortedUrlResponseType["data"]])));
          } else {
            setError("Already shortened!");
          }
        } else if (statusCode === 400 && error) {
          setError(error.message);
        }
        setUrl("");
      }
    }
  };

  const handleDelete = (url: string) => {
    setShortedUrls(prev => prev.filter(el => el?.shortUrl !== url));
  };
  const handleUrlClicked = () => {
    setUrlClicked(true);
  };

  useEffect(() => {
    const fetchClicks = async () => {
      let clicksArr = [];
      for (const url of shortedUrls) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/analytics/${url?.code}`, { method: "GET" });
        clicksArr.push({ code: url?.code, clicks: (await res.json()).data.clicked });
      }
      setClicks(clicksArr as any);
      setUrlClicked(false);
    };
    fetchClicks();
  }, [shortedUrls, urlClicked]);

  return (
    <div className="py-24 min-h-full w-full flex flex-col justify-start items-center">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white w-full rounded-lg shadow-lg p-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="text">
          Enter Url to short:
        </label>
        <input
          type="url"
          id="url"
          value={url}
          onChange={e => setUrl(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {error ? <Error errorMessage={error} /> : <></>}
        <button
          type="submit"
          className="w-full mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </form>
      <div className="p-12 min-h-96 min-w-full">
        <Results shortedUrls={shortedUrls} clicks={clicks} handleUrlClicked={handleUrlClicked} handleDelete={handleDelete} />
      </div>
    </div>
  );
};

export default MainForm;
