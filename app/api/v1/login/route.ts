import validator from "models/validator";
import user from "models/user";
import Password from "models/password";
import jwt from "models/jwt";
import surf from "models/surf";
export async function POST(req: Request) {
  const loginParsed = await req.json();
  try {
    const result = validator.userLogin(loginParsed);
    if (result.success) {
      const { email, password } = result.data;
      const token = await authenticateUser(email, password);
      return surf.response(undefined, 200, token);
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
async function authenticateUser(email: string, password: string) {
  const isUser = await user.findByEmail(email);
  if (!isUser) throw new Error("Invalid credentials");

  const match = await Password.verify(isUser.password, password);
  if (!match) throw new Error("Invalid credentials");

  const token = jwt.sign({ id: isUser.id, role: isUser.role });

  return token;
}
