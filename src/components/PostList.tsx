import type { Post } from "../data/posts";
import PostCard from "./PostCard";

type Props = {
    posts: Post[];
    selectedPostId: number;
    onSelect: (post: Post) => void;
};

export default function PostList({ posts, selectedPostId, onSelect }: Props) {
    return (
        <div className="post-list">
            {posts.map((post) => (
                <PostCard
                    key={post.id}
                    post={post}
                    isActive={post.id === selectedPostId}
                    onClick={() => onSelect(post)}
                />
            ))}
        </div>
    );
}