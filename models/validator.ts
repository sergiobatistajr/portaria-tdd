import { z } from "zod";

/**
 * Validates the user object for update.
 *
 * @param user - The user object to be validated.
 * @returns A result object indicating whether the user object is valid or not.
 */
function userUpdate(user: any) {
  return z
    .object({
      id: idValidator,
      name: nameValidator,
      email: emailValidator,
      role: roleValidator,
      status: userStatusValidator,
    })
    .safeParse(user);
}

/**
 * Validates the guest and vehicle departure date.
 *
 * @param inputFields - The input fields containing the entry and departure dates.
 * @returns The result of the validation.
 */
function GuestAndVehicleDepartureDate(inputFields: any) {
  return z
    .object({
      entryDate: entryDateValidator,
      departureDate: departureDateValidator,
    })
    .refine((data) => data.departureDate > data.entryDate, {
      message: "Data de saída deve ser maior que a data de entrada.",
    })
    .safeParse(inputFields);
}

/**
 * Creates a vehicle entry using the provided input fields.
 * @param inputFields - The input fields for the vehicle entry.
 * @returns A validation result object containing the parsed input fields.
 */
function createVehicleEntry(inputFields: any) {
  const validInputFields = z
    .object({
      id: idValidator,
      name: nameValidator,
      entryDate: entryDateValidator,
      plate: plateValidator,
      model: modelValidator,
      pax: paxValidator,
      createdBy: idValidator,
      status: guestStatusValidator,
      apartment: apartmentsValidator,
      observation: observationValidator,
    })
    .safeParse(inputFields);
  return validInputFields;
}
/**
 * Creates a guest entry with the provided input fields.
 * @param inputFields - The input fields for the guest entry.
 * @returns The validated input fields for the guest entry.
 */
function createGuestEntry(inputFields: any) {
  const validInputFields = z
    .object({
      id: idValidator,
      name: nameValidator,
      entryDate: entryDateValidator,
      createdBy: idValidator,
      status: guestStatusValidator,
      apartment: apartmentsValidator,
      observation: observationValidator,
    })
    .safeParse(inputFields);
  return validInputFields;
}

/**
 * Validates the input fields for creating a user.
 *
 * @param inputFields - The input fields to be validated.
 * @returns The result of the validation process.
 */
function userCreate(inputFields: any) {
  const validInputFields = z
    .object({
      id: idValidator,
      status: userStatusValidator,
      name: nameValidator,
      email: emailValidator,
      password: passwordValidator,
      confirmPassword: confirmPasswordValidator,
      role: roleValidator,
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
    })
    .safeParse(inputFields);
  return validInputFields;
}
/**
 * Validates the user login input.
 *
 * @param input - The user login input to be validated.
 * @returns The validation result.
 */
function userLogin(input: any) {
  const validated = z
    .object({
      email: emailValidator,
      password: passwordValidator,
    })
    .safeParse(input);
  return validated;
}

const idValidator = z.string().uuid();
const userStatusValidator = z.enum(["active", "deactivate"]);
const nameValidator = z
  .string()
  .min(3, "Name is required")
  .refine((name) => name.split(" ").length > 1, "Last name is required");
const emailValidator = z.string().email("Email is invalid");
const passwordValidator = z.string().min(8, "Password is weak");
const confirmPasswordValidator = z.string().min(8, "Confirm password is weak");
const roleValidator = z.enum(["admin", "user", "report"]);
const plateValidator = z.string().refine(
  (plate) => {
    const regex = /^[A-Z]{3}[0-9]{1}[A-Z]{1}[0-9]{2}$|^[A-Z]{3}[0-9]{4}$/;
    return regex.test(plate);
  },
  {
    message: "A placa deve seguir o formato do Mercosul: ABC1234 ou ABC1D23",
  },
);
const paxValidator = z.coerce.number().min(1).max(70);
const apartmentsValidator = z.coerce
  .number()
  .refine(
    (apartment) => {
      const apartmentList = [1, 2, 3, 4, 5, 6, 8, 9, 10];
      return apartmentList.includes(apartment);
    },
    {
      message: "O número do apartamento não é válido",
    },
  )
  .optional();
const entryDateValidator = z.coerce.date().refine(
  (date) => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const sevenDaysAhead = new Date();
    sevenDaysAhead.setDate(sevenDaysAhead.getDate() + 7);
    return date > sevenDaysAgo && date < sevenDaysAhead;
  },
  {
    message:
      "A data de entrada deve estar entre 7 dias atrás e 7 dias à frente",
  },
);
const departureDateValidator = z.coerce.date().refine(
  (date) => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return date > sevenDaysAgo;
  },
  {
    message: "A data de saída não pode ser de 7 dias à frente",
  },
);
const guestStatusValidator = z.enum(["inside", "outside", "finished"]);
const modelValidator = z.string().min(1);
const observationValidator = z.string().optional();

export default Object.freeze({
  userCreate,
  userLogin,
  createVehicleEntry,
  createGuestEntry,
  GuestAndVehicleDepartureDate,
  userUpdate,
});
