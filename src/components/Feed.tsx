import { useState } from 'react';

const Feed = () => {
  const [posts, setPosts] = useState<string[]>([]);
  const [text, setText] = useState('');

  const addPost = () => {
    if (!text.trim()) return;
    setPosts([...posts, text]);
    setText('');
  };

  return (
    <div>
      <h2>Public Feed</h2>
      <input value={text} onChange={e => setText(e.target.value)} placeholder="Write something..." />
      <button onClick={addPost}>Post</button>
      <ul>
        {posts.map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ul>
    </div>
  );
};

export default Feed;
