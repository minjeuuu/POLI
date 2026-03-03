
import { SocialPost } from "../../types";
import { generateFeed } from "../../data/socialData";

export const getPersonalizedFeed = (filter: string, userInterests: string[] = []): SocialPost[] => {
    // 1. Generate base pool
    let feed = generateFeed(100);

    // 2. Filter Logic
    if (filter !== 'Global') {
        feed = feed.filter(p => 
            p.discipline.includes(filter) || 
            p.region?.includes(filter) || 
            p.type === filter
        );
    }

    // 3. Scoring Algorithm (Mock)
    // In a real app, this would use ML. Here we boost posts matching user interests.
    feed = feed.map(post => {
        let score = Math.random(); // Base randomness
        if (userInterests.some(i => post.content.includes(i) || post.title.includes(i))) {
            score += 0.5; // Boost relevance
        }
        return { ...post, score };
    }).sort((a, b) => (b as any).score - (a as any).score);

    return feed.slice(0, 30); // Return top 30
};
