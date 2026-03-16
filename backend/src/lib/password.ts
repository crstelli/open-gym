import { compare } from "bcrypt";

export async function checkPassword(candidate: string, hashedPassword: string): Promise<boolean> {
  return await compare(candidate, hashedPassword);
}
