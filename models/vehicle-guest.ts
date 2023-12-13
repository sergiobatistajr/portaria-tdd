import database from "infra/database";

async function listAllEntry(currentPage = 1, itemsPerPage = 10) {
  const offset = (currentPage - 1) * itemsPerPage;
  const result = (
    await database.sql(
      `SELECT id, name, entryDate, NULL AS plate, NULL AS model FROM portaria.guest UNION ALL SELECT id, name, entryDate, plate, model FROM portaria.vehicle ORDER BY entryDate LIMIT $1 OFFSET $2`,
      [itemsPerPage, offset],
    )
  ).rows;
  return result;
}

export default Object.freeze({
  listAllEntry,
});
