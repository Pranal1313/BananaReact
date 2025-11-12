// src/Score.js
import { db } from "./firebaseConfig";
import { ref, get, set } from "firebase/database";

/**
 * Save score for a user — automatically fetches username from 'users' node.
 * @param {string} uid - Firebase Auth UID
 * @param {number} time - Time taken (in seconds)
 */
export const saveScore = async(uid, time) => {
    if (!uid || time == null) return;

    try {
        // ✅ Fetch username from "users" table
        const userRef = ref(db, `users/${uid}`);
        const userSnap = await get(userRef);

        let username = "Anonymous";
        if (userSnap.exists() && userSnap.val().username) {
            username = userSnap.val().username;
        }

        // ✅ Reference to leaderboard entry
        const scoreRef = ref(db, `leaderboard/${uid}`);
        const snapshot = await get(scoreRef);

        // ✅ Save only if new score is better (lower time)
        if (!snapshot.exists() || time < snapshot.val().time) {
            await set(scoreRef, { username, time });
            console.log("🏆 New high score saved!");
        } else {
            console.log("⚡ Existing score is better, not saved.");
        }
    } catch (error) {
        console.error("❌ Error saving score:", error);
    }
};