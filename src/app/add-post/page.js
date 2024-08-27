import { db } from "@/lib/db.js";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default function AddPostPage() {
  async function handleAddPost(formData) {
    "use server";

    const username = formData.get("username");
    const content = formData.get("content");

    await db.query(`INSERT INTO posts (username, content) VALUES ($1, $2)`, [
      username,
      content,
    ]);

    revalidatePath("/");
    redirect("/");
  }

  return (
    <div>
      <h2>Add Post</h2>
      <form action={handleAddPost}>
        <input name="username" placeholder="Username" />
        <input name="content" placeholder="Content" />
        <button>Submit</button>
      </form>
    </div>
  );
}
