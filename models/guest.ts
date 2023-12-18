import database from "infra/database";
import { CreateGuestEntry } from "./definitions";

async function entryGuest(guest: CreateGuestEntry) {
  const result = (
    await database.sql(
      'INSERT INTO portaria.guest (id, name, "entryDate", observation, apartment, status, "createdBy") VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING * ',
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
const findByNameAndStatus = async (name: string, status = "inside") => {
  const result = (
    await database.sql(
      "SELECT * FROM portaria.guest WHERE name = $1 AND status = $2",
      [name, status],
    )
  ).rows[0];
  return result;
};

const deleteByNameAndStatus = async (name: string, status = "inside") => {
  const result = (
    await database.sql(
      "DELETE FROM portaria.guest WHERE name = $1 AND status = $2",
      [name, status],
    )
  ).rows[0];
  return result;
};

export default Object.freeze({
  entryGuest,
  findByNameAndStatus,
  deleteByNameAndStatus,
});
