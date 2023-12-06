import { randomUUID } from "crypto";
import sql from "infra/database";
import Password from "models/Password";
import User from "models/User";
import { z } from "zod";
export default class UserController {
  constructor() {}
  async registerUser({
    name,
    email,
    password,
    confirm_password,
    role,
  }: {
    name: string;
    email: string;
    role: string;
    password: string;
    confirm_password: string;
  }) {
    const id = randomUUID();
    const status = "active";
    const validUserFields = z
      .object({
        id: z.string().uuid(),
        status: z.enum(["active", "deactivate"]),
        name: z
          .string()
          .min(3, "Name is required")
          .refine(
            (name) => name.split(" ").length > 1,
            "Last name is required",
          ),
        email: z.string().email("Email is invalid"),
        password: z.string().min(8, "Password is weak"),
        confirmPassword: z.string().min(8, "Confirm password is weak"),
        role: z.enum(["admin", "user", "report"]),
      })
      .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
      })
      .safeParse({
        name,
        email,
        password,
        confirmPassword: confirm_password,
        role,
        status,
        id,
      });

    if (validUserFields.success) {
      const { name, email, role, password, status } = validUserFields.data;
      const isEmail = (
        await sql("SELECT email FROM portaria.user WHERE email = $1", [email])
      ).rows[0];
      if (isEmail) {
        throw new Error("Email is already taken");
      }
      const hash = await new Password().hash(password);
      const newUser = new User(id, name, email, role, status, hash);
      const user = (
        await sql(
          "INSERT INTO portaria.user (id, name, email, password, role, status ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, name, email, role, status",
          [
            newUser.id,
            newUser.name,
            newUser.email,
            newUser.password,
            newUser.role,
            newUser.status,
          ],
        )
      ).rows[0];
      return user;
    } else if (validUserFields.error) {
      const errors = validUserFields.error.issues.map((issue) => issue.message);
      throw new Error(errors.join(", "));
    }
  }
}
