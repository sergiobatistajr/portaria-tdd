import vehicleGuest from "models/vehicle-guest";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("query") || "";
  const currentPage = parseInt(searchParams.get("page")!) || 1;
  const all = await vehicleGuest.listAllEntry(query, currentPage);

  const jsonResponse = all.map((item) => ({
    id: item.id,
    name: item.name,
    entry_date: item.entrydate,
    plate: item.plate,
    model: item.model,
  }));
  return new Response(JSON.stringify(jsonResponse), { status: 200 });
}
