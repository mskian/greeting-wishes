import { Request, Response } from "express";
import slugify from "slugify";
import { JSDOM } from "jsdom";
import DOMPurify from "dompurify";

const window = new JSDOM("").window;
const purify = DOMPurify(window);

function limit(string: string = '', limit: number = 0): string {
  if (typeof string !== 'string' || string.length === 0 || limit <= 0) {
    return '';
  }

  if (limit >= string.length) {
    return string;
  }

  return string.substring(0, limit) + '...';
}

export const getInputPage = (req: Request, res: Response) => {
  const current_page = 'https://' + req.headers.host + req.url;
  res.render("input", {
    seourl: current_page,
  });
};

export const getWishPage = (req: Request, res: Response) => {
  const { name } = req.params;

  if (!name || name.trim().length === 0) {
    return res.status(400).render("error", { message: "Name is required and cannot be empty!" });
  }

  const sanitizedInput = purify.sanitize(name.trim());

  if (!sanitizedInput || sanitizedInput.length === 0) {
    return res.status(400).render("error", { message: "Invalid input. Please enter a valid name." });
  }

  const current_page = 'https://' + req.headers.host + req.url;

  const slugifiedName = slugify(sanitizedInput, {
    replacement: "-",
    remove: /[*+~.()'"!:@]/g,
    lower: true,
    strict: false,
  });

  if (slugifiedName !== name) {
    return res.redirect(301, `/${encodeURIComponent(slugifiedName)}`);
  }

  const Wisher = limit(slugifiedName, 45)

  res.render("index", {
    name: Wisher.replace(/[-]/g, ' ', ) || 'Your Name',
    slug: Wisher || 'Your Name',
    seourl: current_page,
  });
};
