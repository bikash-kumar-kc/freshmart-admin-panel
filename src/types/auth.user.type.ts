export interface IAuthUser {
  id: string;
  email: string;
  role: "user" | "vendor" | "admin";
  adminId: string | undefined;
}
