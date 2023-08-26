"use client";

import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { PARTYKIT_URL } from "@/app/env";
import { Yusei_Magic } from 'next/font/google'
import { text } from "stream/consumers";

const yusei = Yusei_Magic({
    weight: '400',
    subsets: ['latin'] })

export default function NewRoom(props: { slug: string }) {
  const { slug } = props;
  const router = useRouter();

  const handleClick = async (e: FormEvent) => {
    e.preventDefault();
    await fetch(`${PARTYKIT_URL}/parties/chatroom/${slug}`, {
      method: "POST",
    });
    router.push(`/chat/${slug}`);
  };

  return (
    <div className="mt-6 flex flex-row flex-wrap justify-start items-center gap-2">
      <form onSubmit={handleClick}>
        <button
          type="submit"
          className={`text-gray-500 bg-stone-200 hover:bg-stone-300 px-4 py-3 rounded-lg whitespace-nowrap ${yusei.className}`}
          style={{backgroundColor: '3D3B67'}}
        >
          Create Room -&gt;
        </button>
      </form>
    </div>
  );
}
