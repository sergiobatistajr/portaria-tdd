import database from "infra/database";
import { User } from "./definitions";

async function create(input: User) {
  return (
    await database.sql(
      "INSERT INTO portaria.user (id, name, email, password, role, status ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, name, email, role, status",
      [
        input.id,
        input.name,
        input.email,
        input.password,
        input.role,
        input.status,
      ],
    )
  ).rows[0];
}

async function findByEmail(email: string) {
  const result = (
    await database.sql("SELECT * FROM portaria.user where email = $1", [email])
  ).rows[0];
  return result;
}

async function findById(id: string) {
  const result = (
    await database.sql("SELECT * FROM portaria.user where id = $1", [id])
  ).rows[0];
  return result;
}

export default Object.freeze({
  create,
  findByEmail,
  findById,
});
