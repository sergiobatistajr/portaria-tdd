import auth from "models/auth";
import surf from "models/surf";
import user from "models/user";
export function GET(req: Request, { params }: { params: { id: string } }) {
  return surf.response({ eae: params.id }, { status: 200 });
}
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const isAuthenticated = await auth.isAuthenticated(req);
    if (!isAuthenticated) {
      return surf.response("Não autorizado", {
        status: 401,
      });
    }

    const isUser = await user.findById(params.id);
    if (!isUser) {
      return surf.response("Não existe", { status: 401 });
    }
    const { name, email, role, status } = await req.json();
    await user.update({ id: params.id, name, email, role, status });
    return surf.response({ id: params.id }, { status: 200 });
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
