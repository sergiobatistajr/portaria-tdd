import validator from "models/validator";
import user from "models/user";
import Password from "models/password";
export async function POST(req: Request) {
  const loginParsed = await req.json();
  try {
    const result = validator.userLogin(loginParsed);
    if (result.success) {
      const { email, password } = result.data;
      const isUser = await user.findByEmail(email);
      if (!user) throw new Error("Invalid credentials");
      const match = await Password.verify(isUser.password, password);
      if (!match) throw new Error("Invalid credentials");
      return new Response("Deu certo", {
        status: 200,
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
