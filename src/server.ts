import "dotenv/config";
import app from "./app.js";

const PORT = process.env.PORT;

app.listen(PORT).on("error", (error) => {
  console.log("el error es: ", error);
});
