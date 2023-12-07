import database from "infra/database";

export async function GET() {
  const updateAt = new Date();
  const databaseVersion = (await database.sql("SHOW server_version;")).rows[0]
    .server_version;
  const databaseMaxConnections = (await database.sql("SHOW max_connections;"))
    .rows[0].max_connections;
  const databaseCurrentConnections = (
    await database.sql(
      "SELECT count(*) FROM pg_stat_activity WHERE state = 'active';",
    )
  ).rows[0].count;

  return new Response(
    JSON.stringify({
      update_at: updateAt,
      dependecies: {
        database: {
          version: databaseVersion,
          max_connections: databaseMaxConnections,
          current_connections: databaseCurrentConnections,
        },
      },
    }),
    {
      status: 200,
    },
  );
}
