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

export default Object.freeze({
  entryVehicle,
});
