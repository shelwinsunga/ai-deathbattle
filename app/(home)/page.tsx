"use client";

import Link from "next/link";
import { useCursors } from "./cursors-provider";

export default function Home() {
  const { getCount } = useCursors();
  const count = getCount();

  return (
    <div className="w-full flex flex-col gap-2 items-center justify-center text-center">

      <section className="flex flex-col gap-2">
        <h1 className="text-4xl font-medium pb-6">AI Death Battle</h1>
      </section>

      <Link href="/chat" className="underline">
        <button className="flex items-center justify-center px-10 py-6 border border-stone-200 rounded-lg shadow hover:shadow-md">
          Create Room -&gt;
        </button>
      </Link>
    </div>
  );
}
