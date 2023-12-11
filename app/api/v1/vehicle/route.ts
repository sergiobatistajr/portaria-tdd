import validator from "models/validator";
import surf from "models/surf";
import { createVehicleEntryJson } from "models/definitions";
import { randomUUID } from "node:crypto";
import auth from "models/auth";

export async function POST(req: Request) {
  try {
    const vehicleJson = await req.json();
    const isAuthenticated = await auth.isAuthenticated(req);
    if (!isAuthenticated) {
      return surf.response("Não autorizado", 401);
    }
    const vehicle = tryCreateVehicle(vehicleJson, isAuthenticated.id);
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
