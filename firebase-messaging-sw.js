importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

// ✅ Firebase config kamu
firebase.initializeApp({
  apiKey: "AIzaSyBgZX_GKkekzJ8KwxLaAsZiDKm8moTuWAA",
  authDomain: "room-chat-4f487.firebaseapp.com",
  projectId: "room-chat-4f487",
  storageBucket: "room-chat-4f487.appspot.com",
  messagingSenderId: "429375918482",
  appId: "1:429375918482:web:c52cbf150d45561024f14b"
});

// ✅ Inisialisasi messaging
const messaging = firebase.messaging();

// ✅ Tangkap push message saat app di background
messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] 📩 Pesan latar belakang diterima:', payload);

  const notificationTitle = payload.notification.title || "Pesan Baru!";
  const notificationOptions = {
    body: payload.notification.body || "Kamu punya pesan baru.",
    icon: "/faqih.png"
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});