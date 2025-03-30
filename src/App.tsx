import { Suspense } from "react";
import { Route, HashRouter as Router, Routes } from "react-router-dom";
import { Post } from "./post/Post";
import { posts } from "./post/posts";

function App() {
  // basename="/are-presentation">
  return (
    <Router>
      <Suspense
        fallback={<div className="text-predator-300 opacity-20 m-24">...</div>}
      >
        <Routes>
          {posts.map((post) => (
            <Route
              key={post.path}
              path={post.path}
              element={<Post post={post} />}
            />
          ))}
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
