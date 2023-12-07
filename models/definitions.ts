export type User = {
  id: string;
  status: "active" | "deactivate";
  name: string;
  email: string;
  password: string;
  role: "admin" | "user" | "report";
};
export type UserJSON = {
  email: string;
  name: string;
  role: string;
  password: string;
  confirm_password: string;
};
export type UserCreate = {
  confirmPassword: string;
} & User;
