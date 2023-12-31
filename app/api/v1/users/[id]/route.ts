import auth from "models/auth";
import surf from "models/surf";
import user from "models/user";
import validator from "models/validator";
export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  const isAuthenticated = await auth.isAuthenticated(req);
  if (!isAuthenticated) {
    return surf.response("Não autorizado!", {
      status: 401,
    });
  }
  return surf.response({ eae: params.id }, { status: 200 });
}
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  let errors: any[] = [];
  const isAuthenticated = await auth.isAuthenticated(req);
  if (!isAuthenticated) {
    return surf.response("Não autorizado!", {
      status: 401,
    });
  }
  const body = await req.json();
  const isUserUpdateValid = validator.userUpdate(body);
  if (isUserUpdateValid.success) {
    const isUser = await user.findById(params.id);
    if (!isUser) {
      return surf.response("Não existe", { status: 401 });
    }
    const { name, email, role, status } = await req.json();
    await user.update({ id: params.id, name, email, role, status });
    return surf.response({ id: params.id }, { status: 200 });
  } else {
    isUserUpdateValid.error.issues.map((error) => errors.push(error.message));
    return surf.response(
      {
        error: {
          message: errors.join(", "),
        },
      },
      { status: 401 },
    );
  }
}
