export async function POST(req: Request) {
  try {
    const vehicleJson = await req.json();
    return new Response(JSON.stringify(vehicleJson), {
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
