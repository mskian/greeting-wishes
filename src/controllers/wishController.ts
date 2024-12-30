import { Request, Response } from "express";
import { createCanvas, loadImage, registerFont } from 'canvas';
import path from 'path';
import slugify from "slugify";
import { JSDOM } from "jsdom";
import DOMPurify from "dompurify";
import axios from 'axios';

const window = new JSDOM("").window;
const purify = DOMPurify(window);
const fontPath = path.resolve(__dirname, '..', 'canva', 'Anek.ttf');
const Canvaimage = path.resolve(__dirname, '..', 'canva', 'Happy-newyear-2025.png');

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

registerFont(fontPath, {
  family: 'Anek Tamil',
});

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

export const CreateImage = (req: Request, res: Response): void => {
 
  const width = 1080;
  const height = 1080;
  const canvas = createCanvas(width, height);
  const context = canvas.getContext('2d');

  context.textAlign = 'center';
  context.textBaseline = 'top';
  const gradient = context.createLinearGradient(0, 0, canvas.width, 0);
  gradient.addColorStop(0.5, '#badc58');
  gradient.addColorStop(0.1, '#44bd32');
  gradient.addColorStop(1, '#44bd32');
  context.fillStyle = gradient;
  context.shadowColor = '#27ae60';
  context.shadowBlur = 3;
  context.font = "36px 'Anek Tamil' bold";

  const username = req.query.name?.toString() || 'Generating';
  const firstletter = username.charAt(0).toUpperCase() + username.slice(1);
  const greeting = limit(firstletter, 36);
  const firstname = slugify(greeting, {
    replacement: ' ',
    remove: /[*+~.()'"!:@]/g,
    lower: false,
    strict: false,
  });

  const imagePath = Canvaimage;

  loadImage(imagePath)
    .then((image) => {
 
      context.drawImage(image, 0, 0, width, height);

      const text = firstname.replace(/[-]/g, ' ') || 'Hello World';
      context.fillText(text, 537, 141);

      const buffer = canvas.toBuffer('image/png');

      res.set('Content-Type', 'image/png');
      res.send(buffer);
    })
    .catch((err) => {
      console.error('Error loading image:', err);
      res.status(500).send('Internal Server Error');
    });
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
