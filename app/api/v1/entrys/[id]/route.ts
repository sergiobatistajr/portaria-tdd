import surf from "models/surf";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const body = await req.json();
    console.log(body);
    // validar a departure date,
    // atualizar o status para fninished e colocar a data de saida departura date
    return surf.response(params.id, {
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
