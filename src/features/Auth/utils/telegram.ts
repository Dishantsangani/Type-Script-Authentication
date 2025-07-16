import axios, { AxiosError } from "axios";

const BOT_TOKEN: string = "8040573657:AAFS39pNVriNiBrYfXKCzy1qoWV6cB1yrf4"; // your bot token
const CHAT_ID: string = "7891922761"; // your Telegram user ID

async function notifyTelegram(message: string): Promise<void> {
  try {
    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text: message,
    });
    console.log("📨 Notification sent to Telegram.");
  } catch (error) {
    const err = error as AxiosError;
    console.error("❌ Failed to send Telegram message:", err.message);
  }
}

export { notifyTelegram };
