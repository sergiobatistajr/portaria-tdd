import { z } from "zod";
import { UserCreate } from "./definitions";

const idValidator = z.string().uuid();
const statusValidator = z.enum(["active", "deactivate"]);
const nameValidator = z
  .string()
  .min(3, "Name is required")
  .refine((name) => name.split(" ").length > 1, "Last name is required");
const emailValidator = z.string().email("Email is invalid");
const passwordValidator = z.string().min(8, "Password is weak");
const confirmPasswordValidator = z.string().min(8, "Confirm password is weak");
const roleValidator = z.enum(["admin", "user", "report"]);

function userCreate(inputFields: UserCreate) {
  const validInputFields = z
    .object({
      id: idValidator,
      status: statusValidator,
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

export default Object.freeze({
  userCreate,
});
