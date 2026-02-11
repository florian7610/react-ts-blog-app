import type { Post } from "../data/posts";

type Props = {
    post: Post;
    isActive: boolean;
    onClick: () => void;
};

export default function PostCard({ post, isActive, onClick }: Props) {
    return (
        <div
            className={`post-card ${isActive ? "active" : ""}`}
            onClick={onClick}
        >
            <div className="post-thumbnail">
                <img src={post.imageUrl} alt={post.title} />
            </div>

            <div className="post-info">
                <h3>{post.title}</h3>

                <div className="meta-info">
                    <span>{post.date}</span>
                    <span className="badge">{post.category}</span>
                </div>

                <p className="excerpt">{post.excerpt}</p>

                <button className="read-btn">Read</button>
            </div>
        </div>
    );
}
