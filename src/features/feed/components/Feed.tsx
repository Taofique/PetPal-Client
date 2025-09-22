import { useState } from 'react';

const Feed = () => {
  const [posts, setPosts] = useState<string[]>([]);
  const [text, setText] = useState('');

  const addPost = () => {
    if (!text.trim()) return;
    setPosts([text, ...posts]); // newest first
    setText('');
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Public Feed</h2>

      {/* Post input */}
      <div className="bg-white rounded-2xl shadow-md p-4 mb-6">
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="What's on your pet's mind? 🐾"
          className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={addPost}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Post
        </button>
      </div>

      {/* Posts list */}
      <div className="space-y-4">
        {posts.length === 0 ? (
          <p className="text-gray-500">No posts yet. Be the first!</p>
        ) : (
          posts.map((p, i) => (
            <div key={i} className="bg-white rounded-2xl shadow p-4 hover:shadow-md transition">
              <p className="text-gray-800">{p}</p>
              <p className="text-sm text-gray-500 mt-2">{new Date().toLocaleString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Feed;
