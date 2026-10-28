import express from "express";
import helmet from "helmet";
import authRoutes from "./routes/auth.js";

import watchlistRoutes from "./routes/watchlist.js";
import { authorizeModification } from "./middleware/authorize.js";
import { authenticate } from "./middleware/authenticate.js";

const PORT = process.env.PORT;
const app = express();

app.use(helmet());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/watchlist", authenticate, watchlistRoutes);

app.get("/", (req, res) => {
  res.send("Family Movie Watchlist API");
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
