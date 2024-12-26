import CommentSection from '../../components/CommentSection';

async function fetchPost(id) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!res.ok) throw new Error('Failed to fetch post');
  return res.json();
}

export default async function PostPage({ params }) {
  const post = await fetchPost(params.id);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-700 mb-6">{post.body}</p>
      
      {/* Comments Section */}
      <CommentSection postId={params.id} />
    </div>
  );
}
