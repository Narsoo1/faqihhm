// api/logNewUser.js
import admin from "../firebaseAdminConfig.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  const { uid, email, username } = req.body;

  const db = admin.firestore();

  try {
    await db.collection("userLogs").doc(uid).set({
      email,
      username,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}