
import { db } from "../database";

export const toggleLike = async (postId: string, userId: string) => {
    // Persist to DB logic (Mock)
    console.log(`User ${userId} liked post ${postId}`);
    // await db.execute("INSERT INTO likes ...")
    return true;
};

export const postComment = async (postId: string, userId: string, text: string) => {
    // Persist comment
    return {
        id: `c-${Date.now()}`,
        user: userId,
        text: text,
        timestamp: "Just now",
        likes: 0
    };
};
