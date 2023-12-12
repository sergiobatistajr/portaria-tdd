import surf from "models/surf";
import vehicleGuest from "models/vehicle-guest";

export async function POST(req: Request) {
  const all = await vehicleGuest.listAllEntry();
  return surf.response(all, 200);
}
