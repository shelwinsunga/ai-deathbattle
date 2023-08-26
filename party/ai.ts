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
  let gameState = null;

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

          // Create game
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

          gameState = await response.json();

          // Manually add current_turn if missing
          if (!gameState.current_turn) {
            gameState.current_turn = 0;
          }

          // Assuming gameState contains the response JSON object
let output = "";

output += "\n" + gameState.description + "\n\n";

output += "Player 1:\n";
output += "Character: " + gameState.player1_character_short_name + "\n";
output += "Endurance: " + gameState.player1_endurance + "\n";
output += "Health: " + gameState.player1_health + "\n";
output += "Idol Turn Count: " + gameState.player1_idol_turn_count + "\n";
output += "Mana: " + gameState.player1_mana + "\n";
output += "Spells: " + gameState.player1_spells.join(", ") + "\n";
output += "Weapons: " + gameState.player1_weapons.join(", ") + "\n\n";

output += "Player 2:\n";
output += "Character: " + gameState.player2_character_short_name + "\n";
output += "Endurance: " + gameState.player2_endurance + "\n";
output += "Health: " + gameState.player2_health + "\n";
output += "Idol Turn Count: " + gameState.player2_idol_turn_count + "\n";
output += "Mana: " + gameState.player2_mana + "\n";
output += "Spells: " + gameState.player2_spells.join(", ") + "\n";
output += "Weapons: " + gameState.player2_weapons.join(", ");

// Send the string through the socket
const id = nanoid();
socket.send(
  JSON.stringify({ type: "new", id, text: output })
);

        
        } else {
          // Update game state
          gameState.current_turn += 1; // Increment turn

          const response = await fetch('https://flask-production-35f0.up.railway.app/take_turn', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              state: gameState,
              player1_action: firstMessage,
              player2_action: secondMessage,
            }),
          });

          gameState = await response.json();

          let output = "";

          output += "\n" + gameState.description + "\n\n";
          
          output += "Player 1:\n";
          output += "Character: " + gameState.player1_character_short_name + "\n";
          output += "Endurance: " + gameState.player1_endurance + "\n";
          output += "Health: " + gameState.player1_health + "\n";
          output += "Idol Turn Count: " + gameState.player1_idol_turn_count + "\n";
          output += "Mana: " + gameState.player1_mana + "\n";
          output += "Spells: " + gameState.player1_spells.join(", ") + "\n";
          output += "Weapons: " + gameState.player1_weapons.join(", ") + "\n\n";
          
          output += "Player 2:\n";
          output += "Character: " + gameState.player2_character_short_name + "\n";
          output += "Endurance: " + gameState.player2_endurance + "\n";
          output += "Health: " + gameState.player2_health + "\n";
          output += "Idol Turn Count: " + gameState.player2_idol_turn_count + "\n";
          output += "Mana: " + gameState.player2_mana + "\n";
          output += "Spells: " + gameState.player2_spells.join(", ") + "\n";
          output += "Weapons: " + gameState.player2_weapons.join(", ");
          
          // Send the string through the socket
          const id = nanoid();
          socket.send(
            JSON.stringify({ type: "new", id, text: output })
          );
          

          // Reset action messages
          firstMessage = "";
          secondMessage = "";
        }
      }
    }
  });
}