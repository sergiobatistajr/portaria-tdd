import database from "infra/database";

async function databaseVersion() {
  return (await database.sql("SHOW server_version;")).rows[0].server_version;
}
async function databaseMaxConnections() {
  return (await database.sql("SHOW max_connections;")).rows[0].max_connections;
}
async function databaseCurrentConnections() {
  return (
    await database.sql(
      "SELECT count(*) FROM pg_stat_activity WHERE state = 'active';",
    )
  ).rows[0].count;
}

export default Object.freeze({
  databaseVersion,
  databaseCurrentConnections,
  databaseMaxConnections,
});
