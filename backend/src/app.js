const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

const authRoutes = require("./routes/authRoutes");
const investmentRoutes = require("./routes/investmentRoutes");
const testRoutes = require("./routes/testRoutes");

const {
  errorHandler,
} = require("./middleware/errorMiddleware");

const app = express();

/*
Security middleware
*/
app.use(helmet());

/*
Enable CORS
*/
app.use(cors());

/*
Request logger
*/
app.use(morgan("dev"));

/*
Parse JSON body
*/
app.use(express.json());

/*
Routes
*/
app.use("/api/auth", authRoutes);
app.use("/api/investments", investmentRoutes);
app.use("/api/test", testRoutes);


app.use(errorHandler);
/*
Health check route
*/
app.get("/", (req, res) => {
  res.send("API Running...");
});

module.exports = app;