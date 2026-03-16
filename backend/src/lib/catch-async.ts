import type { NextFunction, Request, Response } from "express";

/**
 * Wrap an async Express route handler and forward any thrown errors to `next()`.
 *
 * Use this to avoid repetitive try/catch blocks in async route controllers.
 * @example router.get('/', catchAsync(async (req, res) => { ... }))
 * @param {(req: Request, res: Response, next: NextFunction) => Promise<void>} fn - Async route handler to wrap.
 */
export function catchAsync(fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) {
  return (req: Request, res: Response, next: NextFunction) => fn(req, res, next).catch((err) => next(err));
}
