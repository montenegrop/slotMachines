import "dotenv/config";
import app from "./app";
const PORT = process.env.PORT;
app.listen(PORT);
// , (error) => {
//     if (!error)
//       console.log(
//         "Server is Successfully Running, and App is listening on port " +
//           process.env.PORT
//       );
//     else console.log("Error occured, server can't start", error);
//   }
