import { db } from "@/lib/db.js";
import Link from "next/link";

export default async function HomePage() {
  const result = await db.query(`SELECT * FROM POSTS`);
  const posts = result.rows;

  return (
    <div>
      <h2>Home Page</h2>

      {posts.map(function (post) {
        return (
          <div key={post}>
            <Link href={`/posts/${post.id}`}>
              {post.username}-{post.content}
            </Link>
          </div>
        );
      })}
    </div>
  );
}
