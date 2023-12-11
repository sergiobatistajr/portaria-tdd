import validator from "models/validator";
import user from "models/user";
import password from "models/password";
import { CreateUserJSON } from "models/definitions";
import { randomUUID } from "node:crypto";

export async function POST(req: Request) {
  const userParsed = await req.json();
  try {
    const newUser = tryCreateUser(userParsed);
    if (newUser) {
      const email = await user.findByEmail(newUser.email);
      if (email) throw new Error("Email is already taken");
      newUser.password = await password.hash(newUser.password);
      const result = await user.create(newUser);
      return new Response(
        JSON.stringify({
          id: result.id,
          name: result.name,
          email: result.email,
          role: result.role,
          status: result.status,
        }),
        {
          status: 201,
        },
      );
    }
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

function tryCreateUser(data: CreateUserJSON) {
  try {
    const user = generateUser(data);
    const isValid = validator.userCreate(user);
    if (isValid.success) {
      return isValid.data;
    } else if (isValid.error) {
      const errors = isValid.error.issues.map((issue) => issue.message);
      throw new Error(errors.join(", "));
    }
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }
}

function generateUser(data: CreateUserJSON) {
  const user = {
    id: randomUUID(),
    status: "active",
    email: data.email,
    name: data.name,
    password: data.password,
    role: data.role,
    confirmPassword: data.confirm_password,
  };
  return user;
}
