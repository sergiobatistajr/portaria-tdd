import auth from "models/auth";
import surf from "models/surf";
import validator from "models/validator";
import vehicleGuest from "models/vehicle-guest";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const isAuthenticated = await auth.isAuthenticated(req);
    if (!isAuthenticated) {
      return surf.response("Não autorizado", {
        status: 401,
      });
    }
    const body = await req.json();
    await tryingDepartureCreate(params.id, body.departure_date);
    return surf.response(undefined, {
      status: 200,
    });
  } catch (error) {
    if (error instanceof Error) {
      return surf.response(
        {
          error: {
            message: error.message,
          },
        },
        {
          status: 401,
        },
      );
    }
  }
}

async function tryingDepartureCreate(id: string, departure_date: string) {
  const departureDate = new Date(departure_date);
  let entryDate: Date;
  const { vehicle, guest } = await vehicleGuest.findById(id);
  if (!guest && !vehicle) {
    throw new Error("Visitante não existe!");
  }
  if (guest) {
    entryDate = new Date(guest.entryDate);
  } else {
    entryDate = new Date(vehicle.entryDate);
  }
  const isValid = validator.GuestAndVehicleDepartureDate({
    departureDate,
    entryDate,
  });
  if (isValid.success) {
    await vehicleGuest.departure(id, isValid.data.departureDate);
    return "deu certo";
  } else if (isValid.error) {
    const errors = isValid.error.issues.map((issue) => issue.message);
    throw new Error(errors.join(", "));
  }
}
