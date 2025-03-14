import express from "express";
import cors from "cors";
import router from "./route.js";

import { connect } from "./config/db.js";
import { errorHandlerMiddleware } from "./middlewares/error-handler.js";

import session from "express-session";
import MongoDBStore from "connect-mongodb-session";
const MongoDBStoreSession = MongoDBStore(session);

/* APP Express Configuration */
const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

/* Session and MongoDBStore Configuration */
const store = new MongoDBStoreSession({
  uri: process.env.DATABASE_URL,
  collection: "sessions",
  databaseName: process.env.DATABASE_NAME,
});

store.on("error", function (error) {
  console.log(error);
});

const session_config = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
  store: store,
};

const session_log = (req, _, next) => {
  // console.log(req.session);
  next();
};

/* APP Express Router and Middlewares */
app.use([
  express.json(),
  express.urlencoded({ extended: true }),
  cors(),
  session(session_config),
  session_log,
  router,
  errorHandlerMiddleware,
]);

app.listen(PORT, () => {
  console.log(`Server listening at http://${HOST}:${PORT}`);
  connect();
});
