// === Import Firebase Messaging ===
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

// === Firebase Config ===
firebase.initializeApp({
  apiKey: "AIzaSyBgZX_GKkekzJ8KwxLaAsZiDKm8moTuWAA",
  authDomain: "room-chat-4f487.firebaseapp.com",
  projectId: "room-chat-4f487",
  storageBucket: "room-chat-4f487.appspot.com",
  messagingSenderId: "429375918482",
  appId: "1:429375918482:web:c52cbf150d45561024f14b"
});

// === Firebase Messaging Instance ===
const messaging = firebase.messaging();

// === Offline Cache ===
const CACHE_NAME = "chatapp-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/intro.html",
  "/login.html",
  "/register.html",
  "/reset.html",
  "/password.html",
  "/chat.html",
  "/home.html",
  "/faqih.png",
  "/oke.png",
  "/qih.svg",
  "/manifest.json"
];

// === Install Service Worker & Cache ===
self.addEventListener("install", (event) => {
  console.log("📦 Service Worker installing...");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("🔁 Service Worker activating...");
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    }).catch(() => caches.match("/index.html"))
  );
});

// === Push Notification Handler ===
self.addEventListener("push", (event) => {
  const data = event.data?.json() || {};
  const title = data.title || "Pesan Baru!";
  const options = {
    body: data.body || "Ada pesan masuk.",
    icon: "/faqih.png",
    badge: "/faqih.png"
  };
  
  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// === Background Sync (opsional) ===
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-chats") {
    event.waitUntil(syncChats());
  }
});

async function syncChats() {
  console.log("🔄 Melakukan background sync...");

}