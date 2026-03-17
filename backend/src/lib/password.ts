import { compare } from "bcrypt";

export async function checkPassword(candidate: string, hashedPassword: string): Promise<boolean> {
  return await compare(candidate, hashedPassword);
}

export function changedPasswordAfter(JWTTimestamp: number, changeDate: Date | null) {
  if (!changeDate) return false;

  const changeTime = changeDate.getTime() / 1000;
  return JWTTimestamp < changeTime;
}
