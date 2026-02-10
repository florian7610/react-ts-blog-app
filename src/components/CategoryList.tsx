import type { Post } from "../data/posts";

type Props = {
    posts: Post[];
};

export default function CategoryList({ posts }: Props) {
    // Extract all categories from posts and remove duplicates
    // Use Set to filter out duplicate values
    const categories = Array.from(new Set(posts.map((p) => p.category)));

    return (
        <ul className="category-list">
            {categories.map((cat) => (
                <li key={cat} className="category-item">
                    {cat}
                </li>
            ))}
        </ul>
    );
}