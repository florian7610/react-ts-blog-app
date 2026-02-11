import { useState, useEffect } from "react";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import PostList from "../components/PostList";
import PostDetail from "../components/PostDetail";
import CategoryList from "../components/CategoryList";
import { Post, mapApiDataToPost } from "../utils/api";


export type Comment = {
  id: number;
  postId: number;
  name: string;
  content: string;
  date: string;
};

export default function Home() {
  // State: from API
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        const data = await res.json();

        // top 10
        const adaptedPosts = data.slice(0, 10).map(mapApiDataToPost);

        setPosts(adaptedPosts);
        if (adaptedPosts.length > 0) {
          setSelectedPost(adaptedPosts[0]);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // add comment
  const handleAddComment = (newComment: Comment) => {
    setComments([...comments, newComment]);
  };

  // filter comment
  const currentPostComments = comments.filter(
    (c) => selectedPost && c.postId === selectedPost.id
  );

  return (
    <div className="app-container">
      <Head>
        <title>My Next.js Blog</title>
      </Head>

      <Navbar />
      <Hero />

      <main className="main-content">
        {/* Loading State 顯示 */}
        {loading ? (
          <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "2rem" }}>
            <h2>Loading posts...</h2>
          </div>
        ) : (
          <>
            {/* lift */}
            <section className="left-column">
              <h2 className="section-title">Recent Posts (API Driven)</h2>

              <PostList
                posts={posts}
                selectedPostId={selectedPost?.id || 0}
                onSelect={setSelectedPost}
              />
            </section>

            {/* right */}
            <aside className="right-column">
              <h2 className="section-title">Selected Post</h2>

              {selectedPost && (
                <div className="card">
                  <PostDetail
                    post={selectedPost}
                    comments={currentPostComments}
                    onAddComment={handleAddComment}
                  />
                </div>
              )}

              <div className="card">
                <h3>Categories</h3>
                <CategoryList posts={posts} />
              </div>
            </aside>
          </>
        )}
      </main>
    </div>
  );
}