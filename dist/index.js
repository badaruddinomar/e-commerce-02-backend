// Packages--
import express from "express";
// Instances--
const app = express();
// Middleware--
// DB connection--
// Routes--
// Server connection--
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`server running on port:${port}`);
});
