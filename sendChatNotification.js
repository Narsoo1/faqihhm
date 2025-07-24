// api/sendChatNotification.js
import admin from "../firebaseAdminConfig.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  const { token, title, body, data } = req.body;

  const message = {
    notification: { title, body },
    token,
    data,
  };

  try {
    const response = await admin.messaging().send(message);
    res.status(200).json({ success: true, response });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}