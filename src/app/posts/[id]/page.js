import { db } from "@/lib/db.js";
import { revalidatePath, redirect } from "next/cache";

export default async function DisplayComments(params) {
  console.log("post id:", params.id);
  const result = await db.query(`SELECT * FROM comments WHERE postid=$1`, [
    params.id,
  ]);

  const comments = result.rows;
  console.log(comments);

  return (
    <div>
      <h2>Comments</h2>
      {comments.rowCount > 0 ? (
        comments.map((comment) => (
          <div key={comment.id}>
            <p>
              <strong>{comment.username}</strong>: {comment.content}
            </p>
          </div>
        ))
      ) : (
        <p>No comments yet</p>
      )}
      <AddCommentPage postId={params.id} />
    </div>
  );
}
function AddCommentPage({ postId }) {
  async function handleAddComment(formData) {
    "use server";

    const username = formData.get("username");
    const content = formData.get("content");

    await db.query(
      `INSERT INTO comments (username, content, postid) VALUES ($1, $2, $3)`,
      [username, content, postId]
    );

    revalidatePath("/");
    // redirect("/");
  }

  return (
    <div>
      <h2>Add Comment</h2>
      <form action={handleAddComment}>
        <input type="hidden" name="postId" value={postId} />
        <input name="username" placeholder="Username" />
        <input name="content" placeholder="Content" />
        <button>Submit</button>
      </form>
    </div>
  );
}
