import { db } from "@/lib/db.js";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default function AddCommentPage({ searchParams }) {
  async function handleAddComment(formData) {
    "use server";

    const username = formData.get("username");
    const content = formData.get("content");
    const postId = formData.get("postId");

    await db.query(
      `INSERT INTO comments (username, content, post_Id) VALUES ($1, $2, $3)`,
      [username, content, postId]
    );

    revalidatePath("/");
    redirect("/");
  }

  return (
    <div>
      <h2>Add Comment</h2>
      <form action={handleAddComment}>
        <input type="hidden" name="postId" value={searchParams.postId} />
        <input name="username" placeholder="Username" />
        <input name="content" placeholder="Content" />
        <button>Submit</button>
      </form>
    </div>
  );
}
