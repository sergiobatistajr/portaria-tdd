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
      SELECT id FROM portaria.guest WHERE (name ILIKE $1 OR TO_CHAR("entryDate", 'DD/MM/YYYY, HH24:MI') ILIKE $1) AND status = 'inside'
      UNION ALL 
      SELECT id FROM portaria.vehicle WHERE (name ILIKE $1 OR plate ILIKE $1 OR TO_CHAR("entryDate", 'DD/MM/YYYY, HH24:MI') ILIKE $1) AND status = 'inside'
    ) AS total`,
      [`%${searchTerm}%`],
    ),
    database.sql(
      `SELECT id, name, "entryDate", status, NULL AS plate, NULL AS model FROM portaria.guest WHERE (name ILIKE $3 OR TO_CHAR("entryDate", 'DD/MM/YYYY, HH24:MI') ILIKE $3) AND status = 'inside'
    UNION ALL 
    SELECT id, name, "entryDate", status, plate, model FROM portaria.vehicle WHERE (name ILIKE $3 OR plate ILIKE $3 OR TO_CHAR("entryDate", 'DD/MM/YYYY, HH24:MI') ILIKE $3) AND status = 'inside'
    ORDER BY "entryDate" LIMIT $1 OFFSET $2`,
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

async function findById(id: string) {
  const [guestRows, vehicleRows] = await Promise.all([
    await database.sql(`SELECT * FROM portaria.guest where id = $1`, [id]),
    await database.sql(`SELECT * FROM portaria.vehicle where id = $1`, [id]),
  ]);

  return { guest: guestRows.rows[0], vehicle: vehicleRows.rows[0] };
}

async function departure(id: string, departureDate: Date) {
  return await Promise.all([
    database.sql(
      `UPDATE portaria.guest SET "departureDate" = $1 WHERE id = $2`,
      [departureDate, id],
    ),
    database.sql(
      `UPDATE portaria.vehicle SET "departureDate" = $1 WHERE id = $2`,
      [departureDate, id],
    ),
  ]);
}

export default Object.freeze({
  listAllEntry,
  findById,
  departure,
});
