import vehicleGuest from "models/vehicle-guest";

export async function GET(req: Request) {
  const all = await vehicleGuest.listAllEntry();
  return new Response(JSON.stringify(all), { status: 200 });
}
