"use client";

import Link from "next/link";
import { useCursors } from "./cursors-provider";
import NewRoom from "../chat/components/NewRoom";
import { generateSlug, RandomWordOptions } from "random-word-slugs";
import { RoomInfo, SINGLETON_ROOM_ID } from "@/party/chatRooms";
import { PARTYKIT_URL } from "@/app/env";
import { Yusei_Magic } from 'next/font/google'
import localFont from 'next/font/local'

const yusei = Yusei_Magic({
  weight: '400',
  subsets: ['latin']
})

const fountain = localFont({ src: '../../public/the-fountain-of-wishes.regular.ttf' })



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
    <div className="w-full flex flex-col gap-2 items-center justify-center text-center" >

      <section className="flex flex-col gap-2">
        <h1 className={`text-6xl font-medium pb-6 ${fountain.className}`}>
          <span className="text-red-600" style={{textShadow: '2px 2px 2px rgba(0, 0, 0, 0.5)'}}>AI Death</span>
          <span className="text-yellow-500" style={{textShadow: '2px 2px 2px rgba(0, 0, 0, 0.5)'}}> Battle</span>
        </h1>
        <p className={`text-gray-400 ${yusei.className}`}>
          A Multiplayer AI minigame where you compete with creativity
        </p>
      </section>

      <NewRoom slug={generateSlug(3, randomWords)} />
    </div>
  );
}
