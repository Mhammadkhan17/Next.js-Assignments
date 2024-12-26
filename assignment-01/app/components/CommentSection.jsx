'use client';

import { useEffect, useState } from 'react';

async function fetchComments(postId) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
  if (!res.ok) throw new Error('Failed to fetch comments');
  return res.json();
}

export default function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    fetchComments(postId).then(setComments).catch(console.error);
  }, [postId]);

  const handleAddComment = () => {
    if (newComment.trim() === '') return;
    const newCommentObj = {
      postId,
      id: comments.length + 1,
      name: 'Anonymous',
      body: newComment,
    };
    setComments([...comments, newCommentObj]);
    setNewComment('');
  };

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      
      <ul className="space-y-4 mb-6">
        {comments.map((comment) => (
          <li key={comment.id} className="border rounded p-4 shadow">
            <p className="text-gray-700">{comment.body}</p>
            <span className="text-sm text-gray-500">- {comment.name}</span>
          </li>
        ))}
      </ul>

      {/* Add New Comment */}
      <div className="flex items-center space-x-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="w-full p-2 border rounded text-black"
        ></textarea>
        <button
          onClick={handleAddComment}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Comment
        </button>
      </div>
    </div>
  );
}
