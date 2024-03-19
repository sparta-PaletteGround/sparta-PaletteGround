import Link from "next/link";
import React from "react";

const YellowLinkBtn = ({ href, text }: { href: string; text: string }) => {
  return (
    <Link href={href} className="bg-YellowDark px-2.5 py-1 rounded-xl">
      {text}
    </Link>
  );
};

export default YellowLinkBtn;