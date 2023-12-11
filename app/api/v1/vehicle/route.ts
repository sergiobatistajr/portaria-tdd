import validator from "models/validator";
import surf from "models/surf";
import { CreateVehicleEntryJson } from "models/definitions";
import { randomUUID } from "node:crypto";
import auth from "models/auth";
import guest from "models/guest";

export async function POST(req: Request) {
  try {
    const vehicleJson = await req.json();
    const isAuthenticated = await auth.isAuthenticated(req);
    if (!isAuthenticated) {
      return surf.response("Não autorizado", 401);
    }
    const vehicle = tryCreateVehicle(vehicleJson, isAuthenticated.id);
    const findGuest = await guest.findByPlateAndStatus(vehicle?.plate!);
    if (findGuest) {
      throw new Error("Visitante já está dentro");
    }
    const deu = await guest.entryVehicle(vehicle!);
    return surf.response(deu, 200);
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

function tryCreateVehicle(input: CreateVehicleEntryJson, userId: string) {
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