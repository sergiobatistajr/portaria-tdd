import database from "infra/database";
import { CreateGuestEntry, CreateVehicleEntry } from "./definitions";

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
async function entryGuest(guest: CreateGuestEntry) {
  const result = (
    await database.sql(
      "INSERT INTO portaria.guest (id, name, entryDate, observation, apartment, status, createdBy) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING * ",
      [
        guest.id,
        guest.name,
        guest.entryDate,
        guest.observation,
        guest.apartment,
        guest.status,
        guest.createdBy,
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
async function findByNameAndStatus(name: string, status: string = "inside") {
  const result = (
    await database.sql(
      "SELECT * FROM portaria.guest WHERE name = $1 AND status = $2",
      [name, status],
    )
  ).rows[0];
  return result;
}
async function findByNameAndStatusWithOutPlate(
  name: string,
  status: string = "inside",
) {
  const result = (
    await database.sql(
      "SELECT * FROM portaria.guest WHERE name = $1 AND status = $2 AND plate IS NULL",
      [name, status],
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
async function deleteGuestWNameAndStatus(
  name: string,
  status: string = "inside",
) {
  return await database.sql(
    "DELETE FROM portaria.guest WHERE name = $1 AND status = $2",
    [name, status],
  );
}

export default Object.freeze({
  entryVehicle,
  entryGuest,
  findByPlateAndStatus,
  deleteGuestWPlateAndStatus,
  findByNameAndStatus,
  deleteGuestWNameAndStatus,
  findByNameAndStatusWithOutPlate,
});
