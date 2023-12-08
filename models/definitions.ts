export type User = {
  id: string;
  status: "active" | "deactivate";
  name: string;
  email: string;
  password: string;
  role: "admin" | "user" | "report";
};
export type CreateUserJSON = {
  email: string;
  name: string;
  role: string;
  password: string;
  confirm_password: string;
};
