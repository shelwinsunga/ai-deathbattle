import {
  PartyKitServer,
  PartyKitConnection,
  PartyKitRoom,
} from "partykit/server";
import { nanoid } from "nanoid";
import type { Message, ChatMessage, UserMessage } from "./utils/message";
import { notFound } from "next/navigation";
import { error, ok } from "./utils/response";
import { counter } from "./chatRoom";

export const AI_USERNAME = "AI";

export default {
  async onRequest(req, room) {
    if (req.method !== "POST") return notFound();

    const { id, action } = await req.json();
    if (action !== "connect") return notFound();

    const chatRoom = room.parties.chatroom.get(id);
    const socket = chatRoom.connect();

    simulateUser(socket, room);

    return ok();
  },
} satisfies PartyKitServer;

function simulateUser(
  socket: PartyKitConnection["socket"],
  room: PartyKitRoom
) {
  let messages: Message[] = [];
  let identified = false;
  let firstMessage = "";
  let secondMessage = "";

  socket.addEventListener("message", async (message) => {
    if (!identified) {
      identified = true;
      socket.send(
        JSON.stringify(<UserMessage>{
          type: "identify",
          username: AI_USERNAME,
        })
      );
    }

    const data = JSON.parse(message.data as string) as ChatMessage;
    if (data.type === "sync") {
      messages = data.messages;
    }
    if (data.type === "edit") {
      messages = messages.map((m) => (m.id === data.id ? data : m));
    }
    if (data.type === "new") {
      messages.push(data);
      
      if (data.from.id !== AI_USERNAME && data.from.id !== "system") {
        if (!firstMessage) {
          firstMessage = data.text;
        } else if (!secondMessage) {
          secondMessage = data.text;

          const id = nanoid();
          let text = "";

          // Using firstMessage and secondMessage as player descriptions
          const response = await fetch('https://flask-production-35f0.up.railway.app/create_game', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              player1_description: firstMessage,
              player2_description: secondMessage,
            }),
          });

          const hardCodedData = await response.json();
          
          // Use hardCodedData as your message content
          text = JSON.stringify(hardCodedData);
          socket.send(
            JSON.stringify(<UserMessage>{ type: "new", id, text })
          );
        }
      }
    }
  });
}
