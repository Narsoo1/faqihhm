// api/deleteChatHistory.js
import admin from "../firebaseAdminConfig.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  const { userA, userB } = req.body;

  const db = admin.firestore();
  const messagesRef = db.collection("messages");

  try {
    const snapshot = await messagesRef
      .where("participants", "in", [[userA, userB], [userB, userA]])
      .get();

    const batch = db.batch();
    snapshot.forEach(doc => batch.delete(doc.ref));
    await batch.commit();

    res.status(200).json({ success: true, deletedCount: snapshot.size });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}