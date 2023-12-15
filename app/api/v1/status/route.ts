import date from "models/date";
import status from "models/status";
import surf from "models/surf";

export async function GET() {
  const today = new Date().toISOString();
  const formattedDate = date.formatDateToLocal(today);
  const databaseStatus = await getDatabaseStatus();
  const systemStatus = {
    updated_at: formattedDate,
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
