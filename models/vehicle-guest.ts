import database from "infra/database";

async function listAllEntry(
  searchTerm = "",
  currentPage = 1,
  itemsPerPage = 10,
) {
  const offset = (currentPage - 1) * itemsPerPage;

  const totalRows = (
    await database.sql(
      `SELECT COUNT(*) FROM (
        SELECT id FROM portaria.guest WHERE name LIKE $1 OR CAST(entryDate AS TEXT) LIKE $1
        UNION ALL 
        SELECT id FROM portaria.vehicle WHERE name ILIKE $1 OR plate ILIKE $1 OR CAST(entryDate AS TEXT) ILIKE $1
    ) AS total`,
      [`%${searchTerm}%`],
    )
  ).rows[0].count;

  const result = (
    await database.sql(
      `SELECT id, name, entryDate, NULL AS plate, NULL AS model FROM portaria.guest WHERE name LIKE $3 OR CAST(entryDate AS TEXT) LIKE $3
      UNION ALL 
      SELECT id, name, entryDate, plate, model FROM portaria.vehicle WHERE name ILIKE $3 OR plate ILIKE $3 OR CAST(entryDate AS TEXT) ILIKE $3
      ORDER BY entryDate LIMIT $1 OFFSET $2`,
      [itemsPerPage, offset, `%${searchTerm}%`],
    )
  ).rows;
  const totalPages = Math.ceil(totalRows / itemsPerPage);
  console.log(totalRows);
  return {
    guests: result,
    totalPages,
  };
}

export default Object.freeze({
  listAllEntry,
});
