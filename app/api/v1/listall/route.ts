import vehicleGuest from "models/vehicle-guest";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("query") || "";
  const currentPage = parseInt(searchParams.get("page")!) || 1;
  const all = await vehicleGuest.listAllEntry(query, currentPage);
  return new Response(JSON.stringify(all), { status: 200 });
}
