import React from "react";
import { ShortedUrlResponseType } from "types/shortUrlType";

interface Props {
  shortedUrls: ShortedUrlResponseType["data"][];
  handleDelete: (key: string) => void;
  handleUrlClicked: () => void;
  clicks: { code: string; clicks: number }[];
}

const Results = ({ shortedUrls, handleDelete, clicks, handleUrlClicked }: Props) => {
  return (
    <div className="bg-white shadow-lg rounded-lg gap-4 flex flex-col p-3 min-h-96 min-w-full justify-start items-start">
      {shortedUrls.map(url => (
        <div
          key={url?.code}
          className="text-blue-50 p-4 shadow-lg bg-blue-500 hover:bg-blue-700 flex gap-2 items-center justify-between w-full rounded-sm"
        >
          <a href={url?.shortUrl} onClick={handleUrlClicked} className="w-full h-full font-semibold" target="_blank">
            <p>{url?.shortUrl}</p>
          </a>
          <p className="text-gray-600 min-w-fit bg-blue-100 py-1 px-1 border-solid border-2 border-blue-500 rounded-sm font-semibold">
            Clicked: {clicks.find(el => el.code === url?.code)?.clicks}
          </p>
          <button
            className="bg-red-100 hover:bg-red-700 text-red-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => handleDelete(url?.shortUrl as string)}
          >
            Delete
          </button>
          <button
            className="bg-yellow-100 hover:bg-yellow-700 text-yellow-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => {
              navigator.clipboard.writeText(url?.shortUrl as string);
            }}
          >
            Copy
          </button>
        </div>
      ))}
    </div>
  );
};

export default Results;
