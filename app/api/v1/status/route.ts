import status from "models/status";

export async function GET() {
  const updateAt = new Date();
  const databaseStatus = await getDatabaseStatus();
  const systemStatus = {
    updated_at: updateAt,
    dependecies: {
      database: databaseStatus,
    },
  };
  return new Response(JSON.stringify(systemStatus), {
    status: 200,
  });
}
async function getDatabaseStatus() {
  const [version, max_connections, current_connections] = await Promise.all([
    status.databaseVersion(),
    status.databaseMaxConnections(),
    status.databaseCurrentConnections(),
  ]);

  return {
    version,
    max_connections,
    current_connections,
  };
}
