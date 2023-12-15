import surf from "models/surf";
import vehicleGuest from "models/vehicle-guest";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("query") || "";
  const currentPage = parseInt(searchParams.get("page")!) || 1;
  const guestsAndVehicles = await vehicleGuest.listAllEntry(query, currentPage);
  const json = jsonFormater(guestsAndVehicles);
  return surf.response(json, {
    status: 200,
  });
}

function jsonFormater(data: any[]) {
  return data.map((item) => ({
    id: item.id as string,
    name: item.name as string,
    entry_date: item.entrydate as string,
    plate: item.plate as string,
    model: item.model as string,
  }));
}
