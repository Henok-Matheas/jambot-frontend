"use client";
import Script from "next/script";
import { getUserSpecificUrl } from "./utils/url_constructor.js";
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
const token = process.env.NEXT_PUBLIC_TESTING_TOKEN;
import { useSearchParams } from "next/navigation";

export default function Home() {
  const queryParams = useSearchParams();
  const userSpecificUrl = getUserSpecificUrl(queryParams) || "wadDMX";

  const iframeSrc = `https://tally.so/embed/${userSpecificUrl}&alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`;

  return (
    <>
      <iframe
        data-tally-src={iframeSrc}
        width="100%"
        height="284"
        title="Contact form"
      ></iframe>

      <Script
        id="tally-js"
        src="/tally.js"
        onLoad={() => {
          Tally.loadEmbeds();
        }}
      />
    </>
  );
}
