import { useState } from "react";
import { posts } from "./data/posts"; // import posts data
import type { Post, Comment } from "./data/posts";
import PostList from "./components/PostList";
import PostDetail from "./components/PostDetail";
import CategoryList from "./components/CategoryList";
import "./index.css";

// export type Comment = {
//   id: number;
//   postId: number;
//   name: string;
//   content: string;
//   date: string;
// };

export default function App() {
  // State 1: Currently selected post (default first post)
  const [selectedPost, setSelectedPost] = useState<Post>(posts[0]);

  // State 2: Array to store all comments
  const [comments, setComments] = useState<Comment[]>([]);

  // Add comment function
  const handleAddComment = (newComment: Comment) => {
    setComments([...comments, newComment]);
  };

  // Filter comments for the currently selected post
  const currentPostComments = comments.filter(
    (c) => c.postId === selectedPost.id
  );

  return (
    <div className="app-container">
      {/* Navbar */}
      <nav className="navbar">
        <h1>MyBlog</h1>
        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#">Posts</a>
          <a href="#">About</a>
        </div>
      </nav>

      {/* Hero */}
      <header className="hero">
        <h2>Welcome to MyBlog</h2>
        <p>A WordPress-style static blog UI: recent posts, categories, and comments.</p>
      </header>

      {/* Main content: Left column list + Right column details */}
      <main className="main-content">

        {/* Left column: Post list */}
        <section className="left-column">
          <h2 className="section-title">Recent Posts</h2>
          <PostList
            posts={posts}
            selectedPostId={selectedPost.id}
            onSelect={setSelectedPost}
          />
        </section>

        {/* Right column: Post details + Sidebar */}
        <aside className="right-column">
          <h2 className="section-title">Selected Post</h2>

          {/* Post details and comments */}
          <div className="card">
            <PostDetail
              post={selectedPost}
              comments={currentPostComments}
              onAddComment={handleAddComment}
            />
          </div>

          {/* Sidebar Widget */}
          <div className="card">
            <h3>Categories</h3>
            <CategoryList posts={posts} />
          </div>
        </aside>

      </main>
    </div>
  );
}