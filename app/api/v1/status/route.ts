import status from "models/status";

export async function GET() {
  const updateAt = new Date();
  const databaseStatus = await getDatabaseStatus();
  const systemStatus = {
    updated_at: updateAt,
    dependecies: {
      database: {
        version: databaseStatus.version,
        max_connections: parseInt(databaseStatus.maxConnections),
        current_connections: parseInt(databaseStatus.currentConnections),
      },
    },
  };
  return new Response(JSON.stringify(systemStatus), {
    status: 200,
  });
}
async function getDatabaseStatus() {
  const [version, maxConnections, currentConnections] = await Promise.all([
    status.databaseVersion(),
    status.databaseMaxConnections(),
    status.databaseCurrentConnections(),
  ]);

  return {
    version,
    maxConnections,
    currentConnections,
  };
}
