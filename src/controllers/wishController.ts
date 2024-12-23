import { Request, Response } from "express";
import sharp from 'sharp';
import path from 'path';
import slugify from "slugify";
import { JSDOM } from "jsdom";
import DOMPurify from "dompurify";
import axios from 'axios';

const window = new JSDOM("").window;
const purify = DOMPurify(window);
const fontPath = path.resolve(__dirname, '..', 'canva', 'baloo.ttf');
const Canvaimage = path.resolve(__dirname, '..', 'canva', 'Happy-holiday.png');

function limit(string: string = '', limit: number = 0): string {
  if (typeof string !== 'string' || string.length === 0 || limit <= 0) {
    return '';
  }

  if (limit >= string.length) {
    return string;
  }

  return string.substring(0, limit) + '...';
}

const isValidHttpUrl = (url: string): boolean => {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';
  } catch (e) {
    return false;
  }
};


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

export const CreateImage = async (req: Request, res: Response): Promise<void> => {
  const username = req.query.name?.toString() || 'Generating';
  const firstletter = username.charAt(0).toUpperCase() + username.slice(1);
  const greeting = firstletter.length > 36 ? firstletter.substring(0, 36) : firstletter;
  const firstname = slugify(greeting, {
    replacement: ' ',
    remove: /[*+~.()'"!:@]/g,
    lower: false,
    strict: false,
  });

  try {
    const imagePath = Canvaimage;
    const image = await sharp(imagePath)
      .resize(1080, 1080)
      .composite([{
        input: Buffer.from(`
          <svg width="1080" height="1080">
            <text x="50%" y="14%" text-anchor="middle" font-weight="bold" font-family="'Baloo Thambi 2'" font-size="36" fill="#b8e994">${firstname.replace(/[-]/g, ' ')}</text>
          </svg>
        `),
        top: 0,
        left: 0
      }])
      .toBuffer();

    res.set('Content-Type', 'image/png');
    res.send(image);
  } catch (err) {
    console.error('Error processing image:', err);
    res.status(500).send('Internal Server Error');
  }
};

export const downloadImageHandler = async (req: Request, res: Response): Promise<void> => {
  const url = req.query.url as string;

  if (!url || !isValidHttpUrl(url)) {
    res.status(400).json({
      error: 1,
      message: 'Image URL Not Found',
    });
    return;
  }

  try {
    const randomId = Math.floor(1000 + Math.random() * 9000);
    const basename = `image-dl-${randomId}`;

    const response = await axios.get(url, { responseType: 'stream' });

    const contentType = response.headers['content-type'];

    if (contentType === 'image/png') {
      res.writeHead(200, {
        'Content-Disposition': `attachment; filename="${basename}.png"`,
        'Content-Type': 'image/png',
      });
      response.data.pipe(res);
    } else {
      res.status(400).json({
        error: 1,
        message: 'Not a valid image type',
      });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      error: 1,
      message: 'Internal Server Error',
    });
  }
};
