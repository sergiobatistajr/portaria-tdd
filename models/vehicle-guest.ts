import database from "infra/database";

async function listAllEntry(
  searchTerm = "",
  currentPage = 1,
  itemsPerPage = 10,
) {
  const offset = (currentPage - 1) * itemsPerPage;
  const [totalRowsResult, rowsResult] = await Promise.all([
    database.sql(
      `SELECT COUNT(*) FROM (
      SELECT id FROM portaria.guest WHERE (name LIKE $1 OR TO_CHAR(entryDate, 'DD/MM/YYYY, HH24:MI') LIKE $1) AND status = 'inside'
      UNION ALL 
      SELECT id FROM portaria.vehicle WHERE (name ILIKE $1 OR plate ILIKE $1 OR TO_CHAR(entryDate, 'DD/MM/YYYY, HH24:MI') ILIKE $1) AND status = 'inside'
    ) AS total`,
      [`%${searchTerm}%`],
    ),
    database.sql(
      `SELECT id, name, entryDate, status, NULL AS plate, NULL AS model FROM portaria.guest WHERE (name LIKE $3 OR TO_CHAR(entryDate, 'DD/MM/YYYY, HH24:MI') LIKE $3) AND status = 'inside'
    UNION ALL 
    SELECT id, name, entryDate, status, plate, model FROM portaria.vehicle WHERE (name ILIKE $3 OR plate ILIKE $3 OR TO_CHAR(entryDate, 'DD/MM/YYYY, HH24:MI') ILIKE $3) AND status = 'inside'
    ORDER BY entryDate LIMIT $1 OFFSET $2`,
      [itemsPerPage, offset, `%${searchTerm}%`],
    ),
  ]);
  const totalRows = totalRowsResult.rows[0].count;
  const result = rowsResult.rows;
  const totalPages = Math.ceil(totalRows / itemsPerPage);

  return {
    guests: result,
    totalPages,
  };
}

export default Object.freeze({
  listAllEntry,
});
