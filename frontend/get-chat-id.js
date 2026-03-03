import { getUpdates } from "./telegram.js";

const token = process.env.BOT_TOKEN;

if (!token) {
  console.error("BOT_TOKEN is required");
  process.exit(1);
}

const updates = await getUpdates({ token });

if (!updates.length) {
  console.log("Нет updates. Напиши боту сообщение и повтори.");
  process.exit(0);
}

const last = updates[updates.length - 1];
const chatId = last.message.chat.id;
const title = last.message.chat.title || last.message.chat.username || "private";

console.log(`chat_id: ${chatId}`);
console.log(`chat: ${title}`);