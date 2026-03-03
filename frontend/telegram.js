import https from "https";

function request(method, token, payload) {
  const data = JSON.stringify(payload);

  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        hostname: "api.telegram.org",
        path: `/bot${token}/${method}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(data),
        },
      },
      (res) => {
        let body = "";
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => {
          try {
            const json = JSON.parse(body);
            if (!json.ok) return reject(new Error(body));
            resolve(json.result);
          } catch (e) {
            reject(e);
          }
        });
      }
    );

    req.on("error", reject);
    req.write(data);
    req.end();
  });
}

export async function sendMessage({ token, chatId, text }) {
  return request("sendMessage", token, {
    chat_id: chatId,
    text,
    parse_mode: "HTML",
    disable_web_page_preview: true,
  });
}

export async function getUpdates({ token }) {
  return request("getUpdates", token, { allowed_updates: ["message"] });
}