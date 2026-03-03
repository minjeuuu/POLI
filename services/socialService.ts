
import { SocialPost } from "../types";
import { generateFeed } from "../data/socialData";
import { withCache } from "./common";

export const fetchSocialFeed = async (filter: string = "Global", limit: number = 20): Promise<SocialPost[]> => {
    // In a real app, this would call an API. 
    // Here we use our sophisticated generator but wrap it in a promise/cache structure.
    return withCache(`social_feed_${filter}_${limit}`, async () => {
        // Simulate network delay for realism
        await new Promise(resolve => setTimeout(resolve, 600));
        
        const allPosts = generateFeed(50); // Generate a large pool
        
        if (filter === "Global") return allPosts.slice(0, limit);
        
        return allPosts.filter(p => 
            p.discipline.includes(filter) || 
            p.region?.includes(filter) || 
            p.type === filter ||
            p.tags.some(t => t.label === filter)
        ).slice(0, limit);
    });
};
