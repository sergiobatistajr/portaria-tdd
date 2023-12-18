import auth from "models/auth";
import snakeCase from "models/snake-case";
import surf from "models/surf";
import vehicleGuest from "models/vehicle-guest";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("query") || "";
  const currentPage = Number(searchParams.get("page")) || 1;

  const isAuthenticated = await auth.isAuthenticated(req);
  if (!isAuthenticated) {
    return surf.response("Não autorizado", {
      status: 401,
    });
  }
  try {
    const result = await vehicleGuest.listAllEntry(query, currentPage);
    const resultSnakeCase = snakeCase.deepKeysToSnakeCase(result);

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
