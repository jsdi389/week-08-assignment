import { db } from "@/lib/db.js";

export default async function HomePage() {
  const result = await db.query(`SELECT 
    posts.id AS post_id,
    posts.username AS post_username,
    posts.content AS post_content,
    comments.username AS comment_username,
    comments.content AS comment_content
FROM 
    posts
LEFT JOIN 
    comments ON posts.id = comments.post_id
ORDER BY 
    posts.id, comments.id;`);
  const posts = result.rows;

  return (
    <div>
      <h2>Home Page</h2>

      {posts.map(function (post) {
        return (
          <p key={post}>
            {post.username} - {post.content}
          </p>
        );
      })}
    </div>
  );
}
