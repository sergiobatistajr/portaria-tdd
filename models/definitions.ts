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

export type Guest = {
  id: string;
  name: string;
  entryDate: Date;
  plate: string;
  model: string;
  pax: number;
  apartment: number;
  createdBy: string;
  observation: string;
  departureDate: Date;
  status: string;
};
export type createVehicleEntryJson = {
  name: string;
  entry_date: Date;
  plate: string;
  model: string;
  pax: number;
  apartment?: number;
  observation?: string;
};
