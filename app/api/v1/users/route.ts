import validator from "models/validator";
import user from "models/user";
import password from "models/password";
import { CreateUserJSON } from "models/definitions";
import { randomUUID } from "node:crypto";
import surf from "models/surf";
import snakeCase from "models/snake-case";
import auth from "models/auth";
export async function GET(req: Request) {
  try {
    const isAuthenticated = await auth.isAuthenticated(req);
    if (!isAuthenticated) {
      return surf.response("Não autorizado", {
        status: 401,
      });
    }
    const result = await user.findBySearch("");
    const resultSnakeCase = snakeCase.keysToSnakeCase(result);
    return surf.response(resultSnakeCase, {
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
export async function POST(req: Request) {
  const userParsed = await req.json();
  try {
    const newUser = await tryCreateUser(userParsed);
    if (newUser) {
      await user.create(newUser);
      return surf.response(undefined, {
        status: 201,
      });
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

async function tryCreateUser(data: CreateUserJSON) {
  try {
    const userGenerate = generateUser(data);
    const isUserValid = validator.userCreate(userGenerate);
    if (isUserValid.success) {
      const newUser = isUserValid.data;
      const isEmail = await user.findByEmail(newUser.email);
      if (isEmail) throw new Error("Email is already taken");
      const hash = await password.hash(newUser.password);
      return {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        password: hash,
        role: newUser.role,
        status: newUser.status,
      };
    } else if (isUserValid.error) {
      const errors = isUserValid.error.issues.map((issue) => issue.message);
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
