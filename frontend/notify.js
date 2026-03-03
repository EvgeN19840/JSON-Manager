import fs from "fs";
import { sendMessage } from "./telegram.js";

const token = process.env.BOT_TOKEN;
const chatId = process.env.CHAT_ID;

if (!token || !chatId) {
  console.error("BOT_TOKEN and CHAT_ID are required");
  process.exit(1);
}

const status = process.env.CI_JOB_STATUS || process.env.STATUS || "unknown";
const project = process.env.CI_PROJECT_PATH || process.env.PROJECT || "project";
const pipelineUrl = process.env.CI_PIPELINE_URL || process.env.RUN_URL || "";
const jobUrl = process.env.CI_JOB_URL || "";

let failed = "";
try {
  if (fs.existsSync("playwright-report/results.json")) {
    const json = JSON.parse(fs.readFileSync("playwright-report/results.json", "utf8"));
    failed = json?.stats?.failed != null ? `, failed: ${json.stats.failed}` : "";
  }
} catch {}

const icon = status === "success" ? "✅" : status === "failed" ? "❌" : "⚠️";

const lines = [
  `${icon} <b>Playwright</b>`,
  `<b>Project:</b> ${project}`,
  `<b>Status:</b> ${status}${failed}`,
  pipelineUrl ? `<b>Pipeline:</b> ${pipelineUrl}` : "",
  jobUrl ? `<b>Job:</b> ${jobUrl}` : "",
].filter(Boolean);

await sendMessage({
  token,
  chatId,
  text: lines.join("\n"),
});