import database from "infra/database";
import { CreateVehicleEntry } from "./definitions";

async function entryVehicle(vehicle: CreateVehicleEntry) {
  const result = (
    await database.sql(
      "INSERT INTO portaria.guest (id, name, entryDate, plate, model, pax, observation, apartment, status, createdBy) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING * ",
      [
        vehicle.id,
        vehicle.name,
        vehicle.entryDate,
        vehicle.plate,
        vehicle.model,
        vehicle.pax,
        vehicle.observation,
        vehicle.apartment,
        vehicle.status,
        vehicle.createdBy,
      ],
    )
  ).rows[0];
  return result;
}

async function findByPlateAndStatus(plate: string, status: string = "inside") {
  const result = (
    await database.sql(
      "SELECT * FROM portaria.guest WHERE plate = $1 AND status = $2",
      [plate, status],
    )
  ).rows[0];
  return result;
}

async function deleteGuestWPlateAndStatus(
  plate: string,
  status: string = "inside",
) {
  return await database.sql(
    "DELETE FROM portaria.guest WHERE plate = $1 AND status = $2",
    [plate, status],
  );
}

export default Object.freeze({
  entryVehicle,
  findByPlateAndStatus,
  deleteGuestWPlateAndStatus,
});
