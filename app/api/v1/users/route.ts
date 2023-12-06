import UserController from "controllers/UserController";

export async function POST(req: Request) {
  const {
    email,
    name,
    role,
    password,
    confirm_password,
  }: {
    email: string;
    name: string;
    role: string;
    password: string;
    confirm_password: string;
  } = await req.json();
  try {
    const user = await new UserController().registerUser({
      name: name.trim(),
      email: email.trim(),
      role: role.trim(),
      password: password.trim(),
      confirm_password: confirm_password.trim(),
    });
    return new Response(
      JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
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
