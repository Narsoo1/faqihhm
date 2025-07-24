// api/updateReadStatus.js
import admin from "../firebaseAdminConfig.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  const { chatId, userId } = req.body;
  const db = admin.firestore();

  try {
    const messagesRef = db.collection("messages").where("chatId", "==", chatId).where("to", "==", userId);

    const snapshot = await messagesRef.get();
    const batch = db.batch();
    snapshot.forEach(doc => {
      batch.update(doc.ref, { read: true });
    });
    await batch.commit();

    res.status(200).json({ success: true, updated: snapshot.size });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}