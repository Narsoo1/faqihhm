// api/checkUsername.js
import admin from "../firebaseAdminConfig.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  const { username } = req.body;
  const db = admin.firestore();

  try {
    const snapshot = await db.collection("users").where("username", "==", username).get();
    if (!snapshot.empty) {
      res.status(200).json({ available: false });
    } else {
      res.status(200).json({ available: true });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}