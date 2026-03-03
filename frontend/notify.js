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

function getFailedFromReportJson() {
  const path = "playwright-report/report.json";
  if (!fs.existsSync(path)) return { failedCount: null, failedLines: [] };

  const report = JSON.parse(fs.readFileSync(path, "utf8"));

  const failed = [];
  const suites = report.suites || [];

  const walk = (suite, titlePrefix = "") => {
    const prefix = titlePrefix ? `${titlePrefix} › ` : "";
    const suiteTitle = suite.title ? `${prefix}${suite.title}` : titlePrefix;

    for (const spec of suite.specs || []) {
      const specTitle = suiteTitle ? `${suiteTitle} › ${spec.title}` : spec.title;

      for (const test of spec.tests || []) {
        const isFailed = (test.results || []).some((r) => r.status === "failed");
        if (!isFailed) continue;

        const lastFailedResult = [...(test.results || [])].reverse().find((r) => r.status === "failed");
        const err = lastFailedResult?.error;
        const errMsg =
          (typeof err?.message === "string" && err.message) ||
          (typeof err === "string" && err) ||
          "";

        const shortErr = errMsg ? errMsg.split("\n")[0].slice(0, 140) : "";

        failed.push(shortErr ? `• ${specTitle}\n  ↳ ${shortErr}` : `• ${specTitle}`);
      }
    }

    for (const s of suite.suites || []) walk(s, suiteTitle);
  };

  for (const s of suites) walk(s, "");

  const failedCount =
    typeof report?.stats?.failed === "number" ? report.stats.failed : failed.length;

  return { failedCount, failedLines: failed };
}

const { failedCount, failedLines } = getFailedFromReportJson();

const icon = status === "success" ? "✅" : status === "failed" ? "❌" : "⚠️";

const lines = [
  `${icon} <b>Playwright</b>`,
  `<b>Project:</b> ${project}`,
  `<b>Status:</b> ${status}${failedCount != null ? `, failed: ${failedCount}` : ""}`,
  pipelineUrl ? `<b>Run:</b> ${pipelineUrl}` : "",
  jobUrl ? `<b>Job:</b> ${jobUrl}` : "",
];

if (failedLines.length) {
  const top = failedLines.slice(0, 5).join("\n");
  lines.push("", `<b>Failed tests (top ${Math.min(5, failedLines.length)}):</b>`, top);
  if (failedLines.length > 5) lines.push(`…and ${failedLines.length - 5} more`);
}

await sendMessage({
  token,
  chatId,
  text: lines.filter(Boolean).join("\n"),
});