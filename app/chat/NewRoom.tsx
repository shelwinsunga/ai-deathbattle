"use client";

import { useRouter } from "next/navigation";
import { FormEvent } from "react";

const host = process.env.NEXT_PUBLIC_PARTYKIT_HOST!;
const protocol =
  host?.startsWith("localhost") || host?.startsWith("127.0.0.1")
    ? "http"
    : "https";

export default function NewRoom(props: { slug: string }) {
  const { slug } = props;
  const router = useRouter();

  const handleClick = async (e: FormEvent) => {
    e.preventDefault();
    await fetch(`${protocol}://${host}/parties/chatroom/${slug}`, {
      method: "POST",
    });
    router.push(`/chat/${slug}`);
  };

  return (
    <div className="mt-6 flex flex-row justify-start items-center gap-2">
      <p>
        Create a new room:{" "}
        <span className="font-medium bg-yellow-50">{slug}</span>.
      </p>
      <form onSubmit={handleClick}>
        <button
          type="submit"
          className="bg-stone-200 hover:bg-stone-300 px-2 py-1 rounded"
        >
          Enter -&gt;
        </button>
      </form>
    </div>
  );
}