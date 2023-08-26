import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./components/Providers";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NewRoom from "./chat/components/NewRoom";
import { generateSlug, RandomWordOptions } from "random-word-slugs";
import { RoomInfo, SINGLETON_ROOM_ID } from "@/party/chatRooms";
import { PARTYKIT_URL } from "@/app/env";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Demo",
  description: "AI Death Battle",
};

const randomWords: RandomWordOptions<3> = {
  format: "kebab",
  categories: { noun: ["animals"] },
  partsOfSpeech: ["adjective", "adjective", "noun"],
};

const partyUrl = `${PARTYKIT_URL}/parties/chatrooms/${SINGLETON_ROOM_ID}`;

export const revalidate = 0;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div
            className="flex flex-col justify-between relative"
            style={{ minHeight: "100dvh" }}
          >
            <div className="flex-grow p-4 sm:p-6">
              <div className="max-w-7xl m-auto w-full flex flex-col justify-start items-start">
                {children}
              </div>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
