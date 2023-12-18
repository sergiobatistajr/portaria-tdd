import auth from "models/auth";
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
    const { guests, totalPages } = await vehicleGuest.listAllEntry(
      query,
      currentPage,
    );

    const resJSON = jsonFormater({
      guests,
      totalPages,
    });
    return surf.response(resJSON, {
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
function jsonFormater({ guests, totalPages }: JSONInput): JSONOutput {
  const guestsJson = guests.map((guest) => ({
    id: guest.id,
    name: guest.name,
    entry_date: guest.entryDate,
    plate: guest.plate,
    model: guest.model,
    status: guest.status,
  }));

  return {
    guests: guestsJson,
    total_pages: totalPages || 0,
  };
}
type JSONInput = {
  guests: any[];
  totalPages: number | null;
};
type JSONOutput = {
  guests: {
    id: string;
    name: string;
    entry_date: string | null;
    plate: string | null;
    model: string | null;
    status: string;
  }[];
  total_pages: number;
};
