import { Request, Response, NextFunction } from "express";
import { JSDOM } from "jsdom";
import DOMPurify from "dompurify";

const window = new JSDOM("").window;
const purify = DOMPurify(window);

export const validateName = (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.params;

  if (!name) {
    return res.status(400).render("error", { message: "Name is required!" });
  }

  const sanitizedName = purify.sanitize(name);

  if (!sanitizedName || sanitizedName.trim().length === 0) {
    return res.status(400).render("error", { message: "Invalid name!" });
  }

  next();
  
};
