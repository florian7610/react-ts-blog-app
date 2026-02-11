
export type Post = {
    id: number;
    title: string;
    date: string;
    excerpt: string;
    content: string;
    category: string;
    imageUrl: string;
};

type ApiPost = {
    userId: number;
    id: number;
    title: string;
    body: string;
};

//  tran
export const mapApiDataToPost = (apiPost: ApiPost): Post => {

    const categories = ["React", "Next.js", "TypeScript", "Web Dev"];
    const randomCategory = categories[apiPost.id % categories.length];

    // ra
    const randomImage = `https://picsum.photos/seed/${apiPost.id}/600/400`;

    return {
        id: apiPost.id,
        title: apiPost.title,
        // fake date
        date: new Date().toISOString().split('T')[0],
        // 
        excerpt: apiPost.body.substring(0, 50) + "...",
        content: apiPost.body, // full content
        category: randomCategory,
        imageUrl: randomImage,
    };
};