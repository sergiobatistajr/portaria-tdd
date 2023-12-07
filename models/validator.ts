import { z } from "zod";
import { UserCreate } from "./definitions";

function userCreate(inputFields: UserCreate) {
  const validIpuntFields = z
    .object({
      id: z.string().uuid(),
      status: z.enum(["active", "deactivate"]),
      name: z
        .string()
        .min(3, "Name is required")
        .refine((name) => name.split(" ").length > 1, "Last name is required"),
      email: z.string().email("Email is invalid"),
      password: z.string().min(8, "Password is weak"),
      confirmPassword: z.string().min(8, "Confirm password is weak"),
      role: z.enum(["admin", "user", "report"]),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
    })
    .safeParse(inputFields);
  return validIpuntFields;
}

export default Object.freeze({
  userCreate,
});
