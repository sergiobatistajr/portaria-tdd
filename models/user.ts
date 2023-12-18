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
async function findBySearch(
  searchTerm = "",
  currentPage = 1,
  itemsPerPage = 10,
) {
  const offset = (currentPage - 1) * itemsPerPage;
  const [totalRowsResult, rowsResult] = await Promise.all([
    database.sql(
      `SELECT COUNT (*) FROM portaria.user WHERE name ILIKE $1 OR email ILIKE $1 OR role ILIKE $1`,
      [`%${searchTerm}%`],
    ),
    database.sql(
      ` SELECT id, name, email, role, status FROM portaria.user WHERE name ILIKE $3 OR email ILIKE $3 OR role ILIKE $3 LIMIT $1 OFFSET $2`,
      [itemsPerPage, offset, `%${searchTerm}%`],
    ),
  ]);
  const totalRows = totalRowsResult.rows[0].count;
  const result = rowsResult.rows;
  const totalPages = Math.ceil(totalRows / itemsPerPage);

  return {
    users: result,
    totalPages,
  };
}
async function update({
  id,
  name,
  email,
  role,
  status,
}: {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}) {
  await database.sql(
    `UPDATE portaria.user SET name = $1, email = $2, role = $3, status = $4 WHERE id = $5`,
    [name, email, role, status, id],
  );
}
export default Object.freeze({
  create,
  findByEmail,
  findById,
  findBySearch,
  update,
});
