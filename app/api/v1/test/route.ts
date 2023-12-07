import { randomUUID } from "crypto";
import database from "infra/database";
import user from "models/user";
import { NextRequest } from "next/server";

export async function DELETE(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const email = searchParams.get("email");
  await database.sql("DELETE FROM portaria.user where email = $1", [email]);
  return new Response("Deleted", {
    status: 200,
  });
}

export async function POST(req: Request) {
  const {
    email,
    name,
    role,
    password,
  }: {
    email: string;
    name: string;
    role: string;
    password: string;
  } = await req.json();
  try {
    const result = await user.create({
      name: name,
      email: email,
      role: role as any,
      password: password,
      id: randomUUID(),
      status: "active",
    });
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
