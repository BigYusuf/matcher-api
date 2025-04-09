const express = require("express");
// require("./config/redis");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
//extra security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const connectDB = require("./config/dbConnect");
const {
  authRouter,
} = require("./routers");
//const rateLimiter = require('express-rate-limit');

const app = express();

app.set("trust proxy", 1);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors({ credentials: true, origin: "*" })); //change when its production
// app.use(
//   cors({ credentials: true, origin: "https://courier-web-navy.vercel.app" })
// );
app.use(xss());
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
/*app.use(rateLimiter({
  windowMs: 60 * 1000, 
  max: 60, // limit each IP to 60 requests per windowMs
}));
*/

//connecting to Database
connectDB();

//connecting to env file
dotenv.config();

// routes
app.use("/api/auth", authRouter);
//app.use("/api/orders", orderRouter);

app.get("/", (req, res) => {
  res.send("Courier API");
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
