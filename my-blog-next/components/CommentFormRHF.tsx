import { useForm, type SubmitHandler } from "react-hook-form";
import type { Comment } from "../data/posts";

type Props = {
    postId: number;
    onSubmit: (comment: Comment) => void;
};

type CommentFormInputs = {
    name: string;
    content: string;
};

export default function CommentFormRHF({ postId, onSubmit }: Props) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<CommentFormInputs>({
        defaultValues: {
            name: "",
            content: "",
        },
    });

    const onSubmitHandler: SubmitHandler<CommentFormInputs> = (data) => {
        const newComment: Comment = {
            id: Date.now(),
            postId: postId,
            name: data.name,
            content: data.content,
            date: new Date().toLocaleString(),
        };

        onSubmit(newComment);
        reset();
    };

    return (
        <form className="comment-form" onSubmit={handleSubmit(onSubmitHandler)}>
            <h4>Leave a Reply (React Hook Form)</h4>

            <div className="form-group">
                <input
                    type="text"
                    placeholder="Name"
                    {...register("name", {
                        required: "Name is required",
                        minLength: {
                            value: 2,
                            message: "Name must be at least 2 characters.",
                        },
                    })}
                    className={errors.name ? "error" : ""}
                />
                {errors.name && <small className="error-msg">{errors.name.message}</small>}
            </div>

            <div className="form-group">
                <textarea
                    placeholder="Write your comment here..."
                    {...register("content", {
                        required: "Comment is required",
                        minLength: {
                            value: 10,
                            message: "Comment must be at least 10 characters.",
                        },
                    })}
                    className={errors.content ? "error" : ""}
                    rows={3}
                />
                {errors.content && <small className="error-msg">{errors.content.message}</small>}
            </div>

            <button type="submit" className="submit-btn">
                Post Comment
            </button>
        </form>
    );
}
