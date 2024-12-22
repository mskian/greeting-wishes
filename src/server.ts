import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 6020;

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
