import validator from "models/validator";
import { randomUUID } from "crypto";
import surf from "models/surf";
import jwt from "models/jwt";
import { createVehicleEntryJson } from "models/definitions";

export async function POST(req: Request) {
  try {
    const vehicleJson = await req.json();
    const auth = surf.getAuthToken(req);
    const decoded = jwt.verify(auth);
    const vehicle = tryCreateVehicle(vehicleJson, decoded.id);
    return surf.response(vehicle, 200);
  } catch (error) {
    if (error instanceof Error) {
      return new Response(
        JSON.stringify({
          error: {
            message: error.message,
          },
        }),
        {
          status: 401,
        },
      );
    }
  }
}

function tryCreateVehicle(input: createVehicleEntryJson, userId: string) {
  const dataToBeParsed = {
    id: randomUUID(),
    createdBy: userId,
    name: input.name,
    entryDate: input.entry_date,
    plate: input.plate,
    model: input.model,
    pax: input.pax,
    status: "inside",
    observation: input.observation,
  };
  try {
    const result = validator.createVehicleEntry(dataToBeParsed);
    if (result.success) return result.data;
    else if (result.error) {
      const errors = result.error.issues.map((issue) => issue.message);
      throw new Error(errors.join(", "));
    }
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }
}
