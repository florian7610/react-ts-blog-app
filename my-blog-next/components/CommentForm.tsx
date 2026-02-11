import { useState, type FormEvent } from "react";
import type { Comment } from "../data/posts";

type Props = {
    postId: number;
    onSubmit: (comment: Comment) => void;
};

export default function CommentForm({ postId, onSubmit }: Props) {
    const [name, setName] = useState("");
    const [content, setContent] = useState("");

    // error message state
    const [errors, setErrors] = useState({ name: "", content: "" });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // 1. validation logic
        const newErrors = { name: "", content: "" };
        let hasError = false;

        if (name.trim().length < 2) {
            newErrors.name = "Name must be at least 2 characters.";
            hasError = true;
        }
        if (content.trim().length < 10) {
            newErrors.content = "Comment must be at least 10 characters.";
            hasError = true;
        }

        setErrors(newErrors);

        if (hasError) return;

        // 2. create a new comment
        const newComment: Comment = {
            id: Date.now(),
            postId: postId,
            name: name,
            content: content,
            date: new Date().toLocaleString(),
        };

        // 3. submit
        onSubmit(newComment);

        // 4. reset form
        setName("");
        setContent("");
        setErrors({ name: "", content: "" });
    };

    return (
        <form className="comment-form" onSubmit={handleSubmit}>
            <h4>Leave a Reply</h4>

            <div className="form-group">
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={errors.name ? "error" : ""}
                />
                {errors.name && <small className="error-msg">{errors.name}</small>}
            </div>

            <div className="form-group">
                <textarea
                    placeholder="Write your comment here..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className={errors.content ? "error" : ""}
                    rows={3}
                />
                {errors.content && <small className="error-msg">{errors.content}</small>}
            </div>

            <button type="submit" className="submit-btn">
                Post Comment
            </button>
        </form>
    );
}