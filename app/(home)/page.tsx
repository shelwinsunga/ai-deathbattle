"use client";

import Link from "next/link";
import { useCursors } from "./cursors-provider";
import NewRoom from "../chat/components/NewRoom";
import { generateSlug, RandomWordOptions } from "random-word-slugs";
import { RoomInfo, SINGLETON_ROOM_ID } from "@/party/chatRooms";
import { PARTYKIT_URL } from "@/app/env";


const randomWords: RandomWordOptions<3> = {
  format: "kebab",
  categories: { noun: ["animals"] },
  partsOfSpeech: ["adjective", "adjective", "noun"],
};

const partyUrl = `${PARTYKIT_URL}/parties/chatrooms/${SINGLETON_ROOM_ID}`;

export const revalidate = 0;



export default function Home() {
  const { getCount } = useCursors();
  const count = getCount();

  

  return (
    <div className="w-full flex flex-col gap-2 items-center justify-center text-center">

      <section className="flex flex-col gap-2">
        <h1 className="text-4xl font-medium pb-6">AI Death Battle</h1>
      </section>
      <NewRoom slug={generateSlug(3, randomWords)} />
    </div>
  );
}
