import express, { Application, Request, Response } from 'express';
import compression from "compression";
import path from "path";
import wishRoutes from "./routes/wishRoutes";
import { setSecureHeaders } from "./middlewares/secureHeaders";
import { errorHandler } from "./middlewares/errorHandler";

const app: Application = express();

app.use(setSecureHeaders);

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.disable("x-powered-by");

app.use(express.static(path.join(__dirname, '..', 'public')));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, '..', '/src/views'));
app.use("/", wishRoutes);

app.use((req: Request, res: Response) => {
    res.render("error");
});

app.use(errorHandler);

export default app;
