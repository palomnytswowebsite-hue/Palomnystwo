// firebase/config.ts
import { initializeApp } from "firebase/app";
// Важливо: імпортуйте isSupported разом з getAnalytics
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // <<< Додано: імпорт getAuth

// Ваша конфігурація Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD4Os0WVrqz04Q_rQMMvYOIS00Hcld5uiE",
  authDomain: "palomnystwocitys.firebaseapp.com",
  projectId: "palomnystwocitys",
  storageBucket: "palomnystwocitys.firebasestorage.app",
  messagingSenderId: "537586522856",
  appId: "1:537586522856:web:48f4a44376364db077475d",
  measurementId: "G-J1DBWZF6FW",
};

// Ініціалізувати Firebase App
export const app = initializeApp(firebaseConfig);
// Ініціалізувати Firestore
export const db = getFirestore(app);
// Ініціалізувати Auth
export const auth = getAuth(app); // <<< Додано: експорт auth

// Умовно ініціалізувати Analytics тільки на стороні клієнта
let analytics;
if (typeof window !== "undefined") {
  // Перевірка, що код виконується в браузері
  // isSupported() перевіряє, чи підтримується Analytics у поточному середовищі (наприклад, чи доступні cookie)
  isSupported()
    .then((yes) => {
      if (yes) {
        analytics = getAnalytics(app);
      }
    })
    .catch((e) => console.error("Failed to initialize Firebase Analytics:", e)); // Додаємо обробку помилок
}
export { analytics }; // Експортуємо analytics, навіть якщо він не ініціалізований на сервері
