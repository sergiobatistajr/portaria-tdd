import auth from "models/auth";
import { CreateGuestEntryJson } from "models/definitions";
import guest from "models/guest";
import surf from "models/surf";
import validator from "models/validator";
import { NextRequest } from "next/server";
import { randomUUID } from "node:crypto";

export async function POST(req: Request) {
  try {
    const guestJson = await req.json();
    const isAuthenticated = await auth.isAuthenticated(req);
    if (!isAuthenticated) {
      return surf.response("Não autorizado", 401);
    }
    const newGuest = await tryCreateGuest(guestJson, isAuthenticated.id);
    const deu = await guest.entryGuest(newGuest!);
    return surf.response(deu, 200);
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

export async function DELETE(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const name = searchParams.get("name") || "";
    await guest.deleteByNameAndStatus(name);
    return new Response("Deleted", {
      status: 200,
    });
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

async function tryCreateGuest(input: CreateGuestEntryJson, userId: string) {
  const dataToBeParsed = {
    id: randomUUID(),
    createdBy: userId,
    name: input.name,
    entryDate: input.entry_date,
    status: "inside",
    observation: input.observation,
  };
  try {
    const result = validator.createGuestEntry(dataToBeParsed);
    if (result.success) {
      const { name } = result.data;
      const isGuest = await guest.findByNameAndStatus(name, "inside");
      if (isGuest) {
        throw new Error("Visitante já está dentro");
      }
      return result.data;
    } else if (result.error) {
      const errors = result.error.issues.map((issue) => issue.message);
      throw new Error(errors.join(", "));
    }
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }
}
