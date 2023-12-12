import database from "infra/database";

const listAllEntry = async () => {
  const result = (
    await database.sql(
      "SELECT id, name, entryDate, NULL AS plate, NULL AS model FROM portaria.guest UNION ALL SELECT id, name, entryDate, plate, model FROM portaria.vehicle",
    )
  ).rows;
  return result;
};

export default Object.freeze({
  listAllEntry,
});
