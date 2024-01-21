import { useRef, useState } from "react";

interface ShareLinkProps {
  gameId: string | undefined;
}

const BASE_URL = import.meta.env.PUBLIC_BASE_URL;

export const ShareLink = ({ gameId }: ShareLinkProps) => {
  const linkText = useRef<HTMLParagraphElement>(null);
  const [showCopied, setShowCopied] = useState(false);

  function switchText() {
    setShowCopied(true);
    setTimeout(() => {
      setShowCopied(false);
    }, 800);
  }

  return (
    <div className="text-white mb-5">
      <h1 className="text-xl mb-2">
        Share the link below with your friend to play! <br />
        And pick your username to start!
      </h1>
      <div className="flex justify-between gap-3">
        <p
          id="link-text"
          className="cursor-pointer"
          ref={linkText}
          onClick={() => {
            if (!linkText.current) return;
            navigator.clipboard.writeText(linkText.current?.innerText);
            switchText();
          }}
        >
          {BASE_URL}/games/{gameId}
        </p>
        <p id="copy-text" className={showCopied ? "opacity-100" : "opacity-0"}>
          Copied!
        </p>
      </div>
    </div>
  );
};
