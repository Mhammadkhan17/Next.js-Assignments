async function fetchPosts() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
}

export default async function HomePage() {
  const posts = await fetchPosts();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl text-center font-bold mb-6">Blog Posts</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <li key={post.id} className="border rounded p-4 shadow hover:shadow-lg transition">
            <h2 className="text-xl font-bold mb-2">{post.title}</h2>
            <p className="text-gray-600">{post.body.substring(0, 100)}...</p>
            <a
              href={`/post/${post.id}`}
              className="text-blue-500 hover:underline mt-4 block"
            >
              Read More
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
