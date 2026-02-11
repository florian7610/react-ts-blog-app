import React from 'react';
import type { Comment } from '../data/posts';
import CommentForm from './CommentForm';

interface CommentSectionProps {
    postId: number;
    comments: Comment[];
    onAddComment: (comment: Comment) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId, comments, onAddComment }) => {
    return (
        <div className="comments-section">
            <h3 className="comments-title">Comments ({comments.length})</h3>
            <div className="comments-list">
                {comments.map((comment) => (
                    <div key={comment.id} className="comment">
                        <div className="comment-author"><strong>{comment.name}</strong></div>
                        <div className="comment-date" style={{ fontSize: '0.8rem', color: '#666' }}>{comment.date}</div>
                        <div className="comment-content">{comment.content}</div>
                    </div>
                ))}
                {comments.length === 0 && (
                    <p className="text-secondary">No comments yet. Be the first to share your thoughts!</p>
                )}
            </div>

            <CommentForm postId={postId} onSubmit={onAddComment} />
        </div>
    );
};

export default CommentSection;