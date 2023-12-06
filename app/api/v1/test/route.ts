import sql from "infra/database";

export async function DELETE() {
  await sql("DELETE FROM portaria.user where email = $1", [
    "johndoe@example.com",
  ]);

  return new Response("Deleted", {
    status: 200,
  });
}
