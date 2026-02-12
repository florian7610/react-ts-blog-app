
export type Post = {
    id: number;
    title: string;
    date: string;
    excerpt: string;
    content: string;
    category: string;
    imageUrl: string;
};

export type Comment = {
    id: number;
    postId: number;
    name: string;
    content: string;
    date: string;
};

type ApiPost = {
    userId: number;
    id: number;
    title: string;
    body: string;
};

type ApiComment = {
    postId: number;
    id: number;
    name: string;
    email: string;
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

export const mapApiCommentToComment = (apiComment: ApiComment): Comment => {
    return {
        id: apiComment.id,
        postId: apiComment.postId,
        name: apiComment.name,
        content: apiComment.body,
        date: new Date().toISOString().split('T')[0],
    };
};

export const fetchCommentsForPost = async (postId: number): Promise<Comment[]> => {
    try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
        const data = await res.json();
        return data.map(mapApiCommentToComment);
    } catch (error) {
        console.error(`Error fetching comments for post ${postId}:`, error);
        return [];
    }
};