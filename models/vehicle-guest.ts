import database from "infra/database";

async function listAllEntry(
  searchTerm = "",
  currentPage = 1,
  itemsPerPage = 10,
) {
  const offset = (currentPage - 1) * itemsPerPage;
  const result = (
    await database.sql(
      `SELECT id, name, entryDate, NULL AS plate, NULL AS model FROM portaria.guest WHERE name LIKE $3 OR CAST(entryDate AS TEXT) LIKE $3
       UNION ALL 
       SELECT id, name, entryDate, plate, model FROM portaria.vehicle WHERE name ILIKE $3 OR plate ILIKE $3 OR CAST(entryDate AS TEXT) ILIKE $3
       ORDER BY entryDate LIMIT $1 OFFSET $2`,
      [itemsPerPage, offset, `%${searchTerm}%`],
    )
  ).rows;
  return result;
}

export default Object.freeze({
  listAllEntry,
});
