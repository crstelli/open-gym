import type { UserInfo } from "@shared/types/auth";

declare global {
  namespace Express {
    interface Request {
      user?: UserInfo;
    }
  }
}

export {};
