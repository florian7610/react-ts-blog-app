import type { Post, Comment } from "../utils/api";
import CommentForm from "./CommentForm";

type Props = {
    post: Post;
    comments: Comment[];
    onAddComment: (comment: Comment) => void;
};

export default function PostDetail({ post, comments, onAddComment }: Props) {
    return (
        <div className="post-detail">
            {/* Title Area */}
            <h2 className="detail-title">{post.title}</h2>
            <p className="detail-meta">
                {post.date} • <span className="category-tag">{post.category}</span>
            </p>

            {/* Image Placeholder */}
            <div className="detail-image">
                <img src={post.imageUrl} alt={post.title} />
                {/* If no image, show placeholder */}
                {/* <p style={{ textAlign: "center", color: "#888", paddingTop: "60px" }}>
                    Image Placeholder: {post.imageUrl}
                </p> */}
            </div>

            {/* Post Content: Use CSS class to ensure line breaks are displayed */}
            <div className="detail-content">
                {post.content}
            </div>

            <hr className="divider" />

            {/* Comments List */}
            <div className="comments-section">
                <h3>Comments ({comments.length})</h3>
                <ul className="comment-list">
                    {comments.map((c) => (
                        <li key={c.id} className="comment-item">
                            <div className="comment-header">
                                <strong>{c.name}</strong>
                                <span className="comment-date">{c.date}</span>
                            </div>
                            <p>{c.content}</p>
                        </li>
                    ))}
                    {comments.length === 0 && (
                        <p className="no-comments">No comments yet. Be the first!</p>
                    )}
                </ul>

                {/* Comment Form */}
                <CommentForm postId={post.id} onSubmit={onAddComment} />
            </div>
        </div>
    );
}