import status from "models/status";
import surf from "models/surf";

export async function GET() {
  const updateAt = new Date().toISOString();
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
  return surf.response(systemStatus, {
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
